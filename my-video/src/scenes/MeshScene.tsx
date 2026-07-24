import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Interactive } from "remotion";
import { DotGridBackground } from "../components/DotGridBackground";
import { MeshGraph } from "../components/MeshGraph";
import { Terminal } from "../components/Terminal";
import { BEATS } from "../lib/choreography";
import { colors, fonts } from "../theme";

type Props = {
  eyebrow: string;
};

export const MeshScene: React.FC<Props> = ({ eyebrow }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <DotGridBackground />

      <MeshGraph
        graphInFrame={BEATS.graphIn}
        activations={{
          detector: BEATS.detector,
          orchestrator: BEATS.orchestrator,
          ops: BEATS.ops,
          finance: BEATS.finance,
          crm: BEATS.crm,
          auditor: BEATS.auditor,
        }}
      />

      <Interactive.Div
        name="Scene eyebrow"
        style={{
          position: "absolute",
          top: 76,
          left: 150,
          opacity: interpolate(frame, [8, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [8, 30], ["0px 10px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          fontFamily: fonts.mono,
          fontSize: 20,
          letterSpacing: "0.1em",
          color: colors.emerald,
        }}
      >
        {eyebrow}
      </Interactive.Div>

      <Interactive.Div
        name="Parallel callout"
        style={{
          position: "absolute",
          top: 76,
          right: 150,
          opacity: interpolate(frame, [158, 182, 300, 320], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontFamily: fonts.mono,
          fontSize: 20,
          letterSpacing: "0.06em",
          color: colors.sky,
        }}
      >
        3 agentes ejecutando en paralelo
      </Interactive.Div>

      <Terminal />
    </AbsoluteFill>
  );
};
