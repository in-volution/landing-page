import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import {
  AGENTS,
  SWARM_BEAT,
  BUBBLE_HOLD,
  EDGES,
  HUB,
  NODE_R,
  PACKETS,
  PACKET_DURATION,
  appearAtOf,
  pointOf,
  type AgentSpec,
  type NodeRef,
} from "../lib/heroLoop";
import { accents, colors, fonts } from "../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const HUB_R = 96;
/** Links sit a step above `colors.line` so they survive the small hero panel. */
const LINK = "#2e2e38";

/**
 * The swarm layer: hub ring, five agent nodes, the links between them and the
 * packets they exchange. Drawn in one 1920x1080 SVG so every coordinate in
 * `heroLoop.ts` is literal.
 */
export const AgentSwarm: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%" }}>
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r={HUB_R}
          fill="none"
          stroke={LINK}
          strokeWidth={2.5}
          style={{
            opacity: interpolate(
              frame,
              [SWARM_BEAT.collapse + 8, SWARM_BEAT.collapse + 22],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
            scale: interpolate(
              frame,
              [SWARM_BEAT.collapse + 8, SWARM_BEAT.collapse + 24],
              [0.6, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: EASE,
              },
            ),
            transformOrigin: `${HUB.x}px ${HUB.y}px`,
          }}
        />

        {EDGES.map((edge) => (
          <Edge
            key={`${edge.from ?? "hub"}-${edge.to ?? "hub"}`}
            from={edge.from}
            to={edge.to}
            appearAt={edge.appearAt}
          />
        ))}

        {PACKETS.map((packet, index) => (
          <Packet
            key={`${packet.from ?? "hub"}-${packet.to ?? "hub"}-${index}`}
            from={packet.from}
            to={packet.to}
            at={packet.at}
          />
        ))}

        {AGENTS.map((agent, index) => (
          <AgentNode
            key={agent.id}
            agent={agent}
            appearAt={appearAtOf(index)}
          />
        ))}

        {AGENTS.map((agent) => (
          <SpeechBubble key={agent.id} agent={agent} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

const Edge: React.FC<{ from: NodeRef; to: NodeRef; appearAt: number }> = ({
  from,
  to,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const a = pointOf(from);
  const b = pointOf(to);

  return (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={LINK}
      strokeWidth={2.5}
      pathLength={1}
      strokeDasharray={1}
      style={{
        strokeDashoffset: interpolate(frame, [appearAt, appearAt + 20], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: EASE,
        }),
      }}
    />
  );
};

const Packet: React.FC<{ from: NodeRef; to: NodeRef; at: number }> = ({
  from,
  to,
  at,
}) => {
  const frame = useCurrentFrame();

  if (frame < at || frame > at + PACKET_DURATION + 6) {
    return null;
  }

  const a = pointOf(from);
  const b = pointOf(to);
  const accent = to === null ? colors.emerald : accents[to];

  return (
    <g>
      {[0, 0.07, 0.14].map((lag, index) => (
        <circle
          key={lag}
          r={index === 0 ? 12 : 8 - index}
          fill={accent}
          style={{
            opacity: index === 0 ? 1 : 0.45 - index * 0.12,
            filter: index === 0 ? `drop-shadow(0 0 14px ${accent})` : undefined,
            translate: interpolate(
              frame,
              [
                at + lag * PACKET_DURATION,
                at + PACKET_DURATION + lag * PACKET_DURATION,
              ],
              [`${a.x}px ${a.y}px`, `${b.x}px ${b.y}px`],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.4, 0, 0.3, 1),
              },
            ),
          }}
        />
      ))}
    </g>
  );
};

const AgentNode: React.FC<{ agent: AgentSpec; appearAt: number }> = ({
  agent,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const accent = accents[agent.id];
  const { x, y } = agent.position;
  const talkAt = agent.saysAt;

  return (
    <g
      style={{
        opacity: interpolate(frame, [appearAt, appearAt + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        scale: interpolate(frame, [appearAt, appearAt + 16], [0.5, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.4, 0.64, 1),
        }),
        transformOrigin: `${x}px ${y}px`,
      }}
    >
      <circle
        cx={x}
        cy={y}
        r={NODE_R}
        fill="none"
        stroke={accent}
        strokeWidth={2}
        style={{
          opacity: interpolate(frame, [talkAt, talkAt + 26], [0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          scale: interpolate(frame, [talkAt, talkAt + 26], [1, 1.7], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          }),
          transformOrigin: `${x}px ${y}px`,
        }}
      />

      <circle
        cx={x}
        cy={y}
        r={NODE_R}
        fill={colors.surface}
        stroke={LINK}
        strokeWidth={2}
      />
      <circle
        cx={x}
        cy={y}
        r={NODE_R}
        fill="none"
        stroke={accent}
        strokeWidth={2}
        style={{
          opacity: interpolate(frame, [talkAt - 6, talkAt + 4], [0.25, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* The label swaps sides so it never collides with the speech bubble. */}
      <text
        x={x}
        y={agent.bubble === "top" ? y + NODE_R + 46 : y - NODE_R - 30}
        textAnchor="middle"
        fill={colors.muted}
        style={{
          fontFamily: fonts.mono,
          fontSize: 30,
          letterSpacing: "0.1em",
        }}
      >
        {agent.label}
      </text>
    </g>
  );
};

const BUBBLE_FONT = 40;
const BUBBLE_H = 76;
/** Geist Mono advance width at `BUBBLE_FONT`. */
const CHAR_W = BUBBLE_FONT * 0.61;

const SpeechBubble: React.FC<{ agent: AgentSpec }> = ({ agent }) => {
  const frame = useCurrentFrame();
  const { saysAt } = agent;

  if (frame < saysAt - 4 || frame > saysAt + BUBBLE_HOLD + 8) {
    return null;
  }

  const accent = accents[agent.id];
  const width = agent.says.length * CHAR_W + 64;
  const above = agent.bubble === "top";
  const x = agent.position.x - width / 2;
  const y = above
    ? agent.position.y - NODE_R - 40 - BUBBLE_H
    : agent.position.y + NODE_R + 40;
  const tailY = above ? y + BUBBLE_H : y;
  const tailDir = above ? 1 : -1;

  return (
    <g
      style={{
        opacity: interpolate(
          frame,
          [saysAt, saysAt + 6, saysAt + BUBBLE_HOLD, saysAt + BUBBLE_HOLD + 8],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
        scale: interpolate(frame, [saysAt, saysAt + 10], [0.8, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.34, 1.4, 0.64, 1),
        }),
        translate: interpolate(
          frame,
          [saysAt, saysAt + 12],
          [`0px ${tailDir * 10}px`, "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          },
        ),
        transformOrigin: `${agent.position.x}px ${tailY}px`,
      }}
    >
      <path
        d={`M ${agent.position.x - 14} ${tailY} L ${agent.position.x} ${tailY + tailDir * 18} L ${agent.position.x + 14} ${tailY} Z`}
        fill={colors.surface}
        stroke={accent}
        strokeWidth={2}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={BUBBLE_H}
        rx={18}
        fill={colors.surface}
        stroke={accent}
        strokeWidth={2}
      />
      <text
        x={agent.position.x}
        y={y + BUBBLE_H / 2 + 14}
        textAnchor="middle"
        fill={colors.text}
        style={{ fontFamily: fonts.mono, fontSize: BUBBLE_FONT }}
      >
        {agent.says}
      </text>
    </g>
  );
};
