# Direction immersive — Banque Outils IA (version Igloo-inspired, originale)

19 octobre 2026. Projet **Business 02 exclusivement**. Référence d'ambition : https://www.igloo.inc/ ; ni copie de ses assets, ni de son code ou identité.

## 1. Direction artistique
Concept : **le noyau des connaissances IA**. Un cristal principal, facetté, est entouré de six satellites : texte, image, code, vidéo/audio, automatisation et recherche/analyse. Ce modèle exprime un vrai système de familles interconnectées plutôt qu'un simple objet décoratif.
- Palette maîtrisée : ivoire glacé, surfaces nacrées, argent bleuté ; typographie lisible et textes brefs.
- Une entrée forte : sculpture en relief, grande typographie, une action principale. Pas de six cartes en premier écran.
- Désaturation et respiration prioritaires ; rester nettement différent du site Business 01.

## 2. Animations et hover (lot intégré sur branche)
- **Noyau** WebGL en triangles facettés avec géométrie construite côté JS, satellites individuels, rotation lente.
- **Souris dans le canvas** : pivot et parallaxe avec amortissement, focus visuel et sélection d'une famille lorsqu'un satellite est survolé ; glisser pour orienter.
- **Survol des six familles** : aperçu du contenu et du nœud associé, déclenchement au clavier via focus, clic/tap conservé.
- **Boutons magnétiques** : translation amortie bornée, lueur contrôlée par la position de la souris.
- **Scène** : halo mouvant et ambiance glaciaire ; titre révélé ligne par ligne, sections révélées au scroll par IntersectionObserver.
- **Scroll** : variation de la profondeur et du pivot de la scène, sans sauts ni téléportation.
- **Accessibilité** : prefers-reduced-motion, pas d'obligation de hover, Canvas 2D si WebGL indisponible, boutons HTML et contenus accessibles.
- **Confidentialité** : interactions locales, aucune saisie envoyée à un serveur, aucun paiement, produit premium ou API.

### Matériau
Les reflets avancés du shader ont provoqué une régression lors de la recette navigateur et ont été retirés. Ne pas les annoncer comme livrés. Une étape suivante pourra explorer des matériaux plus réalistes avec une CI visuelle stricte, sans sacrifier le rendu stable.

## 3. Structure de la homepage
1. **Découverte plein écran** : titre court, noyau 3D et accès aux familles.
2. **Exploration active** : six familles dévoilées à la demande, micro-mouvements, un seul panneau d'information à la fois.
3. **Poursuivre** : lien catalogue et fiches publiques vérifiables, sans transaction.

## QA et critères de fusion
- GitHub Actions Node : syntaxe, confidentialité, navigation, interactions.
- Chromium : WebGL disponible, canvas effectivement rendu, mobile 390 px et desktop 1440 px, aucun débordement ni erreur JS, hover famille/halo/CTA magnétique, fallback 2D.
- Statut `main`, SHA, PR et GitHub Pages contrôlés séparément. Ne pas confondre PR et publication.

## Prochains lots par priorité
1. Poursuivre la qualité des matériaux 3D sans régression ; augmenter l'effet de profondeur (mouvement camera et réponse au hover) au niveau d'une expérience éditoriale, pas d'un modèle simple.
2. Enchaînement de scènes guidé au scroll, tout en gardant les accès directs et les reprises au clavier.
3. Mesurer Lighthouse LCP/CLS/FPS et tester sur appareils iOS/Android réels ; plafonner textures, draw calls et mouvements.
4. Contrôler les styles cohérents sur catalogue, méthodes et parcours ; préserver les contenus premium privés.

Aucune dépense, aucun Work, Codex, agent workspace, abonnement, collecte ou commerce actif. Automatisation horaire inchangée.
