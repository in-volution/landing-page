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

  // 4) Gráfico de escalado: se dibuja al entrar en pantalla, conmuta entre tiempo y
  //    coste, y deja leer cualquier volumen de tareas con el puntero o el teclado.
  var scale = document.getElementById('inv-scale');
  if (scale) {
    var plot = scale.querySelector('.scale__plot');
    var svg = scale.querySelector('.scale__svg');
    var tip = document.getElementById('inv-scale-tip');
    var hair = scale.querySelector('.scale__hair');
    var dotHuman = scale.querySelector('.scale__dot--human');
    var dotMesh = scale.querySelector('.scale__dot--mesh');
    var tipX = tip.querySelector('.scale__tip-x');
    var tipHuman = tip.querySelector('.scale__tip-human');
    var tipMesh = tip.querySelector('.scale__tip-mesh');

    // Mismas constantes con las que se calculó la geometría del SVG.
    var PLOT_L = 76;
    var PLOT_R = 560;
    var PLOT_B = 300;
    var PLOT_H = 270;
    var PX_PER_DECADE = (PLOT_R - PLOT_L) / 4;

    // Formato español fijo. toLocaleString depende de los datos de locale que
    // traiga el navegador, y sin ellos "1.000" se queda en "1000".
    var nf = function (v, d) {
      var parts = v.toFixed(d).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      var dec = parts[1] ? parts[1].replace(/0+$/, '') : '';
      return dec ? parts[0] + ',' + dec : parts[0];
    };
    var fmtTime = function (s) {
      if (s < 60) return nf(Math.round(s), 0) + ' s';
      if (s < 3600) return nf(s / 60, 1) + ' min';
      if (s < 28800) return nf(s / 3600, 1) + ' h';
      // Media jornada importa hasta que las cifras se hacen grandes: 12,5 y 125.
      var txt = nf(s / 28800, s / 28800 < 100 ? 1 : 0);
      return txt + (txt === '1' ? ' jornada' : ' jornadas');
    };
    // Las mismas cifras declaradas al pie del gráfico. Solo la vista de tiempo
    // tiene curva: la de coste es un antes/después con los dos valores impresos.
    var Y_MAX = 130 * 28800; // 130 jornadas de 8 h, en segundos
    var humanSec = function (n) {
      return n * 360; // 6 min por tarea
    };
    var meshSec = function (n) {
      return Math.ceil(n / 200) * 8; // 8 s por tarea, 200 en paralelo
    };

    var xOf = function (n) {
      return PLOT_L + (Math.log(n) / Math.LN10) * PX_PER_DECADE;
    };
    var yOf = function (seconds) {
      return PLOT_B - (seconds / Y_MAX) * PLOT_H;
    };
    // El puntero apunta a un número de tareas, no a un píxel: se redondea a una
    // cifra legible y los valores se recalculan sobre ese número redondeado.
    var roundTasks = function (n) {
      if (n < 10) return Math.max(1, Math.round(n));
      var mag = Math.pow(10, Math.floor(Math.log(n) / Math.LN10) - 1);
      return Math.round(n / mag) * mag;
    };

    // El viewBox se recorta en pantallas estrechas, así que la conversión de
    // píxeles a unidades de usuario se lee siempre del SVG, no de una constante.
    var readAt = function (clientX) {
      var rect = svg.getBoundingClientRect();
      if (!rect.width) return;
      var vb = svg.viewBox.baseVal;
      var ux = vb.x + ((clientX - rect.left) / rect.width) * vb.width;
      ux = Math.max(PLOT_L, Math.min(PLOT_R, ux));

      var tasks = roundTasks(Math.pow(10, (ux - PLOT_L) / PX_PER_DECADE));
      var snapped = xOf(tasks);
      var vh = humanSec(tasks);
      var vm = meshSec(tasks);

      hair.setAttribute('x1', snapped);
      hair.setAttribute('x2', snapped);
      dotHuman.setAttribute('cx', snapped);
      dotHuman.setAttribute('cy', yOf(vh));
      dotMesh.setAttribute('cx', snapped);
      dotMesh.setAttribute('cy', yOf(vm));

      tipX.textContent = nf(tasks, 0) + (tasks === 1 ? ' tarea' : ' tareas');
      tipHuman.textContent = fmtTime(vh);
      tipMesh.textContent = fmtTime(vm);

      // SVGElement no implementa la propiedad hidden: hay que tocar el atributo.
      hair.removeAttribute('hidden');
      dotHuman.removeAttribute('hidden');
      dotMesh.removeAttribute('hidden');
      tip.hidden = false;

      var cssX = ((snapped - vb.x) / vb.width) * rect.width;
      var half = tip.offsetWidth / 2;
      tip.style.left = Math.max(half, Math.min(rect.width - half, cssX)) + 'px';
      return tasks;
    };

    var clear = function () {
      hair.setAttribute('hidden', '');
      dotHuman.setAttribute('hidden', '');
      dotMesh.setAttribute('hidden', '');
      tip.hidden = true;
    };

    plot.addEventListener('pointermove', function (e) {
      readAt(e.clientX);
    });
    plot.addEventListener('pointerleave', clear);

    // Mismo dato por teclado que con el puntero.
    plot.setAttribute('tabindex', '0');
    var kbTasks = 100;
    var readTasks = function (n) {
      var rect = svg.getBoundingClientRect();
      var vb = svg.viewBox.baseVal;
      return readAt(rect.left + ((xOf(n) - vb.x) / vb.width) * rect.width) || n;
    };
    plot.addEventListener('focus', function () {
      readTasks(kbTasks);
    });
    plot.addEventListener('blur', clear);
    plot.addEventListener('keydown', function (e) {
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      kbTasks = readTasks(Math.max(1, Math.min(10000, kbTasks * Math.pow(10, dir * 0.1))));
    });

    // El estado por defecto del CSS ya es el gráfico completo: la animación solo
    // se añade cuando el usuario no ha pedido reducir movimiento.
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var draw = function () {
      if (still) return;
      scale.classList.remove('is-drawing');
      void scale.offsetWidth; // reinicia la animación al cambiar de vista
      scale.classList.add('is-drawing');
    };

    scale.querySelectorAll('.scale__view').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var name = btn.getAttribute('data-view');
        if (scale.getAttribute('data-view') === name) return;
        scale.setAttribute('data-view', name);
        scale.querySelectorAll('.scale__view').forEach(function (other) {
          var on = other === btn;
          other.classList.toggle('is-on', on);
          other.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        clear();
        draw();
      });
    });

    // En pantallas estrechas se ocultan las etiquetas del extremo, así que el
    // viewBox se recorta para que el trazado ocupe todo el ancho disponible.
    var fitViewBox = function () {
      svg.setAttribute('viewBox', window.matchMedia('(max-width: 720px)').matches ? '-16 0 606 362' : '0 0 760 380');
    };
    fitViewBox();
    window.addEventListener('resize', fitViewBox, { passive: true });

    if (!still && 'IntersectionObserver' in window) {
      var drawObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              draw();
              drawObserver.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      drawObserver.observe(scale);
    }
  }

  // 5) Tracking de clics en CTAs (data-cta) como eventos de Vercel Analytics.
  document.addEventListener('click', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-cta]') : null;
    if (el && window.va) {
      window.va('event', { name: 'cta_click', data: { cta: el.getAttribute('data-cta') } });
    }
  });
})();
