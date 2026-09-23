import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';

export function VoiceAura() {
  return (
    <div className="hero-aura">
      <AgentAudioVisualizerAura
        size="lg"
        state="idle"
        color="#7590FF"
        colorShift={0.1}
        themeMode="dark"
        className="hero-aura__visual"
        aria-hidden="true"
      />
      <div
        className="hero-aura__conversation"
        role="group"
        aria-label="Ejemplo de conversación entre cliente y asistente"
      >
        <div className="hero-aura__turn hero-aura__turn--client">
          <span className="hero-aura__speaker">Cliente</span>
          <span className="hero-aura__text">¿Tenéis hueco mañana?</span>
        </div>
        <div className="hero-aura__turn hero-aura__turn--assistant">
          <span className="hero-aura__speaker">Asistente</span>
          <span className="hero-aura__text">Sí, ¿a qué hora?</span>
        </div>
      </div>
    </div>
  );
}
