"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { AccentAtmosphere } from "./accent-atmosphere";
import { ParticleField } from "./particle-field";
import { PerspectiveGrid } from "./perspective-grid";

type ServicesBackdropProps = {
  accent: string;
  reducedMotion?: boolean;
};

export function ServicesBackdrop({
  accent,
  reducedMotion = false,
}: ServicesBackdropProps) {
  const root = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const fill = useRef<THREE.PointLight>(null);
  const target = useMemo(() => new THREE.Color(accent), [accent]);

  useFrame((state, delta) => {
    if (fill.current) fill.current.color.lerp(target, 0.07);
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = t * 0.05;
      root.current.rotation.x = Math.sin(t * 0.16) * 0.07;
      root.current.position.y = Math.sin(t * 0.22) * 0.1;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.12;
      core.current.rotation.z += delta * 0.05;
      const mat = core.current.material as THREE.MeshStandardMaterial;
      mat.emissive.lerp(target, 0.06);
    }
  });

  return (
    <group ref={root}>
      <ambientLight intensity={0.42} />
      <pointLight ref={fill} position={[-2.8, 1.4, 2.2]} intensity={0.45} color={accent} />
      <AccentAtmosphere accent={accent} reducedMotion={reducedMotion} scale={1.35} />
      <ParticleField
        count={72}
        radius={5.8}
        speed={0.045}
        color={accent}
        reducedMotion={reducedMotion}
      />
      <mesh ref={core} position={[1.6, 0.35, -1.4]}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#101115"
          emissive={accent}
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.28}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
      <PerspectiveGrid reducedMotion={reducedMotion} color={accent} />
    </group>
  );
}
