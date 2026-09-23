import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';

export function VoiceAura() {
  return (
    <AgentAudioVisualizerAura
      size="lg"
      state="idle"
      color="#7590FF"
      colorShift={0.1}
      themeMode="dark"
      className="hero-aura"
      aria-hidden="true"
    />
  );
}
