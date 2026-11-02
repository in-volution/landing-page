const svg = (paths: string) => `<svg aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`;
const icons = {
  check: svg('<path d="m5 12 4 4L19 6"/>'),
  calendar: svg('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 11h18"/>'),
  person: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>')
};

const scenarios: Record<
  string,
  { client: string; agent: string; result: string; note: string; route: string; icon: string }
> = {
  consulta: {
    client: '¿Cuál es vuestro horario?',
    agent: 'De lunes a viernes, de 9 a 18 h.',
    result: 'Consulta resuelta',
    note: 'Tu equipo sigue con su trabajo.',
    route: 'Resuelta',
    icon: icons.check
  },
  cita: {
    client: '¿Puedo cambiar mi cita a la tarde?',
    agent: 'Dejo tu petición al equipo para que te confirme.',
    result: 'Solicitud preparada',
    note: 'El equipo revisa y confirma el cambio.',
    route: 'Solicitud',
    icon: icons.calendar
  },
  incidencia: {
    client: 'Mi pedido llegó incompleto.',
    agent: 'Recogemos el motivo para que el equipo lo revise.',
    result: 'Al equipo, con contexto',
    note: 'La incidencia queda preparada para seguimiento.',
    route: 'Tu equipo',
    icon: icons.person
  }
};

const views: Record<string, { label: string; value: number; title: string; action: string; tag: string }[]> = {
  demanda: [
    {
      label: 'Consultas habituales',
      value: 48,
      title: 'Las mismas preguntas, una y otra vez.',
      action: 'Haz más visibles tus horarios y condiciones.',
      tag: 'Mejora tu información'
    },
    {
      label: 'Cambios de cita',
      value: 32,
      title: 'Tus clientes piden otros horarios.',
      action: 'Revisa las franjas que más solicitan.',
      tag: 'Ajusta tu disponibilidad'
    },
    {
      label: 'Incidencias',
      value: 20,
      title: 'Hay problemas que se repiten.',
      action: 'Agrupa los motivos y revisa su origen.',
      tag: 'Mejora tus procesos'
    }
  ],
  resolucion: [
    {
      label: 'Resueltas en la llamada',
      value: 60,
      title: 'El cliente obtiene su respuesta.',
      action: 'Identifica qué consultas atiende el asistente.',
      tag: 'Atención automatizada'
    },
    {
      label: 'Derivadas al equipo',
      value: 25,
      title: 'Una persona continúa el caso.',
      action: 'Revisa qué motivos necesitan a tu equipo.',
      tag: 'Atención con contexto'
    },
    {
      label: 'Pendientes',
      value: 15,
      title: 'Un caso sigue abierto.',
      action: 'Incorpora el seguimiento para conocer su resolución.',
      tag: 'Da continuidad'
    }
  ]
};

