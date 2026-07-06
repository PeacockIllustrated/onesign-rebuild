'use client';

/*
 * The beam. Ported as faithfully as possible from the IIFE at the
 * bottom of reference/laser-landing.html (the visual spec).
 *
 * Auto: one continuous cut sweeps the sheet, white-hot at the head,
 * cooling through cyan into a settled seam. Interactive: enter the
 * hero and the beam hands over to you; the endpoint follows the
 * cursor and cuts a live seam along your path. Leave, and your seam
 * cools while the machine resumes its own passes.
 *
 * Production additions over the reference (docs/hero-engines.md):
 * - IntersectionObserver pauses the rAF loop when the hero leaves the
 *   viewport and resumes it on re-entry.
 * - Touch devices get auto mode: pointer handlers ignore touch input.
 * - Full cleanup on unmount (listeners, observers, timeouts, rAF).
 *
 * V2 interaction upgrades (docs/v2-interactions.md, OneLaser):
 * - Target cursor: while the pointer is over the hero and the beam is
 *   following it, the native cursor is hidden (within the hero only,
 *   restored on leave) and replaced by a tracked targeting reticle.
 * - Click-and-hold power: while held, bloom intensity and ember spawn
 *   rate rise moderately and the hot window widens slightly. Pointer
 *   capture keeps the hold alive through small drift off the hero
 *   edge; release returns everything to standard.
 * Both are mouse/pen only and are never bound under reduced motion.
 *
 * Preserved exactly from the reference:
 * - prefers-reduced-motion: reduce renders the finished still and
 *   binds no loop and no pointer handlers.
 * - Debounced ~150ms resize rebuild.
 * - Three stacked strokes on one generated path, dash-window
 *   technique, beam column flicker, <=16 cyan/white embers, per-pass
 *   randomised sweep() harmonics, traverse easing, pointer hand-off
 *   trail (seeded from the auto head, lerp 0.16, >3.5px spacing,
 *   cap 650 points, staged fade on leave).
 */

import { useEffect, useRef } from 'react';

import styles from './BeamHero.module.css';

interface CutState {
  ghost: SVGPathElement;
  settle: SVGPathElement;
  cool: SVGPathElement;
  hot: SVGPathElement;
  L: number;
  COOL: number;
  HOT: number;
  prog: number;
  beam: SVGRectElement;
  src: SVGCircleElement;
  headGlow: SVGCircleElement;
  head: SVGCircleElement;
}

interface TrailState {
  settle: SVGPathElement;
  cool: SVGPathElement;
  hot: SVGPathElement;
}

interface Ember {
  e: SVGCircleElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
}

