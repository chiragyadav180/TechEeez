"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type AccentAtmosphereProps = {
  accent: string;
  reducedMotion?: boolean;
  scale?: number;
};

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function RisingMotes({
  accent,
  reducedMotion,
  count = 22,
}: {
  accent: string;
  reducedMotion?: boolean;
  count?: number;
}) {
  const points = useRef<THREE.Points>(null);
  const target = useMemo(() => new THREE.Color(accent), [accent]);
  const originals = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      data[i3] = (seeded(i + 3) - 0.5) * 4.6;
      data[i3 + 1] = (seeded(i + 19) - 0.5) * 3.2;
      data[i3 + 2] = (seeded(i + 41) - 0.5) * 3.4;
    }
    return data;
  }, [count]);
  const positions = useMemo(() => originals.slice(), [originals]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.color.lerp(target, 0.08);
    if (reducedMotion) return;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      arr[i3] = originals[i3] + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.12;
      arr[i3 + 1] =
        ((originals[i3 + 1] + state.clock.elapsedTime * (0.18 + seeded(i) * 0.16) + 1.8) %
          3.6) -
        1.8;
      arr[i3 + 2] = originals[i3 + 2] + Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.08;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += delta * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={accent}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitLight({
  accent,
  reducedMotion,
}: {
  accent: string;
  reducedMotion?: boolean;
}) {
  const light = useRef<THREE.PointLight>(null);
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((state) => {
    if (!light.current) return;
    light.current.color.lerp(target, 0.08);
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    light.current.position.set(
      Math.cos(t * 0.48) * 2.5,
      Math.sin(t * 0.33) * 1.15,
      1.5 + Math.sin(t * 0.52) * 0.9,
    );
  });

  return <pointLight ref={light} intensity={1.2} distance={9} decay={2} />;
}

export function AccentAtmosphere({
  accent,
  reducedMotion = false,
  scale = 1,
}: AccentAtmosphereProps) {
  return (
    <group scale={scale}>
      <OrbitLight accent={accent} reducedMotion={reducedMotion} />
      <RisingMotes accent={accent} reducedMotion={reducedMotion} />
    </group>
  );
}
