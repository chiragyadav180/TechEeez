"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type PerspectiveGridProps = {
  reducedMotion?: boolean;
  color?: string;
};

export function PerspectiveGrid({
  reducedMotion = false,
  color = "#67e8f9",
}: PerspectiveGridProps) {
  const group = useRef<THREE.Group>(null);
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);
  const target = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    mats.current.forEach((mat) => mat?.color.lerp(target, 0.07));
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime * 0.55;
    group.current.position.z = (t % 2.4) - 1.2;
  });

  return (
    <group ref={group} position={[0, -1.85, 0]}>
      {[0, -6, -12].map((z, index) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0.4, 0, z]}>
          <planeGeometry args={[22, 6, 36, 10]} />
          <meshBasicMaterial
            ref={(el) => {
              if (el) mats.current[index] = el;
            }}
            color={color}
            wireframe
            transparent
            opacity={0.13}
          />
        </mesh>
      ))}
    </group>
  );
}
