# Annexe B — Spécifications détaillées des six banques commercialisables
Banque Outils IA · version 1.1 du 02/11/2026 · Document de conception ; **seuls les fichiers effectivement livrés peuvent être annoncés comme disponibles**.

## B.1. Ce qu'est une banque et ce qu'elle n'est pas
Chaque banque doit résoudre **un problème professionnel mesurable** avec un outil original prêt à l'emploi, un mode d'emploi accessible et des fichiers adaptés à plusieurs métiers. Les catalogues d'applications tierces sont une aide au choix, jamais la marchandise vendue ; les abonnements aux logiciels tiers ne sont pas inclus, sauf accord contractuel explicite.
L'offre ne doit jamais imiter un logiciel ou garantir la sortie d'une IA lorsque le livrable est un simple gabarit.
Chaque pack doit fonctionner sans connaître GitHub, Node.js ou le code source. Une dépendance optionnelle à un service tiers doit être expliquée et son coût distingué.

### Composition minimale (à vérifier physiquement fichier par fichier)
| Référence | Fichier annoncé | Format privilégié | Acceptance |
|---|---|---|---|
| STD-01 | README_Demarrage | PDF + TXT/HTML accessible | Compréhensible par un débutant |
| STD-02 | Outil_Interactif | HTML/CSS/JS autonome si possible | Produit une sortie réelle, sans compte |
| STD-03 | Guide_Pas_a_Pas | PDF + Markdown/HTML | Reproductible et illustré |
| STD-04 | Modeles | TXT/MD/CSV éditables | Au moins 10 modèles originaux par banque |
| STD-05 | Cas_Pratiques | PDF + fichiers d'exemple | Trois cas complets fictifs et vérifiés |
| STD-06 | Checklist_Verification | PDF + TXT | Contrôles métier et données personnelles |
| STD-07 | Licence_Attributions | TXT | Fichiers originaux/tiers recensés et droits vérifiés |
| STD-08 | Changelog + Support | TXT | Date, version, contact, limites et compatibilités |

La représentation des trois supports « Guide / Exemples / Contrôle » sur le showroom est un **regroupement marketing** ; le vrai ZIP peut contenir davantage de fichiers sans tromper l'acheteur. Ne pas promettre de fichiers non encore écrits.

## B.2. Banque 01 — Rédaction & communication [R]
**Problème :** savoir quoi écrire sans page blanche. **Cible :** indépendant, artisan, responsable d'une TPE. **Résultat :** trois types de brouillons adaptables, relus avant envoi. **MVP :** prioritaire.

