import { portfolio } from './data.js';
import { renderPortfolio } from './templates.js';

const app = document.querySelector('#app');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

document.body.classList.add('js-enabled');
app.innerHTML = renderPortfolio(portfolio);

function initFlowerBloom() {
  const bloom = document.querySelector('.flower-bloom');
  const flowerStage = document.querySelector('[data-flower-stage]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!bloom || !flowerStage || reduceMotion.matches) return;

  let frameId = null;
  function drift(time) {
    bloom.style.setProperty('--bloom-tilt', `${Math.sin(time * .00018) * 2.2}deg`);
    bloom.style.setProperty('--bloom-lift', `${Math.sin(time * .00027) * 8}px`);
    frameId = window.requestAnimationFrame(drift);
  }

  frameId = window.requestAnimationFrame(drift);
  flowerStage.addEventListener('pointermove', (event) => {
    const bounds = flowerStage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    bloom.style.setProperty('--flower-x', `${x * 16}px`);
    bloom.style.setProperty('--flower-y', `${y * 16}px`);
    bloom.style.setProperty('--flower-tilt', `${x * 3}deg`);
  });
  flowerStage.addEventListener('pointerleave', () => {
    ['--flower-x', '--flower-y', '--flower-tilt'].forEach((property) => bloom.style.removeProperty(property));
  });
  reduceMotion.addEventListener('change', (event) => {
    if (event.matches && frameId !== null) window.cancelAnimationFrame(frameId);
  }, { once: true });
}

initFlowerBloom();

function initPointerLight() {
  const light = document.querySelector('.pointer-light');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!light || reduceMotion.matches || !window.matchMedia('(pointer: fine)').matches) return;

  let frameId = null;
  let point = { x: 0, y: 0 };
  const render = () => {
    frameId = null;
    light.style.setProperty('--pointer-x', `${point.x}px`);
    light.style.setProperty('--pointer-y', `${point.y}px`);
  };
  const schedule = (event) => {
    point = { x: event.clientX, y: event.clientY };
    light.dataset.active = 'true';
    if (frameId === null) frameId = window.requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', schedule, { passive: true });
  window.addEventListener('pointerleave', () => { light.dataset.active = 'false'; });
}

initPointerLight();

function initProjectIndex() {
  const gallery = document.querySelector('.project-index-gallery');
  if (!gallery) return;

  const controls = [...gallery.querySelectorAll('[data-project-index-control]')];
  const previews = [...gallery.querySelectorAll('[data-project-preview]')];
  const openButtons = [...gallery.querySelectorAll('[data-project-open]')];
  if (!controls.length || !previews.length) return;

  const activate = (index) => {
    controls.forEach((control, controlIndex) => {
      const active = controlIndex === index;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });
    previews.forEach((preview, previewIndex) => {
      const active = previewIndex === index;
      preview.hidden = !active;
      preview.classList.toggle('is-active', active);
    });
  };

  controls.forEach((control, index) => {
    const select = () => activate(index);
    control.addEventListener('pointerenter', select);
    control.addEventListener('focus', select);
    control.addEventListener('click', select);
    control.addEventListener('keydown', (event) => {
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? controls.length - 1 : direction ? (index + direction + controls.length) % controls.length : null;
      if (next === null) return;
      event.preventDefault();
      activate(next);
      controls[next].focus();
    });
  });

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      window.location.hash = `#case=${button.dataset.projectOpen}`;
    });
  });
}

initProjectIndex();

function initCaseReaderRouter() {
  const home = document.querySelector('[data-portfolio-home]');
  const reader = document.querySelector('[data-case-reader]');
  if (!home || !reader) return;
  const projects = [...reader.querySelectorAll('[data-case-reader-project]')];

  const route = () => {
    const match = window.location.hash.match(/^#case=([^&]+)(?:&section=([^&]+))?$/);
    const slug = match?.[1];
    const sectionId = match?.[2];
    const activeProject = projects.find((project) => project.dataset.caseReaderProject === slug);
    const isCase = Boolean(activeProject);
    home.hidden = isCase;
    reader.hidden = !isCase;
    document.body.classList.toggle('is-case-route', isCase);
    projects.forEach((project) => { project.hidden = project !== activeProject; });
    if (!isCase) return;
    if (sectionId) {
      const section = activeProject.querySelector(`#case-${slug}-${sectionId}`);
      window.requestAnimationFrame(() => section?.scrollIntoView({ block: 'start' }));
    } else {
      window.requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    }
  };

  reader.querySelectorAll('.case-reader-back').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.hash = 'top';
    });
  });
  window.addEventListener('hashchange', route);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('is-case-route')) window.location.hash = 'top';
  });
  route();
}

initCaseReaderRouter();

