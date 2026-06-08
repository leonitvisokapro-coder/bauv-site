/* ============================================================
   bauV — comportements partagés (header, menu, scroll, reveal)
   ============================================================ */
(function () {
  'use strict';

  var nav = document.getElementById('siteNav');
  var progress = document.getElementById('navProgress');
  var burger = document.getElementById('navBurger');
  var overlay = document.getElementById('navOverlay');
  var solid = !document.body.classList.contains('dark-hero');

  /* --- Lien actif --- */
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var map = { '': 'index', 'index.html': 'index', 'services.html': 'services',
              'realisations.html': 'realisations', 'blog-main.html': 'blog', 'contact.html': 'contact' };
  var key = map[path] || (path.indexOf('renovation-') === 0 ? 'services' : null);
  if (key) {
    var link = document.querySelector('.nav-links a[data-nav="' + key + '"]');
    if (link) link.classList.add('active');
  }

  if (nav && solid) nav.classList.add('solid');

  /* --- Scroll : vitrage, auto-masquage, barre de progression --- */
  var lastY = window.scrollY || 0, ticking = false;
  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) {
      if (!solid) nav.classList.toggle('scrolled', y > 30);
      if (!document.body.classList.contains('nav-open')) {
        if (y > 340 && y > lastY + 4) nav.classList.add('hidden');
        else if (y < lastY - 4 || y < 340) nav.classList.remove('hidden');
      }
    }
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* --- Menu plein écran (mobile) --- */
  function setMenu(open) {
    if (!overlay) return;
    overlay.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    if (burger) { burger.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  }
  if (burger) burger.addEventListener('click', function () { setMenu(!overlay.classList.contains('open')); });
  if (overlay) overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* --- Révélation au scroll + compteurs --- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealables = document.querySelectorAll('[data-reveal]');

  function animateCount(el) {
    var target = parseFloat(el.dataset.count), start = performance.now(), dur = 1400;
    function step(now) {
      var p = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step); else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if (reduce || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in-view'); });
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = el.dataset.count; });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        if (entry.target.querySelectorAll) entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }
})();


/* ============================================================
   Lightbox galerie (réalisations)
   ============================================================ */
(function () {
  'use strict';
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  if (!items.length) return;
  var srcs = items.map(function (b) { return b.getAttribute('data-full'); });

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<button class="lb-close" aria-label="Fermer">×</button>'
                + '<button class="lb-prev" aria-label="Photo précédente">‹</button>'
                + '<img alt="">'
                + '<button class="lb-next" aria-label="Photo suivante">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector('img');
  var idx = 0;

  function show(i) { idx = (i + srcs.length) % srcs.length; img.src = srcs[idx]; }
  function open(i) { show(i); box.classList.add('open'); document.body.classList.add('nav-open'); }
  function close() { box.classList.remove('open'); document.body.classList.remove('nav-open'); }

  items.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
  box.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
