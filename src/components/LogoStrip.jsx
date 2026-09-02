import LogoMarquee from './LogoMarquee'
import TickRuler from './TickRuler'
import useAppear from '../lib/useAppear'

export default function LogoStrip() {
  const ref = useAppear({ immediate: true, delay: 0.5 })

  return (
    <div ref={ref} className="relative z-20 bg-ink">
      <TickRuler />
      <div className="px-4 py-6 tablet:px-6">
        <LogoMarquee />
      </div>
      <TickRuler />
    </div>
  )
}
