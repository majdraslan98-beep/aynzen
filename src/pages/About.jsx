import Footer from '../components/Footer'
import useAppear from '../lib/useAppear'

// Matches the reference's standalone About page: Intro (headline + full-width
// image), Our Story (headline/body + stats list, image alongside), then the
// same "Start Your Story" CTA + footer used on the homepage. The reference
// also has Awards & Recognitions, Selected Clients, and Meet the Team
// sections here — dropped per request.
const STATS = [
  { value: '5+', label: 'Years of experience' },
  { value: '50+', label: 'Films Delivered' },
  { value: '5', label: 'Industry Awards' },
]

export default function About() {
  const introTextRef = useAppear({ immediate: true, delay: 0.15 })
  const introMediaRef = useAppear({ immediate: true, delay: 0.3 })
  const storyRef = useAppear({})

  return (
    <>
      <section className="bg-ink text-white">
        <div className="flex flex-col gap-8 px-4 pb-20 pt-[140px] tablet:px-6 tablet:pb-[100px] tablet:pt-[160px] desktop:pb-[120px] desktop:pt-[200px]">
          <div ref={introTextRef}>
            <h1 className="font-sans text-[34px] font-semibold leading-[1.1] tracking-[-0.06em] text-white tablet:text-5xl desktop:text-[56px]">
              AynZen Aerial Film Production is a Dubai-based creative production company specializing in aerial
              cinematography, FPV drone filming, cinematic storytelling, and high-end visual content. AynZen combines
              professional filmmaking experience with advanced drone technology to create dynamic visuals for
              commercials, real estate, tourism, hospitality, sports, automotive, events, and branded content.
            </h1>
          </div>

          <div ref={introMediaRef} className="aspect-[1.22] w-full overflow-hidden tablet:aspect-[1.92]">
            <img
              src="/Pictures/About us picture first section.jpg"
              alt="AynZen aerial drone production"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-24 text-white tablet:px-6 tablet:py-32">
        <div ref={storyRef} className="flex flex-col gap-10 desktop:flex-row desktop:items-start desktop:gap-[60px]">
          <div className="flex flex-col gap-10 tablet:gap-16 desktop:flex-1 desktop:gap-[140px]">
            <div className="flex flex-col gap-4">
              <span className="font-display text-xl font-medium tracking-[-0.01em] text-white">Our Story</span>
              <h2 className="max-w-2xl font-sans text-[34px] font-semibold leading-[1.1] tracking-[-0.06em] text-white tablet:text-5xl desktop:text-[56px]">
                AYNZEN was born from a love of beautiful visuals and honest storytelling.
              </h2>
              <p className="max-w-[600px] font-sans text-base leading-[1.4] tracking-[-0.04em] text-[#858585] tablet:text-lg">
                What began with a single drone and a passion for capturing the world from above has grown into a full
                aerial production studio trusted across real estate, hospitality, tourism, and branded content. Along
                the way, we&rsquo;ve learned that what truly matters isn&rsquo;t just how a shot{' '}
                <em>looks</em>, it&rsquo;s how it <em>feels</em>.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="relative flex items-end justify-between gap-2 pb-2">
                  <span className="font-sans text-5xl font-semibold leading-[1.1] tracking-[-0.06em] text-white">
                    {s.value}
                  </span>
                  <span className="font-sans text-base tracking-[-0.04em] text-white">{s.label}</span>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-[1.22] w-full overflow-hidden desktop:aspect-auto desktop:flex-1 desktop:self-stretch">
            <img
              src="/Pictures/About us picture Second section.jpg"
              alt="AynZen behind the scenes"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
