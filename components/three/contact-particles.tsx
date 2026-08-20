"use client";

import { ThreeCanvas } from "@/components/three/three-canvas";
import { ParticleField } from "@/components/three/particle-field";

export function ContactParticles() {
  return (
    <ThreeCanvas className="absolute inset-0" cameraPosition={[0, 0, 5]}>
      <ParticleField count={70} radius={5.5} speed={0.04} color="#67e8f9" />
    </ThreeCanvas>
  );
}
