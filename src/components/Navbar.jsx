import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'
import { nav } from '../data/content'

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeLink,  setActiveLink]  = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const linkStyle = (to) =>
    `font-['Space_Grotesk'] text-sm tracking-tight transition-all duration-300 relative group ${
      activeLink === to
        ? 'text-[#d3bcf9]'
        : 'text-[#e6e0ee]/60 hover:text-[#e6e0ee]'
    }`

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 tonal-shift-no-borders"
        style={{
          background: scrolled ? 'rgba(28, 26, 36, 0.90)' : 'rgba(28, 26, 36, 0.70)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 0 40px rgba(35, 16, 67, 0.15)',
          transition: 'background 0.3s ease',
        }}
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-5 max-w-[1920px] mx-auto">
          {/* Brand */}
          <Link
            to="home"
            smooth duration={600}
            className="text-xl font-bold tracking-tighter text-[#e6e0ee] font-['Space_Grotesk'] cursor-pointer select-none"
          >
            Eduard Stefoni
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {nav.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={600}
                spy
                offset={-80}
                onSetActive={() => setActiveLink(link.to)}
                className={linkStyle(link.to)}
                style={{ cursor: 'pointer' }}
              >
                {link.label}
                {activeLink === link.to && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full"
                    style={{ background: '#d3bcf9' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#e6e0ee]/70 hover:text-[#d3bcf9] transition-colors p-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen
              ? <X size={22} strokeWidth={1.5} />
              : <Menu size={22} strokeWidth={1.5} />
            }
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-x-0 top-[65px] z-40 md:hidden transition-all duration-300 ease-out overflow-hidden"
        style={{
          maxHeight: mobileOpen ? '400px' : '0px',
          background: 'rgba(28, 26, 36, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="flex flex-col px-6 py-6 gap-6">
          {nav.links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={600}
              offset={-80}
              onClick={() => setMobileOpen(false)}
              className={`font-['Space_Grotesk'] text-base tracking-tight transition-colors duration-200 ${
                activeLink === link.to ? 'text-[#d3bcf9]' : 'text-[#e6e0ee]/70'
              }`}
              style={{ cursor: 'pointer' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
