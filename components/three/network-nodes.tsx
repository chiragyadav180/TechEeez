"use client";

import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type NetworkNodesProps = {
  nodeCount?: number;
  reducedMotion?: boolean;
  dimmed?: boolean;
};

export function NetworkNodes({
  nodeCount = 18,
  reducedMotion = false,
  dimmed = false,
}: NetworkNodesProps) {
  const group = useRef<THREE.Group>(null);
  const nodeGroup = useRef<THREE.Group>(null);

  const { nodes, connections } = useMemo(() => {
    const nodeList: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i += 1) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.45 + (i % 3) * 0.38;
      nodeList.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.4) * 0.9,
          Math.sin(angle) * radius * 0.55,
        ),
      );
    }

    const links: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodeList.length; i += 1) {
      const next = nodeList[(i + 1) % nodeList.length];
      const skip = nodeList[(i + 3) % nodeList.length];
      links.push([nodeList[i], next], [nodeList[i], skip]);
    }

    return { nodes: nodeList, connections: links };
  }, [nodeCount]);

  const pulses = useMemo(
    () =>
      connections.slice(0, 12).map(([start, end], i) => ({
        start,
        end,
        speed: 0.28 + (i % 5) * 0.07,
        delay: i * 0.09,
      })),
    [connections],
  );

  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.14;
    if (nodeGroup.current) {
      nodeGroup.current.children.forEach((child, i) => {
        const s = 1 + Math.sin(state.clock.elapsedTime * 2.4 + i) * 0.35;
        child.scale.setScalar(s);
      });
    }
    pulseRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = pulses[i];
      if (!pulse) return;
      const t = (state.clock.elapsedTime * pulse.speed + pulse.delay) % 1;
      mesh.position.lerpVectors(pulse.start, pulse.end, t);
    });
  });

  const opacity = dimmed ? 0.12 : 0.24;

  return (
    <group ref={group} scale={dimmed ? 1.25 : 1}>
      <group ref={nodeGroup}>
        {nodes.map((position, index) => (
          <mesh key={`node-${index}`} position={position}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial
              color="#a5f3fc"
              transparent
              opacity={dimmed ? 0.35 : 0.9}
            />
          </mesh>
        ))}
      </group>
      {connections.map(([start, end], index) => (
        <Line
          key={`line-${index}`}
          points={[start, end]}
          color="#67e8f9"
          transparent
          opacity={opacity}
          lineWidth={1}
        />
      ))}
      {pulses.map((pulse, index) => (
        <mesh
          key={`pulse-${index}`}
          ref={(el) => {
            pulseRefs.current[index] = el;
          }}
          position={pulse.start}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial
            color="#ecfeff"
            transparent
            opacity={dimmed ? 0.2 : 0.95}
          />
        </mesh>
      ))}
    </group>
  );
}
