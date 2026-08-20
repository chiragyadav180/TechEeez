"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { HeroBuildOverlay } from "@/components/sections/hero-build-overlay";
import { HeroLiveDemo } from "@/components/sections/hero-live-demo";
import type { Service } from "@/lib/services";
import { serviceImagePath } from "@/lib/services";

type HeroServiceStageProps = {
  service: Service | null;
  burstKey: number;
  tapKey: number;
  reducedMotion: boolean;
  onInteract: () => void;
  onHoverChange?: (hovered: boolean) => void;
  children: ReactNode;
};

export function HeroServiceStage({
  service,
  burstKey,
  tapKey,
  reducedMotion,
  onInteract,
  onHoverChange,
  children,
}: HeroServiceStageProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 18 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const glareX = useTransform(springX, [-0.5, 0.5], [22, 78]);
  const glareY = useTransform(springY, [-0.5, 0.5], [22, 78]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent 42%)`;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={onMove}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
        onHoverChange?.(false);
      }}
      className="relative mx-auto h-full w-full min-h-[220px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {children}
      </div>
      {service ? (
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 42%, ${service.accent}28, transparent 58%)`,
          }}
        />
      ) : null}

      <AnimatePresence mode="wait">
        {service ? (
          <motion.button
            key={service.slug}
            type="button"
            aria-label={`Interact with ${service.title} live demo`}
            onClick={onInteract}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={
              reducedMotion
                ? undefined
                : { rotateX, rotateY, transformPerspective: 900 }
            }
            className="absolute inset-[6%] overflow-hidden rounded-[24px] text-left"
          >
            <div
              className={`absolute inset-0 ${
                reducedMotion ? "opacity-30" : "opacity-10"
              }`}
            >
              <Image
                src={serviceImagePath(service.slug)}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover"
              />
            </div>

            <HeroBuildOverlay
              service={service}
              reducedMotion={reducedMotion}
              playKey={burstKey}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reducedMotion ? 0 : 0.8, duration: 0.4 }}
              className="absolute inset-0 z-[2]"
            >
              <HeroLiveDemo
                service={service}
                reducedMotion={reducedMotion}
                tapKey={tapKey}
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{ background: glare }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: `inset 0 0 70px ${service.accent}33` }}
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-[#08090A]/95 via-[#08090A]/55 to-transparent p-3 md:p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                {service.title} · live product
              </p>
              <p className="mt-1 line-clamp-1 text-xs text-white/75">
                {service.shortDescription}
              </p>
            </div>
          </motion.button>
        ) : (
          <motion.p
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-6 bottom-6 text-center text-xs text-white/45"
          >
            Capabilities play live on a 5-second loop.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
