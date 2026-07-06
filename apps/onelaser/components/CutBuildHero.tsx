'use client';

/*
 * Automated cut-and-build case study hero (docs/v2-interactions.md,
 * OneLaser). The landing hero's beam engine, automated and pointed at
 * the project: the laser traces and cuts the actual project profile
 * (per-case-study SVG path from CaseStudy.profileSvg) with the full
 * heat treatment (hot core, cooling window, settled seam), then the
 * cut part lifts and assembles in 3D into the finished form.
 *
 * - assembly: 'fold' (default) uses CSS 3D transforms on layered SVG
 *   groups, folding the flat profile up about its midline. Preferred
 *   for weight.
 * - assembly: 'extrude' lazy-loads a React Three Fiber scene
 *   (ProfileExtrude, ExtrudeGeometry) only when a case study asks for
 *   true 3D. Nothing from three.js ships on fold-only pages.
 *
 * No cursor control here; it is a performance, not a toy. There are
 * no pointer handlers at all.
 *
 * prefers-reduced-motion: reduce renders the assembled final form
 * (settled seam plus the finished part) and binds no loop.
 *
 * Production requirements carried over from the landing engine:
 * - IntersectionObserver pauses the rAF loop offscreen, resumes on
 *   re-entry.
 * - Debounced ~150ms resize rebuild.
 * - aria-hidden decoration behind semantic copy; the page h1 lives in
 *   the job header, never in here.
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import { profileAssembly, type ProfileSvg } from '@onegroup/shared';

import styles from './CutBuildHero.module.css';

/* three.js only loads for assembly: 'extrude', and only client-side */
const ProfileExtrude = dynamic(
  () => import('./ProfileExtrude').then((m) => m.ProfileExtrude),
  { ssr: false },
);

interface CutRefs {
  ghost: SVGPathElement;
  settle: SVGPathElement;
  cool: SVGPathElement;
  hot: SVGPathElement;
  /** total path length in path units */
  L: number;
  /** cooling window, path units */
  COOL: number;
  /** hot window, path units */
  HOT: number;
  prog: number;
}

