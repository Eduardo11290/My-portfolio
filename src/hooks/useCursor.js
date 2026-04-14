import { useEffect, useRef } from 'react'

/**
 * useCursor — tracks mouse position and drives lerp-based follower.
 * Returns refs for the dot and ring elements.
 */
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId  = null
    let isHovering = false
    let isClicking = false

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseEnter = () => {
      isHovering = true
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%, -50%) scale(2)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }

    const onMouseLeave = () => {
      isHovering = false
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%, -50%) scale(1)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    const onMouseDown = () => {
      isClicking = true
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%, -50%) scale(0.8)'
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%, -50%) scale(0.8)'
    }

    const onMouseUp = () => {
      isClicking = false
      if (dotRef.current)  dotRef.current.style.transform  = isHovering ? 'translate(-50%, -50%) scale(2)'   : 'translate(-50%, -50%) scale(1)'
      if (ringRef.current) ringRef.current.style.transform = isHovering ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)'
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      // Dot snaps to cursor exactly
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top  = mouseY + 'px'
      }

      // Ring lerps with lag (~100ms feel at 60fps → t ≈ 0.12)
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px'
        ringRef.current.style.top  = ringY + 'px'
      }

      rafId = requestAnimationFrame(animate)
    }

    // Add listeners to all interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [data-cursor-hover]')
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup',   onMouseUp)

    // Delay to let DOM render
    const timer = setTimeout(addHoverListeners, 500)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup',   onMouseUp)
      cancelAnimationFrame(rafId)
      clearTimeout(timer)
    }
  }, [])

  return { dotRef, ringRef }
}
