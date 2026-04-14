import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, GitBranch, Link2, Copy, Check } from 'lucide-react'
import { contact } from '../data/content'

const ICON_MAP = { Mail, Github: GitBranch, Linkedin: Link2 }

function ContactLink({ link, index }) {
  const Icon = ICON_MAP[link.icon]
  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="flex items-center gap-3 font-['Space_Grotesk'] font-bold uppercase text-[#d3bcf9] transition-all duration-200"
      style={{
        border: '1px solid rgba(73,69,78,0.5)',
        padding: '0.9rem 2rem',
        borderRadius: '9999px',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(45,27,77,0.25)'
        e.currentTarget.style.textShadow = '0 0 8px rgba(211,188,249,0.4)'
        e.currentTarget.style.borderColor = 'rgba(211,188,249,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.textShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(73,69,78,0.5)'
      }}
    >
      {Icon && <Icon size={16} strokeWidth={1.5} />}
      {link.label}
    </motion.a>
  )
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // fallback: just follow the mailto link
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <motion.button
      onClick={handleCopy}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0 }}
      className="flex items-center gap-3 font-['Space_Grotesk'] font-bold uppercase transition-all duration-200"
      style={{
        background: copied
          ? 'linear-gradient(135deg, #4ade80, #22c55e)'
          : 'linear-gradient(135deg, #d3bcf9, #d3beeb)',
        color: copied ? '#14121b' : '#382759',
        padding: '0.9rem 2rem',
        borderRadius: '9999px',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        border: 'none',
        cursor: 'pointer',
        boxShadow: copied
          ? '0 0 24px rgba(74,222,128,0.25)'
          : '0 0 24px rgba(211,188,249,0.15)',
        transition: 'all 0.3s ease',
      }}
    >
      {copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={1.5} />}
      {copied ? 'Copied!' : `Copy Email`}
    </motion.button>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 md:py-48 text-center"
      style={{ background: '#0f0d16' }}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="block text-[#d3bcf9] mb-5 font-['Space_Grotesk']"
            style={{ fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            {contact.label}
          </span>

          <h2
            className="font-['Space_Grotesk'] font-bold text-[#e6e0ee] mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            {contact.h2}
          </h2>

          <p
            className="font-['Noto_Serif'] text-[#cbc4cf] leading-[1.7] mx-auto mb-14"
            style={{ maxWidth: '520px', fontSize: '1rem' }}
          >
            {contact.subtitle}
          </p>

          {/* Copy email pill — primary action */}
          <div className="flex flex-wrap justify-center gap-4 mb-5">
            <CopyEmailButton />
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4">
            {contact.links
              .filter((l) => l.icon !== 'Mail')
              .map((link, i) => (
                <ContactLink key={link.label} link={link} index={i + 1} />
              ))}
            {/* Email as regular ghost link too */}
            <ContactLink
              link={{ label: 'Email', href: `mailto:${contact.email}`, icon: 'Mail' }}
              index={0}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
