import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile, socials } from "../data/content";
import { lineReveal, easeOutExpo } from "../lib/motion";
import Magnetic from "../components/Magnetic";
import FloatingShape from "../components/FloatingShape";
import MountainBackdrop from "../components/MountainBackdrop";

const HEADLINE = ["FULL-STACK", "SOFTWARE", "ENGINEER"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: headline drifts up & fades as you scroll past.
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Distant on-brand mountains (atmospheric depth) */}
      <MountainBackdrop className="h-[82%]" />

      {/* Ambient gradient glow */}
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-ember/20 blur-[140px]"
      />
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-iris/15 blur-[130px]"
      />

      {/* On-brand floating 3D shapes (parallax) */}
      <FloatingShape
        variant="ring"
        tint="iris"
        className="right-[8%] top-[16%] h-20 w-20 opacity-60 md:h-36 md:w-36"
        depth={120}
        duration={11}
      />
      <FloatingShape
        variant="sphere"
        tint="amber"
        className="left-[4%] bottom-[12%] h-10 w-10 opacity-60 md:h-16 md:w-16"
        depth={90}
        delay={0.8}
        duration={8}
      />
      {/* Magnetic 3D sphere — follows the cursor on hover */}
      <Magnetic strength={0.8} className="absolute right-[6%] top-[42%] z-20 hidden md:block">
        <div
          aria-hidden
          className="relative h-24 w-24 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 26%, #ffd0bb, #ff5e3a 46%, #5e1607 100%)",
            boxShadow:
              "inset -8px -10px 26px rgba(0,0,0,0.55), inset 8px 10px 22px rgba(255,255,255,0.12), 0 36px 64px -22px rgba(255,94,58,0.4)",
          }}
        >
          <span className="absolute left-[20%] top-[16%] h-5 w-5 rounded-full bg-white/40 blur-md" />
        </div>
      </Magnetic>

      <div className="shell relative z-10">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: easeOutExpo }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <span className="eyebrow">{profile.role}</span>
          {profile.available && (
            <span className="inline-flex items-center gap-2 text-sm text-bone-dim">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </span>
          )}
        </motion.div>

        {/* Headline with per-line mask reveal */}
        <motion.h1
          style={{ y, opacity }}
          className="font-display text-mega leading-[0.85] font-semibold tracking-[-0.03em]"
        >
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "text-gradient italic font-serif font-normal" : ""}`}
                variants={lineReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 + i * 0.12, duration: 1, ease: easeOutExpo }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Bottom row: tagline + CTA + socials */}
        <div className="mt-12 flex flex-col gap-10 md:mt-16 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: easeOutExpo }}
            className="max-w-md text-lg leading-relaxed text-bone-dim"
          >
            {profile.tagline} I'm {profile.name}, a {profile.role.toLowerCase()}{" "}
            based in {profile.location}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: easeOutExpo }}
            className="flex flex-col items-start gap-6"
          >
            <Magnetic strength={0.5}>
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 text-sm font-medium transition-colors hover:border-ember hover:bg-ember/5"
              >
                View selected work
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ember text-ink transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </a>
            </Magnetic>

            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-bone-faint">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-widest text-bone-faint md:flex"
      >
        SCROLL
        <span className="h-10 w-px bg-gradient-to-b from-bone-faint to-transparent" />
      </motion.div>
    </section>
  );
}
