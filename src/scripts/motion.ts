import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'expo.out'; // close to cubic-bezier(0.22, 1, 0.36, 1)
let lenis: Lenis | null = null;
let cleanups: (() => void)[] = [];

const motionOn = () => document.documentElement.classList.contains('js-motion');
const isTouch = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ───────── Smooth scroll (desktop only) ───────── */
function setupLenis() {
  if (lenis || !motionOn() || isTouch()) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ───────── Nav: compact on scroll, hide on scroll down ───────── */
function setupNav() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  let last = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    const menuOpen = nav.querySelector('[data-menu-toggle]')?.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-hidden', !menuOpen && y > 400 && y > last + 2);
    if (y < last - 2) nav.classList.remove('is-hidden');
    last = y;
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  cleanups.push(() => window.removeEventListener('scroll', onScroll));
}

/* ───────── Mobile menu ───────── */
let menuBound = false;
function setupMenu() {
  if (menuBound) return; // nav is persisted across pages
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  menuBound = true;
  const links = () => menu.querySelectorAll<HTMLElement>('.menu__links .line > a > span');
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    lenis?.start();
    document.body.style.overflow = '';
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    if (!open) return close();
    toggle.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    if (motionOn()) {
      gsap.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(links(), { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 0.8, ease: EASE, stagger: 0.06, delay: 0.05 });
    }
  });
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) close();
  });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  document.addEventListener('astro:before-swap', close);
}

/* ───────── Hero load sequence ───────── */
function setupHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const q = (s: string) => hero.querySelectorAll<HTMLElement>(s);
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  tl.fromTo(q('[data-hero-photo]'), { opacity: 0, scale: 1.04, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 }, 0.1)
    .fromTo(q('[data-hero-name] .line > span'), { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 0.95, stagger: 0.08 }, 0.25)
    .fromTo(q('[data-hero-line] .w'), { yPercent: 110, y: 0, opacity: 0 }, { yPercent: 0, y: 0, opacity: 1, duration: 0.7, stagger: 0.025 }, 0.6)
    .fromTo(q('[data-hero-fade]'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.9)
    .fromTo(q('[data-hero-cue]'), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.3);

  // gentle parallax on the portrait (desktop)
  if (!isTouch()) {
    const photo = hero.querySelector('[data-hero-photo]');
    if (photo) {
      gsap.to(photo, {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }
}

/* ───────── Generic reveals ───────── */
function setupReveals() {
  // Fade + rise, staggered among siblings with the same parent group
  const groups = new Map<Element, HTMLElement[]>();
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.closest('[data-hero]')) return;
    const g = el.closest('[data-reveal-group]') ?? el;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(el);
  });
  groups.forEach((els, trigger) => {
    gsap.fromTo(
      els,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: EASE, stagger: 0.07,
        scrollTrigger: { trigger, start: 'top 85%', once: true },
      },
    );
  });

  // Giant titles: line-by-line mask reveal
  document.querySelectorAll<HTMLElement>('[data-reveal-lines]').forEach((el) => {
    if (el.closest('[data-hero]')) return;
    gsap.fromTo(
      el.querySelectorAll('.line > span'),
      { yPercent: 105, y: 0 },
      { yPercent: 0, y: 0, duration: 0.95, ease: EASE, stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 88%', once: true } },
    );
  });
}

/* ───────── Count-up numbers ───────── */
function setupCounts() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const to = parseFloat(el.dataset.count || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const fmt = (v: number) =>
      v.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (!motionOn()) { el.textContent = fmt(to); return; }
    const obj = { v: 0 };
    el.textContent = fmt(0);
    gsap.to(obj, {
      v: to, duration: 1.2, ease: 'power3.out',
      onUpdate: () => { el.textContent = fmt(obj.v); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

/* ───────── Stage pills light up in sequence ───────── */
function setupStages() {
  document.querySelectorAll<HTMLElement>('[data-stages]').forEach((wrap) => {
    const fills = wrap.querySelectorAll<HTMLElement>('.stage.is-lit .stage__fill');
    const labels = wrap.querySelectorAll<HTMLElement>('.stage.is-lit .stage__label');
    if (!fills.length) return;
    gsap.set(fills, { scaleX: 0, transformOrigin: '0% 50%' });
    gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } })
      .to(fills, { scaleX: 1, duration: 0.6, ease: 'power3.inOut', stagger: 0.12 })
      .to(labels, { color: 'var(--accent-ink)', duration: 0.2, stagger: 0.12 }, 0.25);
  });
}

/* ───────── Timeline line draws as you scroll ───────── */
function setupDraw() {
  document.querySelectorAll<HTMLElement>('[data-draw]').forEach((line) => {
    gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1, ease: 'none', transformOrigin: '50% 0%',
      scrollTrigger: { trigger: line.parentElement, start: 'top 75%', end: 'bottom 70%', scrub: 0.6 },
    });
  });
}

/* ───────── Read progress (case pages) ───────── */
function setupProgress() {
  const bar = document.querySelector<HTMLElement>('.progress');
  if (!bar) return;
  gsap.fromTo(bar, { scaleX: 0 }, {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}

/* ───────── Floating image preview on work rows (desktop) ───────── */
function setupHoverPreview() {
  if (isTouch()) return;
  document.querySelectorAll<HTMLElement>('[data-hover-list]').forEach((list) => {
    const preview = list.querySelector<HTMLElement>('[data-preview]');
    if (!preview) return;
    const imgs = preview.querySelectorAll<HTMLElement>('[data-preview-img]');
    const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const r = list.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    list.addEventListener('pointermove', move);
    list.querySelectorAll<HTMLElement>('[data-row]').forEach((row, i) => {
      row.addEventListener('pointerenter', () => {
        imgs.forEach((im, j) => gsap.to(im, { opacity: j === i ? 1 : 0, scale: j === i ? 1 : 1.06, duration: 0.5, ease: 'power3.out' }));
        gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
      });
    });
    list.addEventListener('pointerleave', () => gsap.to(preview, { opacity: 0, scale: 0.9, duration: 0.4, ease: 'power3.out' }));
    cleanups.push(() => list.removeEventListener('pointermove', move));
  });
}

export function initMotion() {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  ScrollTrigger.getAll().forEach((t) => t.kill());

  setupNav();
  setupMenu();

  if (!motionOn()) {
    setupCounts(); // writes final values
    return;
  }

  setupLenis();
  lenis?.scrollTo(0, { immediate: true });
  setupHero();
  setupReveals();
  setupCounts();
  setupStages();
  setupDraw();
  setupProgress();
  setupHoverPreview();

  // Images that load late can change layout: refresh triggers once fonts/images settle
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
