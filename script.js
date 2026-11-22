/* ===== Script commun du site ===== */
(function () {
  /* --- Images : essaie .webp, .jpg, .jpeg, .png ---
     <img data-img="img/tab1"> ; si aucune n'existe, cadre de repli. */
  const ext = ['webp', 'jpg', 'jpeg', 'png'];
  function charger(base, ok, ko, i = 0) {
    if (i >= ext.length) return ko();
    const t = new Image();
    t.onload = () => ok(`${base}.${ext[i]}`);
    t.onerror = () => charger(base, ok, ko, i + 1);
    t.src = `${base}.${ext[i]}`;
  }
  document.querySelectorAll('img[data-img]').forEach(img => {
    charger(img.dataset.img,
      src => { img.src = src; },
      () => { img.parentNode.classList.add('manquant'); img.remove(); });
  });
  // Image 5 : motif de fond (img/backup.*), appliqué aux sections .motif
  charger('img/backup',
    src => document.documentElement.style.setProperty('--motif', `url("${src}")`),
    () => {});

  /* --- Mode sombre : bouton ☾ / ☀ dans l'en-tête --- */
  const racine = document.documentElement;
  const btn = document.querySelector('.theme-btn');
  function maj() {
    const sombre = racine.dataset.theme === 'sombre';
    if (btn) {
      btn.textContent = sombre ? '☀' : '☾';
      btn.title = sombre ? 'Passer en mode clair' : 'Passer en mode sombre';
      btn.setAttribute('aria-label', btn.title);
    }
  }
  if (btn) btn.addEventListener('click', () => {
    const sombre = racine.dataset.theme !== 'sombre';
    if (sombre) racine.dataset.theme = 'sombre'; else delete racine.dataset.theme;
    try { localStorage.setItem('theme', sombre ? 'sombre' : 'clair'); } catch (e) {}
    maj();
  });
  maj();
})();
