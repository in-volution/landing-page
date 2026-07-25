/**
 * Timing + layout source of truth for the hero loop.
 * All values are frames @ 30fps, absolute to the composition (no sequences),
 * so the whole choreography can be read in one place.
 */
export const FPS = 30;

/** 10 seconds — the logo is the only subject, so it gets room to breathe. */
export const DURATION = 300;

/**
 * The loop is deliberately unhurried: the mark unfolds, the accent lands, the
 * wordmark reveals, and then the finished lockup simply breathes until the clip
 * fades back to the background and restarts.
 */
export const BEAT = {
  /** The isotype brackets unfold from their corners, outer first then inner. */
  markIn: 0,
  /** Blue accent square lands inside the inner bracket, once both have settled. */
  accentIn: 56,
  /** Wordmark wipes in next to the mark. */
  wordmarkIn: 84,
  /** Lockup is fully built; the slow breath takes over from here. */
  settled: 120,
  /** Fade back to background so the loop is seamless. */
  loopOut: 258,
} as const;

/** How much the assembly beats inside the mark are stretched. */
export const MARK_PACE = 2.2;

/**
 * Timeline for the agent-swarm choreography. It no longer runs in the hero
 * loop — that is logo-only now — but the components below still render the
 * multiagent panel clip, so their beats live on here.
 */
export const SWARM_BEAT = {
  /** Lockup shrinks into the hub node, wordmark drops away. */
  collapse: 44,
  /** Agent ring pops in around the hub. */
  agentsIn: 50,
  /** Edges draw hub -> agents, then agent -> agent. */
  spokesIn: 54,
  ringIn: 66,
  /** Packets start travelling. */
  trafficIn: 66,
} as const;

export type Point = { x: number; y: number };

export type AgentId = "detector" | "ops" | "finance" | "crm" | "auditor";

export type AgentSpec = {
  id: AgentId;
  label: string;
  /** What this agent says to the rest of the swarm. */
  says: string;
  /** Frame at which its speech bubble pops in. */
  saysAt: number;
  position: Point;
  /** Where the bubble sits relative to the node. */
  bubble: "top" | "bottom";
};

const CENTER: Point = { x: 960, y: 540 };
const RX = 500;
const RY = 280;

/** Five agents on a pentagon around the logo hub, first one straight up. */
const onRing = (index: number): Point => {
  const angle = (-90 + index * 72) * (Math.PI / 180);
  return {
    x: Math.round(CENTER.x + RX * Math.cos(angle)),
    y: Math.round(CENTER.y + RY * Math.sin(angle)),
  };
};

export const HUB: Point = CENTER;

export const AGENTS: AgentSpec[] = [
  {
    id: "detector",
    label: "DETECTOR",
    says: "pedido urgente entrante",
    saysAt: 70,
    position: onRing(0),
    bubble: "top",
  },
  {
    id: "finance",
    label: "FINANZAS",
    says: "factura emitida",
    saysAt: 92,
    position: onRing(1),
    bubble: "top",
  },
  {
    id: "auditor",
    label: "AUDITOR",
    says: "todo conforme",
    saysAt: 106,
    position: onRing(2),
    bubble: "bottom",
  },
  {
    id: "crm",
    label: "CRM",
    says: "cliente avisado",
    saysAt: 101,
    position: onRing(3),
    bubble: "bottom",
  },
  {
    id: "ops",
    label: "OPS",
    says: "stock reservado",
    saysAt: 84,
    position: onRing(4),
    bubble: "top",
  },
];

export const agentById = (id: AgentId): AgentSpec => {
  const found = AGENTS.find((agent) => agent.id === id);
  if (!found) {
    throw new Error(`Unknown agent: ${id}`);
  }
  return found;
};

/** `null` means the logo hub in the middle. */
export type NodeRef = AgentId | null;

export const pointOf = (ref: NodeRef): Point =>
  ref === null ? HUB : agentById(ref).position;

export type EdgeSpec = { from: NodeRef; to: NodeRef; appearAt: number };

/** Spokes first, then the ring that makes the agents talk to each other. */
export const EDGES: EdgeSpec[] = [
  { from: null, to: "detector", appearAt: SWARM_BEAT.spokesIn },
  { from: null, to: "finance", appearAt: SWARM_BEAT.spokesIn + 2 },
  { from: null, to: "auditor", appearAt: SWARM_BEAT.spokesIn + 4 },
  { from: null, to: "crm", appearAt: SWARM_BEAT.spokesIn + 6 },
  { from: null, to: "ops", appearAt: SWARM_BEAT.spokesIn + 8 },
  { from: "detector", to: "finance", appearAt: SWARM_BEAT.ringIn },
  { from: "finance", to: "auditor", appearAt: SWARM_BEAT.ringIn + 3 },
  { from: "auditor", to: "crm", appearAt: SWARM_BEAT.ringIn + 6 },
  { from: "crm", to: "ops", appearAt: SWARM_BEAT.ringIn + 9 },
  { from: "ops", to: "detector", appearAt: SWARM_BEAT.ringIn + 12 },
];

export type PacketSpec = { from: NodeRef; to: NodeRef; at: number };

/** Detector reports in, hub dispatches, the ring cross-talks, auditor closes. */
export const PACKETS: PacketSpec[] = [
  { from: "detector", to: null, at: SWARM_BEAT.trafficIn },
  { from: null, to: "ops", at: SWARM_BEAT.trafficIn + 12 },
  { from: null, to: "finance", at: SWARM_BEAT.trafficIn + 12 },
  { from: null, to: "crm", at: SWARM_BEAT.trafficIn + 16 },
  { from: "ops", to: "detector", at: SWARM_BEAT.trafficIn + 26 },
  { from: "finance", to: "auditor", at: SWARM_BEAT.trafficIn + 30 },
  { from: "crm", to: "ops", at: SWARM_BEAT.trafficIn + 34 },
  { from: "auditor", to: null, at: SWARM_BEAT.trafficIn + 44 },
  { from: null, to: "detector", at: SWARM_BEAT.trafficIn + 50 },
];

export const PACKET_DURATION = 20;

/**
 * Node radius on the 1920x1080 canvas. Oversized on purpose: the clip plays
 * inside a ~600px hero panel, so anything smaller stops being readable.
 */
export const NODE_R = 78;

/** Frame at which the agent at `index` pops in. */
export const appearAtOf = (index: number): number => SWARM_BEAT.agentsIn + index * 3;

/** How long a speech bubble stays on screen. */
export const BUBBLE_HOLD = 34;
