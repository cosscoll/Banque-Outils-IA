# Banque Outils IA

Création d'une bibliothèque d'outils IA.

**Statut : pré-lancement, aucune vente ni paiement actif.**

## Correction du site — 22 octobre 2026 : textures + suppression de l'ordinateur 3D

À la demande du propriétaire, la section entière `#atelier` présentant un ordinateur 3D a été supprimée de l'accueil, avec ses boutons, le canvas, les scripts Three.js et les liens « Atelier 3D » du menu. Les fichiers de l'ancien modèle restent archivés dans le dépôt mais **ne sont plus chargés** par le site.

Défaut de textures corrigé dans `assets/obscure-terrain.svg` : suppression du filtre SVG procédural `feTurbulence` (bruit gris de type pixellisé) et du fond rectangulaire opaque qui produisait une bande horizontale dans la scène. Le décor est maintenant transparent et purement vectoriel, avec des facettes nettes et les contours orange conservés. Position et mise à l'échelle corrigées dans `assets/obscure-pop.css`.

Le site conserve la vitrine Obscure Pop et les cinq cartes en perspective qui s'ouvrent au survol, ainsi que les sections outils, méthodes, catalogue et parcours. Les liens `#atelier` ont été remplacés par `#usages` et les débordements horizontaux limités.

Le script `scripts/check-visual-features.mjs` protège cette nouvelle configuration. Contrôles structurels du dépôt réussis, **vérification visuelle dans le navigateur public toujours nécessaire**. Aucun achat ni automatisation.

## Direction artistique validée — Obscure Pop (22 octobre 2026)

La charte **Obscure Pop** est choisie par le propriétaire et appliquée directement sur `main` aux cinq pages du site : `index.html`, `catalogue.html`, `fiches.html`, `parcours.html` et `avancement.html`.

- Palette : noir charbon `#0B0B0D`, ivoire `#F5F1E6`, lime `#D9FF3A`, orange `#FF6A00`, violet `#8B5CF6`.
- Police d'affichage et d'interface : Instrument Sans, avec graisse forte, typographie large, contrastes nets.
- Accueil : « Osez créer autrement. » avec cinq cartes interactives présentant de vrais types de réalisations (vidéo, création visuelle, automatisation, texte et recherche/analyse). Chaque carte pointe vers la bonne catégorie du catalogue. Ces exemples sont illustratifs et ne sont pas des traitements IA réellement exécutés.
- Ambiance : texture rocheuse en SVG local, tracés lumineux et cartes Web/CSS déployées en perspective. Aucun achat d'illustrations ou de licences.
- L'ouverture automatique au survol et les changements d'angle à la souris sont conservés. Bouton tactile et interaction clavier restent disponibles, de même que le menu mobile.
- Le header principal et les headers des pages intérieures conservent un positionnement collant en haut de fenêtre.
- Les six univers du catalogue restent dans leur section d'origine, sans duplication du contenu commercial en haut de page.
- Les méthodes sont des aperçus accessibles et le catalogue référence des services externes. **Aucun paiement ni service IA externe n'est actif et aucune métrique commerciale inventée n'est affichée**.

Principaux fichiers : `assets/obscure-pop.css`, `assets/obscure-terrain.svg`, `assets/kinetic-hero.js`, `assets/atelier.js`, les cinq HTML. Les anciens fichiers de refontes sont conservés à titre d'historique mais ne sont pas rechargés sur l'accueil.

**Contrôles :** exécuter `node scripts/check-visual-features.mjs`, vérifier les liens internes, les interactions mobile/desktop, le rendu et les performances WebGL en navigateur réel. Un commit GitHub réussi ne prouve pas à lui seul que GitHub Pages a publié ni que le rendu visuel a été vérifié.

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


## Charte validée : Transformation — 21 octobre 2026

