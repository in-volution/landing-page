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
      <p className="hero-aura__speech" aria-label="El asistente dice: ¿En qué te ayudo?">
        <span aria-hidden="true">¿En qué te ayudo?</span>
      </p>
    </div>
  );
}
