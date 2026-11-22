# Guide : modifier le site cafe.ascensi.com

Ce guide explique ce que tu peux modifier toi-même (les textes et les images) et comment publier tes modifications.
Pour tout le reste (mise en page, nouvelle section, nouvelle page, couleurs, tableau de calcul…), envoie un mail à **cafe@ascensi.com** (voir la fin du guide).

---

## 1. Ce que tu peux modifier, et où

| Je veux modifier… | Fichier à ouvrir |
|---|---|
| Les textes de l'accueil | `contenu/index.md` |
| Les textes de l'onglet Préparation | `contenu/preparation.md` |
| Les textes de l'onglet Torréfaction | `contenu/torrefaction.md` |
| Les textes de l'onglet Origines (y compris les fiches pays et le graphique de production) | `contenu/origines.md` |
| Les textes de l'onglet Matériel | `contenu/materiel.md` |
| Les termes du glossaire | `contenu/glossaire.md` |
| Une image | dossier `img/` (voir § 5) |

**Ne touche pas** aux fichiers `.html`, `style.css`, `script.js`, `CNAME` ni au dossier `assets/` : c'est la mécanique du site.

Restent aussi dans le HTML (donc par mail) : les menus, les boutons du sommaire, les petites étiquettes en haut de page (« Onglet 1 · Préparation »), les icônes des cartes, le nuancier des degrés de torréfaction, le calculateur et la roue des arômes.

---

## 2. Retrouver un texte : les codes

Chaque bloc de texte du site a un code, par exemple `PREP-05`.

Pour voir les codes, ajoute **`?codes`** à la fin de l'adresse :
`https://cafe.ascensi.com/preparation.html?codes`

Les codes apparaissent alors en petit gris sous chaque bloc, et le nom de fichier s'affiche sur chaque image. Ils restent affichés quand tu changes de page. Pour les masquer : `?codes=0`.

Ensuite, ouvre le fichier `.md` de la page, fais **Ctrl+F**, tape le code : tu tombes sur le bloc.

Dans un fichier `.md`, chaque bloc commence par une ligne comme celle-ci :

```
== PREP-05 ==  Les fondamentaux de l'extraction · « La mouture »
```

- **Ne modifie jamais et ne supprime jamais** ces lignes `== CODE ==` : le site s'en sert pour savoir où placer le texte.
- Ce qui suit le code sur la même ligne n'est qu'un repère pour toi : le modifier ne change rien au site.
- Tout ce qui est entre une ligne de code et la suivante est le texte du bloc : c'est ça que tu modifies.
- Les lignes en haut du fichier, avant le premier code, sont des explications et ne s'affichent pas.

---

## 3. Écrire le texte (syntaxe Markdown simplifiée)

