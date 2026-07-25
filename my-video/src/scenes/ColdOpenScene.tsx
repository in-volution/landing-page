import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../components/DotGridBackground";
import { colors, fonts } from "../theme";

type Props = {
  timestamp: string;
  hookLine: string;
};

export const ColdOpenScene: React.FC<Props> = ({ timestamp, hookLine }) => {
  const frame = useCurrentFrame();

  const promptText = "esperando eventos…";
  const promptChars = Math.floor(
    interpolate(frame, [6, 30], [0, promptText.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <AbsoluteFill>
      <DotGridBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 240px",
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Runtime prompt"
          style={{
            opacity: interpolate(frame, [0, 12, 62, 74], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.mono,
            fontSize: 22,
            color: colors.faint,
            marginBottom: 40,
          }}
        >
          involution-mesh · {promptText.slice(0, promptChars)}
        </Interactive.Div>

        <Interactive.Div
          name="Timestamp"
          style={{
            opacity: interpolate(frame, [40, 62], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [40, 70], [0.94, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            fontFamily: fonts.sans,
            fontSize: 150,
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            color: colors.white,
            marginBottom: 28,
          }}
        >
          {timestamp}
        </Interactive.Div>

        <Interactive.Div
          name="Hook line"
          style={{
            opacity: interpolate(frame, [66, 90], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [66, 90], ["0px 14px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            fontFamily: fonts.sans,
            fontSize: 40,
            fontWeight: 400,
            color: colors.muted,
            lineHeight: 1.4,
            maxWidth: 1100,
          }}
        >
          {hookLine}
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
