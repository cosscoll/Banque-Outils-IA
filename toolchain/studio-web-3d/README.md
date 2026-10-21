# Studio Web 3D — chaîne de production (prototype)

Objectif : passer d'interfaces CSS animées à une vraie scène modélisée et testable.

## Composants
- `scripts/build_scene_blender.py` : modélisation procédurale Blender d'une page web physique déployée, matériaux PBR, lumière studio, animation intégrée, export GLB + rendu image PNG.
- `scripts/verify_asset.py` : audit structurel glTF/GLB (mesh, triangles, enroulement des faces).
- `web/` : véritable moteur Three.js, chargement GLB, animation par scroll GSAP, réactions souris, trois matières et mode reduced motion.
- `web/tests/` : recette Playwright sur ordinateur et mobile ; test explicite de repli si WebGL est indisponible.
- `.github/workflows/studio-3d-production.yml` : exécution **manuelle seulement** sur runner standard gratuit et dépôt public. Ne s'exécute pas à chaque commit. Par défaut n'écrit pas les modèles produits dans GitHub.

## Limites
- Cette scène est originale, mais reste un démonstrateur. Ce n'est pas encore une production graphique au niveau d'Igloo ou Studio Mirage.
- Blender ne peut pas être installé localement dans l'environnement ChatGPT actuel, qui ne dispose pas d'accès au dépôt de packages.
- Le navigateur Chromium de cet environnement bloque WebGL : les tests locaux ne prouvent pas un rendu GPU correct. Sur GitHub Actions, des tests peuvent également tomber sur le rendu de secours.
- L'action GitHub ne sera pas déclenchée automatiquement. Une exécution manuelle est nécessaire et le résultat devra être vérifié.
- Les bibliothèques Three.js et GSAP sont référencées par npm, non redistribuées dans ce projet. Les conditions de licence doivent être revérifiées pour la vente de kits.

## Exécution locale avec Blender déjà installé
```bash
blender --background --python scripts/build_scene_blender.py -- --out web/public/assets
python3 scripts/verify_asset.py web/public/assets/webpage-sculpture.glb
cd web
npm install --no-audit --no-fund
npm run dev
```

## Exécution cloud gratuite
1. Sur GitHub, dans **cosscoll/Banque-Outils-IA → Actions**, ouvrir `Studio Web 3D — modéliser et tester sans paiement`.
2. Lancer **Run workflow** sur `main` avec `publish_assets=false` pour un test sans écriture d'asset.
3. Inspecter les logs Blender et les tests navigateur ; si validé, relancer avec `publish_assets=true` pour conserver le GLB et le PNG dans le dépôt.
4. Ouvrir l'URL de prévisualisation dans un vrai navigateur compatible avec WebGL ; vérifier manuellement l'apparence des matériaux et la progression au scroll.

Aucune carte bancaire, paiement, licence payante ou runner large n'est requis. Les budgets GitHub à 0 doivent rester en place. Une charge de stockage au-delà du quota serait bloquée et non autorisée.

## Prévisualisation hébergée

`demo/studio-3d/` est une version statique destinée à GitHub Pages. Elle charge Three.js/GSAP via jsDelivr (ressources gratuites), mais nécessite Internet. La compatibilité GPU ne peut être garantie depuis l'environnement ChatGPT.

Fichier source GLB déjà généré ici via `scripts/build_fallback_mesh.py` : 10 objets, 612 triangles, sans shaders PBR. L'outil Blender prépare la version artistiquement plus riche, non encore rendue.
