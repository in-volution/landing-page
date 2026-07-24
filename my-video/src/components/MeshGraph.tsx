import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import {
  AGENTS,
  EDGES,
  agentById,
  edgePath,
  pointOnEdge,
  type AgentId,
} from "../lib/mesh";
import { TRANSFERS, PACKET_DURATION } from "../lib/choreography";
import { colors, accents, fonts } from "../theme";

type Props = {
  /** Frame at which each agent lights up, keyed by id. */
  activations: Record<AgentId, number>;
  graphInFrame: number;
};

export const MeshGraph: React.FC<Props> = ({ activations, graphInFrame }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        {EDGES.map((edge, index) => (
          <Edge
            key={`${edge.from}-${edge.to}`}
            from={edge.from}
            to={edge.to}
            appearAt={graphInFrame + 10 + index * 4}
            frame={frame}
          />
        ))}

        {TRANSFERS.map((transfer, index) => (
          <PacketStream
            key={`${transfer.from}-${transfer.to}-${index}`}
            from={transfer.from}
            to={transfer.to}
            startFrame={transfer.startFrame}
            frame={frame}
          />
        ))}

        {AGENTS.map((agent, index) => (
          <Node
            key={agent.id}
            id={agent.id}
            appearAt={graphInFrame + index * 5}
            activateAt={activations[agent.id]}
            frame={frame}
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

  const draw = interpolate(frame, [appearAt, appearAt + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const transfer = TRANSFERS.find((t) => t.from === from && t.to === to);
  const litAt = transfer ? transfer.startFrame : Number.POSITIVE_INFINITY;

  // Edges that have carried traffic stay slightly brighter — the route taken.
  const lit = interpolate(frame, [litAt, litAt + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      <path
        d={path}
        fill="none"
        stroke={colors.line}
        strokeWidth={1.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
      <path
        d={path}
        fill="none"
        stroke={accents[to]}
        strokeWidth={1.5}
        opacity={lit * 0.35}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    </>
  );
};

const TRAIL = [0, 0.055, 0.11, 0.165];

const PacketStream: React.FC<{
  from: AgentId;
  to: AgentId;
  startFrame: number;
  frame: number;
}> = ({ from, to, startFrame, frame }) => {
  const fromPoint = agentById(from).position;
  const toPoint = agentById(to).position;

  const progress = interpolate(
    frame,
    [startFrame, startFrame + PACKET_DURATION],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.45, 0, 0.35, 1),
    },
  );

  const visible = frame >= startFrame && frame <= startFrame + PACKET_DURATION + 4;
  if (!visible) {
    return null;
  }

  const accent = accents[to];

  return (
    <>
      {TRAIL.map((offset, index) => {
        const t = Math.max(0, Math.min(1, progress - offset));
        const point = pointOnEdge(fromPoint, toPoint, t);
        const fade = index === 0 ? 1 : 0.45 - index * 0.1;

        return (
          <circle
            key={offset}
            cx={point.x}
            cy={point.y}
            r={index === 0 ? 6 : 4.5 - index * 0.6}
            fill={accent}
            opacity={t <= 0 || t >= 1 ? 0 : fade}
            style={index === 0 ? { filter: `drop-shadow(0 0 10px ${accent})` } : undefined}
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
}> = ({ id, appearAt, activateAt, frame }) => {
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

  // One-shot ring that expands outward the moment the agent takes over.
  const burstRadius = interpolate(frame, [activateAt, activateAt + 40], [26, 74], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const burstOpacity = interpolate(frame, [activateAt, activateAt + 40], [0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [activateAt, activateAt + 10, activateAt + 26], [1, 1.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

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

      <circle
        cx={x}
        cy={y}
        r={26}
        fill={colors.bg}
        stroke={colors.line}
        strokeWidth={1.5}
      />
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

      <text
        x={x}
        y={y + 60}
        textAnchor="middle"
        fill={on > 0.5 ? colors.white : colors.muted}
        style={{
          fontFamily: fonts.mono,
          fontSize: 20,
          letterSpacing: "0.08em",
        }}
      >
        {agent.label}
      </text>
      <text
        x={x}
        y={y + 84}
        textAnchor="middle"
        fill={colors.faint}
        style={{ fontFamily: fonts.mono, fontSize: 16 }}
      >
        {agent.role}
      </text>
    </g>
  );
};
