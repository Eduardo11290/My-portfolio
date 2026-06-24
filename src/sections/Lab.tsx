import { motion } from "framer-motion";
import { sideProjects } from "../data/content";
import Reveal from "../components/Reveal";
import { stagger, fadeUp } from "../lib/motion";

export default function Lab() {
  return (
    <section id="lab" className="relative py-28 md:py-40">
      <div className="shell relative z-10">
        <Reveal className="mb-16 max-w-2xl">
          <span className="eyebrow mb-5">The Lab</span>
          <h2 className="font-display text-giant leading-[0.9] font-semibold tracking-tight">
            Where it
            <br />
            <span className="font-serif italic font-normal text-bone-dim">
              started.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone-dim">
            Before software pulled me in, I was making games — hand-wiring game
            loops, collision and sprites with nothing but a blank file. These are
            the experiments that got me hooked on building.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
        >
          {sideProjects.map((p, i) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              className="group flex flex-col gap-4 bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-ember">
                  ▶ 0{i + 1}
                </span>
                <span className="font-mono text-[0.65rem] tracking-widest text-bone-faint uppercase">
                  Game
                </span>
              </div>
              <h3 className="font-display text-2xl font-medium">{p.title}</h3>
              <p className="leading-relaxed text-bone-dim">{p.blurb}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-xs text-bone-dim transition-colors group-hover:border-ember/40"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
