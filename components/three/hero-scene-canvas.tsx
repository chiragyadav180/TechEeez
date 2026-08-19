"use client";

import { useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/services";
import { ThreeCanvas } from "@/components/three/three-canvas";
import { HeroScene } from "@/components/three/hero-scene";

type HeroSceneCanvasProps = {
  scrollProgress: number;
  reducedMotion: boolean;
  accent?: string;
  serviceSlug?: Service["slug"];
  burstKey?: number;
};

export function HeroSceneCanvas({
  scrollProgress,
  reducedMotion,
  accent = "#67e8f9",
  serviceSlug,
  burstKey = 1,
}: HeroSceneCanvasProps) {
  const reduceHook = useReducedMotion();
  const reduce = reducedMotion || !!reduceHook;

  if (reduce) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${accent}33, transparent 55%)`,
        }}
      />
    );
  }

  return (
    <ThreeCanvas className="absolute inset-0" cameraPosition={[0, 0.35, 5.2]}>
      <HeroScene
        scrollProgress={scrollProgress}
        reducedMotion={reduce}
        accent={accent}
        serviceSlug={serviceSlug}
        burstKey={burstKey}
      />
    </ThreeCanvas>
  );
}
