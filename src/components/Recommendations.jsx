import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-scroll'
import { MessageSquareDashed } from 'lucide-react'
import { recommendations } from '../data/content'

export default function Recommendations() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const { placeholder } = recommendations

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-32 md:py-48"
      style={{ background: '#14121b' }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="block text-[#d3bcf9] mb-4 font-['Space_Grotesk']"
            style={{ fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            {recommendations.label}
          </span>
          <h2
            className="font-['Space_Grotesk'] font-bold text-[#e6e0ee]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            Recommendations
          </h2>
        </motion.div>

        {/* Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto text-center"
          style={{ maxWidth: '560px' }}
        >
          <div
            style={{
              background: '#1c1a24',
              borderRadius: '0.75rem',
              borderTop: '1px solid rgba(211,188,249,0.1)',
              padding: '3.5rem 2.5rem',
            }}
          >
            {/* Icon */}
            <div
              className="mx-auto mb-6 flex items-center justify-center rounded-xl"
              style={{
                width: '64px',
                height: '64px',
                background: 'rgba(45,27,77,0.5)',
                borderTop: '1px solid rgba(211,188,249,0.15)',
              }}
            >
              <MessageSquareDashed size={30} strokeWidth={1.5} color="#d3bcf9" />
            </div>

            {/* Terminal-style label */}
            <span
              className="block font-['Space_Grotesk'] text-[#d3bcf9] mb-4"
              style={{ fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}
            >
              Status
            </span>

            <h3
              className="font-['Space_Grotesk'] font-bold text-[#e6e0ee] mb-4"
              style={{ fontSize: '1.3rem', letterSpacing: '-0.01em' }}
            >
              {placeholder.title}
            </h3>

            <p
              className="font-['Noto_Serif'] text-[#cbc4cf] leading-[1.7] mb-8"
              style={{ fontSize: '0.95rem' }}
            >
              {placeholder.message}
            </p>

            <Link to={placeholder.cta.to} smooth duration={600} offset={-80} style={{ cursor: 'pointer' }}>
              <button
                className="font-['Space_Grotesk'] font-bold uppercase tracking-widest text-xs text-[#d3bcf9] transition-all duration-200"
                style={{
                  border: '1px solid rgba(73,69,78,0.5)',
                  background: 'transparent',
                  padding: '0.8rem 1.75rem',
                  borderRadius: '0.25rem',
                  letterSpacing: '0.1em',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(45,27,77,0.2)'; e.currentTarget.style.textShadow = '0 0 8px rgba(211,188,249,0.4)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.textShadow = 'none' }}
              >
                {placeholder.cta.label}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
