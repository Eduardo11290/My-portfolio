import { footer } from '../data/content'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="py-12 px-6 md:px-12"
      style={{
        background: '#14121b',
        borderTop: '1px solid rgba(211,188,249,0.15)',
      }}
    >
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Copyright */}
        <p
          className="font-['Space_Grotesk'] text-[#e6e0ee]/40 uppercase"
          style={{ fontSize: '0.625rem', letterSpacing: '0.1em' }}
        >
          {footer.copy}
        </p>

        {/* Links */}
        <div className="flex gap-8">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Space_Grotesk'] text-[#e6e0ee]/40 uppercase transition-all duration-300"
              style={{ fontSize: '0.625rem', letterSpacing: '0.1em' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d3bcf9'
                e.currentTarget.style.textShadow = '0 0 8px rgba(211,188,249,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(230,224,238,0.4)'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
