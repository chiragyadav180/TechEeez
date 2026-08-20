"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ParticleFieldProps = {
  count?: number;
  color?: string;
  radius?: number;
  speed?: number;
  reducedMotion?: boolean;
};

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField({
  count = 120,
  color = "#67e8f9",
  radius = 4.5,
  speed = 0.08,
  reducedMotion = false,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const originals = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      data[i3] = (seeded(i + 1) - 0.5) * radius * 2;
      data[i3 + 1] = (seeded(i + 17) - 0.5) * radius * 1.4;
      data[i3 + 2] = (seeded(i + 41) - 0.5) * radius * 2;
    }
    return data;
  }, [count, radius]);

  const positions = useMemo(() => originals.slice(), [originals]);
  const target = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    if (!points.current) return;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.color.lerp(target, 0.07);
    if (reducedMotion) return;
    points.current.rotation.y += delta * speed;
    points.current.rotation.x += delta * speed * 0.22;
    const arr = points.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      arr[i3] = originals[i3] + Math.sin(t * 0.35 + i) * 0.06;
      arr[i3 + 1] = originals[i3 + 1] + Math.cos(t * 0.42 + i * 0.7) * 0.1;
      arr[i3 + 2] = originals[i3 + 2] + Math.sin(t * 0.28 + i * 1.1) * 0.05;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.038}
        sizeAttenuation
        transparent
        opacity={0.78}
        depthWrite={false}
      />
    </points>
  );
}
