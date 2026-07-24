import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  interpolate,
  Easing,
  Interactive,
} from "remotion";
import { DotGridBackground } from "../../components/DotGridBackground";
import { colors, fonts } from "../../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Props = {
  tagline: string;
};

export const S6Cierre: React.FC<Props> = ({ tagline }) => {
  const frame = useCurrentFrame();

  // Fade the whole scene back to the quiet grid so the video loops seamlessly.
  const loopOut = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <DotGridBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 200px",
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Logo"
          style={{
            opacity: interpolate(frame, [6, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [6, 30], ["0px 14px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            }),
            marginBottom: 48,
          }}
        >
          <Img src={staticFile("involution-logo-white.png")} style={{ height: 100, width: "auto" }} />
        </Interactive.Div>

        <Interactive.Div
          name="Tagline"
          style={{
            opacity: interpolate(frame, [24, 44], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.sans,
            fontSize: 68,
            fontWeight: 500,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: colors.white,
            maxWidth: 1400,
            marginBottom: 30,
          }}
        >
          {tagline}
        </Interactive.Div>

        <Interactive.Div
          name="Signature"
          style={{
            opacity: interpolate(frame, [42, 58], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.mono,
            fontSize: 28,
            letterSpacing: "0.06em",
            color: colors.faint,
          }}
        >
          Involution · AI-Powered Automation
        </Interactive.Div>
      </AbsoluteFill>

      <AbsoluteFill style={{ backgroundColor: colors.bg, opacity: loopOut }} />
    </AbsoluteFill>
  );
};
