import { useState } from 'react'
import FooterBar from '../components/FooterBar'
import useAppear from '../lib/useAppear'

// Matches the reference's contact page exactly, minus the FAQ column
// (dropped per request) — headline, 4-column info row, and the reach-out
// form. Copy stays the same as the reference; only the real contact
// details are AYNZEN's own.
const CONTACT = {
  email: 'Moekhalil@aynzen.com',
  phone: '+971 55 144 9027',
  locationLabel: 'Iris Bay - Business Bay - Dubai',
  locationLink: 'https://maps.app.goo.gl/cnEiodb9CKrA5MeRA',
}

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/aynzen.ae/' },
  { label: 'Vimeo', href: '#' },
]

const fieldClass =
  'w-full border-b border-white/30 bg-transparent pb-2 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors duration-200'

// Sends the form straight to Moekhalil@aynzen.com via Web3Forms (the
// destination address is tied to the access key on Web3Forms' side, not
// passed here) — no backend needed, and the visitor never has to leave the
// page or have a mail client configured. The key is public-safe by design
// (it's meant to ship in client-side bundles) but still comes from an env
// var for configurability; see .env.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export default function Contact() {
  const headlineRef = useAppear({ immediate: true, delay: 0.15 })
  const infoRef = useAppear({ immediate: true, delay: 0.3 })
  const formRef = useAppear({ immediate: true, delay: 0.45 })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')

    const formData = new FormData(form)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', `New inquiry from ${formData.get('name')} — AYNZEN website`)
    formData.append('from_name', 'AYNZEN website')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const result = await res.json()
      if (result.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-ink px-4 pt-28 text-white tablet:px-6 tablet:pt-32">
      <div className="mx-auto max-w-6xl">
        <div ref={headlineRef}>
          <h1 className="max-w-5xl font-display text-[12vw] font-semibold uppercase leading-[0.95] tracking-[-0.02em] tablet:text-[7vw] desktop:text-[104px]">
            Let&rsquo;s create something timeless.
          </h1>
        </div>

        <div ref={infoRef} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 tablet:mt-20 tablet:grid-cols-4">
          <div>
            <span className="block font-sans text-sm font-medium uppercase tracking-[-0.01em] text-white/50 tablet:text-lg">
              Email
            </span>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-3 inline-block border-b border-white font-display text-base uppercase leading-tight tablet:text-xl"
            >
              {CONTACT.email}
            </a>
          </div>

          <div>
            <span className="block font-sans text-sm font-medium uppercase tracking-[-0.01em] text-white/50 tablet:text-lg">
              Phone
            </span>
            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="mt-3 inline-block border-b border-white font-display text-base tablet:text-xl"
            >
              {CONTACT.phone}
            </a>
          </div>

          <div>
            <span className="block font-sans text-sm font-medium uppercase tracking-[-0.01em] text-white/50 tablet:text-lg">
              Location
            </span>
            <a
              href={CONTACT.locationLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block border-b border-white font-display text-base uppercase tablet:text-xl"
            >
              Get Directions
            </a>
            <span className="mt-2 block max-w-[200px] font-sans text-sm text-white/60">{CONTACT.locationLabel}</span>
          </div>

          <div>
            <span className="block font-sans text-sm font-medium uppercase tracking-[-0.01em] text-white/50 tablet:text-lg">
              Follow Us
            </span>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="border-b border-white font-display text-base uppercase tablet:text-xl"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div ref={formRef} className="mt-20 pb-24 tablet:mt-28 tablet:pb-32">
          <h2 className="font-display text-4xl uppercase leading-none tablet:text-5xl">Reach Out</h2>
          <p className="mt-4 max-w-md text-sm text-white/60 tablet:text-base">
            Whether you&rsquo;re dreaming up a new project, seeking a creative collaborator, or simply curious about
            our work. We would love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-7">
            {/* Honeypot — real visitors never see or fill this in; bots that
                blindly fill every field do, and Web3Forms silently drops
                the submission when it's non-empty. */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <label className="flex flex-col gap-2">
              <span className="font-sans text-base font-medium">Name*</span>
              <input name="name" type="text" required placeholder="John" className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-base font-medium">Email*</span>
              <input name="email" type="email" required placeholder="contact@gmail.com" className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-base font-medium">Phone</span>
              <input name="phone" type="tel" placeholder="+1 (123) 456-7890" className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-sans text-base font-medium">Message*</span>
              <textarea name="message" required rows={3} placeholder="Project inquiry..." className={fieldClass} />
            </label>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 inline-block w-fit border-b-2 border-white pb-1 text-left font-display text-2xl uppercase tracking-[-0.01em] disabled:opacity-50"
            >
              {status === 'sending' && 'Sending…'}
              {status === 'sent' && 'Message Sent'}
              {status === 'error' && 'Something Went Wrong — Try Again'}
              {(status === 'idle' || !status) && 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      <FooterBar />
    </section>
  )
}
