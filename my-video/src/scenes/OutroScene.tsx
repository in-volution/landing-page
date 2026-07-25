import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
  Interactive,
} from "remotion";
import { DotGridBackground } from "../components/DotGridBackground";
import { colors, fonts } from "../theme";

type Props = {
  headline: string;
  subline: string;
};

export const OutroScene: React.FC<Props> = ({ headline, subline }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DotGridBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 160px",
          textAlign: "center",
        }}
      >
        <Img
          src={staticFile("involution-logo-horizontal-white-accent.png")}
          style={{
            /* 50, no 58: el wordmark Despliegue va en Geist Bold y a igual
               altura pesa más que el logotipo anterior. */
            height: 50,
            width: "auto",
            opacity: interpolate(frame, [6, 32], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [6, 40], [0.92, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            marginBottom: 44,
          }}
        />

        <Interactive.Div
          name="Outro headline"
          style={{
            opacity: interpolate(frame, [34, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [34, 60], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            fontFamily: fonts.sans,
            fontSize: 58,
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1.12,
            color: colors.white,
            marginBottom: 24,
            maxWidth: 1520,
          }}
        >
          {headline}
        </Interactive.Div>

        <Interactive.Div
          name="Outro subline"
          style={{
            opacity: interpolate(frame, [56, 82], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.sans,
            fontSize: 28,
            color: colors.muted,
            lineHeight: 1.5,
            maxWidth: 880,
          }}
        >
          {subline}
        </Interactive.Div>

        <Interactive.Div
          name="Outro footer"
          style={{
            opacity: interpolate(frame, [86, 110], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            marginTop: 52,
            paddingTop: 26,
            borderTop: `1px solid ${colors.line}`,
            fontFamily: fonts.mono,
            fontSize: 19,
            color: colors.faint,
            letterSpacing: "0.06em",
          }}
        >
          involution.es · agentes de IA en producción
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
