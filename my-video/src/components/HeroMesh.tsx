import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import {
  AGENTS,
  EDGES,
  agentById,
  edgePath,
  pointOnEdge,
  type AgentId,
} from "../lib/mesh";
import { colors, accents, fonts } from "../theme";

/** Frame (scene-local) at which each agent lights up. */
const ACTIVATE: Record<AgentId, number> = {
  detector: 12,
  orchestrator: 30,
  ops: 54,
  finance: 54,
  crm: 54,
  auditor: 86,
};

type Flow = { from: AgentId; to: AgentId; at: number };

/** The three fan-out packets leave the orchestrator on the same frame. */
const FLOWS: Flow[] = [
  { from: "detector", to: "orchestrator", at: 24 },
  { from: "orchestrator", to: "ops", at: 50 },
  { from: "orchestrator", to: "finance", at: 50 },
  { from: "orchestrator", to: "crm", at: 50 },
  { from: "ops", to: "auditor", at: 82 },
  { from: "finance", to: "auditor", at: 82 },
  { from: "crm", to: "auditor", at: 82 },
];

const PACKET_DUR = 26;
const TRAIL = [0, 0.06, 0.12];

type Props = {
  /** Render flowing packets along the routes (scene 5). */
  packets?: boolean;
  /** Show the agent name/role labels (scene 3). */
  showLabels?: boolean;
  /** Whole-mesh opacity, for using it as a dim backdrop. */
  opacity?: number;
};

export const HeroMesh: React.FC<Props> = ({
  packets = false,
  showLabels = true,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {EDGES.map((edge, index) => (
          <Edge
            key={`${edge.from}-${edge.to}`}
            from={edge.from}
            to={edge.to}
            appearAt={6 + index * 4}
            frame={frame}
          />
        ))}

        {packets &&
          FLOWS.map((flow, index) => (
            <Packet
              key={`${flow.from}-${flow.to}-${index}`}
              from={flow.from}
              to={flow.to}
              at={flow.at}
              frame={frame}
            />
          ))}

        {AGENTS.map((agent, index) => (
          <Node
            key={agent.id}
            id={agent.id}
            appearAt={index * 4}
            activateAt={ACTIVATE[agent.id]}
            frame={frame}
            showLabel={showLabels}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

const Edge: React.FC<{
  from: AgentId;
  to: AgentId;
  appearAt: number;
  frame: number;
}> = ({ from, to, appearAt, frame }) => {
  const path = edgePath(agentById(from).position, agentById(to).position);

  const draw = interpolate(frame, [appearAt, appearAt + 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <path
      d={path}
      fill="none"
      stroke={colors.line}
      strokeWidth={1.5}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - draw}
    />
  );
};

const Packet: React.FC<{
  from: AgentId;
  to: AgentId;
  at: number;
  frame: number;
}> = ({ from, to, at, frame }) => {
  const fromPoint = agentById(from).position;
  const toPoint = agentById(to).position;

  const visible = frame >= at && frame <= at + PACKET_DUR + 4;
  if (!visible) {
    return null;
  }

  const progress = interpolate(frame, [at, at + PACKET_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.35, 1),
  });

  const accent = accents[to];

  return (
    <>
      {TRAIL.map((offset, index) => {
        const t = Math.max(0, Math.min(1, progress - offset));
        const point = pointOnEdge(fromPoint, toPoint, t);
        const fade = index === 0 ? 1 : 0.4 - index * 0.1;

        return (
          <circle
            key={offset}
            cx={point.x}
            cy={point.y}
            r={index === 0 ? 6 : 4.5 - index * 0.8}
            fill={accent}
            opacity={t <= 0 || t >= 1 ? 0 : fade}
            style={
              index === 0
                ? { filter: `drop-shadow(0 0 10px ${accent})` }
                : undefined
            }
          />
        );
      })}
    </>
  );
};

const Node: React.FC<{
  id: AgentId;
  appearAt: number;
  activateAt: number;
  frame: number;
  showLabel: boolean;
}> = ({ id, appearAt, activateAt, frame, showLabel }) => {
  const agent = agentById(id);
  const accent = accents[id];
  const { x, y } = agent.position;

  const appear = interpolate(frame, [appearAt, appearAt + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const on = interpolate(frame, [activateAt, activateAt + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const burstRadius = interpolate(frame, [activateAt, activateAt + 40], [26, 74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const burstOpacity = interpolate(frame, [activateAt, activateAt + 40], [0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(
    frame,
    [activateAt, activateAt + 10, activateAt + 26],
    [1, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    },
  );

  return (
    <g opacity={appear}>
      <circle
        cx={x}
        cy={y}
        r={burstRadius}
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        opacity={burstOpacity}
      />

      <circle cx={x} cy={y} r={26} fill={colors.bg} stroke={colors.line} strokeWidth={1.5} />
      <circle
        cx={x}
        cy={y}
        r={26}
        fill="none"
        stroke={accent}
        strokeWidth={1.5}
        opacity={on}
        style={{ scale, transformOrigin: `${x}px ${y}px` }}
      />
      <circle
        cx={x}
        cy={y}
        r={6}
        fill={on > 0.5 ? accent : colors.faint}
        opacity={interpolate(on, [0, 1], [0.6, 1])}
        style={on > 0.5 ? { filter: `drop-shadow(0 0 12px ${accent})` } : undefined}
      />

      {showLabel ? (
        <text
          x={x}
          y={y + 58}
          textAnchor="middle"
          fill={on > 0.5 ? colors.white : colors.muted}
          style={{ fontFamily: fonts.mono, fontSize: 20, letterSpacing: "0.08em" }}
        >
          {agent.label}
        </text>
      ) : null}
    </g>
  );
};