export function BeamHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const hero = svg.parentElement;
    if (!hero) return;
    const reticle = reticleRef.current;

    /* CSS module classes toggled on the hero/reticle (fallbacks are
       never hit in practice; they keep classList calls non-empty). */
    const cls = {
      noCursor: styles.noCursor ?? 'noCursor',
      on: styles.reticleOn ?? 'reticleOn',
      powered: styles.reticlePowered ?? 'reticlePowered',
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const NS = 'http://www.w3.org/2000/svg';

    let W = 0;
    let H = 0;
    let raf = 0;
    let cut: CutState | null = null;
    let trail: TrailState | null = null;
    let embers: Ember[] = [];
    let mode: 'auto' | 'user' = 'auto';
    let tx = 0;
    let ty = 0;
    let hx = 0;
    let hy = 0;
    let pts: Array<[number, number]> = [];
    let disposed = false;

    /* click-and-hold power state (v2) */
    let powered = false;
    let capturedId: number | null = null;

    /* Timeouts tracked so unmount cannot fire stale visual state. */
    const timeouts = new Set<number>();
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (!disposed) fn();
      }, ms);
      timeouts.add(id);
    };

    function el<K extends keyof SVGElementTagNameMap>(
      n: K,
      a: Record<string, string | number>,
      p?: Element,
    ): SVGElementTagNameMap[K] {
      const e = document.createElementNS(NS, n) as SVGElementTagNameMap[K];
      for (const k in a) e.setAttribute(k, String(a[k]));
      (p ?? svg!).appendChild(e);
      return e;
    }
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function sweep(): string {
      const y0 = H * rnd(0.42, 0.58);
      const amp = H * rnd(0.1, 0.16);
      const ph = rnd(0, 6.28);
      const sw = rnd(0.7, 1.3);
      let d = '';
      const steps = 170;
      for (let i = 0; i <= steps; i++) {
        const x = -W * 0.02 + (W * 1.06 * i) / steps;
        const t = i / steps;
        const y =
          y0 +
          Math.sin(t * 3.1 * sw + ph) * amp * (0.4 + 0.6 * Math.sin(t * Math.PI)) -
          Math.sin(t * Math.PI) * H * 0.06;
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      return d;
    }

    function build() {
      svg!.innerHTML = '';
      embers = [];
      pts = [];
      W = hero!.clientWidth;
      H = hero!.clientHeight;
      svg!.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      const defs = el('defs', {});
      (
        [
          ['bloom', 3],
          ['bloom2', 7],
          ['bloom3', 14],
        ] as const
      ).forEach((g) => {
        const f = el('filter', { id: g[0], x: '-400%', y: '-400%', width: '900%', height: '900%' }, defs);
        el('feGaussianBlur', { stdDeviation: g[1], result: 'b' }, f);
        const m = el('feMerge', {}, f);
        el('feMergeNode', { in: 'b' }, m);
        el('feMergeNode', { in: 'SourceGraphic' }, m);
      });
      const bgGlow = el('radialGradient', { id: 'bg', cx: 0.72, cy: 0.42, r: 0.75 }, defs);
      el('stop', { offset: 0, 'stop-color': '#123840', 'stop-opacity': 0.8 }, bgGlow);
      el('stop', { offset: 0.6, 'stop-color': '#0D2126', 'stop-opacity': 0.35 }, bgGlow);
      el('stop', { offset: 1, 'stop-color': '#0B1214', 'stop-opacity': 0 }, bgGlow);
      const beamGrad = el('linearGradient', { id: 'beam', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      el('stop', { offset: 0, 'stop-color': '#2FD4EE', 'stop-opacity': 0 }, beamGrad);
      el('stop', { offset: 0.55, 'stop-color': '#2FD4EE', 'stop-opacity': 0.55 }, beamGrad);
      el('stop', { offset: 1, 'stop-color': '#EFFDFF', 'stop-opacity': 0.95 }, beamGrad);

      el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#bg)' });
      const brush = el('g', { stroke: '#FFFFFF', 'stroke-width': 1, opacity: 0.03 });
      for (let y = 0; y < H; y += 64) el('line', { x1: 0, y1: y, x2: W, y2: y }, brush);

      for (let i = 0; i < 2; i++)
        el('path', { d: sweep(), fill: 'none', stroke: '#14343B', 'stroke-width': 1, opacity: 0.55 });

      newCut();

      /* the visitor's own seam, three heat layers on one live path */
      trail = {
        settle: el('path', { d: '', fill: 'none', stroke: '#1E6E7E', 'stroke-width': 1.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
        cool: el('path', { d: '', fill: 'none', stroke: '#2FD4EE', 'stroke-width': 2.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#bloom)' }),
        hot: el('path', { d: '', fill: 'none', stroke: '#F4FEFF', 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#bloom2)' }),
      };

      cut!.beam = el('rect', { x: 0, y: 0, width: 2.2, height: 0, fill: 'url(#beam)', filter: 'url(#bloom2)' });
      cut!.src = el('circle', { cx: 0, cy: -4, r: 2.4, fill: '#EFFDFF', filter: 'url(#bloom)', opacity: 0.9 });
      cut!.headGlow = el('circle', { r: 14, fill: '#2FD4EE', opacity: 0.16, filter: 'url(#bloom3)' });
      cut!.head = el('circle', { r: 2.4, fill: '#FFFFFF', filter: 'url(#bloom)' });
    }

    function newCut() {
      const d = sweep();
      if (cut) {
        cut.ghost.remove();
        cut.settle.remove();
        cut.cool.remove();
        cut.hot.remove();
      }
      const ghost = el('path', { d, fill: 'none', stroke: '#1C3A41', 'stroke-width': 1, opacity: 0.5, 'stroke-dasharray': '1 7' });
      const settle = el('path', { d, fill: 'none', stroke: '#1E6E7E', 'stroke-width': 1.4, 'stroke-linecap': 'round' });
      const cool = el('path', { d, fill: 'none', stroke: '#2FD4EE', 'stroke-width': 2.8, 'stroke-linecap': 'round', filter: 'url(#bloom)' });
      const hot = el('path', { d, fill: 'none', stroke: '#F4FEFF', 'stroke-width': 1.6, 'stroke-linecap': 'round', filter: 'url(#bloom2)' });
      const L = settle.getTotalLength();
      const COOL = Math.min(220, L * 0.22);
      const HOT = 54;
      settle.style.strokeDasharray = String(L);
      settle.style.strokeDashoffset = String(L);
      cool.style.strokeDasharray = COOL + ' ' + L;
      cool.style.strokeDashoffset = String(COOL);
      hot.style.strokeDasharray = HOT + ' ' + L;
      hot.style.strokeDashoffset = String(HOT);
      cut = { ...(cut ?? ({} as CutState)), ghost, settle, cool, hot, L, COOL, HOT, prog: 0 };
    }

    function ember(x: number, y: number) {
      /* ember cap raised moderately while the hold is powered */
      if (embers.length > (powered ? 24 : 16)) return;
      embers.push({
        e: el('circle', { r: rnd(0.7, 1.5), fill: Math.random() < 0.7 ? '#7FE7F6' : '#EFFDFF', filter: 'url(#bloom)' }),
        x,
        y,
        vx: rnd(-0.5, 0.9),
        vy: rnd(-0.9, -0.25),
        life: 1,
        decay: rnd(0.006, 0.014),
      });
    }

    function placeBeam(x: number, y: number, flick: number) {
      if (!cut) return;
      cut.beam.setAttribute('x', String(x - 1.1));
      cut.beam.setAttribute('height', String(Math.max(0, y - 2)));
      cut.beam.setAttribute('opacity', String(flick * 0.9));
      cut.src.setAttribute('cx', String(x));
      cut.head.setAttribute('cx', String(x));
      cut.head.setAttribute('cy', String(y));
      cut.headGlow.setAttribute('cx', String(x));
      cut.headGlow.setAttribute('cy', String(y));
      /* bloom rises moderately while the hold is powered */
      cut.headGlow.setAttribute(
        'opacity',
        String(powered ? 0.18 + 0.14 * flick : 0.1 + 0.1 * flick),
      );
    }
    function beamOn(on: boolean) {
      if (!cut) return;
      (['beam', 'src', 'head'] as const).forEach((k) => cut![k].setAttribute('opacity', on ? '0.9' : '0'));
      if (!on) cut.headGlow.setAttribute('opacity', '0');
    }
    function fadeTrail() {
      if (!trail) return;
      (
        [
          ['hot', 1.2],
          ['cool', 2.4],
          ['settle', 3.4],
        ] as const
      ).forEach((f) => {
        trail![f[0]].style.transition = 'opacity ' + f[1] + 's ease';
        trail![f[0]].setAttribute('opacity', '0');
      });
      later(() => {
        pts = [];
        (['hot', 'cool', 'settle'] as const).forEach((k) => {
          if (!trail) return;
          trail[k].setAttribute('d', '');
          trail[k].style.transition = '';
          trail[k].setAttribute('opacity', '1');
        });
      }, 3500);
    }

    /* --- viewport pause/resume (production requirement) --- */
    let visible = true;
    let pendingResume = false;
    let currentTick: FrameRequestCallback | null = null;
    const schedule = () => {
      if (!currentTick || disposed) return;
      if (!visible) {
        pendingResume = true;
        return;
      }
      raf = requestAnimationFrame(currentTick);
    };

    /* --- target cursor (v2): tracked reticle, native cursor hidden
       within the hero only, restored on leave --- */
    const placeReticle = () => {
      if (reticle) reticle.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    };
    const showReticle = () => {
      hero!.classList.add(cls.noCursor);
      reticle?.classList.add(cls.on);
      placeReticle();
    };
    const hideReticle = () => {
      hero!.classList.remove(cls.noCursor);
      reticle?.classList.remove(cls.on);
    };

    /* --- click-and-hold power (v2) --- */
    const setPowered = (on: boolean) => {
      if (powered === on) return;
      powered = on;
      /* hot layer thickens a touch while held; window widens in tick */
      trail?.hot.setAttribute('stroke-width', on ? '2.1' : '1.6');
      cut?.headGlow.setAttribute('r', on ? '20' : '14');
      reticle?.classList.toggle(cls.powered, on);
    };

    /* hand the beam to the visitor (mouse/pen only; touch keeps auto mode) */
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || !cut) return;
      const r = hero!.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      const p = cut.settle.getPointAtLength(cut.prog); /* continuity: hand-over from the auto head */
      hx = p.x;
      hy = p.y;
      mode = 'user';
      pts = [[hx, hy]];
      cut.cool.style.transition = 'opacity .5s ease';
      cut.cool.setAttribute('opacity', '0');
      cut.hot.style.transition = 'opacity .3s ease';
      cut.hot.setAttribute('opacity', '0');
      beamOn(true);
      showReticle();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = hero!.getBoundingClientRect();
      /* clamped so a captured hold drifting off the edge keeps the
         beam (and reticle) inside the hero */
      tx = Math.min(Math.max(e.clientX - r.left, 0), r.width);
      ty = Math.min(Math.max(e.clientY - r.top, 0), r.height);
      placeReticle();
    };
    /* the machine takes the beam back (shared by leave and by a
       release that lands outside the hero) */
    const handOff = () => {
      if (mode !== 'user') return;
      mode = 'auto';
      hideReticle();
      fadeTrail();
      beamOn(false);
      later(() => {
        newCut();
        if (!cut) return;
        cut.cool.style.transition = '';
        cut.cool.setAttribute('opacity', '1');
        cut.hot.style.transition = '';
        cut.hot.setAttribute('opacity', '1');
        beamOn(true);
      }, 900);
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      /* pointer capture holds the beam through small drift; the real
         hand-off happens on release (endHold) */
      if (capturedId !== null) return;
      handOff();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || mode !== 'user') return;
      /* never swallow the hero CTAs */
      if (e.target instanceof Element && e.target.closest('a, button')) return;
      e.preventDefault(); /* no text selection during the hold */
      try {
        hero!.setPointerCapture(e.pointerId);
        capturedId = e.pointerId;
      } catch {
        capturedId = null;
      }
      setPowered(true);
    };
    const endHold = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (capturedId !== null) {
        try {
          hero!.releasePointerCapture(capturedId);
        } catch {
          /* capture already released by the browser */
        }
        capturedId = null;
      }
      if (!powered) return;
      setPowered(false);
      /* release after drifting off the hero edge: hand back to auto */
      const r = hero!.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        handOff();
      }
    };
    if (!reduced) {
      hero.addEventListener('pointerenter', onEnter);
      hero.addEventListener('pointermove', onMove);
      hero.addEventListener('pointerleave', onLeave);
      hero.addEventListener('pointerdown', onDown);
      hero.addEventListener('pointerup', endHold);
      hero.addEventListener('pointercancel', endHold);
    }

    function run() {
      let t = 0;
      let holding = 0;
      const tick: FrameRequestCallback = () => {
        if (disposed || !cut) return;
        t += 0.016;
        for (let i = embers.length - 1; i >= 0; i--) {
          const s = embers[i];
          if (!s) continue;
          s.x += s.vx;
          s.y += s.vy;
          s.vy *= 0.995;
          s.life -= s.decay;
          if (s.life <= 0) {
            s.e.remove();
            embers.splice(i, 1);
            continue;
          }
          s.e.setAttribute('cx', String(s.x));
          s.e.setAttribute('cy', String(s.y));
          s.e.setAttribute('opacity', String(s.life * 0.85));
        }
        const flick = 0.8 + 0.2 * Math.sin(t * 47) + 0.06 * Math.sin(t * 137);

        if (mode === 'user') {
          /* weighted head: the machine follows you, it doesn't teleport */
          hx += (tx - hx) * 0.16;
          hy += (ty - hy) * 0.16;
          const last = pts[pts.length - 1];
          if (!last || Math.hypot(hx - last[0], hy - last[1]) > 3.5) {
            pts.push([hx, hy]);
            if (pts.length > 650) pts.shift();
            const d = 'M' + pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L');
            if (trail) {
              trail.settle.setAttribute('d', d);
              trail.cool.setAttribute('d', d);
              trail.hot.setAttribute('d', d);
              const L = trail.settle.getTotalLength();
              const COOL = Math.min(220, L);
              /* hot window widens slightly while the hold is powered */
              const HOT = Math.min(powered ? 78 : 54, L);
              trail.cool.style.strokeDasharray = COOL + ' ' + L;
              trail.cool.style.strokeDashoffset = String(COOL - L);
              trail.hot.style.strokeDasharray = HOT + ' ' + L;
              trail.hot.style.strokeDashoffset = String(HOT - L);
            }
          }
          placeBeam(hx, hy, flick);
          /* ember spawn rate rises moderately while the hold is powered */
          if (Math.random() < (powered ? 0.62 : 0.4)) ember(hx, hy);
          schedule();
          return;
        }

        if (holding > 0) {
          holding--;
          if (holding === 0) {
            newCut();
            cut.prog = 0;
          }
          schedule();
          return;
        }
        const k = cut.prog / cut.L;
        const ease = 0.35 + 0.65 * Math.sin(Math.PI * Math.min(1, Math.max(0.02, k)));
        cut.prog = Math.min(cut.L, cut.prog + (2.6 + 4.6 * ease));
        cut.settle.style.strokeDashoffset = String(cut.L - cut.prog);
        cut.cool.style.strokeDashoffset = String(cut.COOL - cut.prog);
        cut.hot.style.strokeDashoffset = String(cut.HOT - cut.prog);
        const p = cut.settle.getPointAtLength(cut.prog);
        placeBeam(p.x, p.y, flick);
        if (Math.random() < 0.4) ember(p.x, p.y);

        if (cut.prog >= cut.L) {
          beamOn(false);
          cut.cool.style.transition = 'opacity 2.4s ease';
          cut.cool.setAttribute('opacity', '0');
          cut.hot.style.transition = 'opacity 1.2s ease';
          cut.hot.setAttribute('opacity', '0');
          holding = 170;
          later(() => {
            if (mode === 'auto' && cut) {
              cut.cool.style.transition = '';
              cut.hot.style.transition = '';
              beamOn(true);
            }
          }, 170 * 16);
        }
        schedule();
      };
      currentTick = tick;
      schedule();
    }

    function init() {
      cancelAnimationFrame(raf);
      pendingResume = false;
      build();
      if (reduced) {
        /* the finished still: settled seam drawn in full, faint cool glow, no beam */
        if (cut) {
          cut.settle.style.strokeDashoffset = '0';
          cut.cool.style.strokeDasharray = 'none';
          cut.cool.setAttribute('opacity', '0.25');
          cut.hot.setAttribute('opacity', '0');
          beamOn(false);
        }
      } else run();
    }
    init();

    /* pause offscreen, resume on re-entry */
    let io: IntersectionObserver | null = null;
    if (!reduced && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.isIntersecting) {
          visible = true;
          if (pendingResume) {
            pendingResume = false;
            schedule();
          }
        } else {
          visible = false;
          cancelAnimationFrame(raf);
          if (currentTick) pendingResume = true;
        }
      });
      io.observe(hero);
    }

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(init, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      timeouts.forEach((id) => clearTimeout(id));
      timeouts.clear();
      io?.disconnect();
      window.removeEventListener('resize', onResize);
      hero.removeEventListener('pointerenter', onEnter);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      hero.removeEventListener('pointerdown', onDown);
      hero.removeEventListener('pointerup', endHold);
      hero.removeEventListener('pointercancel', endHold);
      hero.classList.remove(cls.noCursor);
      svg.innerHTML = '';
    };
  }, []);

  /* aria-hidden decoration, absolutely positioned behind the hero copy,
     below the scrim (.stage in the reference). The reticle is the one
     exception to "below the scrim": it is the visitor's cursor, so it
     tracks above the copy (z-index 4), pointer-events: none. */
  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <div ref={reticleRef} className={styles.reticle} aria-hidden="true">
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="11" fill="none" stroke="#2FD4EE" strokeWidth="1" opacity="0.9" />
          <line x1="22" y1="4" x2="22" y2="12" stroke="#2FD4EE" strokeWidth="1" />
          <line x1="22" y1="32" x2="22" y2="40" stroke="#2FD4EE" strokeWidth="1" />
          <line x1="4" y1="22" x2="12" y2="22" stroke="#2FD4EE" strokeWidth="1" />
          <line x1="32" y1="22" x2="40" y2="22" stroke="#2FD4EE" strokeWidth="1" />
          <circle cx="22" cy="22" r="1.3" fill="#EFFDFF" />
        </svg>
      </div>
    </>
  );
}
