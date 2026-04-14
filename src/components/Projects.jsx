import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, GitBranch, ShieldCheck } from 'lucide-react'
import { projects } from '../data/content'

function TechBadge({ label }) {
  return (
    <span
      className="font-['Space_Grotesk'] text-[#c4b0dd] px-3 py-1"
      style={{
        background: 'rgba(82,66,103,0.5)',
        borderRadius: '9999px',
        fontSize: '0.65rem',
        letterSpacing: '0.05em',
      }}
    >
      {label}
    </span>
  )
}

function FeaturedCard({ project, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay }}
      className="relative overflow-hidden group md:col-span-12"
      style={{
        background: '#1c1a24',
        borderRadius: '1rem',
        borderTop: '1px solid rgba(211,188,249,0.15)',
        boxShadow: hovered ? '0 0 70px rgba(211,188,249,0.12)' : 'none',
        transition: 'box-shadow 0.5s ease',
        cursor: 'pointer',
        minHeight: '420px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-transform duration-1000"
        style={{
          background: project.gradient,
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }}
      />

      {/* Lock/Shield SVG Art */}
      <svg
        className="absolute right-0 top-0 h-full opacity-20 pointer-events-none"
        viewBox="0 0 600 420"
        fill="none"
        style={{ width: '50%' }}
      >
        <circle cx="450" cy="210" r="200" stroke="rgba(211,188,249,0.2)" strokeWidth="0.8" />
        <circle cx="450" cy="210" r="140" stroke="rgba(211,188,249,0.15)" strokeWidth="0.6" />
        <circle cx="450" cy="210" r="80"  stroke="rgba(211,188,249,0.12)" strokeWidth="0.6" />
        <path d="M380 195 Q380 160 450 160 Q520 160 520 195 L520 270 Q520 290 500 290 L400 290 Q380 290 380 270 Z"
              fill="rgba(211,188,249,0.06)" stroke="rgba(211,188,249,0.2)" strokeWidth="1" />
        <rect x="430" y="235" width="40" height="30" rx="4"
              fill="rgba(211,188,249,0.1)" stroke="rgba(211,188,249,0.25)" strokeWidth="1" />
        <circle cx="450" cy="248" r="5" fill="rgba(211,188,249,0.5)" />
        <line x1="200" y1="210" x2="370" y2="210" stroke="rgba(211,188,249,0.1)" strokeDasharray="6 4" strokeWidth="0.8" />
        <line x1="450" y1="50"  x2="450" y2="150" stroke="rgba(211,188,249,0.1)" strokeDasharray="6 4" strokeWidth="0.8" />
      </svg>

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to right, rgba(20,18,27,0.98) 0%, rgba(20,18,27,0.7) 55%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full p-10 md:p-14" style={{ maxWidth: '660px' }}>
        {/* Featured badge */}
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck size={14} strokeWidth={1.5} color="#4ade80" />
          <span
            className="font-['Space_Grotesk'] text-[#4ade80]"
            style={{ fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}
          >
            Featured · Security & Backend
          </span>
        </div>

        <span
          className="block text-[#d3bcf9] mb-3 font-['Space_Grotesk']"
          style={{ fontSize: '0.625rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
        >
          {project.number}
        </span>

        <h3
          className="font-['Space_Grotesk'] font-bold text-[#e6e0ee] mb-5 transition-transform duration-300"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {project.title}
        </h3>

        <p
          className="font-['Noto_Serif'] text-[#cbc4cf] leading-[1.75] mb-6"
          style={{ fontSize: '1rem', maxWidth: '520px' }}
        >
          {project.description}
        </p>

        {/* Tech highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
          {[
            { label: 'AES-256-GCM', sub: 'Encryption at rest' },
            { label: 'MFA (TOTP) + JWT', sub: 'Authentication' },
            { label: 'Burn-after-reading', sub: 'Sharing protocol' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: 'rgba(45,27,77,0.35)',
                borderRadius: '0.5rem',
                borderTop: '1px solid rgba(211,188,249,0.1)',
                padding: '0.75rem 1rem',
              }}
            >
              <div className="font-['Space_Grotesk'] font-bold text-[#d3bcf9]" style={{ fontSize: '0.75rem' }}>
                {item.label}
              </div>
              <div className="font-['Space_Grotesk'] text-[#cbc4cf]" style={{ fontSize: '0.65rem', letterSpacing: '0.03em' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-7">
          {project.badges.map((b) => <TechBadge key={b} label={b} />)}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.github}
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
            <GitBranch size={12} strokeWidth={2} />
            View on GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false)
  const isLarge = project.size === 'large'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
      className={`relative overflow-hidden group transition-all duration-500 ${
        isLarge ? 'md:col-span-8' : 'md:col-span-4'
      }`}
      style={{
        background: '#1c1a24',
        borderRadius: '0.75rem',
        borderTop: '1px solid rgba(211,188,249,0.1)',
        boxShadow: hovered ? '0 0 50px rgba(211,188,249,0.1)' : 'none',
        transition: 'box-shadow 0.5s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Background Gradient Visual */}
      <div
        className="transition-transform duration-1000"
        style={{
          background: project.gradient,
          minHeight: isLarge ? '340px' : '400px',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        {/* Geometric decoration */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {isLarge ? (
            <>
              <circle cx="600" cy="200" r="180" stroke="rgba(211,188,249,0.15)" strokeWidth="0.8" />
              <circle cx="600" cy="200" r="100" stroke="rgba(211,188,249,0.1)" strokeWidth="0.6" />
              <line x1="400" y1="0" x2="800" y2="400" stroke="rgba(211,188,249,0.08)" strokeWidth="0.6" />
              <line x1="800" y1="0" x2="400" y2="400" stroke="rgba(211,188,249,0.08)" strokeWidth="0.6" />
              <path d="M350 260 Q450 200 600 220 Q700 230 750 260 L750 300 L350 300 Z"
                    fill="rgba(211,188,249,0.06)" stroke="rgba(211,188,249,0.15)" strokeWidth="0.8" />
              <path d="M420 260 Q480 215 580 225 Q650 232 700 260"
                    stroke="rgba(211,188,249,0.2)" strokeWidth="1" fill="none" />
            </>
          ) : (
            <>
              <circle cx="200" cy="200" r="140" stroke="rgba(211,188,249,0.12)" strokeWidth="0.8" />
              <circle cx="200" cy="200" r="80"  stroke="rgba(211,188,249,0.08)" strokeWidth="0.6" />
              <path d="M50 280 Q150 220 250 240 Q320 252 380 280 L380 340 L50 340 Z"
                    fill="rgba(211,188,249,0.05)" stroke="rgba(211,188,249,0.12)" strokeWidth="0.8" />
            </>
          )}
        </svg>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(20,18,27,0.95) 0%, rgba(20,18,27,0.4) 40%, transparent 100%)',
          opacity: hovered ? 0.85 : 0.95,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span
          className="block text-[#d3bcf9] mb-3 font-['Space_Grotesk']"
          style={{ fontSize: '0.625rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
        >
          {project.number}
        </span>

        <h3
          className="font-['Space_Grotesk'] font-bold text-[#e6e0ee] mb-3 transition-transform duration-300"
          style={{
            fontSize: isLarge ? 'clamp(1.75rem, 3vw, 2.5rem)' : '1.75rem',
            letterSpacing: '-0.02em',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          }}
        >
          {project.title}
        </h3>

        {/* Description — revealed on hover */}
        <motion.p
          className="font-['Noto_Serif'] text-[#cbc4cf] text-sm leading-relaxed mb-5"
          style={{ maxWidth: isLarge ? '520px' : '100%' }}
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 16,
          }}
          transition={{ duration: 0.4 }}
        >
          {project.description}
        </motion.p>

        {/* Tech badges */}
        <motion.div
          className="flex flex-wrap gap-2 mb-5"
          animate={{ opacity: hovered ? 1 : 0.6, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.4 }}
        >
          {project.badges.map((b) => <TechBadge key={b} label={b} />)}
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex gap-4"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-['Space_Grotesk'] font-bold uppercase transition-all duration-200 hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, #d3bcf9, #d3beeb)',
              color: '#382759',
              padding: '0.6rem 1.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
            }}
          >
            <ExternalLink size={12} strokeWidth={2} />
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-['Space_Grotesk'] font-bold uppercase text-[#d3bcf9] transition-all duration-200 hover:bg-[#2d1b4d]/30"
            style={{
              border: '1px solid rgba(73,69,78,0.5)',
              padding: '0.6rem 1.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
            }}
          >
            <GitBranch size={12} strokeWidth={1.5} />
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={sectionRef} className="py-32 md:py-48" style={{ background: '#14121b' }}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span
              className="block text-[#d3bcf9] mb-4 font-['Space_Grotesk']"
              style={{ fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
            >
              Selected Works
            </span>
            <h2
              className="font-['Space_Grotesk'] font-bold text-[#e6e0ee]"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              Featured Projects
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-['Noto_Serif'] italic text-[#cbc4cf] max-w-xs text-base md:text-right"
          >
            "Every line of code is a decision. Every deployment is a statement."
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured card — full width */}
          {featured && <FeaturedCard project={featured} delay={0} />}

          {/* Standard cards */}
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
