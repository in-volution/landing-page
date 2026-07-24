/**
 * Timing source of truth for the hero loop "La nueva fuerza laboral".
 * All values are frames @ 30fps. Scene-local frames reset to 0 inside each
 * TransitionSeries.Sequence.
 */
export const FPS = 30;

/** Per-scene durations (frames). */
export const SCENE = {
  viejoModelo: 110,
  anuncio: 100,
  giro: 120,
  pasos: 160,
  operacion: 140,
  cierre: 110,
} as const;

/** Cross-fade between scenes. */
export const TRANSITION = 18;

const sceneSum = Object.values(SCENE).reduce((a, b) => a + b, 0);
const transitionCount = Object.keys(SCENE).length - 1;

/** Total composition length once overlapping cross-fades are subtracted. */
export const TOTAL = sceneSum - transitionCount * TRANSITION; // 650

/** The four operating-model steps, revealed one after another in scene 4. */
export type Step = {
  key: string;
  desc: string;
  glyph: string;
  at: number;
};

export const STEPS: Step[] = [
  { key: "procesos", desc: "auditamos tus flujos reales", glyph: "▸", at: 10 },
  { key: "diagnóstico", desc: "detectamos riesgos y medimos impacto", glyph: "▸", at: 42 },
  { key: "multiagente", desc: "agentes especializados a medida", glyph: "▸", at: 74 },
  { key: "operación", desc: "ejecución 24/7 bajo control total", glyph: "✓", at: 106 },
];
