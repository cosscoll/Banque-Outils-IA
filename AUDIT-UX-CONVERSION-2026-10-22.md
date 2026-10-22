# Audit UX/UI & conversion — Banque Outils IA
**Date :** 22 octobre 2026  
**Périmètre :** accueil, catalogue de 18 outils, six premières méthodes, parcours interactif et navigation transversale.  
**Statut :** audit du code source et des parcours statiques + tests simulés. **Ce document n'est pas un audit visuel en navigateur réel** : GitHub Pages ne pouvait pas être chargé par les outils de consultation au moment de l'analyse. Aucun test utilisateur, Lighthouse, axe ou mesure analytics n'a été réalisé.

## Objectif
Aider une personne peu familière avec les outils IA à progresser : **comprendre un résultat possible → identifier son besoin → trouver une méthode → comparer quelques outils → essayer**. Le projet est actuellement en pré-lancement, avec des services externes référencés et des méthodes publiques ; il n'y a pas encore de vente ni de système de collecte de prospects actif.

## Constat et actions (priorisées)

| Priorité | Problème observé dans les fichiers | Risque pour le visiteur | Correction enregistrée |
|---|---|---|---|
| P0 | Lien « Explorer les usages » du catalogue ciblant `recherche.html`, absent du parcours public | Destination indisponible | Redirigé vers la section des six usages de l'accueil `index.html#usages` |
| P0 | Recherche utilisant un attribut `data-search` dégradé | Résultats manquants malgré une requête pertinente | Index reconstruit à partir du nom, de la description, de l'exemple et de synonymes ; recherche textuelle locale |
| P1 | Accroche d'accueil peu explicite | Valeur perçue difficile à comprendre en quelques secondes | Nouveau titre orienté réalisation, sous-titre fondé sur les situations réelles et deux CTA clairs |
| P1 | Répertoire perçu comme liste de logos/services | Difficile d'identifier par quoi commencer | **18 exemples concrets**, un par service, filtres existants conservés et **quatre recherches rapides** |
| P1 | Six fiches essentiellement descriptives | Peu de valeur pratique démontrée | **Six mini-exercices**, résultats visés et précautions conservés |
| P1 | Six CTA de fiches menant indistinctement au même parcours | Parcours non pertinent pour certaines fiches | Trois liens ouvrent directement la bonne variante du guide ; les autres ouvrent la catégorie d'outils adaptée |
| P1 | Parcours proposant une fiche mais aucun accès direct aux outils | Rupture entre méthode et action | Ajout d'un second CTA vers la catégorie correspondante ; choix prérempli par `?objectif=` |
| P2 | Navigation vers le guide trop discrète | Visiteurs hésitants sans point de départ | Lien alternatif visible dans les blocs « méthode » et de bas de page |
| P2 | SEO générique | Promesse peu explicite dans l'extrait de recherche | Titres et descriptions des quatre pages orientés besoins |
| P2 | Page d'avancement contenant des mentions WebGL devenues obsolètes | Perte de crédibilité | Texte actualisé sur les cartes CSS et le parcours réel |

## Parcours à tester

1. **Entrer :** lire en quelques secondes ce que le visiteur peut réaliser et décider d'explorer les outils ou les méthodes.
2. **Préciser :** choisir l'un des six usages ou une recherche rapide (par ex. « créer un site » ou « automatiser »).
3. **Comparer :** voir trois outils du bon univers avec un exemple, puis ouvrir leur site officiel si pertinent.
4. **Essayer :** sélectionner une fiche avec un premier exercice et les vérifications associées.
5. **Poursuivre :** depuis le guide interactif, retrouver la fiche publique et la catégorie d'outils adéquate.

## Contrôles effectués sur les sources

- **12/12** contrôles de non-régression historiques réussis : Obscure Pop, hover et superposition des cinq cartes, navigation, anciennes sections retirées.
- **8/8** nouveaux contrôles UX/contenu réussis : liens relatifs et ancres, titres/H1, CTA, 18 exemples, six exercices, cohérence du parcours, absences de fausses preuves sociales, conservation des animations.
- **6/6** scénarios simulés du filtre catalogue réussis : arrivée avec catégorie en URL, requête « site web », recherche sans résultat, suggestion « automatiser », effacement et filtre développement.
- Aucun lien local cassé dans les cinq pages vérifiées. Les liens vers services externes ne sont pas testés en temps réel.

Commandes gratuites et autonomes à lancer dans une copie du dépôt :
```bash
node scripts/check-visual-features.mjs
node scripts/check-conversion-ux.mjs
node scripts/test-card-hover.mjs
```

## Ce qu'il reste à valider pour parler de vente

- **Offre / prix / cible :** une formation ou un kit définis avec contenu, bénéfice, prix et conditions. Ne pas inventer de promesses, témoignages ou résultats chiffrés.
- **Parcours marchand :** décider d'une vraie voie de contact ou de commande, avec mentions légales et confidentialité. **Aucune vente active pour l'instant.**
- **Audit visuel :** captures réelles desktop/mobile, Lighthouse (performances), axe (accessibilité), tests clavier et tactile, contrôle des contrastes et de la hauteur utile du premier écran.
- **Tests utilisateurs :** demander à 3 à 5 personnes de trouver un outil pour rédiger un message, créer un site, automatiser une tâche ; observer les incompréhensions et temps pour atteindre la fiche adaptée.
- **Mesure future :** clics « trouver l'outil », usage des recherches rapides, zéro résultat, ouverture du parcours et clics sortants. Ne déployer l'analytics qu'après choix explicite de l'outil et du cadre de confidentialité.

## Décision de design
**Obscure Pop est conservé.** Les changements sont des améliorations de contenu, de parcours et des styles supplémentaires ciblés (`assets/conversion.css`). La scène interactive de cinq cartes, ses liens, la gestion du survol des cartes gauche et l'architecture des sections n'ont pas été remplacés.

> Références UX consultées : études publiques du Baymard Institute sur la recherche, les listes et les filtres d'offres (articles accessibles sur baymard.com). Ces principes servent de pistes de conception et non de preuve d'augmentation mesurée de ventes sur ce site.
