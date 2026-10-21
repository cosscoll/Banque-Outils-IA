# Banque Outils IA

Création d'une bibliothèque d'outils IA.

**Statut : pré-lancement, aucune vente ni paiement actif.**

## Site et suivi

- [Page d'accueil](./index.html)
- [Avancement du projet](./avancement.html) : réalisations, reste à faire, blocages, date de mise à jour.

## Publier avec GitHub Pages

Dans GitHub : **Settings → Pages → Deploy from a branch → main → /(root) → Save**. L'adresse attendue est https://cosscoll.github.io/Banque-Outils-IA/ , après activation et déploiement réussis.

Les pages et mises à jour de sprint doivent présenter uniquement des éléments de pilotage publics et vérifiés, sans données personnelles ni contenu privé. La présence des fichiers dans le dépôt ne prouve pas à elle seule leur disponibilité publique.

## Refonte expérientielle du 21 octobre 2026

L'accueil a été reconstruit dans `index.html` et `assets/atelier.css`. La scène de l'atelier WebGL est dans `assets/atelier.js`.

**Intention artistique :** montrer un vrai poste de création en 3D, avec des exemples d'interface qui correspondent à quatre usages (créer, écrire, automatiser, analyser). Les mouvements au survol, au glissement et au scroll ont une relation avec l'objet présenté ; aucun amas de cubes abstraits n'est utilisé pour représenter les outils.

**Pages refondues :**
- `index.html` : accueil immersif et six univers ;
- `catalogue.html` : annuaire de 18 services externes, filtres et recherche locale ;
- `fiches.html` : six aperçus de méthodes ;
- `parcours.html` : parcours interactif conservé et palette harmonisée ;
- `recherche.html` : redirection vers la nouvelle recherche dans le catalogue ;
- `avancement.html` : preuves, blocages et travaux à venir.

**Dépendances et dépenses :** Three.js 0.166.1 via CDN jsDelivr, moteur libre sous licence MIT ; aucune API d'IA, facturation, service payant ou automatisation n'est activé par ces pages. Le chargement de Three.js dépend d'une connexion au CDN. Un aperçu HTML/CSS est prévu lorsque le WebGL ou le chargement de module est indisponible.

**Contrôles réalisés :** lecture de confirmation sur GitHub de tous les fichiers réécrits, validation syntaxique JavaScript, contrôle des chemins internes et correction d'un lien obsolète dans le parcours. **Contrôles non réalisés :** capture du rendu WebGL sur GPU réel, tests visuels responsive dans Chrome/Safari, preuve d'accessibilité publique de GitHub Pages depuis cet environnement. Ne pas déclarer ces étapes validées sans tests supplémentaires.

**Publication :** commits enregistrés directement sur `main`. L'adresse attendue reste https://cosscoll.github.io/Banque-Outils-IA/ si GitHub Pages est activé pour `main` et que le déploiement aboutit. Aucune publication publique n'est affirmée sur la seule base des commits.
