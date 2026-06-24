import { certifications } from "../data/content";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 md:py-40">
      <div className="shell relative z-10">
        <Reveal className="mb-16 max-w-2xl">
          <span className="eyebrow mb-5">Credentials</span>
          <h2 className="font-display text-giant leading-[0.9] font-semibold tracking-tight">
            Certified &
            <br />
            <span className="font-serif italic font-normal text-bone-dim">
              accountable.
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-6">
          {certifications.map((cert) => (
            <Reveal key={cert.title}>
              <article className="group grid gap-8 rounded-2xl border border-line bg-ink-soft/60 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-ember/40 md:grid-cols-12 md:p-12">
                <div className="md:col-span-5">
                  <span className="font-mono text-xs tracking-widest text-ember">
                    {cert.issuer}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                    {cert.title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-bone-dim">
                    {cert.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {cert.links.map((link) => (
                      <Magnetic key={link.url} strength={0.4}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className={
                            link.primary
                              ? "inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
                              : "inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
                          }
                        >
                          {link.label}
                          <span aria-hidden>↗</span>
                        </a>
                      </Magnetic>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-7">
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {cert.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm text-bone-dim"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
