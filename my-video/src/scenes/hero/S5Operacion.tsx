import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../../components/DotGridBackground";
import { HeroMesh } from "../../components/HeroMesh";
import { colors, fonts } from "../../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const METRICS: { value: string; label: string; accent: string }[] = [
  { value: "24/7", label: "operación autónoma", accent: colors.white },
  { value: "10×", label: "más eficiente que contratar", accent: colors.white },
  { value: "0", label: "intervención humana", accent: colors.emerald },
];

export const S5Operacion: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DotGridBackground />
      <HeroMesh packets showLabels={false} opacity={0.5} />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 42%, rgba(8,8,10,0.82) 42%, transparent 82%)",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 180px",
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Title"
          style={{
            opacity: interpolate(frame, [6, 24], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [6, 24], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            }),
            fontFamily: fonts.sans,
            fontSize: 88,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: colors.white,
            maxWidth: 1400,
            marginBottom: 20,
          }}
        >
          Ejecutan las operaciones de tu empresa.
        </Interactive.Div>

        <Interactive.Div
          name="Subline"
          style={{
            opacity: interpolate(frame, [30, 48], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.mono,
            fontSize: 38,
            color: colors.muted,
            marginBottom: 60,
          }}
        >
          Como tu mejor equipo. Solo que 24/7.
        </Interactive.Div>

        <div style={{ display: "flex", gap: 22 }}>
          {METRICS.map((metric, index) => (
            <div
              key={metric.value}
              style={{
                opacity: interpolate(frame, [60 + index * 12, 78 + index * 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: interpolate(
                  frame,
                  [60 + index * 12, 80 + index * 12],
                  ["0px 14px", "0px 0px"],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
                ),
                minWidth: 300,
                textAlign: "center",
                border: "1px solid #2b2b33",
                borderRadius: 14,
                background: "rgba(255,255,255,0.025)",
                padding: "24px 30px",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 68,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: metric.accent,
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {metric.value}
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.faint }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