La direction artistique **Transformation** (sélectionnée dans `directions/v2/#transformation`) est désormais celle du site principal :
- `index.html` et `assets/transformation.css` : bleu pétrole `#193944`, corail `#CE4E39`, gris clair `#ECF0EF`, sauge `#B7D1C6` ; titrage Syne, corps Manrope, repères DM Mono.
- `assets/transformation.js` : véritable comparateur avant/après ; sur ordinateur, le curseur suit la souris **sans clic** ; sur mobile, glissement tactile ; clavier, input range.
- `catalogue.html` et `fiches.html` : nouveau rythme éditorial en rangées plutôt que cartes génériques, liens et contenus conservés.
- `parcours.html` et `assets/transformation-parcours.css` : parcours de sélection préservé et charte appliquée.
- `avancement.html` : contenu de suivi conservé et charte harmonisée.
- L'atelier de création 3D est toujours présent sous le comparateur, comme démonstration d'usage secondaire, avec rendu de repli sans WebGL.
- Liens de l'accueil vers six catégories par le paramètre de filtre `?categorie=...#recherche`.

La validation syntaxique des scripts, la présence des fichiers et le test simulé des événements hover/tactile/clavier sont réalisés. **Cela ne prouve pas le rendu GPU, le responsive réel ni le déploiement GitHub Pages**. Vérifier en navigateur avant de communiquer une validation visuelle.

Ce changement est effectué directement sur `main`, sans activer d'automatisation, aucun service IA facturé et aucun service de paiement.

## Garantie de non-régression — 21 octobre 2026

Après la refonte Transformation, le fichier `index.html` avait perdu sa balise de chargement `assets/vendor/three.min.js`. Le moteur `assets/atelier.js` attend `window.THREE` : **c'était la cause directe de la disparition du rendu 3D**. De plus, la scène avait été déplacée après plusieurs sections, et les cibles des animations au scroll étaient devenues obsolètes.

Ces défauts sont corrigés dans `main` :
- rétablissement de Three.js local chargé **avant** le moteur de scène ;
- atelier 3D remonté immédiatement après la comparaison, plus un lien de navigation direct ;
- survol et interaction par glissement sur l'ordinateur 3D, quatre modes de création ;
- caméra 3D liée au scroll de son propre conteneur et animations d'entrée rétablies ;
- six aperçus contextualisés au survol des usages ;
- comparateur avant/après maintenu sans clic sur ordinateur, tactile et clavier conservés ;
- indicateur réel `3D ACTIVE` / `APERÇU 2D` selon disponibilité de WebGL.

**Règle de maintenance :** aucune future refonte graphique ne doit supprimer, masquer ni déplacer hors de portée la 3D et les interactions déjà validées sans demande explicite. Faire passer `node scripts/check-visual-features.mjs` avant de publier des changements, et conserver une vérification visuelle avec vrai GPU indépendante de ces contrôles statiques. Ce script ne déclenche ni action GitHub ni service payant.

**Validation disponible :** liens GitHub confirmés, 16 vérifications de structure/interactions réussies, syntaxe JavaScript vérifiée. **Non vérifié :** capture WebGL sur navigateur réel et accessibilité publique de GitHub Pages depuis cet environnement. Un commit ne vaut pas preuve de rendu.

## Atelier des six banques au survol — 22 octobre 2026

La zone `#comparer` présente maintenant **les six banques déjà représentées dans le catalogue** : écriture, création visuelle, développement, vidéo/audio, automatisation et recherche/analyse. Elle conserve la charte « Transformation ».

- Sur ordinateur, le survol des sélecteurs remplace immédiatement le brouillon et l'objet final illustré (courrier, affiche, mini-site, montage, workflow ou graphique).
- Le mouvement horizontal du pointeur dans le comparateur continue de déplacer le partage avant/après **sans clic** ; un léger parallaxe anime les documents.
- Sur mobile, les six sélecteurs sont accessibles en défilement horizontal et activables au toucher ; le comparateur conserve sa glissière tactile. Les contrôles sont également accessibles au clavier.
- Sous le comparateur, le lien se met à jour vers la catégorie précise du catalogue : `?categorie=...#recherche`. Les noms des trois services présentés par famille sont ceux du répertoire public.
- Les résultats montrés sont des **illustrations, pas des résultats réellement générés par une API d’IA**. La 3D WebGL plus bas dans la page, son chargement Three.js et ses quatre modes n'ont pas été supprimés.

Implémentation : `assets/banks-hover.css`, `assets/banks-hover.js`, `index.html` ; règle de régression ajoutée dans `scripts/check-visual-features.mjs`. Contrôles réalisés : validation de la syntaxe et des liens, simulation des six interactions au survol sur desktop et des six sélections par clic sur mobile. Le rendu visuel et le déploiement GitHub Pages ne sont pas validés par un navigateur public depuis l'environnement de travail.
