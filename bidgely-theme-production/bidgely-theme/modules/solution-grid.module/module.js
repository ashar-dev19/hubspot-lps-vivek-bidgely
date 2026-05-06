(function () {
  var SPLIDE_CSS =
    'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
  var SPLIDE_JS =
    'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';

  var splideQueue = [];

  function loadSplide(callback) {
    if (window.Splide) {
      callback();
      return;
    }
    splideQueue.push(callback);
    if (window._rhSplideScriptLoading) return;
    window._rhSplideScriptLoading = true;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = SPLIDE_CSS;
    document.head.appendChild(link);

    var script = document.createElement('script');
    script.src = SPLIDE_JS;
    script.async = true;
    script.onload = function () {
      window._rhSplideScriptLoading = false;
      var q = splideQueue.slice();
      splideQueue = [];
      q.forEach(function (fn) {
        try {
          fn();
        } catch (e) {
          if (typeof console !== 'undefined' && console.warn) {
            console.warn('[resources-hubdb] Splide init', e);
          }
        }
      });
    };
    script.onerror = function () {
      window._rhSplideScriptLoading = false;
      splideQueue = [];
    };
    document.head.appendChild(script);
  }

  function initSplideRoot(root) {
    if (root.getAttribute('data-rh-splide-inited') === '1') return;
    root.setAttribute('data-rh-splide-inited', '1');

    loadSplide(function () {
      if (!window.Splide) return;

      new window.Splide(root, {
        type: 'slide',
        mediaQuery: 'min',
        perPage: 1,
        perMove: 1,
        gap: '1rem',
        pagination: true,
        arrows: false,
        keyboard: 'global',
        rewind: true,
        speed: 450,
        autoHeight: true,
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        breakpoints: {
          768: {
            perPage: 2,
            gap: '1.25rem',
          },
          992: {
            perPage: 3,
            gap: '1.5rem',
          },
        },
      }).mount();
    });
  }

  function boot() {
    document
      .querySelectorAll('[data-resources-hubdb-carousel]')
      .forEach(initSplideRoot);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
