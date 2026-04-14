import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import { certifications } from '../data/content'

export default function Certifications() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  const { card } = certifications

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-32 md:py-48"
      style={{ background: '#0f0d16' }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="block text-[#d3bcf9] mb-4 font-['Space_Grotesk']"
            style={{ fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            {certifications.label}
          </span>
          <h2
            className="font-['Space_Grotesk'] font-bold text-[#e6e0ee]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            {certifications.h2}
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto"
          style={{ maxWidth: '640px' }}
        >
          <div
            className="transition-all duration-300 cursor-default"
            style={{
              background: '#1c1a24',
              borderRadius: '0.75rem',
              borderTop: '1px solid rgba(211,188,249,0.1)',
              padding: '2.5rem',
              boxShadow: hovered ? '0 20px 40px -10px rgba(35,16,67,0.5)' : 'none',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            data-cursor-hover
          >
            {/* Icon + Title */}
            <div className="flex items-start gap-5 mb-6">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(45,27,77,0.5)',
                  borderTop: '1px solid rgba(211,188,249,0.15)',
                }}
              >
                <BadgeCheck size={28} strokeWidth={1.5} color="#d3bcf9" />
              </div>
              <div>
                <h3
                  className="font-['Space_Grotesk'] font-bold text-[#e6e0ee] mb-1"
                  style={{ fontSize: '1.25rem', letterSpacing: '-0.01em' }}
                >
                  {card.title}
                </h3>
                <p
                  className="font-['Space_Grotesk'] text-[#d3bcf9]"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}
                >
                  {card.issuer}
                </p>
              </div>
            </div>

            {/* Description */}
            <p
              className="font-['Noto_Serif'] text-[#cbc4cf] leading-[1.7] mb-8"
              style={{ fontSize: '0.95rem' }}
            >
              {card.description}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={card.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-['Space_Grotesk'] font-bold uppercase transition-all duration-200 hover:opacity-80"
                style={{
                  background: 'linear-gradient(135deg, #d3bcf9, #d3beeb)',
                  color: '#382759',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                }}
              >
                <ExternalLink size={12} strokeWidth={2} />
                View Credential
              </a>
              <a
                href={card.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-['Space_Grotesk'] font-bold uppercase text-[#d3bcf9] transition-all duration-200 hover:bg-[#2d1b4d]/30"
                style={{
                  border: '1px solid rgba(73,69,78,0.5)',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                }}
              >
                Credly Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
