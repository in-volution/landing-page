import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Layout, VoiceCore } from './core';
import {
  architecture,
  conversations,
  cursor,
  heroIntro,
  magnetic,
  navScroll,
  scrollReveals,
  tilt
} from './interactions';

gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lowPower = innerWidth < 700 || (navigator.hardwareConcurrency ?? 8) <= 4;

function layouts(): Record<string, Layout> {
  const mobile = innerWidth < 900;
  return {
    hero: mobile ? { x: 0.9, y: 1.25, scale: 0.75, opacity: 0.45 } : { x: 1.9, y: 0.05, scale: 1.15, opacity: 1 },
    ambient: mobile ? { x: 0.6, y: 0, scale: 0.9, opacity: 0.22 } : { x: 2.8, y: -0.4, scale: 1.3, opacity: 0.3 },
    hidden: { x: 0, y: -0.5, scale: 0.8, opacity: 0.08 },
    final: mobile ? { x: 0, y: 0.1, scale: 0.95, opacity: 0.9 } : { x: 0, y: 0.05, scale: 1.35, opacity: 0.85 }
  };
}

// The page remains usable when WebGL is unavailable or motion is reduced.
if (!reduced) {
  const canvas = document.querySelector<HTMLCanvasElement>('#gl');
  if (canvas) {
    try {
      const core = new VoiceCore(canvas, { lowPower });
      const setLayout = (name: string) => (core.layout = { ...layouts()[name] });
      setLayout('hero');
      core.snap();
      core.currentLayout.opacity = 0;
      core.currentLayout.scale *= 0.4;

      addEventListener('scroll', () => (core.scroll = scrollY), { passive: true });
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: 'bottom 30%',
        onToggle: (s) => s.isActive && setLayout('hero')
      });
      ScrollTrigger.create({
        trigger: '#capacidades',
        start: 'top 70%',
        end: 'bottom 30%',
        onToggle: (s) => s.isActive && setLayout('ambient')
      });
      ScrollTrigger.create({
        trigger: '.arch',
        start: 'top 70%',
        end: 'bottom 30%',
        onToggle: (s) => s.isActive && setLayout('hidden')
      });
      ScrollTrigger.create({
        trigger: '#casos',
        start: 'top 70%',
        end: '#faq bottom 30%',
        onToggle: (s) => s.isActive && setLayout('ambient')
      });
      ScrollTrigger.create({
        trigger: '.final-cta',
        start: 'top 60%',
        end: 'bottom bottom',
        onToggle: (s) => s.isActive && setLayout('final')
      });
    } catch (error) {
      canvas.hidden = true;
      console.warn('Visualización 3D no disponible:', error);
    }
  }
}

document.documentElement.classList.add('js');
heroIntro(reduced);
scrollReveals(reduced);
navScroll();
tilt();
magnetic();
if (!reduced) cursor();
conversations(reduced);
if (!reduced) architecture(false);
addEventListener('resize', () => ScrollTrigger.refresh());
