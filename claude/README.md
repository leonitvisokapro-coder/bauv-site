# bauV.ch — Site web entreprise générale de rénovation

> **Reprise du projet dans Claude Code** — Ce README contient tout le contexte nécessaire pour continuer le développement.

---

## 1. Description du projet

**bauV** est une entreprise générale de rénovation basée à Genève (Petit-Lancy), spécialisée dans la rénovation complète d'appartements, maisons et locaux commerciaux dans l'arc lémanique. Le site est leur **vitrine commerciale** et leur principal canal d'acquisition de leads B2C/B2B.

### Cible
- **Propriétaires** (particuliers) qui veulent rénover cuisine, salle de bains, salon, chambre, extérieur
- **Régies immobilières** et **investisseurs** ayant des biens à rénover
- **Prospects haut de gamme** sensibles à la qualité, au design et à la transparence

### Objectif business
1. **Crédibilité** : positionner bauV comme acteur premium et sérieux (vs les "petits artisans")
2. **Conversion** : maximiser les demandes de devis via le formulaire Formspree
3. **SEO local Genève** : ranker sur "rénovation Genève", "entreprise générale Genève", etc.

### Inspiration design
Le site est inspiré de **atlante.ch** — architecte suisse au design éditorial très épuré, scroll-cinéma premium, palette neutre. L'intro de la home reproduit l'effet signature d'Atlante : une image scrolle vers le haut, et le logo (positionné fixe au centre) se révèle en bicolore (blanc sur image, noir sur fond blanc) au passage de l'arête.

### Identité de marque
- **Couleurs** : `--green-dark #176131`, `--green-light #82bd41`, `--dark-gray #2a2a2a`
- **Typo** : Inter (Google Fonts) — toutes les graisses
- **Logo** : "bauV" — "bau" noir + "V" vert dégradé (signature visuelle forte)
- **Adresse** : Avenue des Morgines 12, 1213 Petit-Lancy, Genève
- **Téléphone** : +41 78 268 54 42
- **Email** : info@bauv.ch
- **Formulaire** : Formspree endpoint `mgopblkk`

---

## 2. Stack technique

**Site 100% statique** — pas de framework, pas de build step, pas de backend. Conçu pour être hébergé sur n'importe quel serveur HTTP statique (Netlify, Vercel, GitHub Pages, OVH classique, etc.).

| Couche | Technologie |
|---|---|
| HTML | HTML5 sémantique pur, pas de templating engine |
| CSS | CSS3 vanilla, variables CSS pour les tokens, `clip-path`, `clamp()`, `position: sticky`, animations |
| JS | JavaScript vanilla (pas de jQuery, pas de React, pas de bundler) |
| Animations scroll | `requestAnimationFrame` + `getBoundingClientRect` (sans GSAP — fait main) |
| Fonts | Google Fonts (Inter) — chargées via `<link>` |
| Images | PNG + WebP (fallback `<picture>` pour perf) |
| Formulaires | Formspree (action POST sur `https://formspree.io/f/mgopblkk`) |
| Cartes | Google Maps via iframe (embed simple) |
| SEO | sitemap.xml + robots.txt + Open Graph + Schema.org JSON-LD |

### Aucune dépendance npm
Pas de `package.json`, pas de `node_modules`. Le site peut s'ouvrir directement en double-clic sur `index.html` (file://) — c'est d'ailleurs comme ça que le client teste actuellement.

---

## 3. Structure des fichiers

```
site/
├── README.md                          # Ce fichier
│
├── index.html                         # Page d'accueil avec intro cinématique
├── services.html                      # Liste des services proposés
├── realisations.html                  # Portfolio de réalisations
├── contact.html                       # Formulaire de contact + plan d'accès
│
├── renovation-cuisine.html            # Page dédiée rénovation cuisine
├── renovation-salle-de-bains.html     # Page dédiée rénovation salle de bains
├── renovation-salon.html              # Page dédiée rénovation salon
├── renovation-chambre.html            # Page dédiée rénovation chambre
├── renovation-exterieur.html          # Page dédiée rénovation extérieur
│
├── style.css                          # CSS unique pour tout le site (~5230 lignes)
│
├── sitemap.xml                        # Sitemap SEO
├── robots.txt                         # Crawler directives
│
├── images/                            # Assets visuels (binaires)
│   ├── logo-bauv-noir.png            (78 KB)   Logo bauV version noire pour fond clair
│   ├── logo-bauv-noir.webp           (26 KB)   Variante WebP du logo noir
│   ├── logo-bauv-blanc.png           (67 KB)   Logo bauV version blanche pour fond sombre
│   ├── logo-bauv-blanc.webp          (23 KB)   Variante WebP du logo blanc
│   ├── maison-isometrique.png      (1.6 MB)    Illustration de la maison isométrique transparente
│   └── maison-isometrique.webp     (181 KB)    Variante WebP de la maison
│
└── templates/
    └── room-template.html             # Template de référence pour les 5 pages rénovation-*
```

