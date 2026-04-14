import { useCursor } from '../hooks/useCursor'

export default function Cursor() {
  const { dotRef, ringRef } = useCursor()

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(211, 188, 249, 0.9)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.15s ease, opacity 0.15s ease',
          willChange: 'left, top, transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(211, 188, 249, 0.3)',
          background: 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'transform 0.3s ease, opacity 0.15s ease',
          willChange: 'left, top, transform',
        }}
      />
    </>
  )
}
