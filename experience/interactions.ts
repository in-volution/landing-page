import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const $$ = <T extends HTMLElement>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(s));

export function heroIntro(reduced: boolean) {
  const lines = $$('.hero-title .line > span');
  const reveals = $$('.hero .reveal');
  if (reduced) {
    gsap.set([...lines, ...reveals], { opacity: 1 });
    return;
  }
  const tl = gsap.timeline({ delay: 0.25 });
  tl.fromTo(
    lines,
    { yPercent: 110, opacity: 1, rotate: 3 },
    { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.12, ease: 'expo.out' }
  );
  tl.fromTo(reveals, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.55);
}

export function scrollReveals(reduced: boolean) {
  if (reduced) return;
  for (const el of $$('.section-head, .stack-strip, .final-cta > *')) {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  }
  for (const grid of $$('.cards, .cases, .process')) {
    gsap.from(grid.children, {
      opacity: 0,
      y: 70,
      rotateX: -18,
      transformOrigin: '50% 100%',
      duration: 1.2,
      stagger: 0.09,
      ease: 'expo.out',
      clearProps: 'transform',
      scrollTrigger: { trigger: grid, start: 'top 80%' }
    });
  }
  // process: the lines draw themselves one after another
  const steps = $$('.process li');
  ScrollTrigger.create({
    trigger: '.process',
    start: 'top 75%',
    end: 'bottom 45%',
    scrub: true,
    onUpdate: (st) => {
      steps.forEach((li, i) => {
        const p = gsap.utils.clamp(0, 1, st.progress * steps.length - i);
        li.style.setProperty('--p', `${p * 100}%`);
      });
    }
  });
  gsap.from('.faq details', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.06,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%' }
  });
}

export function navScroll() {
  const nav = document.querySelector('.nav')!;
  ScrollTrigger.create({ start: 40, onToggle: (st) => nav.classList.toggle('scrolled', st.isActive) });
}

/** Cards tilt towards the pointer, with a light that follows it. */
export function tilt() {
  if (matchMedia('(hover: none)').matches) return;
  for (const el of $$('.tilt')) {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }
}

export function magnetic() {
  if (matchMedia('(hover: none)').matches) return;
  for (const el of $$('.magnetic')) {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  }
}

export function cursor() {
  if (matchMedia('(hover: none)').matches) return;
  const c = document.querySelector<HTMLElement>('.cursor')!;
  const xTo = gsap.quickTo(c, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(c, 'y', { duration: 0.35, ease: 'power3.out' });
  addEventListener('pointermove', (e) => {
    c.classList.add('on');
    xTo(e.clientX);
    yTo(e.clientY);
    const t = e.target as HTMLElement;
    c.classList.toggle('hover', Boolean(t.closest('a, button, summary, .tilt')));
  });
  document.addEventListener('pointerleave', () => c.classList.remove('on'));
}

/** Use-case cards play a short conversation when they scroll into view. */
export function conversations(reduced: boolean) {
  for (const card of $$('.case')) {
    const lines = JSON.parse(card.dataset.convo ?? '[]') as [string, string][];
    const box = card.querySelector<HTMLElement>('.convo')!;
    const play = async () => {
      for (const [who, text] of lines) {
        const b = document.createElement('div');
        b.className = `bubble ${who}`;
        box.appendChild(b);
        requestAnimationFrame(() => b.classList.add('in'));
        if (who === 'a' && !reduced) {
          const caret = document.createElement('span');
          caret.className = 'caret';
          b.appendChild(caret);
          for (const w of text.split(' ')) {
            caret.before(`${w} `);
            await wait(45 + Math.random() * 50);
          }
          caret.remove();
        } else {
          b.textContent = text;
        }
        await wait(reduced ? 0 : who === 'u' ? 700 : 900);
      }
    };
    if (reduced) void play();
    else ScrollTrigger.create({ trigger: card, start: 'top 75%', once: true, onEnter: () => void play() });
  }
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Architecture: the tilted blueprint straightens while a word travels node to node. */
export function architecture(reduced: boolean) {
  const plane = document.querySelector<HTMLElement>('.arch-plane')!;
  const nodes = $$('.node');
  const paths = $$<HTMLElement>('.arch-lines path') as unknown as SVGPathElement[];
  const steps = $$('.arch-steps li').map((li) => li.textContent ?? '');
  const n = document.querySelector<HTMLElement>('.arch-step-n')!;
  const t = document.querySelector<HTMLElement>('.arch-step-t')!;
  const svg = document.querySelector<SVGSVGElement>('.arch-lines')!;
  // which paths light up at each step
  const pathsAt = [[], ['p1'], ['p1', 'p2'], ['p1', 'p2', 'p3', 'p5'], ['p1', 'p2', 'p3', 'p5', 'p4']];
  let step = -1;

  // travelling packets
  const packets = paths.map((p) => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('r', '5');
    c.classList.add('packet');
    c.style.opacity = '0';
    svg.appendChild(c);
    return { path: p, c, len: p.getTotalLength(), off: Math.random() };
  });

  const setStep = (s: number) => {
    if (s === step) return;
    step = s;
    nodes.forEach((el) => el.classList.toggle('lit', Number(el.dataset.step) <= s));
    const lit = new Set(pathsAt[s]);
    paths.forEach((p) => p.classList.toggle('lit', lit.has(p.id)));
    packets.forEach((pk) => (pk.c.style.opacity = lit.has(pk.path.id) ? '1' : '0'));
    n.textContent = String(s + 1).padStart(2, '0');
    if (reduced) t.textContent = steps[s];
    else
      gsap.fromTo(
        t,
        { opacity: 0, y: 12, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
          onStart: () => (t.textContent = steps[s])
        }
      );
  };
  setStep(0);

  ScrollTrigger.create({
    trigger: '.arch',
    start: 'top top',
    end: 'bottom bottom',
    scrub: reduced ? false : 0.6,
    onUpdate: (st) => {
      const p = st.progress;
      setStep(Math.min(4, Math.floor(p * 5.2)));
      if (!reduced) {
        const m = innerWidth < 700;
        plane.style.setProperty('--rx', `${(m ? 48 : 58) - p * (m ? 22 : 26)}deg`);
        plane.style.setProperty('--rz', `${(m ? -12 : -22) + p * (m ? 10 : 16)}deg`);
        plane.style.setProperty('--s', `${0.95 + p * 0.1}`);
      }
    }
  });

  if (reduced) return;
  gsap.ticker.add((time) => {
    for (const pk of packets) {
      if (pk.c.style.opacity === '0') continue;
      const f = (time * 0.45 + pk.off) % 1;
      const pt = pk.path.getPointAtLength(f * pk.len);
      pk.c.setAttribute('cx', String(pt.x));
      pk.c.setAttribute('cy', String(pt.y));
    }
  });
}
