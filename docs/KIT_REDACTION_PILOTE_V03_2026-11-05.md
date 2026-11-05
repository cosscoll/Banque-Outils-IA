# Banque Rédaction — fabrication V0.3 : livraison pilote privée

**5 novembre 2026 — NON COMMERCIALISABLE, NON FUSIONNÉ AU SITE.**

## Ce qui a été effectivement fabriqué
Un kit ZIP privé nommé `StudioIA_Banque_Redaction_Pilote_V0_3.zip`, conservé dans la conversation de fabrication, non hébergé sur GitHub public. SHA-256 de l'archive : `31b8c69b6f934520b4202978ba0a3fdaddc097abe66663ca6cad60672d8a117c`.

Composition : **21 fichiers** dont une page HTML interactive autonome (`atelier-redaction.html`), douze modèles TXT utilisables et un catalogue JSON, trois études de cas rédigées à partir d'entreprises fictives (commerce local, artisan, consultant), un guide d'usage, une grille de recette et un manifeste SHA-256 des fichiers.

Les douze modèles couvrent : présentation de service, publication pédagogique, relance de devis, réponse tarif, accroche d'accueil, fiche service, FAQ, invitation, confirmation de rendez-vous, réponse à un avis, coulisses et newsletter.

La page `atelier-redaction.html` s'exécute **hors ligne** : choisir une situation, compléter les variables, produire un brouillon, éditer le texte, le copier et l'exporter en TXT. **Ce n'est pas un générateur IA** : il n'appelle aucun service externe, n'envoie aucun formulaire ni aucune donnée. Les modèles sont des structures originales à personnaliser.

## Contrôles techniques réalisés
- Chromium réel sur le HTML injecté : **12/12 modèles** générés sans erreur JavaScript ; les boutons de copie et export sont activables lorsque le brouillon est non vide.
- Contrôle à **390 px** : largeur du document = largeur de l'écran, pas de défilement horizontal détecté.
- ZIP : 21 entrées, test de compression/décompression réussi.
- Empreintes de tous les fichiers du manifeste : vérifiées et cohérentes.
- Aucun prix, événement, identité client ni témoignage présenté comme réel.
- Le modèle e-mail de relance a une salutation neutre : pas de destinataire personnel obligatoire.
- Les champs dates, heures, lieux et mécanisme de désinscription nécessitent une saisie réelle, sans préremplissage de faits fictifs prêts à envoyer.

## Limites et contrôles restant ouverts
- Aucun professionnel débutant extérieur n'a essayé l'outil sans assistance : **0/3 pilotes**.
- Aucun examen commercial ou juridique final sur le contenu, les modèles de prospection, la licence, le support et les conditions de vente.
- Le contrôle navigateur vérifie uniquement les éléments testés ; pas de certification d'accessibilité ni d'efficacité marketing.
- La qualité éditoriale des douze modèles doit encore être confrontée à des briefs réels, avec autorisation et sans données confidentielles.
- Le ZIP reste **privé** ; il ne doit pas être commité sur ce dépôt public ni ajouté aux pages de démonstration.

## Procédure de recette client
1. Tester avec trois personnes débutantes : une commerçante, un artisan et un indépendant fictifs ou volontaires.
2. Demander à chaque testeur de choisir un modèle, remplir les champs et produire une version finale sans aide.
3. Noter temps réel, incompréhensions, omissions, erreurs et volonté d'utiliser le texte.
4. Vérifier les exports et la copie sur deux navigateurs dont un mobile.
5. Corriger les défauts puis recoder la version du kit et les empreintes.
6. Définir licence, prix, livraison privée, assistance et conditions avant la vente.

## Lien avec le site actuel
Le démonstrateur gratuit `outils/assistant-messages.html` reste inchangé : aucun effet sur la boutique en ligne ni activation d'un checkout. Le kit privé V0.3 est un **candidat de produit complet**, non un produit officiellement livré aux acheteurs.

**Interdit** : annoncer « pack fini », « IA générative » ou « clients pilotes satisfaits » avant leurs validations vérifiables.
