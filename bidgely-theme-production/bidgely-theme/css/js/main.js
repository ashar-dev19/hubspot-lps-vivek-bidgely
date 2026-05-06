/**
 * BIDGELY THEME — GLOBAL JS
 * Handles: accessible tab controller, mobile nav toggle
 */
(function () {
  'use strict';

  /* ── Accessible Tab Controller ──────────────────────────────── */
  document.querySelectorAll('[role="tablist"]').forEach(function (tablist) {
    var tabs   = tablist.querySelectorAll('[role="tab"]');
    var panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
        panels.forEach(function (p) { p.setAttribute('hidden', ''); });
        tab.setAttribute('aria-selected', 'true');
        var panel = document.getElementById(tab.getAttribute('aria-controls'));
        if (panel) panel.removeAttribute('hidden');
      });

      /* Arrow-key navigation */
      tab.addEventListener('keydown', function (e) {
        var idx = Array.prototype.indexOf.call(tabs, tab);
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          tabs[(idx + 1) % tabs.length].click();
          tabs[(idx + 1) % tabs.length].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          tabs[(idx - 1 + tabs.length) % tabs.length].click();
          tabs[(idx - 1 + tabs.length) % tabs.length].focus();
        }
      });
    });
  });

  /* ── Mobile Nav Toggle ──────────────────────────────────────── */
  document.querySelectorAll('.topnav__burger').forEach(function (burger) {
    burger.addEventListener('click', function () {
      var nav = burger.closest('.topnav');
      if (nav) nav.classList.toggle('topnav--open');
    });
  });

})();
