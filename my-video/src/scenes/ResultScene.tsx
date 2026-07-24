import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../components/DotGridBackground";
import { colors, fonts } from "../theme";

export const ResultScene: React.FC = () => {
  const frame = useCurrentFrame();

  const seconds = interpolate(frame, [24, 66], [0, 0.94], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const agents = interpolate(frame, [32, 70], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <DotGridBackground />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 150px",
        }}
      >
        <Interactive.Div
          name="Result eyebrow"
          style={{
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontFamily: fonts.mono,
            fontSize: 20,
            letterSpacing: "0.1em",
            color: colors.emerald,
            marginBottom: 56,
          }}
        >
          / RESULTADO
        </Interactive.Div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            width: "100%",
            maxWidth: 1500,
          }}
        >
          <Metric
            frame={frame}
            appearAt={18}
            value={`${seconds.toFixed(2)}s`}
            label="de extremo a extremo"
            accent={colors.white}
            divider={false}
          />
          <Metric
            frame={frame}
            appearAt={30}
            value={`${Math.round(agents)}`}
            label="agentes en paralelo"
            accent={colors.sky}
            divider
          />
          <Metric
            frame={frame}
            appearAt={42}
            value="0"
            label="intervenciones humanas"
            accent={colors.emerald}
            divider
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Metric: React.FC<{
  frame: number;
  appearAt: number;
  value: string;
  label: string;
  accent: string;
  divider: boolean;
}> = ({ frame, appearAt, value, label, accent, divider }) => {
  return (
    <div
      style={{
        opacity: interpolate(frame, [appearAt, appearAt + 24], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [appearAt, appearAt + 24], ["0px 16px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        borderLeft: divider ? `1px solid ${colors.line}` : "1px solid transparent",
        paddingLeft: 40,
        paddingRight: 40,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 128,
          fontWeight: 500,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: accent,
          marginBottom: 20,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 21,
          color: colors.muted,
          lineHeight: 1.4,
        }}
      >
        {label}
      </div>
    </div>
  );
};
