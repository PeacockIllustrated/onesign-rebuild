'use client';

/*
 * True-3D assembly for CutBuildHero, used only when a case study sets
 * profileSvg.assembly: 'extrude' (docs/v2-interactions.md: "if a case
 * study needs true 3D, use React Three Fiber with the profile extruded
 * via ExtrudeGeometry"). Lazy-loaded via next/dynamic from
 * CutBuildHero, so three.js never ships on fold-only pages.
 *
 * The extruded part lifts from flat-on-the-bed into its presented
 * pose, then settles: the frameloop drops to 'demand' once the pose is
 * reached (and while the hero is offscreen, driven by the parent's
 * IntersectionObserver), so no rAF runs when nothing moves.
 *
 * reduced: renders the assembled final form, no animation.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

import type { ProfileSvg } from '@onegroup/shared';

interface ProfileExtrudeProps {
  profile: ProfileSvg;
  /** true while the hero is out of the viewport */
  paused: boolean;
  /** prefers-reduced-motion: render the settled pose, no animation */
  reduced: boolean;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Lift-and-assemble pose at progress k in [0, 1]. */
function pose(m: THREE.Mesh, k: number) {
  const e = easeInOut(k);
  m.rotation.x = -Math.PI / 2 + (Math.PI / 2 - 0.3) * e; /* flat on the bed -> presented */
  m.rotation.y = -0.6 + 0.85 * e;
  m.position.y = -1.1 + 1.2 * e;
}

function Part({
  profile,
  reduced,
  onSettled,
}: {
  profile: ProfileSvg;
  reduced: boolean;
  onSettled: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const k = useRef(reduced ? 1 : 0);

  const geometry = useMemo(() => {
    /* SVGLoader parses the same content-field path the beam traces */
    const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${profile.viewBox}"><path d="${profile.path}"/></svg>`;
    const data = new SVGLoader().parse(markup);
    const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
    const vb = profile.viewBox.split(/[\s,]+/).map(Number);
    const span = Math.max(vb[2] ?? 100, vb[3] ?? 100);
    const g = new THREE.ExtrudeGeometry(shapes, {
      depth: span * 0.03 /* sheet thickness relative to the profile */,
      bevelEnabled: true,
      bevelThickness: span * 0.004,
      bevelSize: span * 0.004,
      bevelSegments: 2,
      curveSegments: 24,
    });
    /* SVG y runs down: rotate (not mirror, which would flip winding) */
    g.rotateX(Math.PI);
    g.center();
    g.computeBoundingBox();
    const size = new THREE.Vector3();
    g.boundingBox?.getSize(size);
    const norm = 3 / Math.max(size.x, size.y, size.z, 1e-6);
    g.scale(norm, norm, norm);
    return g;
  }, [profile.path, profile.viewBox]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  /* initial pose before first paint (also the only pose when reduced) */
  useLayoutEffect(() => {
    if (mesh.current) pose(mesh.current, k.current);
  }, [geometry]);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m || k.current >= 1) return;
    k.current = Math.min(1, k.current + delta / 2.4);
    pose(m, k.current);
    if (k.current >= 1) onSettled();
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshStandardMaterial color="#127A8C" metalness={0.35} roughness={0.4} />
    </mesh>
  );
}

export function ProfileExtrude({ profile, paused, reduced }: ProfileExtrudeProps) {
  const [settled, setSettled] = useState(reduced);
  return (
    <Canvas
      frameloop={paused || settled || reduced ? 'demand' : 'always'}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.1, 4.6], fov: 38 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.15} />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#2FD4EE" />
      <Part profile={profile} reduced={reduced} onSettled={() => setSettled(true)} />
    </Canvas>
  );
}

export default ProfileExtrude;
