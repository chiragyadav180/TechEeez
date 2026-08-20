"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

type ThreeCanvasProps = {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
};

export function ThreeCanvas({
  children,
  className = "absolute inset-0",
  cameraPosition = [0, 0, 6],
}: ThreeCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
