import { useState } from 'react'
import { Link } from 'react-router-dom'
import RollingText from './RollingText'
import ShowreelModal from './ShowreelModal'
import useAppear from '../lib/useAppear'

// "anchor" links target a section on the homepage — using a plain <a> (not
// a router Link) means clicking one from another page does a real
// navigation back to "/" with the hash, which the browser resolves
// correctly; a client-side Link would need extra scroll-after-navigate
// wiring to do the same. "route" links are real pages. "modal" opens the
// showreel video overlay instead of navigating anywhere.
const LINKS = [
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Services', href: '/#about', type: 'anchor' },
  { label: 'Showreel', type: 'modal' },
  { label: "Let's talk", href: '/contact', type: 'route' },
]

function NavLink({ link, className, onClick, onOpenShowreel, children }) {
  if (link.type === 'modal') {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          onOpenShowreel()
          onClick?.()
        }}
      >
        {children}
      </button>
    )
  }
  if (link.type === 'route') {
    return (
      <Link to={link.href} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <a href={link.href} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

export default function Nav() {
  const ref = useAppear({ immediate: true })
  const [menuOpen, setMenuOpen] = useState(false)
  const [showreelOpen, setShowreelOpen] = useState(false)

  return (
    <>
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 px-4 py-2 tablet:px-6">
      <nav className="mx-auto flex max-w-none items-center justify-between">
        <Link
          to="/"
          aria-label="AYNZEN home"
          className="rounded-full px-2 py-1 transition-colors duration-200 hover:bg-white/10"
        >
          <RollingText
            text="AYNZEN"
            className="font-display text-base font-semibold uppercase tracking-[-0.01em] text-white"
          />
        </Link>

        {LINKS.map((link) => (
          <NavLink
            key={link.label}
            link={link}
            onOpenShowreel={() => setShowreelOpen(true)}
            className="hidden rounded-full px-1 py-1 transition-colors duration-200 hover:bg-white/10 tablet:inline-flex"
          >
            <RollingText
              text={link.label}
              lineHeight="1em"
              className="font-sans text-xs font-medium uppercase tracking-[-0.03em] text-white"
            />
          </NavLink>
        ))}

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] tablet:hidden"
        >
          <span
            className="h-px w-4 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateY(3px) rotate(45deg)' : 'none' }}
          />
          <span
            className="h-px w-4 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/95 backdrop-blur-md tablet:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              link={link}
              onOpenShowreel={() => setShowreelOpen(true)}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl uppercase text-white"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

    </header>
    <ShowreelModal open={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  )
}
