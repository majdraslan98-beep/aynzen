import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Matches the reference site's load-in on every major section:
 * opacity 0.001 -> 1, translateY -34px -> 0.
 * `immediate` sections (nav/hero) animate on mount; others animate the
 * first time they scroll into view.
 */
export default function useAppear({ immediate = false, delay = 0, stagger = 0 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = stagger ? el.children : el
    gsap.set(targets, { opacity: 0.001, y: 34 })

    const anim = () =>
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        stagger,
        ease: 'power3.out',
      })

    if (immediate) {
      anim()
      return
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      once: true,
      onEnter: anim,
    })
    return () => st.kill()
  }, [immediate, delay, stagger])

  return ref
}