function initGrowthControls() {
  const archive = document.querySelector('.growth-archive');
  if (!archive) return;

  const controls = [...archive.querySelectorAll('.growth-control')];
  const meta = archive.querySelector('[data-growth-dossier-meta]');
  const title = archive.querySelector('[data-growth-dossier-title]');
  const detail = archive.querySelector('[data-growth-dossier-detail]');
  const focus = archive.querySelector('[data-growth-dossier-focus]');
  const handoff = archive.querySelector('[data-growth-dossier-handoff]');
  if (!controls.length || !meta || !title || !detail || !focus || !handoff) return;

  function activateGrowth(index) {
    const control = controls[index];
    if (!control) return;
    controls.forEach((candidate, candidateIndex) => {
      const isActive = candidateIndex === index;
      candidate.setAttribute('aria-pressed', String(isActive));
      candidate.closest('.growth-item')?.classList.toggle('is-active', isActive);
    });
    meta.textContent = `${control.dataset.growthPeriod} / ${control.dataset.growthType}`;
    title.textContent = control.dataset.growthTitle;
    detail.textContent = control.dataset.growthDetail;
    focus.textContent = control.dataset.growthFocus;
    handoff.textContent = control.dataset.growthHandoff;
  }

  controls.forEach((control, index) => {
    control.addEventListener('click', () => activateGrowth(index));
    control.addEventListener('keydown', (event) => {
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
      const nextIndex = event.key === 'Home' ? 0
        : event.key === 'End' ? controls.length - 1
          : direction ? (index + direction + controls.length) % controls.length : null;
      if (nextIndex === null) return;
      event.preventDefault();
      activateGrowth(nextIndex);
      controls[nextIndex].focus();
    });
  });
}

initGrowthControls();

function initGrowthProgress() {
  const archive = document.querySelector('.growth-archive');
  const progress = archive?.querySelector('.growth-progress');
  if (!archive || !progress) return;

  let frameId = null;
  const update = () => {
    frameId = null;
    const bounds = archive.getBoundingClientRect();
    const viewport = window.innerHeight || document.documentElement.clientHeight;
    const ratio = Math.min(1, Math.max(0, (viewport * .72 - bounds.top) / Math.max(1, bounds.height)));
    progress.style.setProperty('--growth-progress', `${ratio * 100}%`);
  };
  const schedule = () => {
    if (frameId === null) frameId = window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
}

initGrowthProgress();

function initMagneticNavigation() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches || !window.matchMedia('(pointer: fine)').matches) return;

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('pointermove', (event) => {
      const bounds = link.getBoundingClientRect();
      const x = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
      const y = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
      link.style.setProperty('--mag-x', `${x * 4}px`);
      link.style.setProperty('--mag-y', `${y * 4}px`);
    });
    link.addEventListener('pointerleave', () => {
      link.style.removeProperty('--mag-x');
      link.style.removeProperty('--mag-y');
    });
  });
}

initMagneticNavigation();

function initTechnologyMotion() {
  const targets = document.querySelectorAll('.project-index-gallery, .growth-archive');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!targets.length) return;

  const activate = (target) => target.classList.add('is-tech-active');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    targets.forEach(activate);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      activate(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: .18 });

  targets.forEach((target) => observer.observe(target));
}

initTechnologyMotion();

function initReadingProgress() {
  const progress = document.querySelector('.page-progress span');
  if (!progress) return;
  let frameId = null;

  function update() {
    frameId = null;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    progress.style.setProperty('--reading-progress', `${Math.min(100, Math.max(0, window.scrollY / scrollable * 100))}%`);
  }

  function schedule() {
    if (frameId !== null) return;
    frameId = window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
}

initReadingProgress();

function setMenu(open) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}

menuButton.addEventListener('click', () => {
  setMenu(!navigation.classList.contains('is-open'));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

const revealTargets = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

function initActiveNavigation() {
  const items = [...navigation.querySelectorAll('a')]
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter((item) => item.section);
  if (!items.length) return;

  let frameId = null;

  function setActiveSection(id) {
    items.forEach(({ link, section }) => {
      if (section.id === id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function updateActiveSection() {
    const readingLine = window.scrollY + Math.max(160, window.innerHeight * .42);
    let active = items[0];

    items.forEach((item) => {
      const sectionTop = item.section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= readingLine) active = item;
    });

    setActiveSection(active.section.id);
  }

  function scheduleActiveSection() {
    if (frameId !== null) return;
    frameId = window.requestAnimationFrame(() => {
      frameId = null;
      updateActiveSection();
    });
  }

  window.addEventListener('scroll', scheduleActiveSection, { passive: true });
  window.addEventListener('resize', scheduleActiveSection, { passive: true });
  scheduleActiveSection();
}

initActiveNavigation();
