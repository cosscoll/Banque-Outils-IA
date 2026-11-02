# Parcours d'achat — Audit UX et parcours cible V1.3
Banque Outils IA · 02/11/2026 · Dernière mise à jour : revue du site présent.

## 1. Diagnostic initial — ce qui bloquait
1. **L'accueil conduisait presque uniquement vers un catalogue de services externes**, et non vers les six collections qui constituent le futur produit commercial. Résultat : confusion entre outils d'autres éditeurs, aperçus locaux et banques qui seront vendues.
2. **La page Produit listait six collections sans parcours d'explication ni essai directement mis en avant**. Le client potentiel trouvait des aperçus et « tarifs à définir », mais pas l'ordre des étapes pour évaluer une banque.
3. **Chaque fiche finissait sur « Poser une question sur le produit » qui renvoyait au contact par issue GitHub publique** : impraticable pour les novices sans compte et inadapté à des renseignements de commande.
4. **La disponibilité était expliquée tardivement** et sans passage vers une ressource réellement disponible. La fiche Rédaction disposait déjà d'un outil local gratuit mais le mettait après une simulation purement illustrative.
5. **Aucune transaction n'est activée**. Activer maintenant un faux panier, une attente de paiement ou une précommande serait trompeur. Le site actuel doit guider les visiteurs dans un *parcours de découverte*, et documenter le vrai checkout futur hors GitHub Pages.

## 2. Parcours public corrigé — utilisable maintenant
**Accueil → Produit → Fiche de banque → Démonstration → Disponibilité / autre banque**.

| Étape | Objectif | Action attendue | Produit existant | Borne de qualité |
|---|---|---|---|---|
| 01 Découvrir | Identifier clairement ce qui sera vendu | CTA héros « Découvrir les collections » | Accueil /produit.html#collections | CTA primaire mène aux banques, pas aux apps tierces |
| 02 Choisir | Comprendre l'offre en 6 besoins sans jargon | Ouvrir une des 6 cartes de collection | /produit.html#collections | Les 6 liens conduisent à des fiches distinctes |
| 03 Comprendre | Voir ce que le pack devrait inclure, ses limites | Contenu prévu / FAQ | /pack-*.html | « prévu » ≠ contenu effectivement livré ; pas de faux avis |
| 04 Tester | Essayer avant de payer | 1 vraie démo locale pour Rédaction, simulation clairement signalée pour les cinq autres | /outils/assistant-messages.html, #exemple | Pas de faux générateur IA ni d'intégration à un compte |
| 05 Vérifier disponibilité | Savoir si achat possible / tarif / accès / prérequis | Section #disponibilite, retour à Produit | Chaque fiche | Pas de prix inventé, faux bouton acheter, ni demande de paiement |
| 06 Revenir/choisir autrement | Réduire les impasses | « Comparer les six collections » et catalogue tiers en complément | /produit.html#collections | Aucun clic sur CTA préachat vers GitHub Issues |

Les 3 premières étapes « Choisir / Comprendre / Essayer » et la 4e « Acheter — plus tard » sont expliquées en clair sur Produit. **Le site reste une vitrine-démonstrateur**, pas une boutique e-commerce.

## 3. Parcours transactionnel FUTUR — uniquement après activation explicite
Étapes cibles : **page produit publiée avec contenu exact et prix total → checkout invité sécurisé chez le prestataire → confirmation de paiement → accès privé au fichier acheté → aide/support/retours**.

### Écran P1 — Fiche commerciale (NON ACTIVE)
- Produit réellement fini et validé : titre unique, usage, niveau, fichiers, formats, version, aperçu, compatibilité, prérequis.
- Prix final avec devise, toutes taxes applicables, frais éventuels, inclusions/exclusions, type de licence et mises à jour promises.
- CTA « Acheter le pack » seulement après statut commercialisable G5, sans défilement trompeur.
- Lien visible vers CGV, mentions vendeur, conditions de contenu numérique/rétractation, support et confidentialité.
- Aucun abonnement caché ni promesse d'économie de temps sans preuve.

### Écran P2 — Checkout marchand (NON ACTIF)
- **Achat sans création forcée de compte** si le fournisseur permet guest checkout ; adresse e-mail justifiée comme nécessaire à la livraison du contenu numérique.
- Résumé du produit, quantité, prix final, taxes, informations nécessaires, corrections inline utiles et paiement adapté à mobile.
- Fournisseur tiers sécurisé ; aucun champ bancaire, secret, mot de passe ou webhook côté GitHub Pages.
- Confirmation explicite des conditions légales applicables à la fourniture immédiate de contenu numérique, sans présumer l'absence du droit de rétractation.
- Messages de refus de paiement et retour panier non accusateurs, conservation du bon produit, zéro commande confirmée avant événement serveur fiable.

