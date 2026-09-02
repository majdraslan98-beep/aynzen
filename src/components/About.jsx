import useAppear from '../lib/useAppear'
import services from '../data/services'

export default function About() {
  const ref = useAppear({ stagger: 0.08 })
  const left = services.slice(0, 5)
  const right = services.slice(5)

  return (
    <section id="about" className="bg-ink px-4 py-24 text-white tablet:px-6 tablet:py-32">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-16 desktop:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-[-0.01em] tablet:text-5xl desktop:text-6xl">
            We&rsquo;re an aerial studio driven by a love for cinematic storytelling from above.
          </h2>
          <p className="mt-6 max-w-md text-sm text-white/70 tablet:text-base">
            AYNZEN spans brand films, commercials, real estate, and construction
            documentation, with a crafted, artful approach to every frame &mdash;
            captured entirely from the air.
          </p>
        </div>

        <div>
          <span className="font-sans text-xs uppercase tracking-[-0.02em] text-white/50">Services</span>
          <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-line pt-6">
            <ul className="flex flex-col gap-4">
              {left.map((s) => (
                <li key={s} className="font-display text-lg uppercase leading-tight tablet:text-xl">
                  {s}
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4">
              {right.map((s) => (
                <li key={s} className="font-display text-lg uppercase leading-tight tablet:text-xl">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
