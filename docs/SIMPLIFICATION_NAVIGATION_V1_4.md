# Annexe G — Simplifier le site Banque Outils IA
Version 1.4 · 02/11/2026 · Charte Obscure Pop et expériences 3D CSS conservées.

## Problème utilisateur
La même intention menait à plusieurs destinations différentes : catalogue de logiciels tiers, fiches méthode, parcours d'initiation, six banques, page Produit et CTA répétés. La page Produit affichait les mêmes appels à l'action plusieurs fois et quatre étapes descriptives après les banques. Les showrooms répétaient navigation de progression, deux CTA de héros, lien vers d'autres logiciels et lien de retour. Conséquence : le visiteur ne savait plus « où cliquer pour trouver son produit ».

## Nouvelle règle d'orientation
**Une question : « Qu'avez-vous besoin de faire ? » → une des six banques → une démonstration.**
- L'accueil a **une action principale** : « Choisir ma banque ». Le bouton secondaire correspond uniquement à un outil gratuit réellement disponible.
- Les cinq cartes animées validées et les six liens de besoins conduisent **aux pages des banques**, et non dans le catalogue d'autres éditeurs.
- Les six liens sous l'accueil couvrent aussi les sites web, absents des cinq cartes animées. Ils restent une alternative simple sans motion, pas six CTA supplémentaires vers des destinations différentes.
- Produit présente directement **six choix brefs et visuellement compacts**, en langage d'action : « Rédiger un texte », « Créer un visuel », « Préparer mon site », « Préparer une vidéo », « Simplifier une tâche », « Comparer des options ».
- Chaque fiche conserve l'identité en relief et ses deux accès utiles (le contenu / la démo), les limites et la disponibilité ; elle ne répète plus un deuxième mini-menu de navigation et ne renvoie plus depuis le corps vers le catalogue tiers.
- Les ressources gratuites complémentaires demeurent accessibles discrètement depuis le pied de page et après les six choix, sans être confondues avec les produits de la marque.

## Périmètre préservé
- Header sticky : **Accueil / Produit / Contact**, inchangé.
- Palette Obscure Pop et expérience de cinq cartes animées, survol/focus et option de mouvement réduit.
- Six showrooms et simulations locales, outil Rédaction actif, statut « non en vente » pour toutes les banques.
- Catalogue de 18 services, fiches méthodes et parcours historiques **restent accessibles par URL** ; seuls des renvois marketing redondants ont été retirés.
- Aucun changement sur paiement, facturation, comptes ou gestion commerciale ; le contact public GitHub n'est pas utilisé pour des transactions.
- Aucun coût, Work/Codex ou automatisation activé.

## Exigences de recette
| ID | Vérification | Résultat requis |
|---|---|---|
| SIM-01 | Héros accueil | CTA principal vers /produit.html#collections, secondaire vers outil gratuit Rédaction |
| SIM-02 | Cinq cartes 3D CSS | Chaque lien mène à une banque correspondant à l'illustration |
| SIM-03 | Six objectifs accessibles | Les six tâches couvrent les six pages bank, y compris Sites |
| SIM-04 | Sections homepage | Disparition des CTA de méthode et des sections finales redondantes |
| SIM-05 | Hub Produit | Six cartes compactes 2 colonnes bureau, 1 colonne mobile, aucune deuxième section de CTA |
| SIM-06 | Showrooms | Pas de second menu de progression ni de renvoi catalogue tiers depuis le parcours principal |
| SIM-07 | Honnêteté commerciale | « En préparation » et prix non fixé visibles, aucun faux checkout |
| SIM-08 | Tests techniques | Node et Chromium bureau/mobile sans erreur JS, aucun débordement horizontal |
| SIM-09 | QA terrain | iOS/Android réels et tests sur trois utilisateurs novices à réaliser, pas considérer comme réalisés sans preuve |

## Ce qui ne fait pas partie de cette modification
Les pages de contact et les outils tierce parties ne sont pas redessinés. Le retrait des sections secondaires ne les supprime pas du dépôt. L'achat réel reste un développement futur soumis à conformité et validation.

## Évolutions à vérifier auprès de la cible
Tester si 3 novices trouvent leur banque en moins de trois interactions sans assistance, puis vérifier s'ils comprennent la différence entre banque en préparation et outil tiers. Le seuil est un objectif de recette, **pas une mesure constatée**. Si les utilisateurs se perdent encore, corriger le libellé de la première action plutôt que rajouter de nouveaux menus.
