(function () {
  'use strict';

  if (window.__bidgelyLeadershipHubdbModalInit) {
    return;
  }
  window.__bidgelyLeadershipHubdbModalInit = true;

  function initLeadershipBioModal() {
    var sections = document.querySelectorAll('.leadershipSection');
    var modal = document.getElementById('bioModal');
    var modalClose = document.getElementById('bioModalClose');
    var modalPhotoWrap = document.getElementById('bioModalPhotoWrap');
    var modalPhoto = document.getElementById('bioModalPhoto');
    var modalName = document.getElementById('bioModalName');
    var modalTitle = document.getElementById('bioModalTitle');
    var modalBio = document.getElementById('bioModalBio');
    var modalLinkedin = document.getElementById('bioModalLinkedin');

    if (!sections.length || !modal || !modalClose || !modalPhoto) return;

    var leaders = [];
    try {
      var dataEl = document.getElementById('leadershipData');
      if (dataEl && dataEl.textContent) {
        leaders = JSON.parse(dataEl.textContent);
      }
    } catch (e) {
      console.warn('Leadership: could not parse leader data.', e);
    }

    var activeCard = null;
    var openSeq = 0;

    function setLinkedin(li, displayName) {
      if (!modalLinkedin) return;
      if (li) {
        modalLinkedin.href = li;
        modalLinkedin.target = '_blank';
        modalLinkedin.rel = 'noopener noreferrer';
        modalLinkedin.classList.remove('bio-modal__linkedin--no-url');
        modalLinkedin.setAttribute('aria-label', 'LinkedIn profile for ' + (displayName || ''));
      } else {
        modalLinkedin.href = '#';
        modalLinkedin.removeAttribute('target');
        modalLinkedin.setAttribute('rel', 'noopener noreferrer');
        modalLinkedin.classList.add('bio-modal__linkedin--no-url');
        modalLinkedin.setAttribute('aria-label', 'LinkedIn (URL not set in directory)');
      }
    }

    function openModal(card) {
      var mySeq = ++openSeq;

      var data = leaders.filter(function (l) {
        return String(l.id) === String(card.dataset.id);
      })[0];
      if (!data) return;

      modalPhoto.onload = null;
      modalPhoto.onerror = null;
      modalPhoto.classList.add('bio-modal__photo--swapping');
      if (modalPhotoWrap) {
        modalPhotoWrap.classList.add('bio-modal__photo-wrap--loading');
      }
      modalPhoto.removeAttribute('src');
      modalPhoto.alt = '';

      modalName.textContent = data.name || '';
      modalTitle.textContent = data.title || '';
      modalBio.innerHTML = data.bio || '';

      var li =
        data.linkedin_url != null && String(data.linkedin_url).trim()
          ? String(data.linkedin_url).trim()
          : '';
      setLinkedin(li, data.name || '');

      if (activeCard) {
        activeCard.classList.remove('is-active');
        activeCard.setAttribute('aria-expanded', 'false');
      }
      card.classList.add('is-active');
      card.setAttribute('aria-expanded', 'true');
      activeCard = card;

      function revealPhotoIfCurrent() {
        if (mySeq !== openSeq) return;
        modalPhoto.classList.remove('bio-modal__photo--swapping');
        if (modalPhotoWrap) {
          modalPhotoWrap.classList.remove('bio-modal__photo-wrap--loading');
        }
      }

      var photoUrl = (data.photo && String(data.photo).trim()) || '';
      if (photoUrl) {
        modalPhoto.onload = function () {
          modalPhoto.onload = null;
          revealPhotoIfCurrent();
        };
        modalPhoto.onerror = function () {
          modalPhoto.onerror = null;
          revealPhotoIfCurrent();
        };
        modalPhoto.src = photoUrl;
        modalPhoto.alt = data.name || '';
        if (modalPhoto.complete && modalPhoto.naturalWidth > 0) {
          modalPhoto.onload = null;
          revealPhotoIfCurrent();
        }
      } else {
        revealPhotoIfCurrent();
      }

      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      modalClose.focus();
    }

    function closeModal() {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      openSeq += 1;
      modalPhoto.onload = null;
      modalPhoto.onerror = null;
      modalPhoto.removeAttribute('src');
      modalPhoto.classList.remove('bio-modal__photo--swapping');
      if (modalPhotoWrap) {
        modalPhotoWrap.classList.remove('bio-modal__photo-wrap--loading');
      }
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
      e.preventDefault();
      if (card === activeCard) {
        closeModal();
      } else {
        openModal(card);
      }
    }

    function onLeadershipKeydown(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.leader-card');
      if (!card) return;
      e.preventDefault();
      if (card === activeCard) {
        closeModal();
      } else {
        openModal(card);
      }
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
