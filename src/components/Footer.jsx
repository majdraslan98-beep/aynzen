import { Link } from 'react-router-dom'
import RollingText from './RollingText'
import TickRuler from './TickRuler'
import FooterBar from './FooterBar'
import useAppear from '../lib/useAppear'

// Homepage-only footer: tick ruler, huge underlined rolling-text CTA
// ("Start Your Story", 104px) linking to the contact page, another tick
// ruler, then the shared bottom bar. Other pages render just <FooterBar />
// — the reference's own contact page has no CTA above its bottom bar.
export default function Footer() {
  const ref = useAppear({})

  return (
    <footer id="footer" className="bg-ink text-white">
      <TickRuler />

      <div ref={ref} className="flex items-center justify-center px-4 py-24 text-center tablet:py-32">
        <Link to="/contact" className="inline-block border-b-2 border-white pb-2 tablet:border-b-[3px]">
          <RollingText
            text="Start Your Story"
            lineHeight="1em"
            className="font-display text-[13vw] font-medium uppercase leading-none tracking-[-0.01em] text-white tablet:text-[7vw] desktop:text-[104px]"
          />
        </Link>
      </div>

      <TickRuler />

      <FooterBar />
    </footer>
  )
}