### Inventaire détaillé de chaque fichier

#### Pages HTML

| Fichier | Lignes | Rôle |
|---|---:|---|
| `index.html` | 599 | Home : intro cinématique scroll → valeurs → avantages → maison interactive → étapes → zones → garanties → CTA contact |
| `services.html` | 221 | Liste structurée des services (gros œuvre, finitions, électricité, plomberie, etc.) |
| `realisations.html` | 158 | Galerie des projets réalisés (actuellement placeholders, à remplir avec vraies photos clients) |
| `contact.html` | 143 | Formulaire Formspree + carte Google Maps + infos contact |
| `renovation-cuisine.html` | 273 | Landing page focus cuisine (SEO local) |
| `renovation-salle-de-bains.html` | 273 | Landing page focus SDB |
| `renovation-salon.html` | 273 | Landing page focus salon |
| `renovation-chambre.html` | 273 | Landing page focus chambre |
| `renovation-exterieur.html` | 273 | Landing page focus extérieur |

#### Asset principal

| Fichier | Lignes | Rôle |
|---|---:|---|
| `style.css` | 5230 | Tous les styles : tokens, header, footer, sections home, pages internes, intro cinématique, maison interactive, responsive |

#### SEO

| Fichier | Rôle |
|---|---|
| `sitemap.xml` | Sitemap référencant les 9 pages HTML avec priorités et fréquences de mise à jour |
| `robots.txt` | Autorise tous les crawlers, pointe vers sitemap.xml |

#### Templates internes

| Fichier | Rôle |
|---|---|
| `templates/room-template.html` | Modèle de référence utilisé pour générer les 5 pages `renovation-*.html`. À utiliser si on veut ajouter une 6ème pièce. |

---

## 4. Contenu des fichiers

**⚠️ Les fichiers HTML/CSS sont fournis dans l'archive `bauv-site.zip` jointe à cette réponse**, pas inlinés dans ce README pour les raisons suivantes :

- `style.css` fait 5230 lignes (~100 KB) — l'inliner ici rendrait le doc illisible
- Les fichiers HTML totalisent ~150 KB
- Les images binaires (PNG/WebP) ne peuvent pas être représentées en texte

**Pour utiliser dans Claude Code** : dézippe l'archive dans ton workspace, ouvre le dossier `site/` et Claude Code pourra lire tous les fichiers directement avec ses outils `view`/`read`.

### Sections clés de `index.html` (pour repérage rapide)

```html
<!-- Ligne ~25 : HEADER avec menu de navigation -->
<header class="site-header">...</header>

<!-- Ligne ~61 : INTRO CINÉMATIQUE (logo + image qui scrolle) -->
<section class="bauv-cinematic" id="bauvCinematic">
  <div class="bauv-cinematic-pin">
    <div class="bauv-cinematic-bg" id="cinematicBg">...</div>
    <div class="bauv-cinematic-logo" id="cinematicLogo">
      <picture class="logo-white">...</picture>
      <picture class="logo-black">...</picture>
    </div>
    <div class="bauv-cinematic-text" id="cinematicText">...</div>
  </div>
</section>

<!-- Section VALEURS (3 piliers : exigence, précision, transparence) -->
<!-- Section AVANTAGES (pourquoi choisir bauV) -->
<!-- Section ROOMS-HOUSE (maison isométrique avec 5 hotspots interactifs) -->
<!-- Section STEPS (étapes du projet : devis → conception → réalisation → livraison) -->
<!-- Section ZONES (zones géographiques desservies) -->
<!-- Section GUARANTEES (garanties qualité) -->
<!-- Section CTA-CONTACT (call to action final) -->

<!-- Ligne ~490 : SCRIPT inline de l'intro cinématique -->
<script>
  // INTRO CINÉMATIQUE — Style Atlante (clip-path technique)
  // Phase 1 (0-70%) : image scrolle vers le haut, clip-path bicolore sur le logo
  // Phase 2 (70-100%) : logo monte légèrement, texte révélé pixel-perfect via getBoundingClientRect
</script>
```

