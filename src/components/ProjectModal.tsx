import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../data/content";

/**
 * Case-study modal. Mounts only when open (clean unmount — no stuck overlay),
 * with a CSS keyframe entrance that holds its final state. Closes on Escape,
 * backdrop click, or the X.
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <button
        aria-label="Close case study"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        data-lenis-prevent
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-ink-soft sm:rounded-3xl"
      >
        {/* Header strip with the project's gradient */}
        <div
          className={`relative h-32 w-full bg-gradient-to-br ${project.gradient} sm:h-40`}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/40 text-bone backdrop-blur-md transition-colors hover:bg-ink/70"
          >
            ✕
          </button>
          <span className="absolute bottom-4 left-6 font-display text-7xl font-bold text-ink/20">
            {project.title}
          </span>
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs tracking-widest text-bone-faint uppercase">
            <span className="text-ember">{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h3>

          {/* Long-form case study */}
          <div className="mt-6 space-y-4 leading-relaxed text-bone-dim">
            {(project.description ?? [project.summary]).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* What I learned */}
          {project.learned && (
            <div className="mt-8 rounded-2xl border border-line bg-ink p-6">
              <p className="mb-2 text-xs tracking-widest text-ember uppercase">
                What I learned
              </p>
              <p className="leading-relaxed text-bone">{project.learned}</p>
            </div>
          )}

          {/* Stack */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-3 py-1 text-xs text-bone-dim"
              >
                {s}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
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
      </div>
    </div>,
    document.body,
  );
}
