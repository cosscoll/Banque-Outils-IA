# Banque Outils IA — cahier des charges de référence
**Version 1.7 — 03 novembre 2026** · Statut : **vitrine opérationnelle, produits en préparation, aucune vente ouverte**.

> Ce document est la **source de vérité du périmètre et des décisions**. Les annexes A à J détaillent les exigences, les six banques, le commerce et l'ordre de production. Une ligne « spécifiée » ne signifie pas « développée » ; une CI verte ne signifie pas « produit prêt à vendre ».

## 0. Lire le projet en 90 secondes
**Mission** : aider un indépendant ou une petite entreprise à utiliser des outils concrets pour écrire, créer, préparer un site, planifier une vidéo, décrire une automatisation ou mener une recherche structurée, sans jargon ni abonnement imposé.

**Client prioritaire** : entrepreneurs, artisans et TPE souvent peu à l'aise avec les outils numériques. La promesse porte sur **un livrable vérifiable**, pas sur « l'IA fait tout à votre place ».

**Le site existe** : design Obscure Pop validé, navigation Accueil / Produit / Contact, cinq cartes animées en CSS 3D, six pages produit distinctes, catalogue public de 18 services, méthodes d'initiation et premier générateur gratuit de textes locaux.

**Ce qui ne peut pas être vendu maintenant** : six ZIP commerciaux complets, droits de redistribution vérifiés, prix, boutique conforme, livraison sécurisée, SAV et documents juridiques ne sont **pas** achevés. Ne pas afficher de bouton achat actif.