### Sections clés de `style.css`

| Lignes (approx.) | Section |
|---|---|
| 1-50 | Reset CSS + variables (`--green-dark`, `--green-light`, etc.) |
| 50-200 | Typographie de base |
| 200-500 | Header + navigation |
| 500-900 | Footer |
| 900-1500 | Sections home (valeurs, avantages) |
| 1500-2500 | Maison isométrique + hotspots interactifs |
| 2500-3500 | Étapes, zones, garanties |
| 3500-4500 | Pages internes (services, réalisations, contact, pages pièces) |
| 4500-5000 | Boutons, cards, utilities |
| 5000-5230 | **Intro cinématique (`.bauv-cinematic-*`)** + media queries finales |

---

## 5. Dépendances à installer

**Aucune.** Le projet n'a pas de `package.json`, pas de `node_modules`, pas de build step.

Si tu veux un serveur de dev pour le live-reload, tu peux installer (optionnel) :

```bash
# Option 1 : serveur Python (déjà installé sur Mac)
python3 -m http.server 8000

# Option 2 : live-server (si tu veux le hot reload)
npm install -g live-server

# Option 3 : npx serve (sans installation globale)
npx serve site/
```

### Dépendances externes chargées via CDN

| Source | Usage |
|---|---|
| `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700` | Police Inter |
| `https://formspree.io/f/mgopblkk` | Endpoint du formulaire de contact |
| Google Maps embed (iframe) | Plan d'accès dans contact.html |

---

## 6. Comment lancer le projet en local

### Méthode 1 — Double-clic (la plus simple, utilisée par le client)

```
Ouvrir le Finder → naviguer dans le dossier site/ → double-cliquer sur index.html
```

Le navigateur ouvre le site en `file://`. **Limitation** : certaines fonctionnalités peuvent être bloquées par CORS (chargement de polices, fetch, etc.), mais ça marche pour 95% du site.

### Méthode 2 — Serveur HTTP local (recommandé pour dev)

```bash
cd site/
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000 dans le navigateur
```

### Méthode 3 — Avec live-reload

```bash
cd site/
npx live-server --port=8000
# Auto-refresh à chaque modification de fichier
```

### Tests à effectuer après modification

1. Hard refresh : **`Cmd+Shift+R`** (sinon le navigateur cache les CSS/JS)
2. Tester en responsive : Chrome DevTools → Toggle Device Toolbar (`Cmd+Shift+M`)
3. Tester l'intro cinématique : scroller lentement la home pour vérifier la transition logo blanc→noir
4. Tester la maison isométrique : hover sur les 5 points verts

---

## 7. État du projet : ce qui marche, bugs, TODO

### ✅ Ce qui marche bien

- **Architecture** : 9 pages HTML cohérentes, navigation fluide, footer uniforme
- **Header** : sticky avec logo + menu, transitions élégantes
- **Maison isométrique** : 5 hotspots cliquables avec labels au hover, animation pulse, responsive (positions stables en %)
- **Logos bauV** : versions noire et blanche traitées, dimensions identiques 800×800, format PNG + WebP
- **SEO** : sitemap.xml, robots.txt, Open Graph, Schema.org sur toutes les pages
- **Responsive** : breakpoints à 768px et 1024px, mobile-friendly
- **Formulaire contact** : Formspree configuré et fonctionnel
- **5 pages pièces** (cuisine, SDB, salon, chambre, extérieur) : générées depuis template, contenu SEO-friendly

### 🐛 Bugs connus / en cours

