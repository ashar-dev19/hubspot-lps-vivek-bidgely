(function () {
  'use strict';

  function peekPadding() {
    return window.matchMedia('(max-width: 860px)').matches ? 0 : 60;
  }

  function initTechSlider(root) {
    var track = root.querySelector('.tag-slider__track');
    var btnPrev = root.querySelector('.tag-slider__btn--prev');
    var btnNext = root.querySelector('.tag-slider__btn--next');
    if (!track) return;

    var cards = Array.prototype.slice.call(track.querySelectorAll('.tag-slider__card'));
    if (!cards.length) return;

    var cardStep = 320 + 16;
    var cardW = 320;
    var current = 0;

    function update() {
      var wrap = track.parentElement;
      if (!wrap) return;
      var wrapW = wrap.clientWidth || 0;
      var peek = peekPadding();
      var T = peek + current * cardStep - wrapW / 2 + cardW / 2;
      track.style.transform = 'translateX(' + -T + 'px)';

      cards.forEach(function (c, i) {
        c.classList.toggle('is-active', i === current);
      });
    }

    function onPrev() {
      current = (current - 1 + cards.length) % cards.length;
      update();
    }

    function onNext() {
      current = (current + 1) % cards.length;
      update();
    }

    if (btnPrev) btnPrev.addEventListener('click', onPrev);
    if (btnNext) btnNext.addEventListener('click', onNext);

    window.addEventListener('resize', update);

    update();
  }

  function initAll() {
    document.querySelectorAll('[data-tech-slider]').forEach(initTechSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
