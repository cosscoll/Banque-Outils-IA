# THE WEB PRESS — Banque Outils IA / expérimentation G1→G2

**Statut réel au 21 octobre 2026 : G0 partiellement validé, G1 concept défini, G2 script Blender écrit mais pas encore exécuté.** Les rendus et le GLB du nouveau concept NE SONT PAS encore produits. Ne jamais annoncer un site premium terminé.

## Trois concepts originaux comparés
| Concept | Objet original et son rôle | Univers | Interaction |
|---|---|---|---|
| **THE WEB PRESS (retenu provisoirement)** | Presse typographique cinématique fabriquant des pages de site | Céramique graphite, chrome, laiton, papier coton, film optique | Manipulation du volant, choix des matrices TYPE/GRID/CODE/MOVE, presse en mouvement |
| THE DIGITAL ATELIER | Atelier miniature d'outils digitaux et d'écrans prototypes | Bois noirci, métal sablé, lumière chaude, surfaces holographiques | Utiliser des outils virtuels et construire des composants |
| THE LIVING ARCHIVE | Bibliothèque architecturale de prompts/outils qui s'ouvrent | Pierre, feuillets, cuir et verre, lumière rasante | Tirer un livre et voir son contenu devenir une scène web |

### Direction provisoire choisie
Une machine de précision transforme des ingrédients tangibles — **typographie, grille, code, mouvement** — en un site web unique. La 3D décrit le service commercial, elle n'est pas arbitraire.

**Les 5 plans de la scène :**
1. **Révélation** : travelling autour de la machine.
2. **Matrice** : rapprochement sur les plaques et les rouleaux.
3. **Assemblage** : plateau supérieur soulevé, la feuille imprimée émerge.
4. **Personnalisation** : caméra près du volant, geste souris/tactile.
5. **Signature** : la feuille devient le résultat final ; seulement ensuite, construire le reste du site.

## Déjà créé
- [Source Blender originale](scripts/build_webpress.py) ; modélisation procédurale de la presse, 11 matériaux PBR, inscriptions, 4 poses de caméra, objets nommés et animés.
- [Workflow GitHub Blender](../../../../../.github/workflows/webpress-scene.yml) — exécution **manuelle**, avec un runner public Ubuntu standard. Aucun runner GPU payant.
- Source testée avec `python -m py_compile`. Cette vérification n'est pas une preuve que Blender a exécuté le script ni qu'il rend correctement.

## Exécuter G2 sans achat
1. Ouvrir : https://github.com/cosscoll/Banque-Outils-IA/actions/workflows/webpress-scene.yml
2. **Run workflow** → branche **main** → confirmer.
3. L'exécution installe Blender via apt sur `ubuntu-latest` et exécute le script en rendu CPU.
4. Si réussi, les résultats sont committés dans `output/` : `web-press-original.blend`, `web-press-original.glb`, `01-hero.png`, `02-exploded.png`, `03-macro.png`, `04-final.png`.
5. Vérifier **visuellement** tous les rendus ; corriger si mauvais. Ne pas commencer le site avant approbation G2.

## Bloqueurs et coûts
- Blender absent du conteneur de développement ; la tentative de déclenchement automatique du nouveau workflow n'a produit **aucune exécution** selon l'API GitHub.
- Les outils du connecteur GitHub de cette session permettent de publier du code, pas de déclencher un `workflow_dispatch`.
- WebGL indisponible sur le navigateur local ; les images Blender ne sont pas la validation du site WebGL.
- 0 € de dépense supplémentaire visée : l'exécution emploie un **runner standard de dépôt public** ; ne pas utiliser runner spécialisé, service payant, stockage externe ni crédits.

## Garde-fous de qualité
- Si les rendus ne sont pas magnifiques, **G2=REFUSÉ**, retravailler géométrie/matériaux/lumière.
- Sans source `.blend` + `.glb` + renders réels → **G2=BLOQUÉ**.
- Sans test d'un contexte WebGL matériel et captation d'états scroll/hover → **G4/G6=BLOQUÉ**.
- Aucun code propriétaire issu de sites de référence, pas d'assets payants utilisés.
