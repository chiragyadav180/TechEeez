"use client";

import { Line, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Service } from "@/lib/services";

type VisualProps = {
  reducedMotion?: boolean;
  accent?: string;
  burstKey?: number;
};

function useBuild(burstKey = 1, reducedMotion = false) {
  const progress = useRef(reducedMotion ? 1 : 0);
  const prevKey = useRef(burstKey);

  useEffect(() => {
    if (burstKey === prevKey.current) return;
    prevKey.current = burstKey;
    progress.current = reducedMotion ? 1 : 0;
  }, [burstKey, reducedMotion]);

  useFrame((_, delta) => {
    progress.current = Math.min(1, progress.current + delta / 1.05);
  });

  return progress;
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - THREE.MathUtils.clamp(t, 0, 1), 3);
}

function DataPulse({
  from,
  to,
  speed,
  delay,
  color,
  reducedMotion,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
  delay: number;
  color: string;
  reducedMotion?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current || reducedMotion) return;
    const t = (state.clock.elapsedTime * speed + delay) % 1;
    ref.current.position.lerpVectors(from, to, t);
    const pulse = 0.7 + Math.sin(t * Math.PI) * 0.6;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 10, 10]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

function ShowroomPlatform({
  accent = "#67e8f9",
  reducedMotion,
}: VisualProps) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ring.current || reducedMotion) return;
    ring.current.rotation.z += delta * 0.35;
  });

  return (
    <group position={[0, -1.18, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.42, 48]} />
        <meshStandardMaterial
          color="#0b1220"
          metalness={0.72}
          roughness={0.28}
          emissive={accent}
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh
        ref={ring}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.012, 0]}
      >
        <ringGeometry args={[1.26, 1.38, 64]} />
        <meshBasicMaterial color={accent} transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]}>
        <ringGeometry args={[0.22, 0.28, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function AiVisual({
  reducedMotion,
  accent = "#c4b5fd",
  burstKey,
}: VisualProps) {
  const core = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);
  const cards = useRef<(THREE.Mesh | null)[]>([]);
  const build = useBuild(burstKey, reducedMotion);

  const { nodes, links } = useMemo(() => {
    const layers = [-1.15, -0.38, 0.38, 1.15];
    const counts = [4, 6, 6, 3];
    const nodeList: THREE.Vector3[] = [];
    const ranges: [number, number][] = [];

    layers.forEach((x, layer) => {
      const count = counts[layer];
      const start = nodeList.length;
      for (let i = 0; i < count; i += 1) {
        const y = (i - (count - 1) / 2) * 0.38;
        nodeList.push(new THREE.Vector3(x, y + 0.12, Math.sin(i + layer) * 0.18));
      }
      ranges.push([start, nodeList.length]);
    });

    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    for (let layer = 0; layer < ranges.length - 1; layer += 1) {
      const [aStart, aEnd] = ranges[layer];
      const [bStart, bEnd] = ranges[layer + 1];
      for (let a = aStart; a < aEnd; a += 1) {
        for (let b = bStart; b < bEnd; b += 1) {
          if ((a + b) % 2 === 0 || b === bStart) {
            connections.push([nodeList[a], nodeList[b]]);
          }
        }
      }
    }

    return { nodes: nodeList, links: connections };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (group.current) {
      group.current.scale.setScalar(0.72 + p * 0.28);
      if (!reducedMotion) {
        group.current.rotation.y = Math.sin(t * 0.32) * 0.22;
      }
    }
    if (core.current && !reducedMotion) {
      const s = 1 + Math.sin(t * 2.4) * 0.1;
      core.current.scale.setScalar(s);
      core.current.rotation.y += delta * 0.7;
      core.current.rotation.x += delta * 0.18;
    }
    nodesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const wave = reducedMotion
        ? 1
        : 0.72 + (Math.sin(t * 3.2 - i * 0.45) + 1) * 0.22;
      mesh.scale.setScalar(wave);
    });
    cards.current.forEach((mesh, i) => {
      if (!mesh) return;
      const appear = easeOut(build.current * 1.4 - i * 0.18);
      mesh.scale.setScalar(appear);
      if (!reducedMotion) {
        mesh.position.y = 0.55 - i * 0.28 + Math.sin(t * 1.4 + i) * 0.04;
      }
    });
  });

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={group}>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.32, 1]} />
          <meshStandardMaterial
            color="#1e1b4b"
            emissive={accent}
            emissiveIntensity={0.95}
            metalness={0.35}
            roughness={0.2}
            wireframe
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.1}
            transparent
            opacity={0.55}
          />
        </mesh>
        {nodes.map((position, index) => (
          <mesh
            key={`ai-node-${index}`}
            ref={(el) => {
              nodesRef.current[index] = el;
            }}
            position={position}
          >
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.85}
            />
          </mesh>
        ))}
        {links.map(([start, end], index) => (
          <Line
            key={`ai-link-${index}`}
            points={[start, end]}
            color={accent}
            transparent
            opacity={0.28}
            lineWidth={1}
          />
        ))}
        {links.slice(0, 10).map(([start, end], index) => (
          <DataPulse
            key={`ai-pulse-${index}`}
            from={start}
            to={end}
            speed={0.35 + (index % 4) * 0.08}
            delay={index * 0.11}
            color={accent}
            reducedMotion={reducedMotion}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <mesh
            key={`ai-card-${i}`}
            ref={(el) => {
              cards.current[i] = el;
            }}
            position={[1.55, 0.5 - i * 0.28, 0.2]}
            rotation={[0, -0.35, 0]}
          >
            <planeGeometry args={[0.72, 0.2]} />
            <meshStandardMaterial
              color="#1e1b4b"
              emissive={accent}
              emissiveIntensity={0.35}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function WebVisual({
  reducedMotion,
  accent = "#67e8f9",
  burstKey,
}: VisualProps) {
  const laptop = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  const blocks = useRef<(THREE.Mesh | null)[]>([]);
  const cursor = useRef<THREE.Mesh>(null);
  const build = useBuild(burstKey, reducedMotion);

  const keys = useMemo(() => {
    const list: [number, number][] = [];
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 11; col += 1) {
        list.push([-0.75 + col * 0.15, 0.28 - row * 0.13]);
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (laptop.current) {
      laptop.current.scale.setScalar(0.78 + p * 0.22);
      if (!reducedMotion) {
        laptop.current.rotation.y = Math.sin(t * 0.4) * 0.18;
        laptop.current.rotation.x = Math.sin(t * 0.28) * 0.04 - 0.12;
      }
    }
    if (lid.current) {
      lid.current.rotation.x = THREE.MathUtils.lerp(Math.PI / 2.05, 0.16, p);
    }
    if (scan.current && !reducedMotion) {
      const y = ((t * 0.65) % 1.05) - 0.48;
      scan.current.position.y = y;
      const material = scan.current.material;
      if (!Array.isArray(material)) {
        material.opacity = 0.12 + Math.abs(Math.sin(t * 3)) * 0.22;
      }
    }
    blocks.current.forEach((mesh, i) => {
      if (!mesh) return;
      const appear = easeOut(build.current * 1.5 - 0.2 - i * 0.12);
      mesh.scale.y = appear;
      mesh.visible = appear > 0.04;
      if (!reducedMotion && appear > 0.9) {
        const breathe = 0.92 + Math.sin(t * 1.5 + i) * 0.08;
        mesh.scale.y = breathe;
      }
    });
    if (cursor.current && !reducedMotion) {
      cursor.current.position.x = -0.35 + Math.sin(t * 0.7) * 0.55;
      cursor.current.position.y = 0.1 + Math.cos(t * 0.9) * 0.28;
    }
  });

  const layout = [
    { pos: [-0.48, 0.16, 0.02] as const, size: [0.5, 0.72, 0.02] as const },
    { pos: [0.22, 0.32, 0.02] as const, size: [0.78, 0.38, 0.02] as const },
    { pos: [0.02, -0.14, 0.02] as const, size: [0.38, 0.38, 0.02] as const },
    { pos: [0.46, -0.14, 0.02] as const, size: [0.38, 0.38, 0.02] as const },
  ];

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={laptop} position={[0, -0.35, 0.15]}>
        <RoundedBox args={[2.15, 0.08, 1.45]} radius={0.04} smoothness={4}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.7}
            roughness={0.28}
          />
        </RoundedBox>
        <mesh position={[0, 0.05, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.42, 0.28]} />
          <meshStandardMaterial color="#0f172a" roughness={0.45} />
        </mesh>
        {keys.map(([x, z], i) => (
          <mesh
            key={`key-${i}`}
            position={[x, 0.055, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.11, 0.09]} />
            <meshStandardMaterial
              color={i % 7 === 0 ? accent : "#334155"}
              emissive={i % 7 === 0 ? accent : "#000000"}
              emissiveIntensity={i % 7 === 0 ? 0.35 : 0}
              metalness={0.2}
              roughness={0.5}
            />
          </mesh>
        ))}

        <group ref={lid} position={[0, 0.04, -0.68]} rotation={[reducedMotion ? 0.16 : Math.PI / 2.05, 0, 0]}>
          <group position={[0, 0.68, 0]}>
            <RoundedBox args={[2.12, 1.32, 0.07]} radius={0.04} smoothness={4}>
              <meshStandardMaterial
                color="#0b1220"
                metalness={0.65}
                roughness={0.3}
                emissive="#083344"
                emissiveIntensity={0.25}
              />
            </RoundedBox>
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[1.92, 1.12]} />
              <meshStandardMaterial
                color="#07111f"
                emissive="#082f49"
                emissiveIntensity={0.45}
              />
            </mesh>
            <mesh position={[0, 0.52, 0.041]}>
              <planeGeometry args={[1.92, 0.12]} />
              <meshBasicMaterial color="#155e75" />
            </mesh>
            {layout.map((block, i) => (
              <mesh
                key={i}
                ref={(el) => {
                  blocks.current[i] = el;
                }}
                position={block.pos}
              >
                <boxGeometry args={block.size} />
                <meshStandardMaterial
                  color={accent}
                  emissive={accent}
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            ))}
            <mesh ref={scan} position={[0, 0, 0.05]}>
              <planeGeometry args={[1.85, 0.035]} />
              <meshBasicMaterial color={accent} transparent opacity={0.35} />
            </mesh>
            <mesh
              ref={cursor}
              position={[0.2, 0.05, 0.055]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <coneGeometry args={[0.028, 0.08, 3]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function MobileVisual({
  reducedMotion,
  accent = "#5eead4",
  burstKey,
}: VisualProps) {
  const phone = useRef<THREE.Group>(null);
  const cards = useRef<(THREE.Mesh | null)[]>([]);
  const notify = useRef<THREE.Mesh>(null);
  const build = useBuild(burstKey, reducedMotion);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (phone.current) {
      phone.current.scale.setScalar(0.7 + p * 0.3);
      if (!reducedMotion) {
        phone.current.rotation.y = Math.sin(t * 0.48) * 0.38;
        phone.current.rotation.x = Math.sin(t * 0.32) * 0.1;
        phone.current.position.y = Math.sin(t * 1.1) * 0.05;
      }
    }
    cards.current.forEach((mesh, i) => {
      if (!mesh) return;
      const appear = easeOut(build.current * 1.4 - 0.15 * i);
      mesh.scale.setScalar(appear);
      if (!reducedMotion) {
        mesh.position.x = 0.05 + Math.sin(t * 1.15 + i) * 0.03;
      }
    });
    if (notify.current && !reducedMotion) {
      const cycle = (t * 0.35) % 1;
      notify.current.position.y = 0.52 - cycle * 0.15;
      notify.current.scale.setScalar(cycle < 0.75 ? 1 : 1 - (cycle - 0.75) * 4);
    }
  });

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={phone} position={[0, 0.05, 0]}>
        <RoundedBox args={[0.82, 1.62, 0.09]} radius={0.1} smoothness={6}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.82}
            roughness={0.18}
            emissive="#042f2e"
            emissiveIntensity={0.35}
          />
        </RoundedBox>
        <mesh position={[0, 0, 0.048]}>
          <planeGeometry args={[0.7, 1.42]} />
          <meshStandardMaterial
            color="#042f2e"
            emissive={accent}
            emissiveIntensity={0.28}
          />
        </mesh>
        <mesh position={[0, 0.72, 0.055]}>
          <capsuleGeometry args={[0.028, 0.16, 4, 8]} />
          <meshStandardMaterial color="#020617" metalness={0.9} roughness={0.2} />
        </mesh>
        <group position={[0.18, 0.58, 0.06]}>
          <RoundedBox args={[0.28, 0.28, 0.04]} radius={0.04} smoothness={4}>
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </RoundedBox>
          <mesh position={[-0.06, 0.04, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 20]} />
            <meshStandardMaterial
              color="#1e3a5f"
              metalness={0.9}
              roughness={0.12}
              emissive="#38bdf8"
              emissiveIntensity={0.2}
            />
          </mesh>
          <mesh position={[0.06, 0.04, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.028, 0.028, 0.018, 20]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        </group>
        <mesh position={[0.445, 0.28, 0]}>
          <boxGeometry args={[0.018, 0.16, 0.04]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.445, 0.08, 0]}>
          <boxGeometry args={[0.018, 0.1, 0.04]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {[0.42, 0.08, -0.26].map((y, i) => (
          <mesh
            key={i}
            ref={(el) => {
              cards.current[i] = el;
            }}
            position={[0, y, 0.055]}
          >
            <planeGeometry args={[0.58, 0.26]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={0.35}
              transparent
              opacity={0.55}
            />
          </mesh>
        ))}
        <mesh ref={notify} position={[0, 0.52, 0.06]}>
          <planeGeometry args={[0.58, 0.16]} />
          <meshStandardMaterial
            color="#ecfeff"
            emissive={accent}
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, -0.68, 0.055]}>
          <capsuleGeometry args={[0.012, 0.14, 4, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function CloudVisual({
  reducedMotion,
  accent = "#7dd3fc",
  burstKey,
}: VisualProps) {
  const group = useRef<THREE.Group>(null);
  const cloud = useRef<THREE.Group>(null);
  const leds = useRef<(THREE.Mesh | null)[]>([]);
  const instances = useRef<(THREE.Mesh | null)[]>([]);
  const build = useBuild(burstKey, reducedMotion);

  const streams = useMemo(
    () =>
      [-0.62, 0, 0.62].map((x) => ({
        from: new THREE.Vector3(x, -0.42, 0.12),
        to: new THREE.Vector3(x * 0.35, 0.55, 0.05),
      })),
    [],
  );

  const puffs: [number, number, number, number][] = [
    [-0.48, 0.62, 0.08, 0.36],
    [0.02, 0.78, 0.02, 0.46],
    [0.5, 0.6, -0.1, 0.34],
    [-0.18, 0.52, -0.22, 0.28],
    [0.28, 0.5, 0.2, 0.26],
  ];

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (group.current) {
      group.current.scale.setScalar(0.8 + p * 0.2);
      if (!reducedMotion) group.current.rotation.y += delta * 0.12;
    }
    if (cloud.current && !reducedMotion) {
      cloud.current.position.y = Math.sin(t * 0.9) * 0.06;
      cloud.current.rotation.y += delta * 0.08;
    }
    leds.current.forEach((mesh, i) => {
      if (!mesh) return;
      const mat = mesh.material;
      if (Array.isArray(mat) || reducedMotion) return;
      const on = Math.sin(t * 6 + i * 0.7) > 0.15;
      mat.opacity = on ? 0.95 : 0.15;
    });
    instances.current.forEach((mesh, i) => {
      if (!mesh) return;
      const cycle = reducedMotion ? 1 : (Math.sin(t * 0.8 + i) + 1) / 2;
      mesh.scale.setScalar(0.45 + cycle * 0.55);
      mesh.position.y = -0.15 + cycle * 0.22;
    });
  });

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={group}>
        <group ref={cloud}>
          {puffs.map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[r, 20, 20]} />
              <meshStandardMaterial
                color={accent}
                emissive="#0c4a6e"
                emissiveIntensity={0.5}
                transparent
                opacity={0.62}
                roughness={0.55}
              />
            </mesh>
          ))}
        </group>
        {[-0.62, 0, 0.62].map((x, rack) => (
          <group key={`rack-${rack}`} position={[x, -0.52, 0]}>
            <RoundedBox args={[0.42, 0.78, 0.42]} radius={0.03} smoothness={3}>
              <meshStandardMaterial
                color="#0f172a"
                metalness={0.6}
                roughness={0.32}
                emissive={accent}
                emissiveIntensity={0.12}
              />
            </RoundedBox>
            {Array.from({ length: 8 }).map((_, row) => (
              <mesh
                key={`led-${rack}-${row}`}
                ref={(el) => {
                  leds.current[rack * 8 + row] = el;
                }}
                position={[0.12, 0.28 - row * 0.08, 0.22]}
              >
                <boxGeometry args={[0.12, 0.03, 0.02]} />
                <meshBasicMaterial
                  color={row % 2 === 0 ? accent : "#86efac"}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            ))}
          </group>
        ))}
        {[-0.9, 0.9].map((x, i) => (
          <mesh
            key={`instance-${i}`}
            ref={(el) => {
              instances.current[i] = el;
            }}
            position={[x, -0.05, -0.45]}
          >
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial
              color="#082f49"
              emissive={accent}
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
        {streams.map((stream, i) => (
          <DataPulse
            key={`cloud-pulse-${i}`}
            from={stream.from}
            to={stream.to}
            speed={0.45}
            delay={i * 0.28}
            color={accent}
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </group>
  );
}

function AnalyticsVisual({
  reducedMotion,
  accent = "#86efac",
  burstKey,
}: VisualProps) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const group = useRef<THREE.Group>(null);
  const donut = useRef<THREE.Mesh>(null);
  const kpis = useRef<(THREE.Mesh | null)[]>([]);
  const build = useBuild(burstKey, reducedMotion);

  const points = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const x = -1.05 + i * 0.3;
      const y = Math.sin(i * 0.9) * 0.45 + 0.35;
      return new THREE.Vector3(x, y, 0.28);
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (group.current) {
      group.current.scale.setScalar(0.82 + p * 0.18);
      if (!reducedMotion) {
        group.current.rotation.y = Math.sin(t * 0.38) * 0.22;
      }
    }
    bars.current.forEach((mesh, i) => {
      if (!mesh) return;
      const live = reducedMotion
        ? 0.7 + i * 0.08
        : 0.45 + ((Math.sin(t * 1.55 + i) + 1) / 2) * 1.15;
      const h = live * p;
      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, Math.max(0.08, h), 0.1);
      mesh.position.y = mesh.scale.y / 2 - 0.55;
    });
    if (donut.current && !reducedMotion) {
      donut.current.rotation.z -= 0.01;
      donut.current.rotation.y = Math.sin(t * 0.6) * 0.2;
    }
    kpis.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.y = 0.72 + Math.sin(t * 1.2 + i) * 0.05;
      mesh.scale.setScalar(easeOut(build.current * 1.3 - i * 0.15));
    });
  });

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={group}>
        <RoundedBox
          args={[2.35, 1.55, 0.08]}
          radius={0.04}
          smoothness={3}
          position={[0, 0.12, -0.18]}
        >
          <meshStandardMaterial
            color="#0b1220"
            metalness={0.45}
            roughness={0.4}
            emissive="#14532d"
            emissiveIntensity={0.15}
          />
        </RoundedBox>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            ref={(el) => {
              bars.current[i] = el;
            }}
            position={[-0.95 + i * 0.28, 0, 0.05]}
          >
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshStandardMaterial
              color={accent}
              emissive="#14532d"
              emissiveIntensity={0.55}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
        <Line points={points} color="#ecfeff" lineWidth={2} />
        <mesh ref={donut} position={[1.15, 0.35, 0.2]} rotation={[0.4, -0.3, 0]}>
          <torusGeometry args={[0.28, 0.08, 12, 32]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.45}
            metalness={0.3}
            roughness={0.35}
          />
        </mesh>
        {[0, 1].map((i) => (
          <mesh
            key={`kpi-${i}`}
            ref={(el) => {
              kpis.current[i] = el;
            }}
            position={[-0.85 + i * 0.7, 0.72, 0.22]}
          >
            <planeGeometry args={[0.58, 0.22]} />
            <meshStandardMaterial
              color="#022c22"
              emissive={accent}
              emissiveIntensity={0.35}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function SecurityVisual({
  reducedMotion,
  accent = "#5eead4",
  burstKey,
}: VisualProps) {
  const shield = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const threats = useRef<(THREE.Mesh | null)[]>([]);
  const build = useBuild(burstKey, reducedMotion);

  const dirs = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(a) * 1.1,
          Math.sin(a * 1.3) * 0.7,
          Math.sin(a) * 1.1,
        ).normalize();
      }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (shield.current) {
      shield.current.scale.setScalar(0.65 + p * 0.35);
      if (!reducedMotion) shield.current.rotation.y += delta * 0.28;
    }
    if (ringA.current && !reducedMotion) ringA.current.rotation.z += delta * 0.55;
    if (ringB.current && !reducedMotion) ringB.current.rotation.x -= delta * 0.4;
    threats.current.forEach((mesh, i) => {
      if (!mesh || reducedMotion) return;
      const cycle = (t * (0.35 + (i % 4) * 0.08) + i * 0.13) % 1;
      const dist = 2.15 * (1 - cycle);
      mesh.position.copy(dirs[i]).multiplyScalar(Math.max(0.55, dist));
      const hitting = dist < 0.95;
      mesh.scale.setScalar(hitting ? Math.max(0, dist - 0.45) : 0.09);
    });
  });

  const shieldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.95);
    shape.bezierCurveTo(0.55, 0.75, 0.72, 0.35, 0.7, -0.05);
    shape.bezierCurveTo(0.62, -0.55, 0.28, -0.82, 0, -1.05);
    shape.bezierCurveTo(-0.28, -0.82, -0.62, -0.55, -0.7, -0.05);
    shape.bezierCurveTo(-0.72, 0.35, -0.55, 0.75, 0, 0.95);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
  }, []);

  useEffect(() => () => shieldGeometry.dispose(), [shieldGeometry]);

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={shield}>
        <mesh geometry={shieldGeometry} position={[0, 0, -0.06]}>
          <meshStandardMaterial
            color="#0f172a"
            emissive={accent}
            emissiveIntensity={0.55}
            metalness={0.7}
            roughness={0.22}
            transparent
            opacity={0.88}
          />
        </mesh>
        <mesh position={[0, -0.05, 0.16]}>
          <torusGeometry args={[0.16, 0.035, 10, 24]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.7}
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, -0.12, 0.16]}>
          <boxGeometry args={[0.05, 0.16, 0.04]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
        </mesh>
        <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.018, 8, 48]} />
          <meshBasicMaterial color={accent} transparent opacity={0.45} />
        </mesh>
        <mesh ref={ringB} rotation={[0.4, 0.2, 0]}>
          <torusGeometry args={[1.22, 0.012, 8, 48]} />
          <meshBasicMaterial color="#ecfeff" transparent opacity={0.28} />
        </mesh>
        {dirs.map((_, i) => (
          <mesh
            key={`threat-${i}`}
            ref={(el) => {
              threats.current[i] = el;
            }}
          >
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial
              color="#fb7185"
              emissive="#be123c"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function IntegrationVisual({
  reducedMotion,
  accent = "#94a3b8",
  burstKey,
}: VisualProps) {
  const group = useRef<THREE.Group>(null);
  const origin = useMemo(() => new THREE.Vector3(0, 0.05, 0), []);
  const boxes = useRef<(THREE.Mesh | null)[]>([]);
  const build = useBuild(burstKey, reducedMotion);

  const nodes = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * 1.18,
        Math.sin(angle * 1.15) * 0.42,
        Math.sin(angle) * 0.62,
      );
    });
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = easeOut(build.current);
    if (group.current) {
      group.current.scale.setScalar(0.78 + p * 0.22);
      if (!reducedMotion) {
        group.current.rotation.y += delta * 0.22;
        group.current.rotation.x = Math.sin(t * 0.35) * 0.08;
      }
    }
    boxes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 2.2 + i) * 0.06;
      mesh.scale.setScalar(pulse * easeOut(build.current * 1.2 - i * 0.08));
    });
  });

  return (
    <group>
      <ShowroomPlatform accent={accent} reducedMotion={reducedMotion} />
      <group ref={group}>
        <mesh position={origin.toArray()}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive="#67e8f9"
            emissiveIntensity={0.7}
            metalness={0.55}
            roughness={0.25}
          />
        </mesh>
        {nodes.map((position, i) => (
          <RoundedBox
            key={i}
            ref={(el) => {
              boxes.current[i] = el as THREE.Mesh | null;
            }}
            args={[0.32, 0.32, 0.32]}
            radius={0.04}
            smoothness={3}
            position={position}
          >
            <meshStandardMaterial
              color="#0f172a"
              emissive={accent}
              emissiveIntensity={0.4}
              metalness={0.55}
              roughness={0.3}
            />
          </RoundedBox>
        ))}
        {nodes.map((position, i) => (
          <Line
            key={`int-line-${i}`}
            points={[origin, position]}
            color="#67e8f9"
            transparent
            opacity={0.35}
            lineWidth={1.4}
          />
        ))}
        {nodes.map((position, i) => (
          <DataPulse
            key={`int-pulse-${i}`}
            from={origin}
            to={position}
            speed={0.38}
            delay={i * 0.14}
            color="#67e8f9"
            reducedMotion={reducedMotion}
          />
        ))}
      </group>
    </group>
  );
}

export function ServiceVisual({
  slug,
  reducedMotion = false,
  accent,
  burstKey = 1,
}: {
  slug: Service["slug"];
  reducedMotion?: boolean;
  accent?: string;
  burstKey?: number;
}) {
  const content = (() => {
    switch (slug) {
      case "ai-solutions":
        return (
          <AiVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
      case "web-development":
        return (
          <WebVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
      case "mobile-development":
        return (
          <MobileVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
      case "cloud-solutions":
        return (
          <CloudVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
      case "data-analytics":
        return (
          <AnalyticsVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
      case "cybersecurity":
        return (
          <SecurityVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
      case "system-integration":
      default:
        return (
          <IntegrationVisual
            reducedMotion={reducedMotion}
            accent={accent}
            burstKey={burstKey}
          />
        );
    }
  })();

  return <group>{content}</group>;
}