### Fonctionnalités et règles
- **R-01 Cadrage** : entrée activité [1–80 caractères], audience [1–110], offre [1–160], bénéfice vérifiable [1–160], CTA [1–160], canal [email|post|web], ton [professionnel|chaleureux|direct]. Bloquer les champs vides ou composés uniquement d'espaces.
- **R-02 Génération** : construire un brouillon déterministe en français, sans prétendre appeler une IA. Afficher une note « à vérifier et personnaliser ». Ne pas inventer un chiffre, une preuve ou un avis.
- **R-03 Révision** : possibilité de sélectionner/copier, modifier par l'utilisateur dans son outil préféré, exporter en TXT UTF-8 ; aucune transmission des champs.
- **R-04 Qualité linguistique** : tester les articles et élisions (« à des », « aux », « à l' »), ponctuation, accords et majuscules avec au moins 20 entrées fictives. Le générateur public existant requiert encore cette recette.
- **R-05 Matériel pédagogique** : 12 modèles originaux (annonce, relance, réponse tarif, accroche, fiche offre, FAQ, invitation, rappel, réponse client, coulisses, newsletter, réponse à une demande). Brouillon V0.1 dans le Drive privé du projet : non considéré comme pack terminé.
- **R-06 Scénarios** : papeterie fictive, artisan fictif et consultant fictif ; chaque cas comporte demande initiale, contraintes, brouillon, corrections, résultat et checklist.
- **R-07 Conformité d'usage** : aucune fonction d'envoi, aucun carnet de contacts ou automatisation de prospection dans le MVP ; guide CNIL pour consentement/information/opposition selon B2B/B2C.
- **R-08 Accessibilité** : champs étiquetés, erreurs associées, clavier, tactile ; guides lisibles sans lecteur PDF propriétaire.

### Recette banque 01
- Prouver génération réelle des 3 canaux × 3 tons, sans réseau ; copier/coller et export sur PC/Android/iOS si possible.
- Chaque des 12 modèles doit exposer champs obligatoires, exemple entièrement fictif, usage et vérification.
- Relecture de trois utilisateurs non impliqués ; objectif : produire un message pertinent sans aide, noter les corrections, ne pas déclarer succès sans résultat.
- Aucun fichier client ni modèle premium distribué dans le dépôt public.
**État** : prototype gratuit opérationnel sur Pages, tests de prévisualisation passés ; 12 modèles + 3 scénarios en brouillon privé ; ZIP, licences du pack, guide et tests terrain non terminés.

## B.3. Banque 02 — Design & visuels [V]
**Problème :** transformer une idée en brief graphique exploitable et en modèle éditable. **Cible :** commerçant et petite équipe sans graphiste. **Résultat :** brief + maquettes SVG/HTML originales modifiables.

### Spécification outil Brief Visuel
- **V-01 Entrées** : usage (post/affiche/bannière/miniature), titre, sous-titre, audience, format, style (choix simples), couleurs en hexadécimal, CTA éventuel.
- **V-02 Sortie** : brief textuel (objectifs, hiérarchie, contraintes) + aperçu de gabarit ; export HTML/SVG modifiable et instructions d'export PNG/PDF selon navigateur.
- **V-03 Contrôles** : contraste lisible, longueur de titre, marge de sécurité, affichage à 390 px, bannissement des textes factuels inventés, gestion des champs trop longs sans débordement.
- **V-04 Ressources** : au moins 10 gabarits originaux et variantes adaptées à commerce, service, événement ; pas d'images de banques ou de logos tiers sans droit documenté.
- **V-05 Trois cas** : ouverture d'atelier, menu de boutique, annonce saisonnière.
- **V-06 Limites** : ne pas annoncer « création d'image IA » si aucun modèle n'est réellement appelé. Les assets SVG/HTML ne doivent jamais être remplacés par de la 3D décorative sans lien avec le sujet.

**Recette** : export d'un gabarit éditable depuis chaque format, lisible sur mobile, sans polices tierces obligatoires ; attribution et licences recensées.

## B.4. Banque 03 — Sites web & prototypes [W]
**Problème :** structurer un site sans partir d'un thème générique. **Cible :** indépendant et TPE. **Résultat :** arborescence, cahier de pages, prototype HTML statique.

### Spécification outil Cadrage Site
- **W-01 Entrées** : secteur, public, objectif prioritaire, preuves disponibles, pages nécessaires, CTA principal, téléphone/e-mail facultatifs, identité visuelle choisie.
- **W-02 Sortie** : arborescence, checklist de contenu par page, wireframe textuel et mini-site statique accessible, fichiers téléchargeables.
- **W-03 Contenus de départ** : zones à compléter ; pas de faux témoignages, pourcentages ou avis. L'utilisateur ajoute les informations réelles.
- **W-04 Contrôle technique** : HTML sémantique, navigation clavier, responsive 320/390/768/1440, contraste, optimisations simples, balises SEO de base et aucun secret côté client.
- **W-05 Modèles** : 10 sections réutilisables, trois prototypes originaux (artisan, indépendant, commerce).
- **W-06 Périmètre** : la banque n'héberge pas automatiquement le site, ne réserve aucun domaine et ne crée pas de compte externe. L'hébergement réel est une mission distincte qui peut avoir un coût.

**Recette** : ouvrir le prototype sans serveur, vérifier liens et champs fictifs, pas de débordement ni erreur JS, fichiers réutilisables sans dépendance propriétaire cachée.

## B.5. Banque 04 — Vidéo & audio [M]
**Problème :** prévoir efficacement la production d'un contenu audiovisuel court. **Cible :** entreprise locale, formateur et créateur débutant. **Résultat :** storyboard/export d'un plan de tournage, script court et plan de sous-titrage.

### Spécification outil Storyboard
- **M-01 Entrées** : objectif, audience, durée cible (15/30/60 secondes), format vertical/horizontal, liste de plans (titre, durée, action, voix, sous-titre, fichier de référence optionnel).
- **M-02 Sorties** : tableau de plans et texte voix off, export CSV UTF-8 et TXT avec les durées cumulées ; signaler si le total dépasse la cible.
- **M-03 Contrôles** : durées positives, caractères spéciaux CSV correctement échappés, présence d'un CTA final facultatif mais explicite.
- **M-04 Bibliothèque** : 10 gabarits de scripts originaux + guide cadrage/son/lumière/sous-titres + droits.
- **M-05 Cas** : découverte artisan, tutoriel produit, visite d'atelier.
- **M-06 Limites** : ne promettre ni vidéo générée ni voix synthétique sans véritable traitement/licence. Pas d'extraction, suppression de filigrane ou distribution d'œuvres sous droits sans autorisation.

**Recette** : trois storyboards générés, exports réimportables, durées totales correctes et aucune ressource audio/vidéo propriétaire distribuée illégalement.

## B.6. Banque 05 — Première automatisation [A]
**Problème :** comprendre, documenter et sécuriser un flux répétitif. **Cible :** petite équipe non technique. **Résultat :** plan de workflow simulé avec contrôles humains.

### Spécification outil Cartographie du Flux
- **A-01 Entrées** : événement déclencheur, canal/source, données minimales, règles/conditions, action envisagée, approbateur, échec possible et retour arrière.
- **A-02 Modèle** : déclencheur → validation des entrées → condition → brouillon → approbation humaine → action **simulée** → journal de résultat. Branches de refus, timeout, doublon et erreur.
- **A-03 Sorties** : schéma texte/SVG et fiche Markdown/JSON non exécutable décrivant étapes et règles.
- **A-04 Contrôle** : la simulation locale n'envoie **aucun** e-mail, SMS ou requête API ; n'ouvre aucun compte. Les coûts et abonnements à des connecteurs réels sont séparés.
- **A-05 Exemples** : demande de devis, rappel d'un rendez-vous fictif, préparation de réponse à une demande.
- **A-06 Sécurité** : pas de donnée personnelle dans les jeux d'essai ; pas de secret dans un fichier JSON distribué ; étapes de consentement et de suppression documentées.
- **A-07 Cas difficiles** : exécution répétée, entrée incomplète, utilisateur refuse la validation, canal indisponible ; proposer une action humaine de secours.
- **A-08 Guides** : 10 gabarits de diagramme ou de méthode ; les scénarios n8n/Make tiers restent documentaires, sans hébergement/revente non autorisés.

**Recette** : tester les cas « accepté », « refusé », « doublon » et « erreur » ; aucun appel réseau ni automatisation réelle, y compris lors de l'ouverture des fichiers.

## B.7. Banque 06 — Recherche & analyse [Q]
**Problème :** choisir une option en conservant des sources et leurs limites. **Cible :** dirigeant, chargé de projet, indépendant. **Résultat :** matrice sources et note de décision traçable.

### Spécification outil Matrice de Sources
- **Q-01 Entrées** : question, hypothèses, sources (titre, auteur, URL, date, extrait reformulé, statut primaire/secondaire, limites), options, critères pondérés et incertitudes.
- **Q-02 Sorties** : tableau CSV, note Markdown, historique des sources, score optionnel calculé sur des critères explicités ; chiffres non saisis = indéterminé, jamais zéro fabriqué.
- **Q-03 Aide à la qualité** : alerter si source non datée, lien manquant, contradiction non résolue ou critère sans justification.
- **Q-04 Cas** : comparaison de prestataires, veille concurrentielle locale, arbitrage d'un logiciel.
- **Q-05 Bibliothèque** : 10 matrices originales : benchmark, SWOT commenté, grille de risques, journal d'hypothèses, comparaison budget, etc.
- **Q-06 Limites** : pas de navigation ou vérification web automatique prétendue sans accès effectif ; pas d'aspiration de sites tiers en contradiction avec leurs conditions.

**Recette** : 3 dossiers complets sur données fictives, exports CSV relisibles et une alerte si données ou sources insuffisantes.

## B.8. Fabrication, version et paquetage
Arborescence proposée dans un **stockage privé**, pas dans GitHub Pages :

Banque-Rédaction-v1/
- 00_LIRE_EN_PREMIER.pdf
- 01_Atelier/outil.html (+ assets intégrés ou locaux)
- 02_Guide/guide.pdf et guide.md
- 03_Modeles/modeles.txt (ou fichiers séparés)
- 04_Exemples/cas-01 à cas-03
- 05_Verification/checklist.pdf et checklist.txt
- 06_Licences/LICENCES.txt, NOTICE.txt
- CHANGELOG.txt, SUPPORT.txt, MANIFESTE.txt

Le même contrat s'applique aux six banques avec noms adaptés. Les autres formats demandés doivent être réalisables sans Excel ni consommation de quotas réservés.

### Registre de preuve avant passage « fini »
| Preuve | Détail obligatoire |
|---|---|
| Inventaire | Nom, rôle, taille et hachage SHA-256 de chaque fichier |
| Droits | Auteur, provenance, conditions de redistribution, licence intégrale si requise |
| Fonctionnel | Cas nominaux et limites, export, navigateur testé, résultat |
| Pédagogie | 3 tests débutants, notes anonymisées, corrections et nouvelle version |
| Sécurité | Aucune clé, donnée personnelle, archive cachée ou URL non publique exposée |
| Commercial | Correspondance exacte fiche ↔ contenu ZIP ↔ prix/support et conditions approuvés |

## B.9. Ordre de production retenu
1. **Rédaction** : terminer, tester, empaqueter et valider une offre complète avant de développer six packs incomplets.
2. **Sites web & Automatisation** : travailler leurs outils locaux et leurs contrôles de qualité ; jamais lancer de véritables actions externes.
3. **Design, Vidéo/audio, Recherche** : construire selon le même contrat, sans copier les services cités au catalogue.
4. **Commerce** : uniquement après prérequis légaux, étude de demande, validation prix et hébergement adapté.

## B.10. Registre de dette produit
- La sortie linguistique du prototype Rédaction peut produire des constructions maladroites lorsque l'utilisateur fournit des champs avec articles. **P0 qualité** avant mise en vente.
- Les 12 modèles de Rédaction ont été rédigés en V0.1 dans un Google Doc privé. Cela n'atteste ni le packaging, ni la licence complète, ni une validation par clients.
- Les cinq autres banques possèdent actuellement des pages de présentation, **pas leurs outils terminés**.
- Aucun ZIP payant, catalogue premium ou fichier de livraison commerciale validé en production.
