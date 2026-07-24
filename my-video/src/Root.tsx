import "./index.css";
import { Composition } from "remotion";
import { MultiAgentSystem, multiAgentSchema } from "./Composition";
import { HeroFuerzaLaboral, heroSchema } from "./HeroComposition";
import { TOTAL } from "./lib/heroChoreography";

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
        id="HeroFuerzaLaboral"
        component={HeroFuerzaLaboral}
        durationInFrames={TOTAL}
        fps={30}
        width={1920}
        height={1080}
        schema={heroSchema}
        defaultProps={{
          anuncioHeadline: "La nueva fuerza laboral ha llegado.",
          anuncioSubline: "y no se contrata — se despliega.",
          cierreTagline: "Tecnología al servicio del potencial humano.",
        }}
      />
    </>
  );
};
