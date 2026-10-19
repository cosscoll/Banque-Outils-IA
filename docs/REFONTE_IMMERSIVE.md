# Refonte immersive — Banque Outils IA

Mise à jour : 2026-10-19 (Europe/Paris).

## Direction artistique
Cartographie vivante de l'IA : graphite et bleu nuit, cyan et vert d'eau lumineux, modules reliés par des relations de workflow. Identité originale et distincte de Business 01. Pas d'assets ni de code repris des références créatives.

## Architecture réellement intégrée sur branche
- `cartographie.html` : 6 familles (texte, image, code, audio/vidéo, automatisation/agents, recherche/analyse), relations explicites et positions projetées, rendu via WebGL natif sans dépendances externes, repli canvas 2D si WebGL indisponible, nœuds HTML sélectionnables et liste accessible.
- Recherche par correspondance locale de termes, non générative, filtres synchronisés avec nœuds/liste et panneau de détail, navigation vers les pages publiques existantes.
- `index.html` : liens vers cartographie, catalogue, fiches publiques et avancement.
- Écran responsive, focus visible, option reduced-motion, aucun checkout ni collecte.

## Tests effectués
Le 19/10, dix vérifications statiques à partir des deux fichiers relus via le connecteur GitHub : PASS (6 familles, WebGL, fallback, recherche, filtres, annonce lecteurs d'écran, absence de checkout, réduction des mouvements, liens d'accueil, maintien de l'ancien champ de recherche). Ces contrôles ne valent PAS des tests Chromium, CI, Lighthouse, validation WCAG ni validation HTTPS.

## Autocritique et problèmes ouverts
- Vérifier visuellement la scène sur navigateurs Android, Safari iPhone, desktop et fallback WebGL. Les performances LCP/CLS/animation ne sont pas mesurées.
- Améliorer les transitions de caméra, l'indication explicite des connexions et le clavier dans la scène ; contrôler le contraste et les cibles tactiles.
- Tester les branches des URL catalogue avant diffusion : le catalogue de 12 usages était sur cette même branche, pas encore dans main.
- Ne pas prétendre que des fournisseurs ou tarifs sont vérifiés : catégories pédagogiques seulement.
- Les outils et produits premium internes restent privés.

## État de publication
Branche `feat/home-navigation-a11y-20261019-0020` modifiée. `main` et le site GitHub Pages public ne sont pas encore déclarés actualisés. Contrôler PR, CI et conflits avant toute fusion ; vérifier le site HTTPS séparément.

## Prochain sprint
1. Établir un test automatique DOM/Chromium sur le contenu exact de cartographie.html ; corriger les erreurs observées.
2. Auditer performances et UX mobile réelles, corriger.
3. Vérifier CI/PR et intégration de l'expérience dans main sans divulgation ni transaction.