interface BeamRefs {
  beam: SVGRectElement;
  src: SVGCircleElement;
  headGlow: SVGCircleElement;
  head: SVGCircleElement;
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

type Phase = 'trace' | 'cooling' | 'assemble' | 'hold' | 'reset';

/** The cut part's face, rendered once per fold layer. */
function PartFill({ profile, layerId }: { profile: ProfileSvg; layerId: string }) {
  const gid = `cbh-metal-${layerId}`;
  return (
    <svg viewBox={profile.viewBox} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0C5464" />
          <stop offset="0.55" stopColor="#127A8C" />
          <stop offset="1" stopColor="#1E6E7E" />
        </linearGradient>
      </defs>
      <path
        d={profile.path}
        fill={`url(#${gid})`}
        fillRule="evenodd"
        stroke="#7FB8C2"
        strokeWidth="1.2"
        strokeOpacity="0.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function CutBuildHero({ profile }: { profile: ProfileSvg }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const partRef = useRef<HTMLDivElement>(null);

  const assembly = profileAssembly(profile);
  const [extrudeOn, setExtrudeOn] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    const stage = stageRef.current;
    const scene = sceneRef.current;
    if (!svg || !stage || !scene) return;
    const part = partRef.current; /* null in extrude mode */

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(reduced);
    const NS = 'http://www.w3.org/2000/svg';
    const cls = {
      live: styles.live ?? 'live',
      assembled: styles.assembled ?? 'assembled',
      still: styles.reduced ?? 'reduced',
    };
    stage.classList.add(cls.live);

    /* profile viewBox: min-x min-y width height */
    const vbParts = profile.viewBox.split(/[\s,]+/).map(Number);
    const vx = vbParts[0] ?? 0;
    const vy = vbParts[1] ?? 0;
    const vw = vbParts[2] ?? 100;
    const vh = vbParts[3] ?? 100;

    let disposed = false;
    let raf = 0;
    let W = 0;
    let H = 0;
    /* profile-to-screen fit: screen = t + p * s */
    let s = 1;
    let tX = 0;
    let tY = 0;
    let cut: CutRefs | null = null;
    let beam: BeamRefs | null = null;
    let embers: Ember[] = [];
    let phase: Phase = 'trace';
    let wait = 0;

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

    /* faint cold seams from previous passes, same generator family as
       the landing engine */
    function seam(): string {
      const y0 = H * rnd(0.2, 0.85);
      const amp = H * rnd(0.04, 0.09);
      const ph = rnd(0, 6.28);
      let d = '';
      const steps = 90;
      for (let i = 0; i <= steps; i++) {
        const x = -W * 0.02 + (W * 1.06 * i) / steps;
        const t = i / steps;
        const y = y0 + Math.sin(t * 2.6 + ph) * amp * Math.sin(t * Math.PI);
        d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      return d;
    }

    function build() {
      svg!.innerHTML = '';
      embers = [];
      W = stage!.clientWidth;
      H = stage!.clientHeight;
      svg!.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      /* fit the profile into the centre of the sheet */
      const availW = W * 0.56;
      const availH = H * 0.52;
      s = Math.min(availW / vw, availH / vh);
      const pw = vw * s;
      const ph = vh * s;
      const ox = (W - pw) / 2;
      const oy = (H - ph) / 2 + H * 0.04;
      tX = ox - vx * s;
      tY = oy - vy * s;
      const T = `translate(${tX} ${tY}) scale(${s})`;

      const defs = el('defs', {});
      /* screen-space blooms (beam column, head, embers) */
      (
        [
          ['cb-bloom', 3],
          ['cb-bloom2', 7],
          ['cb-bloom3', 14],
        ] as const
      ).forEach((g) => {
        const f = el('filter', { id: g[0], x: '-400%', y: '-400%', width: '900%', height: '900%' }, defs);
        el('feGaussianBlur', { stdDeviation: g[1], result: 'b' }, f);
        const m = el('feMerge', {}, f);
        el('feMergeNode', { in: 'b' }, m);
        el('feMergeNode', { in: 'SourceGraphic' }, m);
      });
      /* profile-space blooms: the traced strokes are scaled by s, so
         divide to keep the reference screen-pixel treatment */
      (
        [
          ['cb-pbloom', 3 / s],
          ['cb-pbloom2', 7 / s],
        ] as const
      ).forEach((g) => {
        const f = el('filter', { id: g[0], x: '-400%', y: '-400%', width: '900%', height: '900%' }, defs);
        el('feGaussianBlur', { stdDeviation: g[1], result: 'b' }, f);
        const m = el('feMerge', {}, f);
        el('feMergeNode', { in: 'b' }, m);
        el('feMergeNode', { in: 'SourceGraphic' }, m);
      });
      const bgGlow = el('radialGradient', { id: 'cb-bg', cx: 0.5, cy: 0.4, r: 0.75 }, defs);
      el('stop', { offset: 0, 'stop-color': '#123840', 'stop-opacity': 0.8 }, bgGlow);
      el('stop', { offset: 0.6, 'stop-color': '#0D2126', 'stop-opacity': 0.35 }, bgGlow);
      el('stop', { offset: 1, 'stop-color': '#0B1214', 'stop-opacity': 0 }, bgGlow);
      const beamGrad = el('linearGradient', { id: 'cb-beam', x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      el('stop', { offset: 0, 'stop-color': '#2FD4EE', 'stop-opacity': 0 }, beamGrad);
      el('stop', { offset: 0.55, 'stop-color': '#2FD4EE', 'stop-opacity': 0.55 }, beamGrad);
      el('stop', { offset: 1, 'stop-color': '#EFFDFF', 'stop-opacity': 0.95 }, beamGrad);

      el('rect', { x: 0, y: 0, width: W, height: H, fill: 'url(#cb-bg)' });
      const brush = el('g', { stroke: '#FFFFFF', 'stroke-width': 1, opacity: 0.03 });
      for (let y = 0; y < H; y += 64) el('line', { x1: 0, y1: y, x2: W, y2: y }, brush);
      for (let i = 0; i < 2; i++)
        el('path', { d: seam(), fill: 'none', stroke: '#14343B', 'stroke-width': 1, opacity: 0.55 });

      /* the programmed profile: ghost, then the three heat layers */
      const ghost = el('path', {
        d: profile.path,
        transform: T,
        fill: 'none',
        stroke: '#1C3A41',
        'stroke-width': 1 / s,
        opacity: 0.5,
        'stroke-dasharray': `${1 / s} ${7 / s}`,
      });
      const settle = el('path', {
        d: profile.path,
        transform: T,
        fill: 'none',
        stroke: '#1E6E7E',
        'stroke-width': 1.4 / s,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
      });
      const cool = el('path', {
        d: profile.path,
        transform: T,
        fill: 'none',
        stroke: '#2FD4EE',
        'stroke-width': 2.8 / s,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        filter: 'url(#cb-pbloom)',
      });
      const hot = el('path', {
        d: profile.path,
        transform: T,
        fill: 'none',
        stroke: '#F4FEFF',
        'stroke-width': 1.6 / s,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        filter: 'url(#cb-pbloom2)',
      });
      const L = settle.getTotalLength();
      /* reference windows are 220/54 screen px; convert to path units */
      const COOL = Math.min(220 / s, L * 0.22);
      const HOT = Math.min(54 / s, L);
      settle.style.strokeDasharray = String(L);
      settle.style.strokeDashoffset = String(L);
      cool.style.strokeDasharray = COOL + ' ' + L;
      cool.style.strokeDashoffset = String(COOL);
      hot.style.strokeDasharray = HOT + ' ' + L;
      hot.style.strokeDashoffset = String(HOT);
      cut = { ghost, settle, cool, hot, L, COOL, HOT, prog: 0 };

      beam = {
        beam: el('rect', { x: 0, y: 0, width: 2.2, height: 0, fill: 'url(#cb-beam)', filter: 'url(#cb-bloom2)' }),
        src: el('circle', { cx: 0, cy: -4, r: 2.4, fill: '#EFFDFF', filter: 'url(#cb-bloom)', opacity: 0.9 }),
        headGlow: el('circle', { r: 14, fill: '#2FD4EE', opacity: 0.16, filter: 'url(#cb-bloom3)' }),
        head: el('circle', { r: 2.4, fill: '#FFFFFF', filter: 'url(#cb-bloom)' }),
      };

      /* size the fold part to sit exactly over the traced profile */
      if (part) {
        part.style.left = ox + 'px';
        part.style.top = oy + 'px';
        part.style.width = pw + 'px';
        part.style.height = ph + 'px';
      }
    }

    function ember(x: number, y: number) {
      if (embers.length > 16) return;
      embers.push({
        e: el('circle', { r: rnd(0.7, 1.5), fill: Math.random() < 0.7 ? '#7FE7F6' : '#EFFDFF', filter: 'url(#cb-bloom)' }),
        x,
        y,
        vx: rnd(-0.5, 0.9),
        vy: rnd(-0.9, -0.25),
        life: 1,
        decay: rnd(0.006, 0.014),
      });
    }

    function placeBeam(x: number, y: number, flick: number) {
      if (!beam) return;
      beam.beam.setAttribute('x', String(x - 1.1));
      beam.beam.setAttribute('height', String(Math.max(0, y - 2)));
      beam.beam.setAttribute('opacity', String(flick * 0.9));
      beam.src.setAttribute('cx', String(x));
      beam.head.setAttribute('cx', String(x));
      beam.head.setAttribute('cy', String(y));
      beam.headGlow.setAttribute('cx', String(x));
      beam.headGlow.setAttribute('cy', String(y));
      beam.headGlow.setAttribute('opacity', String(0.1 + 0.1 * flick));
    }
    function beamOn(on: boolean) {
      if (!beam) return;
      (['beam', 'src', 'head'] as const).forEach((k) => beam![k].setAttribute('opacity', on ? '0.9' : '0'));
      if (!on) beam.headGlow.setAttribute('opacity', '0');
    }

    function assembleStart() {
      scene!.classList.add(cls.assembled);
      if (assembly === 'extrude') setExtrudeOn(true);
    }
    function resetStart() {
      scene!.classList.remove(cls.assembled);
      if (assembly === 'extrude') setExtrudeOn(false);
    }
    /* re-arm the traced strokes for the next pass */
    function rearm() {
      if (!cut) return;
      cut.prog = 0;
      cut.settle.style.strokeDashoffset = String(cut.L);
      cut.cool.style.transition = '';
      cut.cool.setAttribute('opacity', '1');
      cut.cool.style.strokeDashoffset = String(cut.COOL);
      cut.hot.style.transition = '';
      cut.hot.setAttribute('opacity', '1');
      cut.hot.style.strokeDashoffset = String(cut.HOT);
      beamOn(true);
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

    function run() {
      let t = 0;
      const tick: FrameRequestCallback = () => {
        if (disposed || !cut) return;
        t += 0.016;
        for (let i = embers.length - 1; i >= 0; i--) {
          const sp = embers[i];
          if (!sp) continue;
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy *= 0.995;
          sp.life -= sp.decay;
          if (sp.life <= 0) {
            sp.e.remove();
            embers.splice(i, 1);
            continue;
          }
          sp.e.setAttribute('cx', String(sp.x));
          sp.e.setAttribute('cy', String(sp.y));
          sp.e.setAttribute('opacity', String(sp.life * 0.85));
        }
        const flick = 0.8 + 0.2 * Math.sin(t * 47) + 0.06 * Math.sin(t * 137);

        if (phase === 'trace') {
          const k = cut.prog / cut.L;
          const ease = 0.35 + 0.65 * Math.sin(Math.PI * Math.min(1, Math.max(0.02, k)));
          /* reference pace is 2.6 + 4.6*ease screen px per frame */
          cut.prog = Math.min(cut.L, cut.prog + (2.6 + 4.6 * ease) / s);
          cut.settle.style.strokeDashoffset = String(cut.L - cut.prog);
          cut.cool.style.strokeDashoffset = String(cut.COOL - cut.prog);
          cut.hot.style.strokeDashoffset = String(cut.HOT - cut.prog);
          const p = cut.settle.getPointAtLength(cut.prog);
          const sx = tX + p.x * s;
          const sy = tY + p.y * s;
          placeBeam(sx, sy, flick);
          if (Math.random() < 0.4) ember(sx, sy);

          if (cut.prog >= cut.L) {
            /* full heat treatment: extinguish, cool, settle */
            beamOn(false);
            cut.cool.style.transition = 'opacity 2.4s ease';
            cut.cool.setAttribute('opacity', '0');
            cut.hot.style.transition = 'opacity 1.2s ease';
            cut.hot.setAttribute('opacity', '0');
            phase = 'cooling';
            wait = 55; /* ~0.9s before the part lifts */
          }
        } else if (phase === 'cooling') {
          if (--wait <= 0) {
            assembleStart();
            phase = 'assemble';
            wait = 210; /* covers the lift + fold transitions (~3.4s) */
          }
        } else if (phase === 'assemble') {
          if (--wait <= 0) {
            phase = 'hold';
            wait = 300; /* hold the finished form (~4.8s) */
          }
        } else if (phase === 'hold') {
          if (--wait <= 0) {
            resetStart();
            phase = 'reset';
            wait = 70; /* let the part fade back down */
          }
        } else {
          if (--wait <= 0) {
            rearm();
            phase = 'trace';
          }
        }
        schedule();
      };
      currentTick = tick;
      schedule();
    }

    function init() {
      cancelAnimationFrame(raf);
      pendingResume = false;
      phase = 'trace';
      wait = 0;
      scene!.classList.remove(cls.assembled);
      build();
      if (reduced) {
        /* the assembled final form: settled seam drawn in full, faint
           cool glow, no beam, part folded and in place */
        if (cut) {
          cut.settle.style.strokeDashoffset = '0';
          cut.cool.style.strokeDasharray = 'none';
          cut.cool.setAttribute('opacity', '0.25');
          cut.hot.setAttribute('opacity', '0');
        }
        beamOn(false);
        scene!.classList.add(cls.still, cls.assembled);
        if (assembly === 'extrude') setExtrudeOn(true);
      } else {
        beamOn(true);
        run();
      }
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
          setPaused(false);
          if (pendingResume) {
            pendingResume = false;
            schedule();
          }
        } else {
          visible = false;
          setPaused(true);
          cancelAnimationFrame(raf);
          if (currentTick) pendingResume = true;
        }
      });
      io.observe(stage);
    }

    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        if (assembly === 'extrude') setExtrudeOn(false);
        init();
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      io?.disconnect();
      window.removeEventListener('resize', onResize);
      scene.classList.remove(cls.assembled, cls.still);
      stage.classList.remove(cls.live);
      svg.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.path, profile.viewBox, assembly]);

  return (
    <div ref={stageRef} className={styles.stage} aria-hidden="true">
      {/* server-rendered still for the no-JS render: the programmed
          profile as a dashed ghost on the dark sheet */}
      <svg className={styles.ssr} viewBox={profile.viewBox} preserveAspectRatio="xMidYMid meet">
        <path
          d={profile.path}
          fill="none"
          stroke="#1C3A41"
          strokeWidth="1"
          strokeDasharray="1 7"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg ref={svgRef} className={styles.svg} />
      <div ref={sceneRef} className={styles.scene}>
        {assembly === 'fold' ? (
          <div ref={partRef} className={styles.part}>
            <div className={`${styles.half} ${styles.lower}`}>
              <PartFill profile={profile} layerId="lo" />
            </div>
            <div className={`${styles.half} ${styles.upper}`}>
              <PartFill profile={profile} layerId="up" />
            </div>
          </div>
        ) : (
          extrudeOn && (
            <ProfileExtrude profile={profile} paused={paused} reduced={reducedMotion} />
          )
        )}
      </div>
    </div>
  );
}