export function voiceInteractions() {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const demo = document.querySelector<HTMLElement>('[data-voice-demo]');
  if (demo) {
    const get = <T extends HTMLElement>(selector: string) => demo.querySelector<T>(selector)!;
    const playButton = get<HTMLButtonElement>('[data-demo-play]');
    const playLabel = get<HTMLElement>('[data-play-label]');
    const playIcon = playButton.querySelector('path')!;
    let key = 'consulta';
    let phase = 3;
    let playing = false;
    let started = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const delays = [1000, 1800, 1200];

    const stopTimer = () => {
      clearTimeout(timer);
      timer = undefined;
    };
    const paint = () => {
      demo.dataset.phase = String(phase);
      demo.classList.toggle('is-playing', playing);
      playLabel.textContent = playing ? 'Pausar' : phase === 3 ? 'Repetir' : 'Continuar';
      playButton.setAttribute('aria-label', `${playLabel.textContent} animación`);
      playIcon.setAttribute('d', playing ? 'M9 5v14M15 5v14' : 'm9 5 11 7-11 7Z');
    };
    const schedule = () => {
      stopTimer();
      if (!playing || phase === 3) return;
      timer = setTimeout(() => {
        phase += 1;
        if (phase === 3) playing = false;
        paint();
        schedule();
      }, delays[phase]);
    };
    const pause = () => {
      stopTimer();
      playing = false;
      paint();
    };
    const run = () => {
      started = true;
      stopTimer();
      if (motion.matches) {
        phase = 3;
        playing = false;
      } else {
        phase = 0;
        playing = true;
      }
      paint();
      schedule();
    };
    const select = (next: string) => {
      if (!scenarios[next]) return;
      key = next;
      const scenario = scenarios[key];
      demo.dataset.scenario = key;
      demo.querySelectorAll<HTMLImageElement>('[data-scenario-art]').forEach((image) => {
        image.hidden = image.dataset.scenarioArt !== key;
      });
      get<HTMLElement>('[data-client-quote]').textContent = scenario.client;
      get<HTMLElement>('[data-agent-quote]').textContent = scenario.agent;
      get<HTMLElement>('[data-result-title]').textContent = scenario.result;
      get<HTMLElement>('[data-result-note]').textContent = scenario.note;
      get<HTMLElement>('[data-route-label]').textContent = scenario.route;
      // All icons are fixed SVG strings defined in this module.
      get<HTMLElement>('[data-route-icon]').innerHTML = scenario.icon;
      demo.querySelectorAll<HTMLButtonElement>('[data-scenario]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.scenario === key));
      });
      run();
    };

    demo.querySelectorAll<HTMLElement>('[data-demo-controls]').forEach((el) => (el.hidden = false));
    demo.querySelectorAll<HTMLButtonElement>('button[data-scenario]').forEach((button) => {
      button.addEventListener('click', () => select(button.dataset.scenario!));
    });
    playButton.addEventListener('click', () => {
      if (playing) pause();
      else if (phase === 3 || motion.matches) run();
      else {
        playing = true;
        paint();
        schedule();
      }
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !started) run();
        else if (!entry.isIntersecting && playing) pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(demo);
    motion.addEventListener('change', () => {
      if (motion.matches) {
        stopTimer();
        phase = 3;
        playing = false;
        paint();
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && playing) pause();
    });
    addEventListener('pagehide', () => {
      stopTimer();
      observer.disconnect();
    });
    paint();
  }

  const dashboard = document.querySelector<HTMLElement>('[data-voice-insights]');
  if (dashboard) {
    const buttons = Array.from(dashboard.querySelectorAll<HTMLButtonElement>('[data-bar-index]'));
    const finding = dashboard.querySelector<HTMLElement>('.voice-finding')!;
    let view = 'demanda';
    let selected = 0;
    let animation: Animation | undefined;
    const render = () => {
      const rows = views[view];
      dashboard.dataset.view = view;
      buttons.forEach((button, i) => {
        const row = rows[i];
        button.querySelector('[data-bar-label]')!.textContent = row.label;
        button.querySelector('[data-bar-value]')!.textContent = String(row.value);
        button.style.setProperty('--bar-size', String(row.value / 100));
        button.setAttribute('aria-label', `${row.label}: ${row.value} de 100. Ver detalle`);
        button.setAttribute('aria-pressed', String(i === selected));
      });
      const row = rows[selected];
      finding.querySelector('[data-finding-title]')!.textContent = row.title;
      finding.querySelector('[data-finding-action]')!.textContent = row.action;
      finding.querySelector('[data-finding-tag]')!.textContent = row.tag;
      dashboard.querySelectorAll<HTMLButtonElement>('[data-insight-view]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.insightView === view));
      });
      animation?.cancel();
      if (!motion.matches) {
        animation = finding.animate(
          [
            { opacity: 0.3, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 350, easing: 'ease-out' }
        );
      }
    };
    dashboard.querySelectorAll<HTMLElement>('[data-insight-controls]').forEach((el) => (el.hidden = false));
    dashboard.querySelectorAll<HTMLButtonElement>('[data-insight-view]').forEach((button) => {
      button.addEventListener('click', () => {
        view = button.dataset.insightView!;
        selected = 0;
        render();
      });
    });
    buttons.forEach((button, i) => {
      button.disabled = false;
      button.addEventListener('click', () => {
        selected = i;
        render();
      });
    });
    dashboard.classList.add('voice-ready');
    render();
  }

  const connections = document.querySelector<HTMLElement>('[data-voice-connections]');
  if (connections) {
    const captions: Record<string, string> = {
      agenda: 'Solicitudes de cita listas para revisar.',
      crm: 'El motivo y los datos, en tu CRM.',
      equipo: 'Un resumen para que tu equipo continúe.'
    };
    let animation: Animation | undefined;
    const animatePath = () => {
      animation?.cancel();
      const path = connections.querySelector<SVGPathElement>(`[data-connection-path="${connections.dataset.tool}"]`)!;
      if (!motion.matches) {
        animation = path.animate([{ strokeDashoffset: '32' }, { strokeDashoffset: '0' }], {
          duration: 900,
          iterations: 2
        });
      }
    };
    const buttons = Array.from(connections.querySelectorAll<HTMLButtonElement>('[data-tool-button]'));
    buttons.forEach((button) => {
      button.disabled = false;
      button.addEventListener('click', () => {
        const key = button.dataset.toolButton!;
        connections.dataset.tool = key;
        buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        connections.querySelector('[data-tool-caption]')!.textContent = captions[key];
        animatePath();
      });
    });
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animatePath();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(connections);
    motion.addEventListener('change', () => {
      if (motion.matches) animation?.cancel();
    });
    addEventListener('pagehide', () => {
      animation?.cancel();
      observer.disconnect();
    });
  }

  const journey = document.querySelector<HTMLElement>('[data-voice-journey]');
  if (journey) {
    const captions = [
      'Las consultas que recibe tu equipo.',
      'Las dudas y demandas que se repiten.',
      'Los casos que necesitan atención.',
      'Las respuestas y procesos que conviene mejorar.'
    ];
    const buttons = Array.from(journey.querySelectorAll<HTMLButtonElement>('[data-journey-step]'));
    buttons.forEach((button, i) => {
      button.disabled = false;
      button.addEventListener('click', () => {
        buttons.forEach((item, index) => item.setAttribute('aria-pressed', String(index === i)));
        journey.style.setProperty('--journey-progress', String((i + 1) / 4));
        journey.querySelector('[data-journey-caption]')!.textContent = captions[i];
      });
    });
    journey.classList.add('voice-ready');
  }
}
