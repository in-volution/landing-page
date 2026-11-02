export function heroVideoBackground() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const button = document.querySelector<HTMLButtonElement>('[data-hero-video-toggle]');
  if (!video || !button) return;

  const hero = video.closest<HTMLElement>('.voice-hero')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & { connection?: EventTarget & { saveData?: boolean } }).connection;
  let visible = false;
  let manuallyPaused = false;
  let failed = false;
  let requestId = 0;

  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;

  const allowed = () => !motion.matches && !connection?.saveData && !failed;
  const shouldPlay = () => allowed() && visible && !document.hidden && !manuallyPaused;
  const paint = () => {
    button.hidden = !allowed() || !video.hasAttribute('src');
    button.textContent = video.paused ? 'Reproducir fondo' : 'Pausar fondo';
    button.setAttribute('aria-label', video.paused ? 'Reproducir vídeo de fondo' : 'Pausar vídeo de fondo');
  };
  const update = () => {
    const currentRequest = ++requestId;
    if (!shouldPlay()) {
      video.pause();
      paint();
      return;
    }
    // Keep the MP4 unrequested when motion reduction or data saving is enabled.
    if (!video.hasAttribute('src')) video.src = video.dataset.src!;
    const play = video.play();
    if (play) {
      void play.catch(() => {
        // A blocked autoplay leaves the poster and a manual playback control.
        if (currentRequest === requestId) paint();
      });
    }
    paint();
  };

  button.addEventListener('click', () => {
    manuallyPaused = !video.paused;
    update();
  });
  video.addEventListener('play', () => {
    if (!shouldPlay()) video.pause();
    paint();
  });
  video.addEventListener('pause', paint);
  video.addEventListener('error', () => {
    failed = true;
    video.hidden = true;
    update();
  });
  const observer = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      update();
    },
    { threshold: 0.05 }
  );
  observer.observe(hero);
  motion.addEventListener('change', update);
  connection?.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  addEventListener('pageshow', update);
  addEventListener('pagehide', (event) => {
    requestId += 1;
    video.pause();
    if (!event.persisted) observer.disconnect();
  });
  paint();
}
