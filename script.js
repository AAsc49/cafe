/* ===== Textes du site : chargés depuis contenu/<page>.md =====
   Chaque bloc HTML <div data-bloc="CODE"> reçoit le texte du bloc « == CODE == »
   du fichier indiqué par <body data-contenu="...">. Afficher les codes : ajouter ?codes à l'adresse
   (?codes=0 pour les masquer). Mode d'emploi : GUIDE-MODIFS.md. */
window.Contenu = (function () {
  const blocs = {};
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  function tagClasse(t) {
    const n = t.toLowerCase();
    if (n.includes('immersion') || n.includes('décoction')) return 'tag immersion';
    if (n.includes('pression')) return 'tag pression';
    if (n.includes('froid')) return 'tag froid';
    return 'tag';
  }
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[\[([^\]]+)\]\]/g, (m, t) => `<span class="${tagClasse(t)}">${t}</span>`)
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => `<a href="${u}"${/^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`)
      .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.+?)\*/g, '<i>$1</i>');
  }
  const cellules = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
  function rendu(md, classeP) {
    const pc = classeP ? ` class="${classeP}"` : '';
    return md.trim().split(/\n\s*\n/).map(g => {
      const L = g.split('\n').map(l => l.trim()).filter(Boolean);
      const h = L[0].match(/^(#{1,3}) (.+)$/);
      if (h) return `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>` + (L.length > 1 ? rendu(L.slice(1).join('\n'), classeP) : '');
      if (L.every(l => /^- /.test(l))) return '<ul>' + L.map(l => `<li>${inline(l.slice(2))}</li>`).join('') + '</ul>';
      if (L.every(l => l.includes(' :: '))) return '<dl>' + L.map(l => { const i = l.indexOf(' :: '); return `<dt>${inline(l.slice(0, i))}</dt><dd>${inline(l.slice(i + 4))}</dd>`; }).join('') + '</dl>';
      if (L[0].startsWith('|')) {
        const corps = L.slice(2).map(l => '<tr>' + cellules(l).map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('');
        return '<table><thead><tr>' + cellules(L[0]).map(c => `<th>${inline(c)}</th>`).join('') + `</tr></thead><tbody>${corps}</tbody></table>`;
      }
      if (L.every(l => l.startsWith('>'))) return '<p class="formule">' + inline(L.map(l => l.replace(/^>\s?/, '')).join(' ')) + '</p>';
      return `<p${pc}>${inline(L.join(' '))}</p>`;
    }).join('');
  }
  /* Fiches : « ### Titre », lignes « Champ :: valeur », puis le texte */
  function fiches(code) {
    return (blocs[code] || '').split(/^### /m).slice(1).map(f => {
      const L = f.split('\n'), champs = {}, texte = [];
      L.slice(1).forEach(l => {
        const i = l.indexOf(' :: ');
        if (i > 0 && !texte.length) champs[l.slice(0, i).trim()] = l.slice(i + 4).trim();
        else if (l.trim() || texte.length) texte.push(l);
      });
      const brut = texte.join('\n').trim();
      return { titre: L[0].trim(), titreHtml: inline(L[0].trim()), champs, brut, texte: inline(brut.replace(/\s*\n\s*/g, ' ')) };
    });
  }
  /* Liste : lignes « - Libellé : valeur » */
  function liste(code) {
    return (blocs[code] || '').split('\n').map(l => l.match(/^\s*-\s*(.+?)\s*:\s*(.+?)\s*$/)).filter(Boolean).map(m => [m[1], m[2]]);
  }
  let codes = false;
  try {
    const q = new URLSearchParams(location.search);
    if (q.has('codes')) sessionStorage.setItem('codes', q.get('codes') === '0' ? '0' : '1');
    codes = sessionStorage.getItem('codes') === '1';
  } catch (e) {}
  function etiquette(el, code) {
    if (!codes) return;
    const s = document.createElement(el.dataset.mode === 'ligne' ? 'span' : 'small');
    s.className = 'code-bloc'; s.textContent = code;
    el.appendChild(s);
  }
  const fichier = document.body.dataset.contenu;
  const pret = !fichier ? Promise.resolve() : fetch(fichier, { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(txt => {
      let cle = null;
      txt.replace(/\r/g, '').split('\n').forEach(l => {
        const m = l.match(/^== ([A-Z]+-[A-Z0-9]+) ==/);
        if (m) { cle = m[1]; blocs[cle] = ''; }
        else if (cle) blocs[cle] += l + '\n';
      });
      document.querySelectorAll('[data-bloc]').forEach(el => {
        const code = el.dataset.bloc;
        if (!(code in blocs)) { el.innerHTML = `<p class="note">⚠ Bloc ${code} introuvable dans ${fichier}</p>`; return; }
        el.innerHTML = el.dataset.mode === 'ligne' ? inline(blocs[code].trim()) : rendu(blocs[code], el.dataset.p);
        etiquette(el, code);
      });
      if (codes) document.querySelectorAll('[data-code]').forEach(el => {
        const s = document.createElement('small');
        s.className = 'code-bloc'; s.textContent = el.dataset.code;
        el.before(s);
      });
    })
    .catch(() => {
      const d = document.createElement('div');
      d.className = 'alerte-contenu';
      d.textContent = `Textes non chargés (${fichier}). Ouvrez le site en ligne (cafe.ascensi.com) ou avec Live Server : un double-clic sur le fichier HTML ne suffit pas.`;
      document.body.prepend(d);
    });
  return { pret, blocs, fiches, liste, inline, rendu, codes, etiquette };
})();

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
      src => {
        img.src = src;
        if (Contenu.codes) {
          const s = document.createElement('small');
          s.className = 'code-bloc code-img'; s.textContent = src;
          img.parentNode.appendChild(s);
        }
      },
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
