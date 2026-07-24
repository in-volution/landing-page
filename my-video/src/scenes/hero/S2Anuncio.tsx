import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../../components/DotGridBackground";
import { colors, fonts } from "../../theme";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

type Props = {
  headline: string;
  subline: string;
};

export const S2Anuncio: React.FC<Props> = ({ headline, subline }) => {
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
        <Interactive.Div
          name="Headline"
          style={{
            opacity: interpolate(frame, [6, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [6, 30], ["0px 22px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            }),
            fontFamily: fonts.sans,
            fontSize: 150,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            color: colors.white,
            maxWidth: 1560,
            marginBottom: 40,
          }}
        >
          {headline}
        </Interactive.Div>

        <Interactive.Div
          name="Subline"
          style={{
            opacity: interpolate(frame, [40, 60], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [40, 60], ["0px 14px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE,
            }),
            fontFamily: fonts.mono,
            fontSize: 40,
            letterSpacing: "0.01em",
            color: colors.emerald,
          }}
        >
          {subline}
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
