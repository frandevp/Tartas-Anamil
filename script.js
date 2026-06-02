// ── CARRUSEL ──────────────────────────────────────────────
const track   = document.getElementById('carruselTrack');
const slides  = track ? track.querySelectorAll('.carrusel-slide') : [];
const dotsWrap= document.getElementById('carruselDots');
const btnPrev = document.getElementById('carruselPrev');
const btnNext = document.getElementById('carruselNext');

let current = 0;

function setSlideWidths() {
  const w = track.parentElement.offsetWidth; // .carrusel
  slides.forEach(s => { s.style.width = w + 'px'; });
}

function goTo(n) {
  current = (n + slides.length) % slides.length;
  const w = track.parentElement.offsetWidth;
  track.style.transform = `translateX(-${current * w}px)`;
  document.querySelectorAll('.carrusel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

if (track && slides.length) {

  setSlideWidths();
  window.addEventListener('resize', () => {
    setSlideWidths();
    goTo(current);
  });

  // crear puntos
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'carrusel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  // swipe táctil
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
  });

  // teclas del teclado
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
const els = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

els.forEach(el => obs.observe(el));
