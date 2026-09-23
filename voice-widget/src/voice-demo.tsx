import { useEffect, useRef, useState } from 'react';
import { type AgentState } from '@livekit/components-react';

import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';

type Speaker = 'client' | 'agent';
type DialogueLine = { speaker: Speaker; text: string };

const dialogue: DialogueLine[] = [
  { speaker: 'client', text: 'Hola, tengo una duda sobre vuestro servicio.' },
  { speaker: 'agent', text: 'Claro. Cuéntame qué necesitas y te ayudo con el siguiente paso.' },
  { speaker: 'client', text: 'Quiero saber qué opciones tengo para mi negocio.' },
  { speaker: 'agent', text: 'He recogido tu consulta. El equipo podrá explicarte las opciones para tu caso.' }
];

const statusText: Record<'ready' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'done', string> = {
  ready: 'Ejemplo listo para reproducir',
  connecting: 'Iniciando ejemplo',
  listening: 'Escuchando al cliente',
  thinking: 'Preparando respuesta',
  speaking: 'Respondiendo por voz',
  done: 'Consulta lista para el equipo'
};

type DemoStatus = keyof typeof statusText;

function wait(ms: number, signal: AbortSignal): Promise<boolean> {
  return new Promise((resolve) => {
    if (signal.aborted) return resolve(false);

    const timer = window.setTimeout(() => finish(true), ms);
    const onAbort = () => finish(false);
    const finish = (completed: boolean) => {
      window.clearTimeout(timer);
      signal.removeEventListener('abort', onAbort);
      resolve(completed);
    };

    signal.addEventListener('abort', onAbort, { once: true });
  });
}

function speak(text: string, signal: AbortSignal): Promise<boolean> {
  if (!('speechSynthesis' in window)) return wait(Math.max(2000, text.length * 55), signal);

  return new Promise((resolve) => {
    if (signal.aborted) return resolve(false);

    const utterance = new SpeechSynthesisUtterance(text);
    const spanishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('es'));
    if (spanishVoice) utterance.voice = spanishVoice;
    utterance.lang = 'es-ES';
    utterance.rate = 1.02;

    let settled = false;
    const fallback = window.setTimeout(() => finish(true), Math.max(5000, text.length * 115));
    const onAbort = () => {
      window.speechSynthesis.cancel();
      finish(false);
    };
    const finish = (completed: boolean) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallback);
      signal.removeEventListener('abort', onAbort);
      resolve(completed);
    };

    signal.addEventListener('abort', onAbort, { once: true });
    utterance.onend = () => finish(true);
    utterance.onerror = () => finish(true);
    window.speechSynthesis.speak(utterance);
  });
}

export function VoiceDemo() {
  const [status, setStatus] = useState<DemoStatus>('ready');
  const [lines, setLines] = useState<DialogueLine[]>([]);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const stop = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setStatus('ready');
    setLines([]);
  };

  const play = async () => {
    if (playing) {
      stop();
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    window.speechSynthesis?.cancel();
    setLines([]);
    setStatus('connecting');
    setPlaying(true);
    setHasPlayed(false);

    if (!(await wait(500, controller.signal))) return;

    for (const line of dialogue) {
      if (controller.signal.aborted) return;

      if (line.speaker === 'agent') {
        setStatus('thinking');
        if (!(await wait(700, controller.signal))) return;
        setStatus('speaking');
        setLines((current) => [...current, line]);
        if (!(await speak(line.text, controller.signal))) return;
        if (!(await wait(300, controller.signal))) return;
      } else {
        setStatus('listening');
        setLines((current) => [...current, line]);
        if (!(await wait(1800, controller.signal))) return;
      }
    }

    setStatus('done');
    setPlaying(false);
    setHasPlayed(true);
    controllerRef.current = null;
  };

  const agentState: AgentState =
    status === 'connecting' || status === 'listening' || status === 'thinking' || status === 'speaking'
      ? status
      : 'idle';

  return (
    <section className="voice-demo" aria-label="Demostración guiada de un asistente de voz">
      <header className="voice-demo__top">
        <span className="voice-demo__brand">INV / VOZ</span>
        <span className="voice-demo__badge">
          <span aria-hidden="true" /> DEMO GUIADA
        </span>
      </header>

      <div className="voice-demo__visual">
        <div className="voice-demo__orb" aria-hidden="true">
          <AgentAudioVisualizerAura
            size="lg"
            state={agentState}
            volume={status === 'speaking' ? 0.55 : 0}
            color="#7590FF"
            colorShift={0.1}
            themeMode="dark"
            className="voice-demo__aura"
          />
        </div>
        <p className="voice-demo__status" aria-live="polite">
          <span aria-hidden="true" />
          {statusText[status]}
        </p>
      </div>

      <div className="voice-demo__conversation">
        <div className="voice-demo__conversation-head">
          <span>Consulta</span>
          <span>EJEMPLO DE VOZ</span>
        </div>
        <div
          className="voice-demo__transcript"
          ref={transcriptRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {lines.length === 0 ? (
            <p className="voice-demo__empty">
              Pulsa «Reproducir demo» para seguir una conversación de principio a fin.
            </p>
          ) : (
            lines.map((line, index) => (
              <p className={`voice-demo__line voice-demo__line--${line.speaker}`} key={`${index}-${line.speaker}`}>
                <span>{line.speaker === 'agent' ? 'ASISTENTE' : 'CLIENTE'}</span>
                {line.text}
              </p>
            ))
          )}
        </div>
      </div>

      {status === 'done' && <p className="voice-demo__result">✓ Consulta recogida · pendiente de respuesta</p>}

      <div className="voice-demo__footer">
        <button className="voice-demo__play" type="button" onClick={play}>
          <span aria-hidden="true">{playing ? '■' : '▶'}</span>
          {playing ? 'Detener' : hasPlayed ? 'Repetir demo' : 'Reproducir demo'}
        </button>
        <p>Ejemplo ilustrativo · voz sintetizada</p>
      </div>
    </section>
  );
}
