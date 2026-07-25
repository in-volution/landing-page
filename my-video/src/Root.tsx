import "./index.css";
import { Composition } from "remotion";
import { MultiAgentSystem, multiAgentSchema } from "./Composition";
import { HeroLoop } from "./HeroComposition";
import { DURATION, FPS } from "./lib/heroLoop";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MultiAgentSystem"
        component={MultiAgentSystem}
        durationInFrames={796}
        fps={30}
        width={1920}
        height={1080}
        schema={multiAgentSchema}
        defaultProps={{
          timestamp: "02:14",
          hookLine:
            "Entra un pedido urgente. No hay nadie en la oficina.",
          eyebrow: "/ RED MULTIAGENTE",
          outroHeadline: "Agentes de IA que trabajan como tu mejor equipo",
          outroSubline:
            "Automatización impulsada por IA para cada decisión de tu negocio.",
        }}
      />

      <Composition
        id="HeroLoop"
        component={HeroLoop}
        durationInFrames={DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
