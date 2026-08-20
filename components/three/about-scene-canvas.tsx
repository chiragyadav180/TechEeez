"use client";

import { useReducedMotion } from "framer-motion";
import { ThreeCanvas } from "@/components/three/three-canvas";
import { NetworkNodes } from "@/components/three/network-nodes";
import { ParticleField } from "@/components/three/particle-field";

export function AboutSceneCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const reduceHook = useReducedMotion();
  const reduce = reducedMotion || !!reduceHook;

  if (reduce) {
    return (
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_60%)]" />
    );
  }

  return (
    <ThreeCanvas className="absolute inset-0" cameraPosition={[0, 0, 4.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={0.6} color="#67e8f9" />
      <NetworkNodes nodeCount={14} reducedMotion={reduce} />
      <ParticleField count={36} radius={2.8} reducedMotion={reduce} speed={0.06} />
    </ThreeCanvas>
  );
}
