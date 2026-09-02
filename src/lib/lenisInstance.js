// Lightweight singleton so components outside the scroll-setup hook (e.g. a
// modal that needs to pause background scrolling) can reach the live Lenis
// instance without prop-drilling or a full context provider.
let instance = null

export function setLenisInstance(lenis) {
  instance = lenis
}

export function getLenisInstance() {
  return instance
}