#### 🔴 Intro cinématique — bug visuel persistant
**Symptôme** : pendant la transition clip-path, le client perçoit le logo noir comme légèrement plus grand que le logo blanc. Les deux PNGs ont pourtant des dimensions strictement identiques (800×800 vérifié). Hypothèses à explorer :
- Différence de "poids visuel" : le logo noir est compact, le blanc a beaucoup de blanc interne → illusion d'optique
- Le gradient vert du V s'étend différemment selon la version (le "V" descend plus bas dans le noir)
- Antialiasing différent à la jointure du clip-path
- **Piste à tester** : remplacer le clip-path par un `mask-image` avec gradient, ou utiliser SVG inline pour un contrôle parfait

#### 🟡 Espacement logo ↔ texte en phase 2
**Symptôme** : le client trouve que le texte tombe "trop loin" du logo, comparé à atlante.ch où c'est très serré.
**État** : un fix pixel-perfect a été appliqué (`text.style.top = logoBox.bottom + 36`) — à valider après hard refresh côté client. Si toujours problème, réduire `GAP_LOGO_TEXT` à 24px ou repenser la composition.

#### 🟡 Image hero manquante
Le client n'a pas encore fourni l'image hero finale. Actuellement un fallback dégradé sombre est en place. À remplacer dans `images/hero.jpg`.

### 📋 TODO / À faire

#### Court terme (priorité 1)
1. **Finaliser l'intro cinématique** : régler définitivement le bug logo noir > blanc
2. **Image hero finale** : récupérer une vraie photo de chantier ou rendu 3D du client pour `images/hero.jpg`
3. **Galerie réalisations** : remplacer les placeholders dans `realisations.html` par les vraies photos de projets (le client doit les fournir)
4. **Tester sur Safari/Firefox** : le développement a été fait sur Chrome, vérifier que `clip-path` et `position: sticky` se comportent bien partout

#### Moyen terme (priorité 2)
5. **Blog** : créer `blog-main.html` (référencé mais pas encore généré) + structure pour articles SEO
6. **Optimisation perf** : passer l'audit Lighthouse, viser >90 sur tous les axes
7. **Lazy loading** : ajouter `loading="lazy"` sur toutes les images en dessous du fold
8. **Schema.org enrichi** : ajouter LocalBusiness, Service, AggregateRating si avis clients dispo

#### Long terme (priorité 3)
9. **Espace client** : possibilité pour les clients existants de suivre leur chantier en ligne
10. **Calculateur de devis** : outil interactif "estimez votre projet en 2 min"
11. **Multilingue** : version allemande (DE) pour la clientèle suisse-alémanique
12. **CMS léger** : si le client veut éditer les contenus lui-même (Netlify CMS, Decap CMS)

### ⚠️ Conventions importantes à respecter

- **Pas d'emoji** dans les contenus du site (le client est dans le haut de gamme, ton sobre)
- **Adresse, téléphone, email** doivent être identiques partout (chercher/remplacer si modif)
- **Couleurs** : passer par les variables CSS (`var(--green-dark)`), ne pas hardcoder
- **Inter** est la SEULE typo du site, ne pas en introduire d'autres
- **Mobile-first** : tester chaque modif sur 375px de large minimum
- **Le client teste en `file://`** : éviter tout ce qui nécessite un serveur (fetch dynamique, modules ES, etc.)

### 📂 Historique des transcriptions

Le projet s'étale sur plusieurs sessions de travail avec Claude. Les transcripts complets sont archivés (côté Anthropic) :
- Session 1 : bauv-renovation-multipage-rebuild (architecture initiale, 9 pages)
- Session 2 : bauv-website-redesign (refonte design, logos, maison isométrique)
- Session 3 : bauv-cinematic-intro-iteration (intro Atlante-style, en cours)

---

## 🚀 Pour reprendre dans Claude Code

```bash
# 1. Dézipper l'archive
unzip bauv-site.zip
cd site/

# 2. Lancer un serveur local
python3 -m http.server 8000

# 3. Ouvrir dans Claude Code
claude .

# 4. Premier prompt suggéré :
# "Lis ce README.md, puis examine index.html (l'intro cinématique aux lignes 61-100 et 490-560)
# et style.css (l'intro cinématique vers les lignes 5050-5230). On essaie de reproduire
# l'effet d'atlante.ch. Le bug actuel : le logo noir paraît plus grand que le blanc pendant
# la transition clip-path. Diagnostique et propose une solution propre."
```

---

*Dernière mise à jour : 7 juin 2026*
