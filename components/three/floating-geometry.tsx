"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type FloatingGeometryProps = {
  reducedMotion?: boolean;
  dimmed?: boolean;
};

export function FloatingGeometry({
  reducedMotion = false,
  dimmed = false,
}: FloatingGeometryProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.22;
      core.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={group} scale={dimmed ? 1.35 : 1}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.52, 0]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#164e63"
          emissiveIntensity={dimmed ? 0.15 : 0.4}
          metalness={0.7}
          roughness={0.35}
          wireframe
        />
      </mesh>
    </group>
  );
}
