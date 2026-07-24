import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../../components/DotGridBackground";
import { HeroMesh } from "../../components/HeroMesh";
import { colors, fonts } from "../../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const S3Giro: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DotGridBackground />

      {/* Network sits in the top band; copy lives below it, no overlap. */}
      <AbsoluteFill style={{ bottom: "42%" }}>
        <HeroMesh showLabels opacity={0.9} />
      </AbsoluteFill>

      {/* Gradient scrim keeps the lower copy crisp. */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, transparent 42%, rgba(8,8,10,0.85) 60%, #08080a 74%)",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "column",
          padding: "0 200px 130px",
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Line 1"
          style={{
            opacity: interpolate(frame, [6, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.sans,
            fontSize: 58,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: colors.muted,
            marginBottom: 20,
          }}
        >
          No contratas más personal.
        </Interactive.Div>

        <Interactive.Div
          name="Line 2"
          style={{
            opacity: interpolate(frame, [34, 54], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [34, 54], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            }),
            fontFamily: fonts.sans,
            fontSize: 90,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.06,
            color: colors.white,
            maxWidth: 1400,
          }}
        >
          Despliegas equipos enteros de agentes de IA.
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
