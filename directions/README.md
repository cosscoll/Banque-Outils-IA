# Directions artistiques — Banque Outils IA

Prototypes comparatifs (sans remplacement de l'accueil public) : [page de comparaison](./index.html).

État au 21 octobre 2026 : trois **aperçus HTML/CSS interactifs** publiés dans le code de `main`. Ils proposent des structures radicalement différentes. **Les scènes 3D finales ne sont pas encore développées**, et le rendu navigateur/GitHub Pages n'est pas confirmé.

## 01 — Bureau vivant

- Cible : personnes qui veulent apprivoiser l'IA sans jargon.
- Signature : bureau éditorial, documents de travail, papier, notes utiles et typographie expressive.
- Couleurs : papier `#EDE7DB`, encre `#49352A`, terracotta `#A45237`, sauge `#6C785F`.
- Typographie : Fraunces (titres), Public Sans (texte), IBM Plex Mono (repères documentaires).
- Ordre des contenus : question du visiteur → document consultable → dossiers par problème réel → méthode concrète → catalogue.
- Interaction du prototype : trois dossiers changent les informations du document en situation.
- 3D proposée pour le site final : carnet/atelier de travail avec feuilles réellement animées, gestes explicites et continuité au scroll ; l'utilisateur ouvre un dossier, voit un résultat, et revient à son point de départ. Pas de cube générique ni d'objet flottant gratuit.

## 02 — Atelier libre

- Cible : entrepreneurs et créateurs recherchant énergie, expérimentation et impact visuel.
- Signature : système d'affiches, aplats francs, typographie d'affichage, ligne éditoriale d'atelier.
- Couleurs : bleu `#213AB2`, orange `#FA593A`, citron `#F3FF70`, papier `#F3F1E9`.
- Typographie : Archivo Black (affichage), IBM Plex Mono (navigation et détails).
- Ordre des contenus : une promesse directe → une affiche transformable → sélection d'actions → travaux possibles → recherche d'outils.
- Interaction du prototype : changer la tâche change l'affiche plutôt que de simplement modifier un label.
- 3D proposée pour le site final : presse / composition d'affiches / impression typographique ; chaque action modifie un support créé dans le site et la caméra suit l'impression. L'art 3D porte sur le produit fabriqué, pas un objet décoratif.

## 03 — Revue humaine

- Cible : professionnels peu technophiles qui comprennent mieux des histoires que des catégories de logiciels.
- Signature : journal culturel, typographie littéraire, cas d'usage et résultat mis en scène.
- Couleurs : bordeaux `#552936`, blanc cassé `#F8F5ED`, rouge rosé `#A64A4F`, vert `#48624C`.
- Typographie : Newsreader (éditorial), Public Sans (lecture), IBM Plex Mono (légendes).
- Ordre des contenus : histoire contextualisée → résultat → méthode → index par besoin → outil pertinent.
- Interaction du prototype : navigation par chapitres et navigation dans des documents d'exemple. Le personnage « Lucie » est explicitement fictif et ne constitue pas un témoignage.
- 3D proposée pour le site final : narration en objets contextualisés (affiche, carnet, fichiers de travail), transition en pages d'une revue 3D ; éventuelles photos authentiques à produire ou à utiliser avec droits confirmés.

## Défauts de design interdits lors du développement

1. Hero convenu avec un objet qui tourne et ne démontre rien.
2. Gradients violacés/bleus et cartes SaaS identiques avec icônes génériques.
3. Petits points lumineux, fausses étoiles, badges « live », numéros inutiles, traits posés seulement pour occuper l'espace.
4. Sections interchangeables (hero, trois avantages, chiffres inventés, témoignages inventés, CTA).
5. Une seule animation générique réutilisée partout ; toute animation doit expliquer une interaction ou une transformation.
6. 3D abstraite non liée à l'offre ; préférer des objets de travail compréhensibles et une scène réelle validée.
7. Photos d'illustration génériques et faux avis, faux chiffres, fausses interfaces de produits présentées comme des résultats réels.

## Étape suivante, après sélection

- Choisir une direction ou un mélange précis (ex. structure 01 et direction photo éditoriale 03).
- Définir le parcours d'achat et les vrais produits/ressources que Banque Outils IA proposera (sans promettre un catalogue commercial inexistant).
- Concevoir les visuels sources et une scène 3D originale en accord avec la direction retenue, puis vérifier son rendu réel.
- Remplacer `index.html` et harmoniser les pages, sans dégrader les liens existants.
- Tester au clavier, mobile, GPU réel, scroll/hover, puis vérifier la publication GitHub Pages.
- Aucun service payant, aucun workflow d'agent, aucune automatisation. Publication en `main` seulement après sélection et contrôle.
