"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Service } from "@/lib/services";
import { AccentAtmosphere } from "./accent-atmosphere";
import { ParticleField } from "./particle-field";
import { PerspectiveGrid } from "./perspective-grid";
import { ServiceVisual } from "./service-visuals";

type ServicesSceneProps = {
  service: Service;
  reducedMotion?: boolean;
  burstKey?: number;
};

export function ServicesScene({
  service,
  reducedMotion = false,
  burstKey = 1,
}: ServicesSceneProps) {
  const field = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const targetColor = useMemo(
    () => new THREE.Color(service.accent),
    [service.accent],
  );

  useFrame((state, delta) => {
    if (light.current) light.current.color.lerp(targetColor, 0.08);
    if (!field.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    field.current.rotation.y += delta * 0.05;
    field.current.rotation.x = Math.sin(t * 0.2) * 0.06;
  });

  return (
    <group>
      <hemisphereLight args={["#e2e8f0", "#0b1220", 0.52]} />
      <ambientLight intensity={0.4} />
      <spotLight
        position={[2.4, 3.4, 3.2]}
        angle={0.5}
        penumbra={0.6}
        intensity={1.25}
        color={service.accent}
      />
      <pointLight
        ref={light}
        position={[2.5, 2, 3]}
        intensity={0.85}
        color={service.accent}
      />
      <pointLight position={[-2.2, -0.8, 1.6]} intensity={0.32} color="#94a3b8" />
      <group ref={field}>
        <AccentAtmosphere
          accent={service.accent}
          reducedMotion={reducedMotion}
          scale={0.92}
        />
        <ParticleField
          count={64}
          radius={3.6}
          reducedMotion={reducedMotion}
          speed={0.07}
          color={service.accent}
        />
        <PerspectiveGrid reducedMotion={reducedMotion} color={service.accent} />
      </group>
      <Float
        speed={reducedMotion ? 0 : 1.05}
        rotationIntensity={reducedMotion ? 0 : 0.12}
        floatIntensity={reducedMotion ? 0 : 0.2}
      >
        <ServiceVisual
          slug={service.slug}
          reducedMotion={reducedMotion}
          accent={service.accent}
          burstKey={burstKey}
        />
      </Float>
    </group>
  );
}
