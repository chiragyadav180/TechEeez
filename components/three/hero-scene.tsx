"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import type { Service } from "@/lib/services";
import { ParticleField } from "./particle-field";
import { PerspectiveGrid } from "./perspective-grid";
import { ServiceVisual } from "./service-visuals";

type HeroSceneProps = {
  scrollProgress?: number;
  reducedMotion?: boolean;
  accent?: string;
  serviceSlug?: Service["slug"];
  burstKey?: number;
};

function subscribeWidth(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getParticleBudget() {
  if (typeof window === "undefined") return 90;
  const width = window.innerWidth;
  if (width < 640) return 40;
  if (width < 1024) return 70;
  return 90;
}

function useParticleBudget() {
  return useSyncExternalStore(subscribeWidth, getParticleBudget, () => 90);
}

export function HeroScene({
  scrollProgress = 0,
  reducedMotion = false,
  accent = "#67e8f9",
  serviceSlug,
  burstKey = 1,
}: HeroSceneProps) {
  const root = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const spot = useRef<THREE.SpotLight>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const particleCount = useParticleBudget();
  const targetColor = useMemo(() => new THREE.Color(accent), [accent]);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  const targetScale = useMemo(
    () => 1 - Math.min(0.12, scrollProgress * 0.16),
    [scrollProgress],
  );

  useFrame((state) => {
    if (!root.current) return;
    if (!reducedMotion) {
      root.current.rotation.y = THREE.MathUtils.lerp(
        root.current.rotation.y,
        mouse.current.x * 0.18,
        0.045,
      );
      root.current.rotation.x = THREE.MathUtils.lerp(
        root.current.rotation.x,
        mouse.current.y * -0.1,
        0.045,
      );
    }
    root.current.position.z = THREE.MathUtils.lerp(
      root.current.position.z,
      scrollProgress * 0.8,
      0.08,
    );
    root.current.scale.setScalar(
      THREE.MathUtils.lerp(root.current.scale.x, targetScale, 0.08),
    );
    if (light.current) {
      light.current.color.lerp(targetColor, 0.06);
    }
    if (spot.current) {
      spot.current.color.lerp(targetColor, 0.06);
      if (!reducedMotion) {
        const t = state.clock.elapsedTime;
        spot.current.position.x = 2.2 + Math.sin(t * 0.4) * 0.4;
      }
    }
  });

  return (
    <group ref={root}>
      <hemisphereLight args={["#e2e8f0", "#0b1220", 0.55]} />
      <ambientLight intensity={0.42} />
      <spotLight
        ref={spot}
        position={[2.2, 3.2, 3.4]}
        angle={0.55}
        penumbra={0.65}
        intensity={1.35}
        color={accent}
      />
      <pointLight
        ref={light}
        position={[2, 1.6, 3]}
        intensity={0.7}
        color={accent}
      />
      <pointLight position={[-2.2, -0.6, 2]} intensity={0.28} color="#94a3b8" />
      <ParticleField
        count={particleCount}
        reducedMotion={reducedMotion}
        radius={3.6}
        speed={0.12}
        color={accent}
      />
      <PerspectiveGrid reducedMotion={reducedMotion} color={accent} />
      {serviceSlug ? (
        <group position={[0, 0.08, 0]} scale={0.92}>
          <ServiceVisual
            slug={serviceSlug}
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        </group>
      ) : null}
    </group>
  );
}
