// ── DATA ────────────────────────────────────────────────
const businesses = [
  {
    id: 1, name: "Artesanal Tigre", category: "Artesanías", tag: "Artesanías",
    rating: 4.6, seed: "mate-tigre",
    desc: "Los mejores mates y cuchillos artesanales de la zona. Piezas únicas hechas a mano por expertos locales del Delta.",
    phone: "+54 9 11 0000-0001", premium: false
  },
  {
    id: 2, name: "Caricias", category: "Moda", tag: "Accesorios & Librería",
    rating: 4.9, seed: "caricias-cute",
    desc: "Accesorios para mujer y una librería con toda la onda 'cute': cuadernos, stickers y artículos de papelería que combinan estilo y dulzura en cada detalle.",
    phone: "+54 9 11 0000-0002", premium: true
  },
  {
    id: 3, name: "DecoMimbre", category: "Decoración", tag: "Decoración",
    rating: 4.7, seed: "wicker-deco",
    desc: "Especialistas en muebles de mimbre y canastos de la mejor calidad. Dale un toque natural a tu hogar.",
    phone: "+54 9 11 0000-0003", premium: true
  },
  {
    id: 4, name: "El Lazo Cueros", category: "Moda", tag: "Cueros",
    rating: 4.5, seed: "leather-bags",
    desc: "Artículos de cuero genuino: mochilas materas, cinturones y billeteras de alta durabilidad.",
    phone: "+54 9 11 0000-0004", premium: false
  },
  {
    id: 5, name: "Jarrones Artesanales", category: "Decoración", tag: "Decoración",
    rating: 4.4, seed: "pottery-vases",
    desc: "Jarrones decorativos y cerámicas que combinan diseño clásico y moderno para ambientar tus espacios.",
    phone: "+54 9 11 0000-0005", premium: false
  },
  {
    id: 6, name: "Lámparas Turcas", category: "Decoración", tag: "Decoración & Iluminación",
    rating: 4.8, seed: "turkish-lamps",
    desc: "Lámparas turcas auténticas, espejos decorativos, piezas en madera y vitroarte. Un rincón con identidad propia para iluminar y decorar cualquier ambiente.",
    phone: "+54 9 11 0000-0006", premium: true
  },
    {
        id: 7, name: "Muebles de Madera", category: "Decoración", tag: "Mueblería",
        rating: 4.3, seed: "wood-furniture",
        desc: "Mobiliario rústico y funcional de pino y otras maderas, ideal para comercios y decoración de interiores.",
        phone: "+54 9 11 0000-0007", premium: false
    },
    {
        id: 8, name: "Rincón de Reinas", category: "Moda", tag: "Bijouterie",
        rating: 4.5, seed: "jewelry-bijou",
        desc: "El paraíso de la bijouterie y los sahumerios. Variedad increíble de accesorios y fragancias únicas.",
        phone: "+54 9 11 0000-0008", premium: true
    },
    {
        id: 9, name: "Sabores del Delta", category: "Gastronomía", tag: "Gastronomía",
        rating: 4.7, seed: "delta-food",
        desc: "Productos regionales, quesos, embutidos y los mejores escabeches artesanales del Delta.",
        phone: "+54 9 11 0000-0009", premium: true
    },
  {
    id: 10, name: "Vizcachas Cuchillería", category: "Artesanías", tag: "Cuchillería",
    rating: 4.6, seed: "knives-craft",
    desc: "Cuchillos de autor y accesorios para el asador. Calidad prémium y acero inoxidable garantizado.",
    phone: "+54 9 11 0000-0010", premium: false
  }
];

function photoUrl(seed, w, h, variant) {
  return `https://picsum.photos/seed/${seed}${variant || ''}/${w}/${h}`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let str = '★'.repeat(full);
  if (half) str += '½';
  str += '☆'.repeat(5 - full - (half ? 1 : 0));
  return `${str} <span>${rating.toFixed(1)}</span>`;
}

// ── CARD RENDERING ─────────────────────────────────────
function cardHTML(b) {
  const isPremium = b.premium;
  return `
  <div class="card ${isPremium ? 'premium premium-glow' : ''}" onclick="openModal(${b.id})">
    <div class="card-inner">
      <div class="card-photo">
        <img src="${photoUrl(b.seed, 400, 300)}" alt="${b.name}" loading="lazy">
        <div class="card-photo-overlay"></div>
        ${isPremium ? '<div class="card-badge">⭐ Destacado</div>' : ''}
      </div>
      <div class="card-body">
        <p class="card-name">${b.name}</p>
        <p class="card-stars">${renderStars(b.rating)}</p>
        <div class="card-footer-row">
          <span class="card-tag">${b.tag}</span>
          ${isPremium ? '<span class="card-premium-badge">✦ Premium</span>' : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function renderGrid(targetId, list) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = list.map(cardHTML).join('');
  setupReveal('.card', 0.06);
}

// ── MODAL ───────────────────────────────────────────────
function openModal(id) {
  const b = businesses.find(x => x.id === id);
  if (!b) return;
  document.getElementById('modal-gallery').innerHTML = `
    <img src="${photoUrl(b.seed, 300, 400, '-a')}" alt="${b.name}">
    <img src="${photoUrl(b.seed, 300, 198, '-b')}" alt="${b.name}">
    <img src="${photoUrl(b.seed, 300, 198, '-c')}" alt="${b.name}">
  `;
  document.getElementById('modal-name').textContent = b.name;
  document.getElementById('modal-stars').innerHTML = renderStars(b.rating);
  document.getElementById('modal-desc').textContent = b.desc;
  document.getElementById('modal-phone').textContent = b.phone;
  document.getElementById('modal-wa-link').href = `https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`;
  document.getElementById('modal-ig-link').href = `https://instagram.com/`;
  document.getElementById('modal-ig-link').textContent = '@' + b.name.toLowerCase().replace(/\s+/g, '');
  document.getElementById('modal-directions').href = `https://www.google.com/maps/dir/?api=1&destination=Puerto+de+Frutos,+Tigre,+Argentina`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── SCROLL REVEAL ───────────────────────────────────────
function setupReveal(selector, step) {
  const items = document.querySelectorAll(selector + ':not(.reveal-bound)');
  const counters = new Map();
  items.forEach(el => {
    el.classList.add('reveal-bound');
    const parent = el.parentElement;
    const idx = counters.get(parent) || 0;
    el.style.transitionDelay = (idx * step) + 's';
    counters.set(parent, idx + 1);
  });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  items.forEach(el => obs.observe(el));
}

// ── NAVBAR SCROLL ───────────────────────────────────────
function setupScrollNav() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const check = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };

  check();
  window.addEventListener('scroll', check, { passive: true });
}