| Tu écris | Résultat sur le site |
|---|---|
| Une ligne vide entre deux textes | Deux paragraphes séparés |
| `**mot**` | **mot** en gras |
| `*mot*` | *mot* en italique |
| `# Titre` | Grand titre de page (en haut) |
| `## Titre` | Titre de section |
| `### Titre` | Titre d'une carte |
| `- élément` (une ligne par élément) | Liste à puces |
| `Dose :: 16–20 g` (une ligne par info) | Fiche « étiquette / valeur » (comme dans les fiches méthodes) |
| `[[Immersion]]` | Petite pastille de couleur (Percolation, Immersion, Pression, À froid…) |
| `> texte` | Texte dans un encadré bleu (comme la formule d'extraction) |
| `[texte du lien](https://adresse.com)` | Lien cliquable |
| `\| a \| b \|` | Ligne de tableau (voir ci-dessous) |

**Tableaux** : une ligne par rangée, les cases séparées par `|`. La 1re ligne est l'en-tête ; la 2e (`|---|---|`) ne s'affiche pas mais doit rester. Garde le même nombre de cases sur chaque ligne.

```
| Méthode | Ratio | Temps |
|---|---|---|
| **V60** | 1:16 | 3 min |
```

Pour ajouter une rangée, copie une ligne existante et modifie-la.

**À savoir :**
- Un retour à la ligne simple ne crée pas de nouvelle ligne : il faut une **ligne vide** pour un nouveau paragraphe.
- Les accents, les espaces insécables et les symboles (°C, →, ≈, CO₂) fonctionnent normalement.
- N'écris pas de balises HTML (`<b>`, `<br>`…) : elles s'afficheraient telles quelles.

---

## 4. Les blocs spéciaux (fiches)

Trois blocs ont un format particulier.

### Les pays producteurs : `ORIG-PAYS` dans `contenu/origines.md`

Une fiche par pays :

```
### Brésil

Continent :: Amériques
Espèce :: Arabica + Robusta (conilon)
Terroirs :: Sul de Minas, Cerrado Mineiro
Arômes :: chocolat, noisette, caramel

Premier producteur mondial. Texte de présentation…
```

- `Continent` doit valoir **Amériques**, **Afrique** ou **Asie** : c'est ce qui fait marcher les boutons de filtre.
- `Arômes` : séparés par des virgules, chacun devient une pastille.
- Pour ajouter un pays, copie une fiche entière (du `###` jusqu'au texte) et colle-la avant la ligne `== ORIG-…` suivante.

### Le graphique de production : `ORIG-BARRES` dans `contenu/origines.md`

```
- Brésil : 63,0
- Éthiopie : ≈8,5
```

Une ligne par pays, en millions de sacs. Mets `≈` devant un chiffre estimé. Les barres se recalculent toutes seules. Pense aussi à mettre à jour la source dans le bloc de note juste en dessous.

### Le glossaire : `GLOS-TERMES` dans `contenu/glossaire.md`

```
### Bloom (pré-infusion)

Catégorie :: Préparation

Première humidification de la mouture…
```

L'ordre alphabétique et les lettres de navigation se font tout seuls : ajoute un terme n'importe où dans le bloc. Catégories utilisées : Préparation, Torréfaction, Origines, Dégustation, Matériel.

---

## 5. Remplacer une image

Les images sont dans le dossier `img/` :

| Fichier | Où il s'affiche | Format conseillé |
|---|---|---|
| `ban` | Bannière de l'accueil | 1920 × 800 |
| `tab1` | En-tête de Préparation | 1600 × 1067 |
| `tab2` | En-tête de Torréfaction | 1600 × 900 |
| `tab3` | En-tête d'Origines | 1920 × 1080 |
| `backup` | Motif de fond des sections bleues (doit pouvoir se répéter) | 1024 × 1024 |

Règles :
1. **Garde exactement le même nom et la même extension** : enregistre par-dessus `img/tab1.jpg`. Ne crée pas un `tab1.png` à côté, car le site prend d'abord le `.webp`, puis le `.jpg`, puis le `.png` : le nouveau fichier serait ignoré. Si tu changes de format, supprime l'ancien fichier.
2. Garde la même orientation et des proportions proches du format conseillé : l'image est recadrée pour remplir son cadre.
3. Vise **moins de 500 Ko** par image (exporte en JPG qualité 80 environ).
4. Avec `?codes`, le nom exact du fichier affiché s'inscrit sur chaque image.

---

## 6. Publier tes modifications (GitHub Desktop)

**Avant de commencer** (à chaque fois) :
1. Ouvre GitHub Desktop, dépôt `cafe`.
2. Clique sur **Fetch origin**, puis sur **Pull origin** s'il apparaît. Tu récupères ainsi les dernières modifications de papa, sinon vous risquez un conflit.

**Modifier :**

3. Ouvre le fichier `.md` avec le Bloc-notes ou VS Code, modifie, **enregistre** (encodage UTF-8, celui par défaut).

**Publier :**

4. Dans GitHub Desktop, tes fichiers modifiés apparaissent à gauche. Clique sur un fichier pour voir les changements (rouge = supprimé, vert = ajouté) et vérifier que tu n'as pas abîmé une ligne `== CODE ==`.
5. En bas à gauche, écris un résumé (ex. « Texte V60 corrigé ») puis clique sur **Commit to main**.
6. Clique sur **Push origin**.
7. Attends environ **1 minute**, puis recharge la page du site avec **Ctrl+F5**.

**Voir le résultat avant de publier** : un double-clic sur un fichier `.html` ne marche pas (le navigateur bloque le chargement des textes et affiche un bandeau rouge). Deux solutions :
- publier puis vérifier en ligne (le plus simple) ;
- ou installer **VS Code** et son extension **Live Server**, ouvrir le dossier `cafe`, faire un clic droit sur `index.html` puis **Open with Live Server**.

**En cas de problème :**
- Un bloc affiche « ⚠ Bloc XXX introuvable » : la ligne `== XXX ==` a été modifiée ou supprimée. Remets-la telle quelle.
- La page n'a pas changé : attends encore un peu et refais Ctrl+F5.
- Pour annuler un commit pas encore publié : dans l'onglet **History** de GitHub Desktop, clic droit sur le commit puis **Undo commit**. Après un Push, préviens papa.

---

## 7. Demander une modification plus importante

Envoie un mail à **cafe@ascensi.com** avec :
- la page concernée et, si possible, le **code** du bloc (`?codes`) ;
- ce que tu veux : ajouter une section, une page, un tableau, changer la mise en page ou les couleurs… ;
- une capture d'écran annotée si c'est plus simple à montrer.
