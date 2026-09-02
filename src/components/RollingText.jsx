import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Reproduces the reference site's per-character "rolling" text component:
 * a text-shadow duplicate one line-height below the real glyphs, clipped
 * by an overflow:hidden wrapper sized to one line, so a translateY on
 * hover rolls the old line out while the duplicate rolls in underneath.
 */
export default function RollingText({
  text,
  as: Tag = 'span',
  className = '',
  lineHeight = '1.1em',
  hover = true,
  onHoverRef,
}) {
  const lineRef = useRef(null)
  const chars = [...text]

  useEffect(() => {
    if (!hover || !lineRef.current) return
    const el = lineRef.current.parentElement
    const line = lineRef.current
    const enter = () => gsap.to(line, { yPercent: -100, duration: 0.5, ease: 'power3.out' })
    const leave = () => gsap.to(line, { yPercent: 0, duration: 0.5, ease: 'power3.out' })
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mouseenter', enter)
      el.removeEventListener('mouseleave', leave)
    }
  }, [hover])

  return (
    <Tag
      ref={onHoverRef}
      className={`inline-flex shrink-0 overflow-hidden align-top ${className}`}
      style={{ height: lineHeight, lineHeight }}
      aria-label={text}
    >
      <span ref={lineRef} className="flex" style={{ willChange: 'transform' }} aria-hidden="true">
        {chars.map((c, i) => (
          <span
            key={i}
            className="block shrink-0 whitespace-pre"
            style={{ textShadow: `0 ${lineHeight} 0 currentColor`, lineHeight }}
          >
            {c}
          </span>
        ))}
      </span>
    </Tag>
  )
}
