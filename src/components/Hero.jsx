import { useEffect, useRef, useState } from 'react'
import useAppear from '../lib/useAppear'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Dubai',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
})

function DubaiTime() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(timeFormatter.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return <span>{time}</span>
}

export default function Hero() {
  const headlineRef = useAppear({ immediate: true, delay: 0.15 })
  const bottomRef = useAppear({ immediate: true, delay: 0.35 })
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Belt-and-braces autoplay: some browsers evaluate the autoplay policy
    // before React has committed the `muted` property, which silently
    // blocks playback. Setting it explicitly and re-triggering play() here
    // avoids that race.
    video.muted = true
    const playPromise = video.play()
    if (playPromise) playPromise.catch(() => {})
  }, [])

  return (
    <section
      id="top"
      className="relative z-20 flex h-screen min-h-[640px] w-full flex-col justify-end overflow-hidden bg-ink"
    >
      {/* BG Video/Image — falls back to the gradient behind it if the video fails to load */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, #24303a 0%, #10161c 45%, #0a0a0a 100%)',
        }}
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/AYNZEN AERIAL FILM PROCUTION/AYNZEN AERIAL FILM PROCUTION.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40"
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-4 text-center tablet:px-6">
        <div ref={headlineRef}>
          <h1 className="font-display text-[56px] font-medium uppercase leading-[1.1] tracking-[-0.06em] text-white tablet:text-[72px] desktop:text-[158px]">
            AYNZEN
            <br />
            Aerial Film Production
          </h1>
        </div>
      </div>

      <div
        ref={bottomRef}
        className="relative flex flex-col gap-2 px-4 pb-6 pt-4 font-sans text-base font-medium leading-[1.4] tracking-[-0.04em] text-white/70 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6 tablet:px-6 tablet:pb-8"
      >
        <span>Creative Production Studio</span>
        <span>Dubai, United Arab Emirates</span>
        <DubaiTime />
        <span>AYNZEN 2026</span>
      </div>
    </section>
  )
}
