'use client';

/*
 * ASCII image engine, ported faithfully from the IIFE at the bottom of
 * reference/design-landing.html (the visual spec). A brand picture (the
 * One roundel plus a sweeping gesture stroke) is drawn offscreen at cell
 * resolution, blurred, and sampled; glyph density maps to luminance so
 * the characters literally form the image. It breathes along its
 * contours, and the cursor ripples it.
 *
 * Production additions over the reference (per docs/hero-engines.md):
 * - IntersectionObserver pauses the rAF loop when the hero leaves the
 *   viewport and resumes it on re-entry.
 * - Resize rebuild is debounced ~150ms.
 * - prefers-reduced-motion: reduce renders the finished still and binds
 *   NO loop or pointer handlers (reference behaviour, preserved).
 *
 * The canvas must be a direct child of the hero band: the parent element
 * is used for sizing, pointer tracking and viewport observation, exactly
 * as in the reference (cv.parentElement).
 *
 * Swap-in note: the icon path + viewBox dimensions are the only coupling
 * to the artwork; any future mark drops in as a new path + width/height
 * (see IconSvg in @onegroup/shared).
 */

import { useEffect, useRef } from 'react';

/* rich ramp: sparse dust -> line weights -> solid ink */
const RAMP = [' ', ' ', '·', '·', ':', '∙', '~', '≈', '=', '+', 'x', '*', 'o', 'e', '8', 'O', '%', '&', '#', '@', '▓'];
const ACCENT = ['✳', '◦', '∗'];

/* the real Onesign icon, inlined (viewBox 27.08 x 24.64) */
const DEFAULT_ICON: AsciiIcon = {
  path: 'M7.87.75c3.58-.98,7.42-1.01,10.95,0,5.38,1.53,8.29,6.23,8.26,11.65-.03,5.23-2.71,9.81-7.99,11.46l.03-19.46h-5.94c-.85,4.22-4.03,5.12-8.42,4.99l.04,4.9,7.57.03-.02,10.34c-6.39-.04-12.35-4.83-12.35-10.97C0,5.89,4.11,1.78,7.87.75Z',
  width: 27.08,
  height: 24.64,
};

export interface AsciiIcon {
  /** SVG path data (Path2D drop-in). */
  path: string;
  /** viewBox width of the supplied mark. */
  width: number;
  /** viewBox height of the supplied mark. */
  height: number;
}

export interface AsciiHeroProps {
  className?: string;
  /** The mark to render. Defaults to the Onesign roundel. */
  icon?: AsciiIcon;
  /** ASCII grid cell size in px; default 9, finer marks may go down to ~6. */
  cell?: number;
}

