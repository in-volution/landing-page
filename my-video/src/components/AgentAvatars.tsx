import {
  AbsoluteFill,
  Img,
  Interactive,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
} from "remotion";
import { AGENTS, NODE_R, appearAtOf } from "../lib/heroLoop";

/** Inset so the accent ring drawn in the SVG stays visible around the portrait. */
const AVATAR_R = NODE_R - 5;

/**
 * The rendered AI agent portraits, laid on top of the swarm SVG at the exact
 * node coordinates. HTML `<Img>` rather than SVG `<image>` so Remotion waits
 * for every portrait to decode before it captures a frame.
 */
export const AgentAvatars: React.FC = () => {
  return (
    <AbsoluteFill>
      {AGENTS.map((agent, index) => (
        <Avatar
          key={agent.id}
          id={agent.id}
          x={agent.position.x}
          y={agent.position.y}
          appearAt={appearAtOf(index)}
          talkAt={agent.saysAt}
        />
      ))}
    </AbsoluteFill>
  );
};

const Avatar: React.FC<{
  id: string;
  x: number;
  y: number;
  appearAt: number;
  talkAt: number;
}> = ({ id, x, y, appearAt, talkAt }) => {
  const frame = useCurrentFrame();

  return (
    <Interactive.Div
      name={`Agente ${id}`}
      style={{
        position: "absolute",
        left: x - AVATAR_R,
        top: y - AVATAR_R,
        width: AVATAR_R * 2,
        height: AVATAR_R * 2,
        borderRadius: "50%",
        overflow: "hidden",
        opacity: interpolate(frame, [appearAt, appearAt + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        // Pops in with the node, then leans forward while the agent speaks.
        scale: interpolate(
          frame,
          [appearAt, appearAt + 16, talkAt, talkAt + 8, talkAt + 22],
          [0.5, 1, 1, 1.08, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.34, 1.4, 0.64, 1),
          },
        ),
      }}
    >
      <Img
        src={staticFile(`agents/${id}.png`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 42%",
          // The renders are very dark; lift them so they read on the panel.
          filter: "brightness(1.18) contrast(1.05)",
        }}
      />
    </Interactive.Div>
  );
};
