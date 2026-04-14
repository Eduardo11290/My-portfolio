import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { hero } from '../data/content'

const TYPING_LINES = [
  'React · Django · ASP.NET Core',
  'Docker · Vercel · Linux',
  'Clean code. Real deployments.',
]

function useTypingCycle() {
  const [lineIndex, setLineIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIdx,   setCharIdx]   = useState(0)
  const [deleting,  setDeleting]  = useState(false)

  useEffect(() => {
    const current = TYPING_LINES[lineIndex]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((i) => i + 1), 55)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((i) => i - 1), 30)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setLineIndex((i) => (i + 1) % TYPING_LINES.length)
    }

    setDisplayed(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, lineIndex])

  return displayed
}

export default function Hero() {
  const typedText = useTypingCycle()
  const [loaded, setLoaded] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: '#14121b' }}
    >
      {/* Nebula BG */}
      <div
        className="absolute inset-0 pointer-events-none animate-drift"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, rgba(211, 188, 249, 0.08) 0%, transparent 60%), radial-gradient(circle at 15% 70%, rgba(82, 66, 103, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">

          {/* ── Left Column ── */}
          <div className="lg:col-span-8">

            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="block text-[#d3bcf9] mb-5 font-['Space_Grotesk']"
              style={{
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
              }}
            >
              {hero.label}
            </motion.span>

            {/* H1 — Glitch reveal */}
            <h1
              className="font-['Space_Grotesk'] font-bold tracking-tighter text-[#e6e0ee] mb-8"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
              }}
            >
              {hero.h1.map((line, i) => (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, y: 20, filter: 'brightness(0.5)' }}
                  animate={loaded ? {
                    opacity: [0, 0.8, 0.6, 1, 0.85, 1],
                    y: 0,
                    filter: ['brightness(0.5)', 'brightness(1.4)', 'brightness(0.8)', 'brightness(1.3)', 'brightness(1)', 'brightness(1)'],
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
                >
                  {i === 1 ? (
                    <>
                      <span className="text-[#d3bcf9] italic font-light" style={{ filter: 'drop-shadow(0 0 15px rgba(211,188,249,0.35))' }}>
                        {line}
                      </span>
                    </>
                  ) : line}
                </motion.span>
              ))}
            </h1>

            {/* Typing Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="mb-5 h-6"
            >
              <span className="font-['Space_Grotesk'] text-[#d3bcf9]/70 text-sm tracking-wider">
                {typedText}
                <span className="animate-blink ml-[2px] text-[#d3bcf9]">|</span>
              </span>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-['Noto_Serif'] text-base md:text-lg text-[#cbc4cf] leading-[1.7] mb-10 max-w-2xl"
            >
              {hero.body}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link
                to={hero.cta.to}
                smooth
                duration={600}
                offset={-80}
                style={{ cursor: 'pointer' }}
              >
                <button
                  className="font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs active:scale-95 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #d3bcf9, #d3beeb)',
                    color: '#382759',
                    padding: '1.1rem 2.25rem',
                    borderRadius: '0.25rem',
                    boxShadow: '0 0 30px rgba(211, 188, 249, 0.2)',
                    letterSpacing: '0.1em',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(0.97)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1';   e.currentTarget.style.transform = 'scale(1)' }}
                >
                  {hero.cta.label}
                </button>
              </Link>
            </motion.div>

            {/* Currently Widget */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.25 }}
              className="mt-6 inline-flex items-center gap-3"
              style={{
                background: 'rgba(28,26,36,0.7)',
                border: '1px solid rgba(73,69,78,0.35)',
                borderRadius: '9999px',
                padding: '0.55rem 1.1rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="relative flex items-center justify-center" style={{ width: '10px', height: '10px' }}>
                <span
                  className="absolute inline-flex rounded-full animate-ping"
                  style={{ width: '10px', height: '10px', background: 'rgba(74,222,128,0.5)' }}
                />
                <span
                  className="relative inline-flex rounded-full"
                  style={{ width: '7px', height: '7px', background: '#4ade80' }}
                />
              </span>
              <span
                className="font-['Space_Grotesk'] text-[#cbc4cf]"
                style={{ fontSize: '0.7rem', letterSpacing: '0.03em' }}
              >
                {hero.currently}
              </span>
            </motion.div>
          </div>

          {/* ── Right Column — Visual Card ── */}
          <motion.div
            className="lg:col-span-4 flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full max-w-[400px]">
              {/* Glow behind card */}
              <div
                className="absolute -z-10 inset-0 blur-[80px] rounded-full"
                style={{ background: 'rgba(211,188,249,0.06)', transform: 'scale(1.4)' }}
              />

              {/* Card */}
              <div
                className="relative overflow-hidden"
                style={{
                  background: '#1c1a24',
                  borderRadius: '1rem',
                  borderTop: '1px solid rgba(211,188,249,0.1)',
                  minHeight: '360px',
                }}
              >
                {/* Nebula canvas */}
                <div
                  className="absolute inset-0 animate-drift"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(211,188,249,0.18) 0%, transparent 55%), radial-gradient(circle at 75% 70%, rgba(82,66,103,0.35) 0%, transparent 55%), radial-gradient(circle at 55% 10%, rgba(45,27,77,0.3) 0%, transparent 40%)',
                  }}
                />

                {/* Abstract Geometric Lines */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 400 360"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="200" cy="180" r="120" stroke="rgba(211,188,249,0.3)" strokeWidth="0.5" />
                  <circle cx="200" cy="180" r="80"  stroke="rgba(211,188,249,0.2)" strokeWidth="0.5" />
                  <circle cx="200" cy="180" r="40"  stroke="rgba(211,188,249,0.15)" strokeWidth="0.5" />
                  <line x1="80"  y1="180" x2="320" y2="180" stroke="rgba(211,188,249,0.15)" strokeWidth="0.5" />
                  <line x1="200" y1="60"  x2="200" y2="300" stroke="rgba(211,188,249,0.15)" strokeWidth="0.5" />
                  <line x1="115" y1="95"  x2="285" y2="265" stroke="rgba(211,188,249,0.1)"  strokeWidth="0.5" />
                  <line x1="285" y1="95"  x2="115" y2="265" stroke="rgba(211,188,249,0.1)"  strokeWidth="0.5" />
                  <circle cx="200" cy="180" r="8" fill="rgba(211,188,249,0.4)" />
                  <circle cx="200" cy="180" r="3" fill="rgba(211,188,249,0.9)" />
                </svg>

                {/* Gradient fade bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2"
                  style={{ background: 'linear-gradient(to top, #14121b, transparent)' }}
                />

                {/* Stats Overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 p-6"
                  style={{
                    background: 'rgba(54,51,62,0.25)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    borderTop: '1px solid rgba(73,69,78,0.2)',
                  }}
                >
                  {hero.stats.map((stat, i) => (
                    <div key={i}>
                      {i > 0 && (
                        <div
                          className="my-3"
                          style={{ height: '1px', background: 'rgba(73,69,78,0.2)' }}
                        />
                      )}
                      <div className="flex justify-between items-baseline">
                        <span
                          className="text-[#d3bcf9] font-['Space_Grotesk']"
                          style={{ fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
                        >
                          {stat.label}
                        </span>
                        <span className="font-['Space_Grotesk'] text-xl font-bold text-[#e6e0ee]">
                          {stat.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        <span className="font-['Space_Grotesk'] text-[#e6e0ee]" style={{ fontSize: '0.5rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#d3bcf9]/40 to-transparent" />
      </motion.div>
    </section>
  )
}
