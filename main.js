// Involution — interactividad de la landing (JS vanilla, sin dependencias).
(function () {
  'use strict';

  // Modo de validación de identidad. Solo se activa con ?logo=<ruta>.
  var logoRoutes = ['origen', 'despliegue', 'umbral'];
  var logoRoute = new URLSearchParams(window.location.search).get('logo');
  if (logoRoutes.indexOf(logoRoute) !== -1) {
    var navBrand = document.querySelector('.nav__brand a');
    if (navBrand) {
      navBrand.innerHTML =
        '<span class="nav__logo-experiment">' +
        '<img class="nav__logo-experiment-mark" src="assets/logo-explorations/involution-' +
        logoRoute +
        '.svg" alt="" />' +
        '<span>involution</span>' +
        '</span>';
    }

    var favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.setAttribute('href', 'assets/logo-explorations/involution-' + logoRoute + '.svg');

    var returnLink = document.createElement('a');
    returnLink.className = 'logo-experiment-return';
    returnLink.href = 'logo-lab.html?logo=' + logoRoute;
    returnLink.textContent = 'Brand lab · ' + logoRoute;
    document.body.appendChild(returnLink);
  }

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
})();
