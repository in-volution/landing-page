// Involution — interactividad de la landing (JS vanilla, sin dependencias).
(function () {
  'use strict';

  // 1) Glow del hero que sigue al puntero.
  var glow = document.getElementById('inv-hero-glow');
  var hero = document.getElementById('inv-hero');
  if (glow && hero) {
    window.addEventListener(
      'mousemove',
      function (e) {
        var r = hero.getBoundingClientRect();
        if (e.clientY > r.bottom + 140) return;
        glow.style.transform = 'translate(' + (e.clientX - r.left - 310) + 'px,' + (e.clientY - r.top - 310) + 'px)';
      },
      { passive: true }
    );
  }

  // 2) Vídeo de fondo del hero: mantenerlo reproduciéndose.
  var bg = document.getElementById('inv-hero-video');
  if (bg) {
    var playBg = function () {
      if (bg.paused) {
        var p = bg.play();
        if (p && p.catch) p.catch(function () {});
      }
    };
    bg.addEventListener('ended', function () {
      bg.currentTime = 0;
      playBg();
    });
    bg.addEventListener('pause', playBg);
    playBg();
  }

  // 3) Vídeos demo: reproducir solo cuando están en pantalla, desde el inicio.
  ['inv-labor-video', 'inv-mesh-video'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var play = function () {
      var p = el.play();
      if (p && p.catch) p.catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (el.paused) {
                el.currentTime = 0;
                play();
              }
            } else {
              el.pause();
            }
          });
        },
        { threshold: 0.35 }
      ).observe(el);
    } else {
      play();
    }
  });

  // 4) Tracking de clics en CTAs (data-cta) como eventos de Vercel Analytics.
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-cta]') : null;
    if (el && window.va) {
      window.va('event', { name: 'cta_click', data: { cta: el.getAttribute('data-cta') } });
    }
  });
})();
