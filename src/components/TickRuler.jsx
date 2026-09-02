// Matches the reference's actual tick-ruler asset pixel-for-pixel (sampled
// directly from their PNG): a 9px pitch, one full-height "major" tick every
// 6th mark (54px cycle) with 5 shorter, dimmer top-aligned ticks in between
// — a measuring-tape texture, not a uniform ruler. Used both in the hero's
// logo strip and in the footer, matching the reference reusing the same
// decorative element in both places.
const TICK_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="18">` +
    `<rect x="0" y="0" width="1" height="18" fill="white" fill-opacity="0.5"/>` +
    `<rect x="9" y="0" width="1" height="10" fill="white" fill-opacity="0.3"/>` +
    `<rect x="18" y="0" width="1" height="10" fill="white" fill-opacity="0.3"/>` +
    `<rect x="27" y="0" width="1" height="10" fill="white" fill-opacity="0.3"/>` +
    `<rect x="36" y="0" width="1" height="10" fill="white" fill-opacity="0.3"/>` +
    `<rect x="45" y="0" width="1" height="10" fill="white" fill-opacity="0.3"/>` +
    `</svg>`,
)

export default function TickRuler() {
  return (
    <div
      className="h-[18px] w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,${TICK_SVG}")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '54px 18px',
      }}
      aria-hidden="true"
    />
  )
}
