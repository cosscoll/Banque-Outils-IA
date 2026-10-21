# NOVA — Démonstration immersive 3D

**Projet pilote Banque Outils IA** : site de démonstration + kit de prompts guidés pour créer son propre site web animé et 3D.

- Site : [Ouvrir la démo GitHub Pages](https://cosscoll.github.io/Banque-Outils-IA/demo/nova-3d/)
- Code : [index.html](./index.html)
- Prompts : [PROMPTS.md](./PROMPTS.md)

## Utilisation

1. Ouvrir la démonstration dans Chrome ou Edge avec une connexion Internet (Three.js et GSAP sont chargés depuis CDN).
2. Déplacer ou glisser la souris sur l'objet 3D ; utiliser les boutons de rotation et **DÉPLOYER**.
3. Descendre dans la narration au scroll, survoler les trois cartes interactives.
4. Utiliser le configurateur : secteur, palette, intensité, marque, puis **COPIER MON PROMPT** ou exporter `.md`.
5. Tester les prompts dans un assistant de code, puis comparer les résultats avec ses propres besoins.

## Technique

- True WebGL : **Three.js 0.152.2** (géométries extrudées, caméra, matériaux physiques, éclairages, raycasting).
- **GSAP 3.12.5** et ScrollTrigger (animations et révélation) ; timeline de scroll réversible en JavaScript.
- Fallback CSS 3D si Three.js ou WebGL indisponibles.
- HTML/CSS/JS intégrés dans une page statique, aucun backend et aucune clé API.

## Validation

- Syntaxe des scripts validée ; interface, configurateur, menu et responsive testés localement sur 360, 390, 768, 1280 et 1440 px sans erreur JS ni débordement horizontal détecté.
- Tests exécutés sans réseau/CDN : **fallback CSS 3D** validé ; **rendu Three.js sur GPU non encore vérifié**.
- Le succès de GitHub Pages ne garantit pas à lui seul le rendu sur chaque appareil. Le vérifier dans Chrome/Edge avec WebGL activé.

## Coûts et licences

- Aucun service payant ni API facturée activés pour la démo.
- Three.js MIT ; GSAP et polices externes soumis à leurs licences ; ne pas redistribuer automatiquement leurs fichiers dans un produit vendu.
- Le kit et les prompts sont un **prototype de test** : la reproductibilité pour des débutants et la valeur commerciale demandent un pilote utilisateur.

Le dossier central Studio Web 3D conserve les ressources générales ; le catalogue de 261 liens ne constitue ni des dépendances installées ni une licence globale de redistribution.