// ── SEARCH ─────────────────────────────────────────────
function setupHeroSearch() {
  const form = document.getElementById('hero-search-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = document.getElementById('hero-search-input').value.trim();
    window.location.href = 'categorias.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  });
}

// ── CATEGORY FILTER ────────────────────────────────────
function setupPillFilter() {
  const pillRow = document.getElementById('pill-row');
  if (!pillRow) return;

  const params = new URLSearchParams(window.location.search);
  const initialQuery = (params.get('q') || '').toLowerCase();

  function applyFilter(category) {
    const list = businesses.filter(b => {
      const catMatch = category === 'Todos' || b.category === category;
      const qMatch = !initialQuery || b.name.toLowerCase().includes(initialQuery) || b.tag.toLowerCase().includes(initialQuery);
      return catMatch && qMatch;
    });
    renderGrid('card-grid', list);
    document.getElementById('results-count').textContent = list.length;
  }

  pillRow.querySelectorAll('.pill').forEach(p => {
    p.addEventListener('click', () => {
      pillRow.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      applyFilter(p.dataset.category);
    });
  });

  applyFilter('Todos');
}

// ── SCROLL PROGRESS BAR ────────────────────────────────
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
})();

// ── HERO PARTICLES ─────────────────────────────────────
(function initParticles() {
  const hero = document.getElementById('hero') || document.querySelector('.hero');
  if (!hero) return;

  const container = document.createElement('div');
  container.className = 'hero-particles';
  hero.appendChild(container);

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    p.style.left = Math.random() * 100 + '%';
    const size = 2 + Math.random() * 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = (12 + Math.random() * 18) + 's';
    p.style.animationDelay = (Math.random() * 20) + 's';
    const colors = ['rgba(201,164,107,0.3)', 'rgba(198,40,40,0.2)', 'rgba(232,213,176,0.2)'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
})();

// ── ANIMATED COUNTERS ──────────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.stat-count, .hero-stat-num');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target || el.dataset.count || '0');
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      // trigger icon bounce on parent stat-item
      const statItem = el.closest('.stat-item');
      if (statItem) statItem.classList.add('in-view');

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // elastic ease-out for satisfying bounce feel
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const current = target * eased;

        if (isDecimal) {
          el.textContent = current.toFixed(1);
        } else {
          el.textContent = Math.floor(current).toLocaleString('es-AR');
        }

        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = isDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString('es-AR');
      }

      requestAnimationFrame(update);
      obs.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach(el => obs.observe(el));
}

// ── CARD 3D TILT ──────────────────────────────────────
(function initCardTilt() {
  document.addEventListener('mouseover', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    const inner = card.querySelector('.card-inner');
    if (!inner) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = e.clientX - centerX;
    const relY = e.clientY - centerY;
    const maxTilt = 6;
    const tiltX = -(relY / (rect.height / 2)) * maxTilt;
    const tiltY = (relX / (rect.width / 2)) * maxTilt;

    inner.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
  });

  document.addEventListener('mouseout', e => {
    const inner = e.target.closest('.card')?.querySelector('.card-inner');
    if (inner) inner.style.transform = '';
  });
})();

// ── MAGNETIC BUTTONS ───────────────────────────────────
(function initMagnetic() {
  document.querySelectorAll('.nav-cta, .plan-cta.filled, .plan-cta.gold, .cta-btn.primary').forEach(btn => {
    const wrap = document.createElement('span');
    wrap.className = 'magnetic-wrap';
    btn.parentNode.insertBefore(wrap, btn);
    wrap.appendChild(btn);

    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const maxDist = 120;
      const strength = Math.min(dist / maxDist, 1) * 8;
      const angle = Math.atan2(y, x);
      const moveX = Math.cos(angle) * strength;
      const moveY = Math.sin(angle) * strength;
      wrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
      wrap.style.transform = '';
    });
  });
})();

// ── TESTIMONIALS AUTO-SCROLL ────────────────────────────
(function autoScrollTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;

  let scrollInterval;

  function startAutoScroll() {
    scrollInterval = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }, 4000);
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  track.addEventListener('mouseenter', stopAutoScroll);
  track.addEventListener('mouseleave', startAutoScroll);
  track.addEventListener('touchstart', stopAutoScroll, { passive: true });
  track.addEventListener('touchend', startAutoScroll);

  startAutoScroll();
})();
