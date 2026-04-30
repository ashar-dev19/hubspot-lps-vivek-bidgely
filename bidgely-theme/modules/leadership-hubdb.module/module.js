(function () {
  'use strict';

  function initLeadershipBioModal() {
    var sections = document.querySelectorAll('.leadershipSection');
    var modal = document.getElementById('bioModal');
    var modalClose = document.getElementById('bioModalClose');
    var modalPhoto = document.getElementById('bioModalPhoto');
    var modalName = document.getElementById('bioModalName');
    var modalTitle = document.getElementById('bioModalTitle');
    var modalBio = document.getElementById('bioModalBio');
    var modalLinkedin = document.getElementById('bioModalLinkedin');

    if (!sections.length || !modal || !modalClose) return;

    var leaders = [];
    try {
      var dataEl = document.getElementById('leadershipData');
      if (dataEl) leaders = JSON.parse(dataEl.textContent);
    } catch (e) {
      console.warn('Leadership: could not parse leader data.', e);
    }

    var activeCard = null;

    function openModal(card) {
      var data = leaders.filter(function (l) {
        return String(l.id) === String(card.dataset.id);
      })[0];
      if (!data) return;

      modalName.textContent = data.name || '';
      modalTitle.textContent = data.title || '';
      modalBio.innerHTML = data.bio || '';
      modalPhoto.src = data.photo || '';
      modalPhoto.alt = data.name || '';

      var li =
        data.linkedin_url != null && String(data.linkedin_url).trim()
          ? String(data.linkedin_url).trim()
          : '';
      if (modalLinkedin) {
        if (li) {
          modalLinkedin.href = li;
          modalLinkedin.target = '_blank';
          modalLinkedin.rel = 'noopener noreferrer';
          modalLinkedin.classList.remove('bio-modal__linkedin--no-url');
          modalLinkedin.setAttribute('aria-label', 'LinkedIn profile for ' + (data.name || ''));
        } else {
          modalLinkedin.href = '#';
          modalLinkedin.removeAttribute('target');
          modalLinkedin.setAttribute('rel', 'noopener noreferrer');
          modalLinkedin.classList.add('bio-modal__linkedin--no-url');
          modalLinkedin.setAttribute('aria-label', 'LinkedIn (URL not set in directory)');
        }
      }

      if (activeCard) {
        activeCard.classList.remove('is-active');
        activeCard.setAttribute('aria-expanded', 'false');
      }
      card.classList.add('is-active');
      card.setAttribute('aria-expanded', 'true');
      activeCard = card;

      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (activeCard) {
        activeCard.classList.remove('is-active');
        activeCard.setAttribute('aria-expanded', 'false');
        activeCard.focus();
        activeCard = null;
      }
    }

    function onLeadershipClick(e) {
      if (e.target.closest('.leader-card__linkedin')) return;
      var card = e.target.closest('.leader-card');
      if (!card) return;
      card === activeCard ? closeModal() : openModal(card);
    }

    function onLeadershipKeydown(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.leader-card');
      if (!card) return;
      e.preventDefault();
      card === activeCard ? closeModal() : openModal(card);
    }

    sections.forEach(function (sectionEl) {
      sectionEl.addEventListener('click', onLeadershipClick);
      sectionEl.addEventListener('keydown', onLeadershipKeydown);
    });

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (!e.target.closest('.bio-modal__dialog')) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeCard) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeadershipBioModal);
  } else {
    initLeadershipBioModal();
  }
})();
