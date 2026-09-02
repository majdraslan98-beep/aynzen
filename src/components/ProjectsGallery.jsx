import { useEffect, useRef } from 'react'
import projects from '../data/projects'

// As a project's sticky wrapper slides from the bottom of the viewport
// (top === viewport height) up to fully pinned (top === 0), its inner
// media travels from translateY(-PARALLAX_RATIO * viewportHeight) to
// translateY(0) — linear, tied 1:1 to scroll. The reference's own measured
// ratio (0.5556) requires oversizing the video ~56% beyond the frame for
// object-cover to have travel room, which crops far more of the footage
// than the reference's own source clips (shot with slack for exactly this)
// tolerate on ours. Toned down so the depth motion stays but the crop is
// much closer to a normal object-cover fit.
const PARALLAX_RATIO = 0.35

/**
 * Reproduces the reference's project scroll interaction: each project is a
 * native `position: sticky` full-viewport section (no JS pin needed) —
 * later projects sit later in the DOM, so as one slides up it visually
 * covers the still-pinned previous project underneath, which never moves.
 * Depth comes from the inner media's own scroll-linked parallax.
 *
 * The title lives INSIDE each project's own box, not a separate overlay —
 * re-verified directly against the reference:
 *  - Mid-gallery swaps (project 2 through 6) really are a hard z-index cut:
 *    the whole incoming box, title included, covers the whole outgoing box
 *    at once. No separate title-only mechanism exists.
 *  - The LAST project's title does NOT hard-cut into anything — nothing
 *    covers it, so once it un-sticks it just scrolls away naturally with
 *    the page (confirmed by screenshot: its title rides up off the top of
 *    the screen while the next section's content is already visible below
 *    it). A title that lives inside the project's own scrolling box gets
 *    this for free; a separately-pinned overlay cannot represent it at all.
 *  - The FIRST project's title only becomes visible once the hero and logo
 *    marquee have fully cleared it (confirmed: at a scroll position where
 *    project 1's video already fills most of the screen, its title is
 *    still hidden behind the still-visible hero info bar + marquee).
 *    That's just Hero/LogoStrip painting above project 1 — see the z-index
 *    on those components — not something the title needs its own logic for.
 */
export default function ProjectsGallery() {
  const sectionRefs = useRef([])
  const mediaRefs = useRef([])

  // Stable per-index ref callbacks, created once. Inline arrow-function refs
  // (`ref={(el) => ...}`) are a *new* function on every render, so React
  // nulls-then-reattaches all of them on every re-render, which can race
  // against a scroll event reading them mid-reattach.
  const sectionRefCallbacks = useRef(
    projects.map((_, i) => (el) => {
      sectionRefs.current[i] = el
    }),
  ).current
  const mediaRefCallbacks = useRef(
    projects.map((_, i) => (el) => {
      mediaRefs.current[i] = el
    }),
  ).current

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      sectionRefs.current.forEach((section, i) => {
        const media = mediaRefs.current[i]
        if (!section || !media) return
        const top = section.getBoundingClientRect().top
        const clamped = Math.min(Math.max(top, 0), vh)
        media.style.transform = `translateY(${-PARALLAX_RATIO * clamped}px)`
      })
    }
    update()
    // Scroll-driven, not a per-frame ticker: recomputing bounding-rects and
    // writing transforms on every animation frame regardless of whether the
    // page is even scrolling forces constant layout thrashing sitewide,
    // which shows up as visible micro-stutter. Only recompute when
    // scroll/viewport actually changes.
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video')
          if (!video) return
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        })
      },
      { threshold: 0.15 },
    )
    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative bg-ink">
      {projects.map((p, i) => (
        <div
          key={p.id}
          ref={sectionRefCallbacks[i]}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ zIndex: i + 1 }}
        >
          <div
            ref={mediaRefCallbacks[i]}
            className="absolute inset-x-0 top-0 will-change-transform"
            style={{ height: 'calc(100% + 35vh)', background: p.gradient }}
          >
            {p.video ? (
              <video
                className="h-full w-full object-cover"
                src={p.video}
                muted
                loop
                playsInline
                preload="metadata"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <span className="absolute right-4 top-24 font-sans text-[10px] uppercase tracking-[0.1em] text-white/25 tablet:right-6">
                Aerial footage placeholder
              </span>
            )}
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 50% at 50% 55%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)' }}
          />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h3 className="font-display text-5xl uppercase leading-none text-white tablet:text-7xl desktop:text-8xl">
              {p.name}
            </h3>
            <span className="mt-4 font-sans text-sm text-white tablet:text-base">
              {p.year} · {p.category}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}
