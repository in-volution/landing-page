import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../../components/DotGridBackground";
import { STEPS } from "../../lib/heroChoreography";
import { colors, fonts } from "../../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const S4Pasos: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DotGridBackground />

      <AbsoluteFill
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 200px",
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
            fontSize: 24,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: colors.faint,
            marginBottom: 44,
          }}
        >
          modelo operativo de negocio
        </Interactive.Div>

        {STEPS.map((step) => {
          const opacity = interpolate(frame, [step.at, step.at + 18], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const shift = interpolate(frame, [step.at, step.at + 22], ["0px 18px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: EASE,
          });

          return (
            <div
              key={step.key}
              style={{
                opacity,
                translate: shift,
                display: "flex",
                alignItems: "baseline",
                gap: 22,
                marginBottom: 26,
              }}
            >
              <span style={{ color: colors.emerald, fontFamily: fonts.sans, fontSize: 60 }}>
                {step.glyph}
              </span>
              <span
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 72,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: colors.sky,
                }}
              >
                {step.key}
              </span>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 34,
                  color: colors.muted,
                }}
              >
                {step.desc}
              </span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
