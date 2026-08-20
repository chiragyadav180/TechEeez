"use client";

import { useReducedMotion } from "framer-motion";
import type { Service } from "@/lib/services";
import { ThreeCanvas } from "@/components/three/three-canvas";
import { ServicesBackdrop } from "@/components/three/services-backdrop";
import { ServicesScene } from "@/components/three/services-scene";

type ServicesSceneCanvasProps = {
  service: Service;
  reducedMotion: boolean;
  burstKey?: number;
};

export function ServicesSceneCanvas({
  service,
  reducedMotion,
  burstKey = 1,
}: ServicesSceneCanvasProps) {
  const reduceHook = useReducedMotion();
  const reduce = reducedMotion || !!reduceHook;

  if (reduce) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${service.accent}2e, transparent 55%)`,
        }}
      />
    );
  }

  return (
    <ThreeCanvas className="absolute inset-0" cameraPosition={[0, 0.22, 4.9]}>
      <ServicesScene
        service={service}
        reducedMotion={reduce}
        burstKey={burstKey}
      />
    </ThreeCanvas>
  );
}

type ServicesBackdropCanvasProps = {
  accent: string;
  reducedMotion: boolean;
};

export function ServicesBackdropCanvas({
  accent,
  reducedMotion,
}: ServicesBackdropCanvasProps) {
  const reduceHook = useReducedMotion();
  const reduce = reducedMotion || !!reduceHook;

  if (reduce) {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${accent}24, transparent 52%)`,
        }}
      />
    );
  }

  return (
    <ThreeCanvas
      className="pointer-events-none absolute inset-0"
      cameraPosition={[0, 0.2, 6.4]}
    >
      <ServicesBackdrop accent={accent} reducedMotion={reduce} />
    </ThreeCanvas>
  );
}
