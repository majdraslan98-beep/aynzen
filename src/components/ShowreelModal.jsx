import { useCallback, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { getLenisInstance } from '../lib/lenisInstance'

// Vimeo's own embed code for this video (Share → Embed) — the generic
// /video/<id> URL without Vimeo's own query params and referrer policy
// 401'd; this is the exact one Vimeo issued, plus autoplay for the popup.
const VIMEO_EMBED_SRC =
  'https://player.vimeo.com/video/1222456350?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1'

export default function ShowreelModal({ open, onClose }) {
  const backdropRef = useRef(null)
  const frameRef = useRef(null)
  const closingRef = useRef(false)

  const handleClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    gsap.to(frameRef.current, { opacity: 0, scale: 0.96, duration: 0.25, ease: 'power2.in' })
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        document.body.style.overflow = ''
        getLenisInstance()?.start()
        onClose()
      },
    })
  }, [onClose])

  useEffect(() => {
    if (!open) return
    closingRef.current = false
    getLenisInstance()?.stop()
    document.body.style.overflow = 'hidden'

    gsap.set(backdropRef.current, { opacity: 0 })
    gsap.set(frameRef.current, { opacity: 0, scale: 0.94 })
    gsap.to(backdropRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
    gsap.to(frameRef.current, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', delay: 0.05 })

    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, handleClose])

  if (!open) return null

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm tablet:px-10"
    >
      <button
        type="button"
        aria-label="Close showreel"
        onClick={handleClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-200 hover:bg-white/10 tablet:right-6 tablet:top-6"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="1" y1="1" x2="17" y2="17" />
          <line x1="17" y1="1" x2="1" y2="17" />
        </svg>
      </button>

      <div
        ref={frameRef}
        onClick={(e) => e.stopPropagation()}
        className="overflow-hidden rounded-xl bg-black shadow-2xl"
        style={{
          // Fill as much of the viewport as possible while staying inside
          // it on both axes: whichever of "94% of width" or "the width a
          // 16:9 box would need to reach 90% of height" is smaller wins.
          width: 'min(94vw, calc(90vh * 16 / 9))',
          aspectRatio: '16 / 9',
        }}
      >
        <iframe
          title="AynZen ShowReel 2026"
          src={VIMEO_EMBED_SRC}
          className="h-full w-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}