### Écran P3 — Confirmation & livraison (NON ACTIF)
- Commande confirmée **uniquement** à la suite d'un paiement validé côté serveur ou service marchand.
- Confirmation : produit, référence de commande, montant réellement payé, récapitulatif des fichiers et support.
- Lien de téléchargement privé livré par le prestataire, réaccès selon contrat, gestion d'expiration du lien.
- Pas de ZIP premium accessible via URL anonyme GitHub Pages ; pas de livraison sur simple redirect querystring « success ».
- Facturation, remboursements, réclamations et droits de l'acheteur selon la loi et le contrat applicables.

### Écran P4 — Assistance & conformité (NON ACTIVE)
- Canal **privé** pour les questions de commande, sans GitHub Issues publiques ; coordonnées et délais réels.
- Problèmes anticipés : téléchargement perdu, ZIP non ouvrable, version différente, accès mal attribué, doublon de paiement, remboursement.
- Règles de conservation, données, TVA/territoires, responsabilité de traitement et logs minimisés à approuver.

**Contrainte d'hébergement :** GitHub Pages n'est pas autorisé comme hébergement gratuit principal d'une activité d'e-commerce ; prévoir une solution commerciale adaptée.
Source : https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
Principe UX de passage de commande invité : https://baymard.com/research-articles/current-state-of-checkout-ux

## 4. Informations obligatoires sur chacune des six fiches
| Banque | Bénéfice du visiteur | Démo aujourd'hui | Contenu futur annoncé | Action actuelle |
|---|---|---|---|---|
| Rédaction | Préparer un message relisible | Générateur local opérationnel | Assistant, 12 modèles, 3 cas, checklist | Essayer gratuitement |
| Design | Cadrer un visuel | Simulation illustrative | Brief, gabarits SVG/HTML, cas | Voir simulation |
| Sites | Structurer un site | Simulation illustrative | Cadrage, arborescence, HTML/CSS, cas | Voir simulation |
| Vidéo | Préparer un récit audiovisuel | Simulation illustrative | Storyboard, scripts, exports CSV | Voir simulation |
| Automatisation | Documenter une tâche | Simulation illustrative | Cartographie, contrôles, exemples | Voir simulation |
| Recherche | Comparer des sources | Simulation illustrative | Matrice, notes, vérifications | Voir simulation |

**Ne pas inventer** de date de sortie, prix, utilisateurs, preuves de performance, disponibilité de fichiers premium ou réduction de coûts.

## 5. Cas de recette et preuves nécessaires
| ID | Scénario | Attendu | Statut |
|---|---|---|---|
| ACH-01 | Homepage héros CTA primaire | Va vers /produit.html#collections | À tester CI |
| ACH-02 | Homepage CTA secondaire | Va vers catalogue public sans induire achat | À tester CI |
| ACH-03 | Produit cartes | Six cartes actives, pages différentes | À tester CI |
| ACH-04 | Produit preuve/stepper | 4 étapes compréhensibles, achat marqué « plus tard » | À tester CI |
| ACH-05 | Rédaction CTA héro | Va au générateur original gratuit | À tester CI |
| ACH-06 | Autres fiches CTA | Va au contenu prévu ou à une simulation locale explicite | À tester CI |
| ACH-07 | Six fiches Disponibilité | Indiquent clairement « pas en vente », aucun prix | À tester CI |
| ACH-08 | Six fiches CTA disponibilité | Démo ou générateur ; jamais GitHub Issues | À tester CI |
| ACH-09 | Six fiches choix alternatif | Renvoient vers les six collections | À tester CI |
| ACH-10 | Contact | Distingue suggestion publique d'achat / SAV privé | À tester CI |
| ACH-11 | 390px | Pas de scroll horizontal, bouton utilisable | À tester CI |
| ACH-12 | 1440px | CTA accessibles, aucune superposition bloquante | À tester CI |
| ACH-13 | Mobile tactile réel iOS/Android | Navigation, ancres, header sticky sans interception | **Non réalisé** |
| ACH-14 | Client débutant | Comprend ce qui est gratuit / préparé / payant à terme | **Non réalisé** |
| ACH-15 | Boutique future | Contrôle prix, invité, paiement refus, livraison privée, remboursement | **Bloqué : aucune boutique** |

## 6. Définition de terminé pour cette amélioration
- **Au niveau du site existant** : homepage, hub Produit, six fiches et Contact cohérents avec parcours de découverte ; liens, responsive et navigateur automatisé vérifiés ; SHA main, Pages et disponibilité publique vérifiés.
- **Au niveau commercial** : **non terminé**, jusqu'à produit fini, prix approuvé, entité vendeuse validée, juridique, plateforme compatible, paiement et livraison testés. Aucun « checkout » fictif ne pourra être marqué achevé.
- **Au niveau éditorial** : les textes sont des spécifications de futurs livrables et ne remplacent pas les fichiers privés achetables.

## 7. Priorité suivante
Finaliser le pack Rédaction privé et l'acceptation G4, obtenir les décisions commerciales G5, puis concevoir la boutique réelle sur un hébergement approprié. Le site vitrine ne doit pas collecter de commande ou de donnée personnelle pour précommander sans système autorisé.