export function AsciiHero({ className, icon = DEFAULT_ICON, cell = 9 }: AsciiHeroProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const hero = cv.parentElement;
    const ctx = cv.getContext('2d');
    if (!hero || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CELL = cell;
    /* glyph sizes scale with CELL; at the default 9px they are exactly
       the reference's 400 8.5px / 700 10px buckets */
    const FONT_REG = `400 ${((8.5 / 9) * CELL).toFixed(2)}px ui-monospace,SFMono-Regular,Consolas,monospace`;
    const FONT_BOLD = `700 ${((10 / 9) * CELL).toFixed(2)}px ui-monospace,SFMono-Regular,Consolas,monospace`;
    const ICON = new Path2D(icon.path);
    const IW = icon.width;
    const IH = icon.height;

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let lum = new Float32Array(0);
    let mx = -999;
    let my = -999;
    let sx = 0;
    let sy = 0;
    let t = 0;
    let rafId = 0;
    let running = false;

    function buildImage() {
      /* offscreen scene at cell resolution */
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d');
      if (!o) return;
      o.fillStyle = '#000';
      o.fillRect(0, 0, cols, rows);
      o.strokeStyle = '#fff';
      o.fillStyle = '#fff';
      o.lineCap = 'round';

      /* place the mark right-of-centre, sized to the hero */
      const S = (Math.min(cols, rows) * 0.72) / IH; // scale so icon height ~72% of grid
      const ix = cols * 0.68 - (IW * S) / 2;
      const iy = rows * 0.47 - (IH * S) / 2;

      /* sweeping gesture stroke, entering left and passing behind the mark */
      const cxp = ix + IW * S * 0.5;
      const cyp = iy + IH * S * 0.5;
      const R = IH * S * 0.5;
      o.lineWidth = Math.max(2, R * 0.13);
      o.beginPath();
      o.moveTo(-cols * 0.05, rows * 0.8);
      o.bezierCurveTo(cols * 0.2, rows * 1.0, cols * 0.33, rows * 0.15, cxp - R * 0.95, cyp + R * 0.45);
      o.bezierCurveTo(cxp - R * 0.1, cyp + R * 1.25, cxp + R * 1.55, cyp + R * 0.85, cxp + R * 1.2, cyp - R * 0.4);
      o.stroke();

      /* the icon itself: soft fill for tonal body, crisp outline for the silhouette */
      o.save();
      o.translate(ix, iy);
      o.scale(S, S);
      o.globalAlpha = 0.72;
      o.fill(ICON); // body reads as mid-tone texture
      o.globalAlpha = 1;
      o.lineWidth = (1.4 / S) * 2;
      o.stroke(ICON); // edge reads as solid ink
      o.restore();

      /* soft glow pass so density falls off in gradients, not hard edges */
      o.filter = 'blur(1.6px)';
      o.drawImage(off, 0, 0);
      o.filter = 'none';

      const d = o.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) lum[i] = (d[i * 4] ?? 0) / 255;
    }

    /* one frame; scheduling is handled by tick()/start()/stop() */
    function draw() {
      if (!ctx) return;
      t += 0.016;
      sx += ((mx > -100 ? mx : W * 0.68) - sx) * 0.07;
      sy += ((my > -100 ? my : H * 0.46) - sy) * 0.07;
      ctx.clearRect(0, 0, W, H);
      let lastFb = -1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const L = lum[r * cols + c] ?? 0;
          /* faint ambient dust keeps the whole canvas alive */
          const dust = (c * 29 + r * 53) % 37 === 0 ? 0.06 : 0;
          let v = L + dust;
          if (v < 0.03) continue;
          let x = c * CELL + CELL / 2;
          let y = r * CELL + CELL / 2;
          /* breathe: intensity shimmers along contours */
          v *= 0.82 + 0.18 * Math.sin(t * 1.4 + L * 9 + c * 0.12 - r * 0.09);
          /* cursor ripple: displace and brighten within reach */
          const d = Math.hypot(x - sx, y - sy);
          const reach = Math.max(0, 1 - d / 240);
          if (reach > 0) {
            const ang = Math.atan2(y - sy, x - sx);
            const w = Math.sin(d * 0.045 - t * 4) * reach * 10;
            x += Math.cos(ang) * w;
            y += Math.sin(ang) * w;
            v = Math.min(1.15, v + reach * 0.5);
          }
          const idx = Math.min(RAMP.length - 1, Math.floor(v * (RAMP.length - 1)));
          let ch = RAMP[idx] ?? ' ';
          if (v > 0.92 && (c + r * 7) % 29 === 0) ch = ACCENT[(c + r) % 3] ?? ch; // rare sparkles in the densest ink
          /* colour, inverted for the dark ground: dust in low steel,
             mid tones in bright teal, the densest ink in near-white light */
          const a = 0.18 + v * 0.75;
          ctx.fillStyle =
            v > 0.6
              ? 'rgba(216,245,248,' + a + ')'
              : v > 0.3
                ? 'rgba(66,174,191,' + a + ')'
                : 'rgba(122,142,140,' + a * 0.7 + ')';
          const fb = v > 0.7 ? 1 : 0; // two font buckets only,
          if (fb !== lastFb) {
            // switching per cell is costly
            ctx.font = fb ? FONT_BOLD : FONT_REG;
            lastFb = fb;
          }
          ctx.fillText(ch, x, y);
        }
      }
    }

    function tick() {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function size() {
      if (!hero || !cv || !ctx) return;
      const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
      W = hero.clientWidth;
      H = hero.clientHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cols = Math.ceil(W / CELL);
      rows = Math.ceil(H / CELL);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      buildImage();
    }

    size();
    draw(); // paint immediately; reduced motion keeps this still, no loop

    /* resize rebuild, debounced ~150ms */
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        size();
        if (!running) draw(); // keep the still (or paused frame) current
      }, 150);
    };
    window.addEventListener('resize', onResize);

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };
    const onLeave = () => {
      mx = -999;
      my = -999;
    };

    let io: IntersectionObserver | undefined;
    if (!reduced) {
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      /* pause the loop while the hero is out of the viewport */
      io = new IntersectionObserver((entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) start();
        else stop();
      });
      io.observe(hero);
    }

    return () => {
      stop();
      io?.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      if (!reduced) {
        hero.removeEventListener('pointermove', onMove);
        hero.removeEventListener('pointerleave', onLeave);
      }
    };
  }, [icon, cell]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
