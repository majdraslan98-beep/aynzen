import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const REPEAT_COUNT = 8

export default function LogoMarquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 26,
      ease: 'none',
      repeat: -1,
    })
    return () => tween.kill()
  }, [])

  const set = [...Array(REPEAT_COUNT * 2)]

  return (
    <div className="w-full overflow-hidden">
      <div ref={trackRef} className="flex w-max items-center gap-16 tablet:gap-20">
        {set.map((_, i) => (
          <img
            key={i}
            src="/Company logo/Company logo.png"
            alt="AYNZEN"
            className="h-9 w-auto shrink-0 object-contain tablet:h-10"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ))}
      </div>
    </div>
  )
}
