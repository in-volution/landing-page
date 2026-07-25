import { loadFont as loadGeist } from "@remotion/google-fonts/Geist";
import { loadFont as loadGeistMono } from "@remotion/google-fonts/GeistMono";

const { fontFamily: geist } = loadGeist("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const { fontFamily: geistMono } = loadGeistMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const fonts = {
  sans: geist,
  mono: geistMono,
};

export const colors = {
  bg: "#08080a",
  surface: "#0e0e11",
  line: "#1e1e23",
  lineSoft: "#161619",
  white: "#ffffff",
  text: "#f4f4f5",
  muted: "#8b8b93",
  faint: "#5a5a63",
  emerald: "#10b981",
  sky: "#38bdf8",
  amber: "#f5a524",
  /** Involution Blue, del sistema de marca Despliegue. */
  brand: "#3155ff",
  /** Sobre negro el azul puro se apaga; este tinte es el que se usa en pantalla. */
  brandOnDark: "#7590ff",
};

/** Per-agent accent, so the eye can track who is acting. */
export const accents = {
  detector: colors.amber,
  orchestrator: colors.white,
  ops: colors.sky,
  finance: colors.sky,
  crm: colors.sky,
  auditor: colors.emerald,
};
