import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { z } from "zod";
import { S1ViejoModelo } from "./scenes/hero/S1ViejoModelo";
import { S2Anuncio } from "./scenes/hero/S2Anuncio";
import { S3Giro } from "./scenes/hero/S3Giro";
import { S4Pasos } from "./scenes/hero/S4Pasos";
import { S5Operacion } from "./scenes/hero/S5Operacion";
import { S6Cierre } from "./scenes/hero/S6Cierre";
import { SCENE, TRANSITION } from "./lib/heroChoreography";
import { colors } from "./theme";

export const heroSchema = z.object({
  anuncioHeadline: z.string(),
  anuncioSubline: z.string(),
  cierreTagline: z.string(),
});

export type HeroProps = z.infer<typeof heroSchema>;

const transition = () => (
  <TransitionSeries.Transition
    presentation={fade()}
    timing={linearTiming({ durationInFrames: TRANSITION })}
  />
);

export const HeroFuerzaLaboral: React.FC<HeroProps> = ({
  anuncioHeadline,
  anuncioSubline,
  cierreTagline,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE.viejoModelo}>
          <S1ViejoModelo />
        </TransitionSeries.Sequence>

        {transition()}

        <TransitionSeries.Sequence durationInFrames={SCENE.anuncio}>
          <S2Anuncio headline={anuncioHeadline} subline={anuncioSubline} />
        </TransitionSeries.Sequence>

        {transition()}

        <TransitionSeries.Sequence durationInFrames={SCENE.giro}>
          <S3Giro />
        </TransitionSeries.Sequence>

        {transition()}

        <TransitionSeries.Sequence durationInFrames={SCENE.pasos}>
          <S4Pasos />
        </TransitionSeries.Sequence>

        {transition()}

        <TransitionSeries.Sequence durationInFrames={SCENE.operacion}>
          <S5Operacion />
        </TransitionSeries.Sequence>

        {transition()}

        <TransitionSeries.Sequence durationInFrames={SCENE.cierre}>
          <S6Cierre tagline={cierreTagline} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
