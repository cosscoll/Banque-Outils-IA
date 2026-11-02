# Banque Outils IA — cahier des charges opérationnel
Version : 2026-11-02 · Statut : précommercialisation · Auteur : pilotage produit

## 1. Objectif, cible et limites
**Objectif** : fournir à un indépendant ou une petite structure une banque de vrais outils et méthodes pour réaliser une tâche précise, pas seulement un annuaire d'applications.
**Public prioritaire** : entrepreneurs, indépendants, TPE, y compris débutants peu à l'aise avec le numérique.
**Promesse testable** : comprendre un besoin, choisir un outil, obtenir un premier résultat et le vérifier sans connaissances techniques préalables.
**Invariants validés** : identité Obscure Pop (jaune atténué), cinq cartes en relief au hover, header fixe « Accueil / Produit / Contact », six showrooms individualisés ; ne pas réintroduire l'ordinateur 3D retiré.
**Garde-fous** : aucune dépense ou automatisation sans accord ; aucun Work, Codex ou agent à quota limité ; aucune licence tierce présumée ; aucun contenu premium, secret ou information client dans le dépôt public.

## 2. Situation de départ démontrable
- Branche main du dépôt : cosscoll/Banque-Outils-IA ; dernière livraison connue avant cette session : 22/10/2026.
- 18 services référencés, six méthodes publiques, six pages produit Showroom 01, simulation locale sans service IA payant.
- GitHub Pages a indiqué un déploiement réussi, mais contrôle des navigateurs et cohérence du SHA encore à confirmer.
- Le 22/10, 8/16 tests historiques échouaient car ils réclamaient d'anciens composants WebGL et des sélecteurs disparus.
- Prix, vente, livraison automatique, contact commercial privé, actifs premium et tests utilisateurs réels : **non terminés**.
- Ne pas annoncer « en ligne et fonctionnel » sur la seule base de GitHub, de tests statiques ou d'un build.

## 3. Parcours utilisateur et exigences
| Phase | Exigence | Validation attendue |
|---|---|---|
| Découverte | Une promesse claire et un seul chemin principal pour démarrer | 5 participants comprennent l'offre sans explication |
| Orientation | Six familles identifiables sans jargon ; recherche 18 outils et filtres | Test clavier, tactile, recherche avec accents, zéro résultat |
| Essai | Au moins un outil réellement fonctionnel et exportable, sans créer de compte | Essai de bout en bout sur mobile et ordinateur |
| Présentation | Une fiche par banque avec cible, livrables, prérequis et limites | Le contenu annoncé correspond aux fichiers distribués |
| Achat futur | Prix, règles de vente, CGV et checkout privé | Validation juridique, paiement test, reçu |
| Livraison future | Téléchargement privé selon droit d'achat | Vérification avec/sans droit, expiration, support |
| Accompagnement | Guide de démarrage, exemples, FAQ et mise à jour | Trois débutants terminent un scénario sans aide |

## 4. Backlog de livraison
| ID | Priorité | Tâche | Définition de terminé | État |
|---|---|---|---|---|
| QA-01 | P0 | Remplacer tests WebGL obsolètes | Node CI verte sur les fonctionnalités réellement présentes | PR #9 ; à vérifier |
| QA-02 | P0 | QA navigateur du site actuel | Desktop et mobile, 13 pages historiques, aucune erreur JS/overflow, capture | En développement |
| PUB-01 | P0 | Vérifier version publique | SHA publié, URLs et rendu réels vérifiés après fusion | Non confirmé |
| UX-01 | P0 | Respect design validé | Aucune régression hover, animations, menu ou couleurs | Tests + validation visuelle à réaliser |
| TOOL-01 | P0 | Outil de rédaction gratuit | Formulaire, trois formats, ton, copie, export .txt, sans API | En préparation |
| PRODUCT-01 | P0 | Fiches de fabrication des six banques | Livrables exacts + critères qualité + licences | Spécification en cours |
| PRODUCT-02 | P1 | Banque rédaction vendable | Guide, modèles, outil, exemples, QA, licences, stockage privé | Non livrée |
| PRODUCT-03 | P1 | Cinq autres banques | Contenu original et parcours évalués, un produit fini à la fois | Non livrées |
| BIZ-01 | P1 | Contact privé sans GitHub | Envoi privé, validation, informations RGPD, anti-spam | Non disponible |
| BIZ-02 | P1 | Vente et livraison | Prix approuvés, CGV, paiement, accès après achat, remboursement | Non autorisé / non disponible |
| OBS-01 | P2 | Performance et accessibilité | Audit LCP, CLS, INP, clavier, reduced-motion, lecteurs d'écran | Non mesuré |

## 5. Règles de fabrication
- Faire un outil **original** par collection, puis un guide simple, au moins trois scénarios fictifs, des modèles adaptés et une checklist de contrôle humain.
- Distinguer démonstrations et traitements réellement effectués ; aucun faux avis, faux chiffre, faux bouton « acheter ».
- Ne pas revendre ou empaqueter une application externe : liens officiels, documentation personnelle et créations originales uniquement, sauf autorisation expresse et licence vérifiée.
- Pour chaque ressource tierce : URL, auteur, version, licence, usages autorisés, attribution et preuve ; tout doute = pas de redistribution.
- Le site public n'héberge pas les livrables premium. La distribution commerciale exigera un espace privé et un contrôle serveur des droits d'accès.
- Formulaire et livraison futurs : minimisation des données, mentions de confidentialité visibles, durée de conservation et droits des personnes. Le système actuel de contact GitHub public est insuffisant pour des prospects.

## 6. Priorités de commercialisation
1. Démontrer la valeur auprès de trois à cinq débutants avec un outil gratuit réellement utilisable.
2. Finaliser un pack complet de rédaction et vérifier s'il résout un problème payé par la cible.
3. Fixer prix et support en fonction de la valeur, du coût réel et des retours ; **aucun tarif fictif**.
4. Ajouter paiements/livraison et textes légaux après validation utilisateur et juridique.
5. Reproduire la méthode pour les cinq autres banques en conservant une personnalité visuelle propre à chaque fiche.

## 7. Définition stricte d'un sprint livré
Journal horodaté + fichiers + SHA + branche + tests exécutés + résultat GitHub Actions + déploiement vérifié + capture mobile/desktop. En l'absence d'une preuve, écrire explicitement « non validé ». Le travail n'est pas terminé si une étape critique échoue.

## 8. Sources de cadrage juridique et licences
- CNIL, premières étapes du RGPD : https://www.cnil.fr/fr/passer-laction/rgpd-les-premieres-etapes
- CNIL, communiquer en ligne : https://www.cnil.fr/fr/rgpd-en-pratique-communiquer-en-ligne
- Service Public, mentions obligatoires : https://entreprendre.service-public.gouv.fr/vosdroits/F37351
- Licence MIT et conservation des notices : https://choosealicense.com/licenses/mit/
Ces sources orientent le cahier des charges ; leur application au montage commercial définitif devra être vérifiée avant activation des ventes.
