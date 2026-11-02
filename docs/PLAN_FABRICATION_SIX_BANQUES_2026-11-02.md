# Banque Outils IA — fabrication des six banques d'outils

**Document initial conservé. Spécification complète et plus récente : [Annexe B](./SPECIFICATIONS_PRODUITS_V1_1.md). Statut et priorités : [cahier des charges v1.1](./CAHIER_DES_CHARGES_EXECUTION_2026-11-02.md).**
Version 2026-11-02 · **Programme de production, pas catalogue de produits déjà finalisés**

## Contrat de qualité applicable à chaque banque
Chaque produit commercialisé doit contenir :
- 1 README de démarrage (besoin, public, prérequis, version, fichiers, méthode).
- 1 outil original opérationnel accessible aux débutants, autonome ou clairement dépendant d'un service externe.
- 1 parcours « avant → pendant → résultat → contrôle → export », reproductible.
- 3 cas pratiques complets avec données fictives et sorties testées.
- 10 modèles ou gabarits originaux minimum, adaptés au métier et modifiables.
- 1 checklist de vérification professionnelle et de confidentialité.
- 1 guide d'installation/compatibilité desktop/mobile + FAQ/support.
- 1 fichier « LICENCES & ATTRIBUTIONS », avec registre des éléments tiers.

**Définition d'un produit prêt** : tous les fichiers annoncés présents dans un stockage privé ; tests de sécurité/licence et 3 tests utilisateurs réussis ; documentation exacte ; parcours de livraison vérifié ; aucune ressource tiers copiée sous licence inconnue. Une simple page ou une liste de 18 services ne satisfait pas ce contrat.

## Pack 01 — Rédaction & communication (MVP)
**Pour qui** : TPE, indépendant, prestataire local. **Résultat** : message clair et relu.
- R01 Guide « audience / proposition / bénéfice vérifié / appel à l'action ».
- R02 Outil de composition de messages : email, publication, texte web, trois tons, copie/export .txt. Extrait gratuit public déjà disponible et testé automatiquement : /outils/assistant-messages.html, sans IA connectée ; recette linguistique et utilisateurs réels encore nécessaires.
- R03 12 modèles de situations : annonce, relance, demande de devis, présentation d'offre, fiche service, FAQ, invitation, newsletter, post, réponse client, proposition commerciale, bio.
- R04 Trois cas fictifs de TPE : commerce local, artisan et consultant.
- R05 Fiche de relecture : exactitude, destinataire, promesse mesurable, confidentialité, règles de prospection.
- R06 Avant/après annotés : améliorer les textes sans inventer de références clients.
- R07 Guide illustré et accessible pour téléphones.
- R08 Version, licence et guide de support.
**Point de validation métier** : trois débutants obtiennent un message utilisable, sans supposer que l'outil a écrit le fond à leur place.

## Pack 02 — Design & visuels
**Résultat** : brief graphique + maquette originale réutilisable.
- Outil de brief local : sujet, format, cible, contraste, ambiance, champs d'export.
- Modèles originaux d'affiche, post, présentation, grille de marque ; variantes éditables.
- Contrôle des droits de photos/polices, contraste, lisibilité mobile et imprimable.
- Cas : affiche d'un atelier, menu d'un commerce, campagne de service.

## Pack 03 — Sites web & prototypes
**Résultat** : cahier des charges lisible + mini-prototype statique.
- Assistant de cadrage : pages, objectifs, CTA, navigation, contenus, export Markdown.
- Kit HTML/CSS sobre et accessible avec composants testés, plutôt que formes 3D décoratives.
- Checklist responsive 390/768/1440, référencement, liens, formulaire, vitesse, accessibilité.
- Cas : indépendant, commerce local, vitrine d'artisan.

## Pack 04 — Vidéo & audio
**Résultat** : dossier préparatoire de vidéo reproductible et droits vérifiés.
- Storyboard local éditable (plans, durée, objectif, sous-titres, voix, export CSV).
- Scripts 15/30/60 secondes, feuille de tournage, plan son et rythme du montage.
- Cas : atelier, tutoriel produit, présentation de service.
- Ne pas redistribuer musique, voix, police ou image sans droits suffisants.

## Pack 05 — Première automatisation
**Résultat** : flux « déclencheur → condition → action → vérification » documenté.
- Cartographe de flux et simulateur local, sans déclencher de vraies actions externes.
- Checklists permissions, doublons, erreur, retour arrière, confirmation humaine.
- Cas : qualification d'une demande, rappel, tri de demandes entrantes.
- Intégrations tierces uniquement en option, coût et limites explicitement signalés.

## Pack 06 — Recherche & analyse
**Résultat** : note de recherche sourcée et matrice de comparaison.
- Outil local pour noter URL, source, auteur, date, incertitude et contradiction.
- Modèles de veille, benchmark, décision, synthèse et fiche de vérification.
- Cas : prestataires, concurrence locale, choix d'outil logiciel.
- Interdiction de présenter une estimation ou un résumé non vérifié comme un fait certain.

## Trajectoire de fabrication sans diluer le projet
- **Lot 0** : site, QA, workflow CI et démonstrations fiables.
- **Lot 1** : pack Rédaction + échantillon gratuit opérationnel ; tests débutants.
- **Lot 2** : pack Sites web et Automatisation, en valorisant de vrais outils locaux.
- **Lot 3** : pack Design, Vidéo/audio et Recherche ; mêmes standards de qualité.
- **Lot 4** : paiements, livraison privée, support et juridique (activation soumise à validation explicite).

## Traçabilité droits et maintenance
Pour chaque actif tiers enregistrer : nom exact, URL officielle, auteur, version, licence, capacité de redistribution commerciale, notice d'attribution, date de vérification, emplacement. « Gratuit » ne veut pas dire « revendable ». Distinguer outils auxquels on renvoie par lien de code sous licence permettant réellement redistribution.

## Risques ouverts
- Valeur commerciale non validée : mener cinq entretiens et trois usages accompagnés avant de fixer prix.
- Interfaces agréables ≠ produits vendables : le pack premium doit être utile **hors du site vitrine**.
- Contact public GitHub ≠ prospection confidentielle : mettre en place un canal privé avant mise en vente.
- Prévisualisation CSS en perspective ≠ vrai modèle 3D WebGL : ne pas promettre une technologie absente.
