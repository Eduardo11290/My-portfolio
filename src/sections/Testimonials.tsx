import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TestimonialsColumn,
  type Testimonial,
} from "../components/ui/testimonials-columns-1";
import RecommendationModal from "../components/RecommendationModal";
import { getRecommendations } from "../api/recommendations";
import { easeOutExpo } from "../lib/motion";

export default function Testimonials() {
  const [cards, setCards] = useState<Testimonial[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const load = () => {
    getRecommendations()
      .then((items) =>
        setCards(
          items.map((r) => ({
            text: r.text,
            name: r.name,
            role: r.role,
            href: r.linkedIn ?? undefined,
          })),
        ),
      )
      .catch(() => setCards([]));
  };

  useEffect(() => {
    load();
  }, []);

  // Distribute across up to three scrolling columns.
  const cols: Testimonial[][] = [[], [], []];
  (cards ?? []).forEach((c, i) => cols[i % 3].push(c));
  const hasReviews = (cards?.length ?? 0) > 0;

  return (
    <section id="reviews" className="relative py-28 md:py-40">
      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[540px] flex-col items-center justify-center text-center"
        >
          <span className="eyebrow mb-5">Reviews</span>
          <h2 className="font-display text-giant leading-[0.9] font-semibold tracking-tight">
            What people
            <br />
            <span className="font-serif italic font-normal text-bone-dim">
              say.
            </span>
          </h2>
          <p className="mt-5 text-bone-dim">
            Words from people I've worked with.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
          >
            Leave a recommendation <span aria-hidden>→</span>
          </button>
        </motion.div>

        {hasReviews ? (
          <div className="mt-14 flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            {cols[0].length > 0 && (
              <TestimonialsColumn testimonials={cols[0]} duration={15} />
            )}
            {cols[1].length > 0 && (
              <TestimonialsColumn
                testimonials={cols[1]}
                className="hidden md:block"
                duration={19}
              />
            )}
            {cols[2].length > 0 && (
              <TestimonialsColumn
                testimonials={cols[2]}
                className="hidden lg:block"
                duration={17}
              />
            )}
          </div>
        ) : (
          cards !== null && (
            <div className="mx-auto mt-14 max-w-md rounded-2xl border border-line bg-ink-soft/60 p-10 text-center">
              <p className="text-bone-dim">
                No recommendations yet — be the first to leave one.
              </p>
            </div>
          )
        )}
      </div>

      <RecommendationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={load}
      />
    </section>
  );
}
