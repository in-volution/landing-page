import type { AgentId } from "./mesh";

/**
 * Single source of truth for the run, so the mesh and the terminal
 * can never drift apart.
 */
export const BEATS = {
  graphIn: 16,
  terminalIn: 46,
  detector: 68,
  orchestrator: 128,
  ops: 194,
  finance: 224,
  crm: 254,
  auditor: 326,
  summary: 374,
} as const;

export const PACKET_DURATION = 30;

export type Transfer = {
  from: AgentId;
  to: AgentId;
  startFrame: number;
};

/** The three fan-out transfers start on the same frame — that is the whole point. */
export const TRANSFERS: Transfer[] = [
  { from: "detector", to: "orchestrator", startFrame: 96 },
  { from: "orchestrator", to: "ops", startFrame: 158 },
  { from: "orchestrator", to: "finance", startFrame: 158 },
  { from: "orchestrator", to: "crm", startFrame: 158 },
  { from: "ops", to: "auditor", startFrame: 288 },
  { from: "finance", to: "auditor", startFrame: 288 },
  { from: "crm", to: "auditor", startFrame: 288 },
];

export type LogEntry = {
  id: string;
  agent: AgentId;
  tag: string;
  glyph: string;
  text: string;
  startFrame: number;
  typeDuration: number;
  indent: boolean;
};

export const LOG: LogEntry[] = [
  {
    id: "detector",
    agent: "detector",
    tag: "DETECTOR",
    glyph: "▸",
    text: "pedido #4471 · prioridad alta · stock insuficiente en almacén A",
    startFrame: BEATS.detector,
    typeDuration: 26,
    indent: false,
  },
  {
    id: "orchestrator",
    agent: "orchestrator",
    tag: "ORQUESTADOR",
    glyph: "▸",
    text: "plan generado · 3 agentes despachados en paralelo",
    startFrame: BEATS.orchestrator,
    typeDuration: 22,
    indent: false,
  },
  {
    id: "ops",
    agent: "ops",
    tag: "OPS",
    glyph: "⚡",
    text: "reserva stock en almacén B · expedición urgente programada",
    startFrame: BEATS.ops,
    typeDuration: 24,
    indent: true,
  },
  {
    id: "finance",
    agent: "finance",
    tag: "FINANZAS",
    glyph: "⚡",
    text: "proforma emitida · crédito del cliente validado",
    startFrame: BEATS.finance,
    typeDuration: 22,
    indent: true,
  },
  {
    id: "crm",
    agent: "crm",
    tag: "CRM",
    glyph: "⚡",
    text: "cliente notificado · enlace de seguimiento enviado",
    startFrame: BEATS.crm,
    typeDuration: 22,
    indent: true,
  },
  {
    id: "auditor",
    agent: "auditor",
    tag: "AUDITOR",
    glyph: "✓",
    text: "guardarraíles ok · trazabilidad completa · sin escalado humano",
    startFrame: BEATS.auditor,
    typeDuration: 26,
    indent: false,
  },
];

export const MESH_SCENE_DURATION = 450;
