import { lazy, Suspense } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePageViewTracking } from "./hooks/usePageViewTracking";

// Three.js is heavy — code-split it so it never blocks first paint.
const DottedSurface = lazy(() =>
  import("./components/ui/dotted-surface").then((m) => ({
    default: m.DottedSurface,
  })),
);

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Certifications from "./sections/Certifications";
import Lab from "./sections/Lab";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function App() {
  usePageViewTracking();

  return (
    <SmoothScroll>
      {/* Global animated background — sits behind everything (fixed, -z-1).
          Lazy-loaded so the Three.js bundle stays out of the critical path. */}
      <Suspense fallback={null}>
        <DottedSurface />
      </Suspense>

      <Loader />
      <div className="grain" aria-hidden />

      <Navbar />

      <main>
        <Hero />

        <Work />

        <About />
        <Skills />
        <Certifications />
        <Lab />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
