import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/content'

function Badge({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="lavender-halo flex items-center gap-2 px-4 py-2 font-['Space_Grotesk'] text-[#c4b0dd] text-sm transition-all duration-200"
      style={{
        background: '#524267',
        borderRadius: '9999px',
        userSelect: 'none',
        cursor: 'default',
      }}
      data-cursor-hover
    >
      {item.icon && (
        <img
          src={item.icon}
          alt={item.name}
          width={16}
          height={16}
          className="object-contain opacity-90"
          style={{ filter: 'brightness(1.1)' }}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      )}
      <span>{item.name}</span>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      id="skills"
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
          className="mb-20"
        >
          <span
            className="block text-[#d3bcf9] mb-4 font-['Space_Grotesk']"
            style={{ fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            {skills.label}
          </span>
          <h2
            className="font-['Space_Grotesk'] font-bold text-[#e6e0ee]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
          >
            {skills.h2}
          </h2>
        </motion.div>

        {/* Groups */}
        <div className="space-y-16">
          {skills.groups.map((group, gi) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <h3
                className="font-['Space_Grotesk'] text-[#e6e0ee]/50 mb-6 uppercase"
                style={{ fontSize: '0.625rem', letterSpacing: '0.35em' }}
              >
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, ii) => (
                  <Badge key={item.name} item={item} index={ii} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
