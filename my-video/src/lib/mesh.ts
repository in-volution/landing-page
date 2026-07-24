export type Point = { x: number; y: number };

export type AgentId =
  | "detector"
  | "orchestrator"
  | "ops"
  | "finance"
  | "crm"
  | "auditor";

export type AgentSpec = {
  id: AgentId;
  label: string;
  role: string;
  position: Point;
};

/**
 * Topology of the swarm, laid out on the 1920x1080 canvas.
 * Flow reads left to right: sense -> orchestrate -> execute in parallel -> audit.
 */
export const AGENTS: AgentSpec[] = [
  { id: "detector", label: "DETECTOR", role: "sensores", position: { x: 300, y: 332 } },
  { id: "orchestrator", label: "ORQUESTADOR", role: "planifica", position: { x: 720, y: 332 } },
  { id: "ops", label: "OPS", role: "almacén", position: { x: 1180, y: 180 } },
  { id: "finance", label: "FINANZAS", role: "facturación", position: { x: 1180, y: 332 } },
  { id: "crm", label: "CRM", role: "cliente", position: { x: 1180, y: 484 } },
  { id: "auditor", label: "AUDITOR", role: "guardarraíles", position: { x: 1620, y: 332 } },
];

export const agentById = (id: AgentId): AgentSpec => {
  const found = AGENTS.find((agent) => agent.id === id);
  if (!found) {
    throw new Error(`Unknown agent: ${id}`);
  }
  return found;
};

export type EdgeSpec = { from: AgentId; to: AgentId };

export const EDGES: EdgeSpec[] = [
  { from: "detector", to: "orchestrator" },
  { from: "orchestrator", to: "ops" },
  { from: "orchestrator", to: "finance" },
  { from: "orchestrator", to: "crm" },
  { from: "ops", to: "auditor" },
  { from: "finance", to: "auditor" },
  { from: "crm", to: "auditor" },
];

/**
 * Control points are pushed out horizontally so every edge leaves and enters
 * its node flat, which keeps the mesh readable when several edges converge.
 */
const controlPoints = (from: Point, to: Point): [Point, Point] => {
  const bend = (to.x - from.x) * 0.5;
  return [
    { x: from.x + bend, y: from.y },
    { x: to.x - bend, y: to.y },
  ];
};

export const edgePath = (from: Point, to: Point): string => {
  const [c1, c2] = controlPoints(from, to);
  return `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`;
};

/** Position along the cubic Bézier at t in [0, 1]. */
export const pointOnEdge = (from: Point, to: Point, t: number): Point => {
  const [c1, c2] = controlPoints(from, to);
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;

  return {
    x: a * from.x + b * c1.x + c * c2.x + d * to.x,
    y: a * from.y + b * c1.y + c * c2.y + d * to.y,
  };
};
