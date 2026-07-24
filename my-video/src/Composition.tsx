import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { z } from "zod";
import { ColdOpenScene } from "./scenes/ColdOpenScene";
import { MeshScene } from "./scenes/MeshScene";
import { ResultScene } from "./scenes/ResultScene";
import { OutroScene } from "./scenes/OutroScene";
import { MESH_SCENE_DURATION } from "./lib/choreography";
import { colors } from "./theme";

export const multiAgentSchema = z.object({
  timestamp: z.string(),
  hookLine: z.string(),
  eyebrow: z.string(),
  outroHeadline: z.string(),
  outroSubline: z.string(),
});

export type MultiAgentProps = z.infer<typeof multiAgentSchema>;

export const MultiAgentSystem: React.FC<MultiAgentProps> = ({
  timestamp,
  hookLine,
  eyebrow,
  outroHeadline,
  outroSubline,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={105}>
          <ColdOpenScene timestamp={timestamp} hookLine={hookLine} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />

        <TransitionSeries.Sequence durationInFrames={MESH_SCENE_DURATION}>
          <MeshScene eyebrow={eyebrow} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />

        <TransitionSeries.Sequence durationInFrames={165}>
          <ResultScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 18 })}
        />

        <TransitionSeries.Sequence durationInFrames={130}>
          <OutroScene headline={outroHeadline} subline={outroSubline} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
