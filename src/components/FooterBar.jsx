// The reference's shared bottom bar — present on every page (including
// the contact page, which has no CTA above it, just this bar directly).
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/aynzen.ae/' },
  { label: 'Vimeo', href: '#' },
  { label: 'LinkedIn', href: '#' },
]

export default function FooterBar() {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6 text-center font-sans text-xs uppercase tracking-[-0.04em] tablet:flex-row tablet:justify-between tablet:px-6 tablet:text-left">
      <span className="text-white/40">
        Aynzen <span className="text-white">Studio</span>
      </span>
      <div className="flex gap-6">
        {SOCIAL_LINKS.map((l) => (
          <a key={l.label} href={l.href} className="text-white visited:text-white">
            {l.label}
          </a>
        ))}
      </div>
      <span className="text-white/40">© 2026 AYNZEN. All rights reserved.</span>
    </div>
  )
}
