import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../../components/DotGridBackground";
import { colors, fonts } from "../../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const COSTS = ["más personas", "más nóminas", "más gestión"];

export const S1ViejoModelo: React.FC = () => {
  const frame = useCurrentFrame();

  const headcount = Math.round(
    interpolate(frame, [30, 92], [4, 48], {
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
          padding: "0 200px",
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Eyebrow"
          style={{
            opacity: interpolate(frame, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.mono,
            fontSize: 26,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: colors.faint,
            marginBottom: 44,
          }}
        >
          el viejo modelo
        </Interactive.Div>

        <Interactive.Div
          name="Title"
          style={{
            opacity: interpolate(frame, [8, 26], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [8, 26], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            }),
            fontFamily: fonts.sans,
            fontSize: 104,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: colors.white,
            maxWidth: 1400,
            marginBottom: 52,
          }}
        >
          Crecer siempre costó lo mismo.
        </Interactive.Div>

        <div style={{ display: "flex", gap: 26, marginBottom: 56 }}>
          {COSTS.map((label, index) => (
            <div
              key={label}
              style={{
                opacity: interpolate(frame, [30 + index * 14, 46 + index * 14], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                translate: interpolate(
                  frame,
                  [30 + index * 14, 46 + index * 14],
                  ["0px 12px", "0px 0px"],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE },
                ),
                fontFamily: fonts.mono,
                fontSize: 34,
                color: colors.muted,
                border: `1px solid ${colors.line}`,
                borderRadius: 12,
                padding: "16px 28px",
              }}
            >
              + {label}
            </div>
          ))}
        </div>

        <Interactive.Div
          name="Cost meter"
          style={{
            opacity: interpolate(frame, [58, 74], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.mono,
            fontSize: 30,
            letterSpacing: "0.02em",
            color: colors.amber,
          }}
        >
          plantilla +{headcount} · coste operativo ↑
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
