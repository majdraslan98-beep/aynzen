import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import useLenis from './lib/useLenis'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Cross-page anchor links (e.g. Nav's "About" from the /contact page)
    // are plain <a> tags, not router Links, so landing here after one is a
    // real full-page navigation — the browser tries its native hash-scroll
    // before React has rendered the target element, so it silently fails.
    // Poll briefly for the element instead of assuming it's already there.
    if (hash) {
      const id = hash.slice(1)
      let attempts = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ block: 'start' })
        } else if (attempts < 40) {
          attempts += 1
          requestAnimationFrame(tryScroll)
        }
      }
      tryScroll()
    } else {
      window.scrollTo(0, 0)
    }
    // Route content/heights change completely on navigation — stale
    // ScrollTrigger positions from the previous page would be wrong.
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

export default function App() {
  useLenis()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    const t = setTimeout(refresh, 1000)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <div className="bg-ink">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
