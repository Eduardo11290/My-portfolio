import { useState } from "react";
import { motion } from "framer-motion";
import { profile, stats, aboutPhoto } from "../data/content";
import Reveal from "../components/Reveal";
import AnimatedText from "../components/AnimatedText";
import FloatingShape from "../components/FloatingShape";
import { stagger, fadeUp } from "../lib/motion";

export default function About() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      {/* On-brand generated 3D decor (parallax + float) */}
      <FloatingShape
        variant="ring"
        tint="iris"
        className="left-[1%] top-[7%] h-24 w-24 opacity-70 md:h-40 md:w-40"
        depth={70}
      />
      <FloatingShape
        variant="sphere"
        tint="ember"
        className="right-[3%] top-[5%] h-16 w-16 opacity-80 md:h-28 md:w-28"
        depth={95}
        delay={1}
      />
      <FloatingShape
        variant="sphere"
        tint="amber"
        className="bottom-[10%] left-[5%] h-12 w-12 opacity-70 md:h-20 md:w-20"
        depth={60}
        delay={0.5}
      />
      <FloatingShape
        variant="ring"
        tint="ember"
        className="bottom-[8%] right-[5%] h-20 w-20 opacity-60 md:h-32 md:w-32"
        depth={85}
        delay={1.5}
      />

      <div className="shell relative z-10">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left label + portrait */}
          <div className="md:col-span-4">
            <Reveal>
              <span className="eyebrow mb-6">About</span>
              <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-line bg-ink">
                {photoOk ? (
                  <>
                    {/* Heavily darkened portrait — barely visible by design */}
                    <img
                      src={aboutPhoto.src}
                      alt={aboutPhoto.alt}
                      onError={() => setPhotoOk(false)}
                      className="absolute inset-0 h-full w-full object-cover brightness-[0.5] contrast-[1.05] saturate-[0.85]"
                    />
                    {/* Extra vignette so I melt into the dark */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-ink)_95%)]" />
                  </>
                ) : (
                  // Fallback until the photo is added to /public
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-ink-raised via-ink-soft to-ink" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-ember/20 to-transparent" />
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-serif text-7xl italic text-bone/40">
                        {profile.name[0]}
                      </span>
                    </div>
                  </>
                )}
                <span className="absolute bottom-4 left-4 text-xs tracking-widest text-bone-dim">
                  {profile.location.toUpperCase()}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right copy */}
          <div className="md:col-span-8">
            <AnimatedText
              text={profile.about}
              className="font-display text-3xl leading-[1.3] font-medium tracking-tight md:text-[2.6rem]"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
                {profile.aboutSecondary}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bone-dim">
                {profile.aboutTertiary}
              </p>
            </Reveal>

            {/* Stats */}
            <motion.dl
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 sm:grid-cols-4"
            >
              {stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp}>
                  <dt className="font-display text-4xl font-semibold tracking-tight text-bone md:text-5xl">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-sm text-bone-faint">{s.label}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}
