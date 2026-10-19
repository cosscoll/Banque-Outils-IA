# Banque Outils IA — Atlas des possibles

## Refondre à partir du retour utilisateur — 19 octobre 2026

Le premier accueil sombre, aux néons cyan, avait trop de textes et aucune perception de vrai volume. La refonte doit rester distincte de Business 01.

### Direction artistique actuelle (encore soumise à validation utilisateur)
- Palette calme : ivoire #f5f4ef, graphite #182124, vert minéral #7b8a83.
- Une entrée éditoriale avec un titre bref, un objet 3D dominant et des espaces généreux.
- Six univers seulement, révélés à la demande ; le catalogue complet est une page secondaire.
- Typographies système/Georgia, pas de fonts externes, de kits premium ni de services payants.

### Code réellement réalisé
- `index.html` : accueil réécrit. `assets/atlas.css` : responsive et composants. `assets/atlas.js` : moteur natif WebGL.
- WebGL **maillé en 3D** : sphères et anneaux torus, vertices/normales, éclairage, profondeur et perspective, rotation lente, glisser pour orienter, sélection de satellite et arrêt des animations.
- Six catégories navigables avec boutons HTML accessibles, détails et liens vers les méthodes publiques.
- Repli Canvas 2D en cas de panne WebGL ; le bug d'activation du repli a été corrigé.
- Anciennes pages `catalogue.html`, `recherche.html` et `avancement.html` harmonisées via `assets/atlas-legacy.css`; contenu et fonctions préservés.

### Tests et preuve
- CI Node `Verify public preview` : PASS.
- Nouvelle CI `QA visuelle atlas 3D` : Chromium headless Playwright, desktop 1440 px et mobile 390 px, **WebGL disponible et activé**, pas d'erreurs JS ni débordement horizontal, sélection des univers, mode Canvas 2D simulé et fonctionnel.
- Contrôles de palette, débordement et interactions sur Catalogue/Recherche/Avancement : PASS.
- Captures d'écran archivées dans l'artifact GitHub du workflow.
- Pas encore de test de performance Lighthouse sur réseau réel ou de validation manuelle sur iPhone/Android physique.

### État publication
Ce document couvre la PR #6 `redesign/atlas-calme-3d-20261019`. Ne pas déclarer la refonte publiée tant que sa fusion et le déploiement GitHub Pages sur le SHA résultant ne sont pas confirmés.

### Autocritique et prochaines itérations
- Tester la lisibilité de la scène sur un appareil physique peu puissant ; mesurer FPS, LCP et CLS.
- Renforcer les explications des liens entre familles si l'exploration est jugée peu compréhensible.
- Confirmer avec l'utilisateur la palette claire et l'esthétique de sculpture avant toute multiplication de contenu.
- Respecter toujours le mode réduit, les accès clavier, les produits premium privés et le budget zéro.
