import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { projects, type Project } from "../data/content";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import ProjectModal from "../components/ProjectModal";

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="shell relative z-10">
        <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow mb-5">Selected Work</span>
            <h2 className="font-display text-giant leading-[0.9] font-semibold tracking-tight">
              Things I've
              <br />
              <span className="font-serif italic font-normal text-bone-dim">
                shipped.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-bone-dim">
            Production deployments, not tutorials. Each card stacks as you scroll.
          </p>
        </Reveal>
      </div>

      {/* Sticky-stacking cards */}
      <div ref={containerRef} className="relative">
        {projects.map((p, i) => {
          const targetScale = 1 - (projects.length - 1 - i) * 0.05;
          const range: [number, number] = [i * (1 / projects.length), 1];
          return (
            <StackCard
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              onOpen={() => setSelected(p)}
            />
          );
        })}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  range,
  targetScale,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onOpen: () => void;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-[clamp(1.25rem,4vw,4rem)]">
      <motion.div
        style={{ scale, top: index * 22 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-line bg-ink-raised shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="grid md:grid-cols-2">
          {/* Text column */}
          <div className="flex flex-col p-8 md:p-12">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-ember">
                0{index + 1} <span className="text-bone-faint">/ 0{total}</span>
              </span>
              <span className="text-xs tracking-widest text-bone-faint uppercase">
                {project.category} · {project.year}
              </span>
            </div>

            <h3 className="mt-8 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              {project.title}
            </h3>
            <p className="mt-5 leading-relaxed text-bone-dim">
              {project.summary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line px-3 py-1 text-xs text-bone-dim"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <button
                type="button"
                onClick={onOpen}
                className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
              >
                Case study <span aria-hidden>→</span>
              </button>
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
                >
                  Live demo <span aria-hidden>↗</span>
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
                >
                  GitHub <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="relative min-h-[240px] p-6 md:min-h-full">
            <Tilt max={10} className="group h-full">
              {project.image ? (
              <div className="relative flex flex-col h-full w-full overflow-hidden rounded-2xl bg-ink-raised">
                <div className="flex-1 w-full h-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain bg-black/20" 
                  />
                </div>
              </div>
            ) : (
              <div className={`relative flex h-full min-h-[200px] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-7`}>
                
                  <span
                    className="font-display text-[7rem] leading-none font-bold text-ink/15"
                    style={{ transform: "translateZ(60px)" }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className="absolute right-6 top-6 font-display text-lg font-medium text-ink/80"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {project.title}
                  </span>
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                </div>
              )}
            </Tilt>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
