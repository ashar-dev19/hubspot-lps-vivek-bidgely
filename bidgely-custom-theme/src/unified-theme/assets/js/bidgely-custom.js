/**
 * Bidgely theme — global behaviors (header nav hover on desktop, etc.)
 */
(function () {
  var MQ_DESKTOP = '(min-width: 1024px)';

  function isDesktop() {
    return window.matchMedia(MQ_DESKTOP).matches;
  }

  function bindDetailsHover(details) {
    if (details.dataset.bidgelyNavHoverBound) return;
    details.dataset.bidgelyNavHoverBound = '1';

    details.addEventListener('mouseenter', function () {
      if (!window.matchMedia(MQ_DESKTOP).matches) return;
      details.setAttribute('open', '');
    });

    details.addEventListener('mouseleave', function () {
      if (!window.matchMedia(MQ_DESKTOP).matches) return;
      details.removeAttribute('open');
    });
  }

  function initBidgelyHeaderModules(root) {
    var scope = root || document;
    scope.querySelectorAll('.bidgely-header-module .site-nav__details').forEach(bindDetailsHover);
  }

  function onViewportChange() {
    if (window.matchMedia(MQ_DESKTOP).matches) return;
    document.querySelectorAll('.bidgely-header-module .site-nav__details[open]').forEach(function (d) {
      d.removeAttribute('open');
    });
  }

  function run() {
    initBidgelyHeaderModules(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  window.matchMedia(MQ_DESKTOP).addEventListener('change', onViewportChange);

  /* HubSpot editor / dynamic updates: bind new dropdown nodes */
  if (typeof MutationObserver !== 'undefined') {
    var t;
    var observer = new MutationObserver(function () {
      clearTimeout(t);
      t = setTimeout(function () {
        initBidgelyHeaderModules(document);
      }, 150);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
