// Lightweight high-frequency reactive store for synchronizing GSAP ScrollTrigger & UI with R3F useFrame at 60-120fps
export const scrollState = {
  globalProgress: 0,
  activeSection: 'hero', // 'hero' | 'iceberg' | 'saas' | 'personalizacion' | 'crossover' | 'pricing' | 'climax'
  sections: {
    hero: 0,            // 0 -> 1: Z-Axis zoom into smartphone + 3D Scroll arrow separation
    iceberg: 0,         // 0 -> 1: Surface tip (multimedia/ads) -> Deep underwater AI software
    saas: 0,            // 0 -> 1: 3D <model-viewer> SaaS cluster rotation & node activation
    personalizacion: 0, // 0 -> 1: 19h time architecture & business parameterization
    crossover: 0,       // 0 -> 1: Scroll & MetaLevelCode 3D logos meet, absorb colors & shockwave
    pricing: 0,         // 0 -> 1: 3D floating pricing monoliths + mouse parallax
    climax: 0,          // 0 -> 1: 3D floating QR code + Casa Tradición RAG advisor
  },
  // Interactive states
  callAnswered: false,
  activeSaasPillar: 0,
  saasAutoRotate: true,
  saasOrbitAngles: { theta: 0, phi: 0 },
  selectedBusinessType: 'inmobiliaria',
  themeMode: 'scroll', // 'scroll' | 'metalevel'
  shockwaveIntensity: 0,
  mouse: { x: 0, y: 0 },
  hoveredPlan: null, // 'A' | 'B' | 'C' | null
};

const listeners = new Set();

export function subscribeScrollState(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyScrollState() {
  listeners.forEach((fn) => fn({ ...scrollState }));
}

export function setInteractiveState(partial) {
  Object.assign(scrollState, partial);
  notifyScrollState();
}
