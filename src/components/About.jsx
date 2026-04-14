import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { about } from '../data/content'

function Terminal({ lines }) {
  const ref = useInView(useRef(null), { once: true, margin: '-100px' })
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })
  const [visibleCount, setVisibleCount] = useState(0)
  const [typedLines, setTypedLines] = useState([])
  const [currentChar, setCurrentChar] = useState(0)
  const [phase, setPhase] = useState('cmd')  // 'cmd' | 'out' | 'next'

  useEffect(() => {
    if (!inView) return
    if (visibleCount >= lines.length) return

    const current = lines[visibleCount]
    const currentText = phase === 'cmd' ? current.cmd : current.out

    if (currentChar < currentText.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), phase === 'cmd' ? 45 : 18)
      return () => clearTimeout(t)
    }

    if (phase === 'cmd') {
      const t = setTimeout(() => { setPhase('out'); setCurrentChar(0) }, 200)
      return () => clearTimeout(t)
    }

    // after 'out' finishes, commit line and move to next
    const t = setTimeout(() => {
      setTypedLines((prev) => [...prev, current])
      setVisibleCount((v) => v + 1)
      setCurrentChar(0)
      setPhase('cmd')
    }, 150)
    return () => clearTimeout(t)
  }, [inView, visibleCount, currentChar, phase, lines])

  const currentLine = visibleCount < lines.length ? lines[visibleCount] : null

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        background: '#1c1a24',
        borderRadius: '0.75rem',
        borderTop: '1px solid rgba(211,188,249,0.1)',
        boxShadow: '0 20px 40px -10px rgba(35,16,67,0.3)',
      }}
    >
      {/* Top Bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(73,69,78,0.2)', background: 'rgba(15,13,22,0.5)' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        <span
          className="ml-3 font-['JetBrains_Mono'] text-[#cbc4cf]/50"
          style={{ fontSize: '0.7rem' }}
        >
          bash ~ /home/eduard
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-['JetBrains_Mono'] space-y-2 min-h-[300px]" style={{ fontSize: '0.8rem' }}>
        {/* Committed lines */}
        {typedLines.map((line, i) => (
          <div key={i}>
            <div className="text-[#d3bcf9]">{line.cmd}</div>
            <div className="text-[#cbc4cf] ml-2 whitespace-pre-wrap" style={{ lineHeight: 1.6 }}>
              → {line.out}
            </div>
          </div>
        ))}

        {/* Currently typing */}
        {currentLine && (
          <div>
            <div className="text-[#d3bcf9]">
              {phase === 'cmd' ? currentLine.cmd.slice(0, currentChar) : currentLine.cmd}
              {phase === 'cmd' && <span className="animate-blink">▋</span>}
            </div>
            {phase === 'out' && (
              <div className="text-[#cbc4cf] ml-2">
                → {currentLine.out.slice(0, currentChar)}
                <span className="animate-blink">▋</span>
              </div>
            )}
          </div>
        )}

        {/* Idle blinking cursor */}
        {visibleCount >= lines.length && (
          <div className="text-[#d3bcf9]">
            $ <span className="animate-blink">▋</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 md:py-48"
      style={{ background: '#14121b' }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span
              className="block text-[#d3bcf9] mb-5 font-['Space_Grotesk']"
              style={{ fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
            >
              {about.label}
            </span>

            <h2
              className="font-['Space_Grotesk'] font-bold tracking-tight text-[#e6e0ee] mb-10"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              {about.h2.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>

            <div className="space-y-6">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-['Noto_Serif'] text-[#cbc4cf] leading-[1.7] text-base md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Terminal ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Terminal lines={about.terminal} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