### Annexes applicables
| Annexe | Document | Ce qu'elle permet |
|---|---|---|
| A | [Spécifications fonctionnelles](./SPECIFICATIONS_FONCTIONNELLES_V1_1.md) | 24 exigences F-001 à F-024, 15 scénarios de recette |
| B | [Spécifications détaillées des six banques](./SPECIFICATIONS_PRODUITS_V1_1.md) | Entrées, sorties, produits originaux, contrôles, fichiers exacts |
| C | [Architecture et commercialisation](./ARCHITECTURE_ET_COMMERCIALISATION_V1_1.md) | Contraintes GitHub Pages, paiements et livraison futurs, RGPD, licences, prix |
| D | [Backlog priorisé et release gates](./BACKLOG_PRIORISE_V1_1.md) | Tâches, état, dépendances, décisions et critères de passage |
| E | [Recette approfondie de la banque Rédaction](./RECETTE_PACK_REDACTION_V1_2.md) | 24 critères détaillés, 17 tests, guide, trois tests débutants et packaging |
| F | [Parcours d'achat — UX, disponibilité et checkout futur](./PARCOURS_ACHAT_UX_V1_3.md) | Historique des exigences de commerce futur, sans activation |
| G | [Simplification de la navigation V1.4](./SIMPLIFICATION_NAVIGATION_V1_4.md) | Navigation simplifiée réellement proposée, retrait des doublons, tests |
| H | [Chatbot d'orientation des banques V1.5](./CHATBOT_ORIENTATION_V1_5.md) | Recommandations locales, sécurité, tests et limites du moteur |
| I | [Chatbot conversationnel V1.6](./CHATBOT_FONCTIONNEL_V1_6.md) | Dialogue multi-tours, questions de clarification, explications et recette |
| J | [Chatbot IA générative V1.7](./CHATBOT_GENERATIF_V1_7.md) | Service LLM, sécurité, consentement, coûts et recette |
| Historique | [Plan de fabrication initial](./PLAN_FABRICATION_SIX_BANQUES_2026-11-02.md) | Première version des engagements produit (complétée par B) |
| Gouvernance | [Règles de publication de sprints](./SPRINT_DELIVERY_POLICY.md) | Preuves requises avant d'annoncer une livraison |

## 1. Identité visuelle et périmètre du site — décisions confirmées
**Charte** : Obscure Pop, noir charbon, ivoire, orange, violet/lavande et sauge, avec pistache atténuée (pas de jaune fluo omniprésent). Typographies et animation actuelles conservées. Ne pas remplacer par un template générique.

**Expérience** : les cinq cartes de l'accueil s'ouvrent au **hover**, restent atteignables au clavier et au tactile ; la perspective CSS représente des usages concrets. Pas d'ordinateur 3D WebGL réintroduit sans demande et validation.

**Structure de navigation** : menu supérieur **Accueil / Produit / Contact**, header sticky ; les pages catalogue, fiches, parcours et outil gratuit sont des ressources secondaires accessibles par CTA. Chaque banque a une page Showroom 01 personnalisée au contenu de la discipline, sans six pages purement clonées.

**Communication** : français simple, pas de bloc surchargé, pas de faux avis, preuve inventée ni de promesse de résultat non testée. Une démonstration locale doit être explicitement identifiée.

## 2. État vérifié et preuves à date
Base : dépôt cosscoll/Banque-Outils-IA, branche main au SHA **d1f86439cfff5bf85a652241357c915481ba2654**, issu de PR #9 fusionnée le 02/11/2026.

| Sujet | État au 02/11 | Preuve / limite |
|---|---|---|
| HTML/CSS du site, Obscure Pop, navigation | Publié | Fichiers main, Pages |
| Catalogue de 18 ressources + filtres | Testé en CI | Ne signifie pas actualisation des tarifs tiers |
| Six pages showroom | Testées en CI | Aucune des six n'est vendue |
| Outil gratuit Rédaction | Publié et testé sur Chromium | Génération locale, copie et export ; relecture linguistique non achevée |
| CI Node « Verify public preview » | **Succès** | Workflow GitHub sur SHA d1f86439 |
| QA navigateur de PR | **Succès** | Chromium desktop/mobile sur SHA 208fe4d4611a5deafd04d88f41085352d7683512 |
| GitHub Pages « build and deployment » | **Succès** | Workflow GitHub sur SHA d1f86439 |
| « Verify live website after deployment » | **Succès** | SHA HTML et interactions accueil testés sur bureau/mobile Chromium |
| 12 modèles + 3 cas Rédaction | Brouillon privé Google Drive | Ni ZIP final ni test terrain |
| Banques complètes et livraison premium | **À faire** | Pas de paquet final, pas de vente |
| Contact confidentiel pour prospects | **À faire** | Parcours actuel GitHub Issues non adapté |
| Recette Safari iOS / vrai Android / performance terrain | **À faire** | Les tests Chromium ne suffisent pas |
| Juridique, fiscal, prix et plateforme de vente | **Bloqué avant lancement** | Nécessite informations réelles et décisions |

Liens de vérification : [PR #9](https://github.com/cosscoll/Banque-Outils-IA/pull/9), [GitHub Actions](https://github.com/cosscoll/Banque-Outils-IA/actions), [site actuel](https://cosscoll.github.io/Banque-Outils-IA/).

## 3. Cible, besoins et parcours à livrer
**Persona principal** : indépendant, artisan ou responsable de petite équipe avec un besoin concret et peu de temps pour comparer les outils.

**Parcours P1 (visiteur gratuit)** : voir l'accueil → comprendre six univers → choisir Rédaction → tester un outil réel → copier/télécharger le résultat → voir les limites, exemples et prochaines étapes. **Parcours présent et automatisé en partie ; qualité novice à éprouver.**

**Parcours P2 (acheteur futur)** : voir le contenu exact et les prérequis → prix et conditions → paiement sécurisé sur une plateforme commerciale adaptée → droit d'accès → ZIP privé → guide et assistance. **Non réalisé.**

**Parcours P3 (gestionnaire)** : mettre à jour un produit privé versionné → QA et licences → publier disponibilité réelle → suivre ventes/support/retrait. **Spécifié seulement.**

## 4. Produit : définition du minimum commercialisable
Une **banque** comprend :
1. Un outil **original réellement utilisable** et exportable (ou dépendances expliquées).
2. Un guide de démarrage + un parcours de bout en bout.
3. Au moins **10 modèles originaux** et **3 cas complets fictifs**.
4. Checklist de qualité humaine et limites de l'outil.
5. Formats ouverts et adaptés aux novices, compatibilité documentée.
6. Licence, provenance des composants, version, support et conditions de mise à jour.

Les trois supports du Showroom (« Guide / Exemples / Contrôle ») servent à expliquer ; ils ne remplacent pas les livrables réels. Les fichiers payants demeurent dans un **stockage privé** hors du dépôt public.

| Banque | Production concrète attendue | État |
|---|---|---|
| 01 Rédaction | Assistant de messages, 12 gabarits, 3 cas, guide et relecture | **Partiel**, outil public + brouillons privés |
| 02 Design & visuels | Brief graphique, SVG/HTML éditable, modèles et contrôle licences | Spécifié |
| 03 Sites web & prototypes | Assistant arborescence + prototype statique exportable | Spécifié |
| 04 Vidéo & audio | Storyboard local, script et planning export CSV/TXT | Spécifié |
| 05 Première automatisation | Cartographe de flux, simulation locale sans action externe | Spécifié |
| 06 Recherche & analyse | Matrice sources/date/fiabilité et note de décision traçable | Spécifié |

Consulter les critères détaillés, entrées, sorties, cas d'erreur et format des fichiers dans l'annexe B.

## 5. Exigences non fonctionnelles et sécurité
- Tester l'interface à 320, 390, 768, 1024 et 1440 px et sur navigateur iOS/Android réel, en complément du Chromium CI.
- Accès clavier, texte lisible, contraste cible WCAG AA, motion réduite, état visuel des contrôles et fonctionnement sans hover ; vérifier et documenter les exceptions.
- Performance : objectifs indicatifs LCP ≤ 2,5 s / CLS ≤ 0,1 / INP ≤ 200 ms quand une mesure réelle est possible ; mesures non encore effectuées.
- Aucune API IA, clé privée, donnée client, archive premium, tracking imposé ou composant tiers non vérifié dans le dépôt public.
- Distinguer un outil déterministe local d'un appel à une IA générative distante. Une future intégration IA exigera information explicite, modèle de coûts, conformité et choix de l'utilisateur.

## 6. Commerce — interdictions et étapes de décision
**Point majeur :** GitHub Pages n'est pas autorisé comme hébergement gratuit d'un site destiné principalement aux transactions commerciales. Il demeure un **démonstrateur**, et non la future boutique. Source officielle : https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits.

**Option documentaire à étudier** : boutique spécialisée type Payhip ou hébergement commercial adapté ; frais, CGV de la plateforme, données, fiscalité et possibilité de personnaliser la vitrine sont à vérifier. Aucune ouverture de compte ni paiement autorisés par ce document.

**Avant vente** : identité vendeur, coordonnées réelles, politique confidentialité et registre RGPD, CGV, droits du consommateur, rétractation du contenu numérique, fiscalité/TVA selon marché, prix décidé, validation des licences et des packs, contrôle d'accès, reçu et support.

**Contact** : remplacer le mécanisme d'issue GitHub publique avant d'inciter des prospects à confier des informations. Les formulaires doivent comporter des mentions d'information conformes.

**Tarif** : aucun prix adopté. Le montant de **29 EUR** figurant dans un plan Business 02 du 15/10/2026 est une **hypothèse de test de l'offre automatisation**, non un tarif des six banques. Voir annexe C.

## 7. Priorités opérationnelles
1. **P0 / maintenant** : améliorer la correction grammaticale de l'outil Rédaction et vérifier sur des textes français divers ; audit mobile physique ; préparer 12 modèles + trois cas finaux, guide et licences.
2. **P0 / première banque complète** : assemblage du ZIP privé, manifeste et tests de conformité ; test de trois personnes novices ; correction des difficultés observées.
3. **P1 / prouver la valeur** : entretiens utilisateurs, objection/prix, fiche produit correspondant **strictement** au ZIP livré.
4. **P1 / commerce, sur autorisation uniquement** : hébergement principal compatible, contact privé, textes légaux, taxes, checkout, livraison sécurisée et support.
5. **P1 / produits suivants** : fabriquer Sites et Automatisation puis Visuels, Vidéo/audio et Recherche en respectant exactement le contrat commun.
6. **P2 / optimisation** : mesurer réussite de tâche, suivi et accessibilité/performance ; ne pas collecter ou profiler les utilisateurs par défaut.

Le backlog détaillé, les identifiants de tâches, statuts et dépendances sont dans **l'annexe D**.

## 8. Critères de « terminé » et publication
Les portes sont distinctes :
- **G0 Spécifié** : exigence, livrable, test d'acceptation et dépendances écrits.
- **G1 Développé** : code et fichiers présents, droits et secrets contrôlés.
- **G2 Testé** : CI pertinente et cas limites passent, QA humaine requise selon le cas.
- **G3 Publié en démonstration** : SHA main identique à la source, URL publique et parcours réel testés.
- **G4 Produit accepté** : ZIP privé complet, vérifié par des utilisateurs débutants, licences validées.
- **G5 Produit commercialisable** : G4 + droit/identité vendeur/prix/plateforme/paiement/livraison/support **et validation explicite**.

**À ce jour : socle G3 sur périmètre vérifié, outil Rédaction partiellement G3 ; aucune banque G4/G5.**

## 9. Limites de mandat et décisions à confirmer
- Ne pas modifier l'identité Obscure Pop ni remplacer les showrooms validés sans accord.
- Ne pas créer d'automatisation périodique ni utiliser Work, Codex, agents à quota limité ou Excel ; ne pas engager de dépense ni d'abonnement sans autorisation explicite.
- Ne pas fusionner un changement présentant des tests en échec ; conserver une trace des statuts et preuves.
- Décisions non prises : prix final, société vendeuse, moyen de paiement, hébergement commercial, adresse de contact, périmètre du support et licence client.
- Ce cahier des charges peut progresser en documentation et prototypes sans ces décisions ; leur absence **bloque uniquement** les étapes associées, pas l'amélioration des outils et du contenu privé.

## 10. Sources officielles de cadrage, vérifiées pour cette version
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [CNIL — Prospection commerciale par courriel](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique)
- [CNIL — RGPD premières étapes](https://www.cnil.fr/fr/passer-laction/rgpd-les-premieres-etapes)
- [Service Public — Conditions générales de vente](https://entreprendre.service-public.gouv.fr/vosdroits/F33527)
- [DGCCRF — Droit de rétractation](https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/delais-de-reflexion-ou-de-retractation-comment-sappliquent-t-ils)
- [Payhip — Tarifs affichés](https://payhip.com/pricing)

La validation juridique et fiscale reste à effectuer pour l'entité, les produits et les marchés réellement choisis.

## 11. Historique
- **02/11/2026 v1.0** : premier cahier des charges, six plans de fabrication et outil gratuit Rédaction.
- **02/11/2026 v1.1** : correction des statuts CI/production, séparation des cinq portes qualité, 24 exigences, recette, six spécifications produits, architecture commerciale et backlog.
- **02/11/2026 v1.2** : annexe E de recette Rédaction, contrats de contenus premium et correction du générateur local avec brouillon éditable et jeux de tests supplémentaires. La banque reste non commercialisable.
- **02/11/2026 v1.3** : annexe F et parcours de découverte amélioré de l'accueil aux six banques, démonstrations puis disponibilité ; ancien renvoi aux issues GitHub écarté des CTA produit, aucun checkout réel.

- **02/11/2026 v1.4** : simplification du site, accès cohérent depuis l'accueil vers les six banques, catalogue tiers relégué en aide secondaire, page Produit raccourcie, six fiches allégées sans liens redondants. Voir annexe G. Aucune banque commercialisée.

- **02/11/2026 v1.5** : assistant conversationnel local pour orienter vers les six banques, avec explication, clarification des besoins vagues, gestion de deux besoins et accès mobile. Aucune IA externe ni API payante.

- **02/11/2026 v1.6** : le guide garde désormais le contexte pendant la session, propose des questions ciblées pour les demandes vagues, explique un conseil précédent et distingue achat de pack et paiement à intégrer dans un site. Aucun LLM externe ni paiement.

- **03/11/2026 v1.7** : chatbot à génération par vrai modèle de langage via endpoint serveur Vercel, fin des réponses à mots-clés ; aucune vente ouverte. Activation réelle subordonnée à la validation du modèle et du déploiement.
