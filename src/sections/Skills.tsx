import { motion } from "framer-motion";
import { skillGroups } from "../data/content";
import Reveal from "../components/Reveal";
import { stagger, fadeUp } from "../lib/motion";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="shell relative z-10">
        <Reveal className="mb-16 max-w-2xl">
          <span className="eyebrow mb-5">The Arsenal</span>
          <h2 className="font-display text-giant leading-[0.9] font-semibold tracking-tight">
            What I build
            <br />
            <span className="font-serif italic font-normal text-bone-dim">
              with.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-bone-dim">
            The tools, languages, and frameworks currently in rotation. No bars,
            no percentages — just what I reach for.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={fadeUp}
              className="flex flex-col gap-5 bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-widest text-ember">
                  {group.label}
                </span>
              </div>
              <h3 className="font-display text-2xl font-medium">
                {group.title}
              </h3>
              <ul className="mt-1 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
