# Annexe A — Spécifications fonctionnelles et recette UX
Banque Outils IA · V1.1 · 02/11/2026 · Statut : cahier des charges, critères proposés et non tous validés.

## A.1. Périmètre et vocabulaire
- « Banque » = produit numérique contenant un ou plusieurs outils originaux, modèles, guide, exemples et contrôles de qualité. « Catalogue » = répertoire public des applications tierces, qui ne sont **pas** vendues par Banque Outils IA.
- « Essai » = exemple interactif public, clairement séparé des livrables payants.
- « Simulation » = résultat prédéfini ou local calculé, sans IA générative distante ; le signaler visiblement.
- « Disponible » = fichiers finaux, support et parcours de livraison testés ; « en préparation » sinon.
- « Validé » dans ce document = exigences retenues pour développement, non réception fonctionnelle. Le propriétaire conserve la validation finale de l'identité et des nouvelles offres.

## A.2. Utilisateurs, jobs et contraintes
| Profil | Tâche concrète | Friction à éliminer | Résultat attendu |
|---|---|---|---|
| P01 Indépendant débutant | Écrire un texte pour communiquer sur une offre | Jargon, coûts cachés, page blanche | Texte éditable + checklist |
| P02 Artisan / commerce local | Structurer une petite vitrine et un CTA | Ne sait pas quoi mettre sur son site | Plan des sections + contenu à remplir |
| P03 Petite équipe | Documenter une tâche répétitive | Crainte d'envoyer des données client ou de tout automatiser | Schéma de flux + étape de validation |
| P04 Responsable polyvalent | Comparer des solutions et sources | Trop de liens et de promesses IA | Tableau daté des options et limites |

Hypothèses personas à tester par observation, pas des enquêtes déjà effectuées. L'interface doit fonctionner sans compte pour les ressources gratuites.

## A.3. Carte des pages et navigation
| Destination | Rôle | Type d'accès | Obligatoire au lancement ? |
|---|---|---|---|
| /index.html | Promesse et orientation visuelle ; cinq cartes hover/focus, six besoins | Public | Oui, existant |
| /produit.html | Entrée unique sur les six banques distinctes | Public | Oui, existant |
| /pack-redaction.html ; /pack-visuel.html ; /pack-sites-web.html | Showrooms de trois banques | Public (aperçus) | Oui, existants |
| /pack-video-audio.html ; /pack-automatisation.html ; /pack-recherche-analyse.html | Showrooms de trois autres banques | Public (aperçus) | Oui, existants |
| /catalogue.html | 18 ressources tierces, filtres et recherche sans compte | Public | Oui, existant |
| /fiches.html ; /parcours.html | Initiation et orientation | Public | Oui, existants |
| /outils/assistant-messages.html | Échantillon de rédaction entièrement local | Public | Oui, existant |
| /contact.html | Contact professionnel privé à terme | Public | Oui, mais solution actuelle à remplacer |
| Boutique + paiement + livraison | Achat, reçu, accès à un ZIP privé | Futur, hors GitHub Pages | Non, bloqué avant conformité |

Le menu global primaire doit rester **Accueil / Produit / Contact**. Les ressources complémentaires peuvent être accessibles par CTA ou navigation secondaire, sans ajouter de catégories techniques dans le menu haut. Header sticky conforme à la charte Obscure Pop validée ; couleurs et animation 3D CSS à conserver, aucun nouvel ordinateur WebGL sans validation.

## A.4. Exigences fonctionnelles testables
Les identifiants sont stables et reliés à l'annexe D (backlog). Les seuils UX sont **objectifs internes proposés**, pas résultats mesurés.

### Parcours vitrine et navigation
**F-001 — Compréhension :** le héros explique le bénéfice (« réaliser une tâche avec un outil concret ») et fournit un chemin clair vers Produit ou les outils gratuits. Critère : 4 utilisateurs novices sur 5 décrivent correctement l'offre après 10 secondes d'observation ; mesurer lors d'une vraie session.

**F-002 — Six produits distincts :** Produits affiche six cartes, chacune ayant une page dédiée, une cible, le résultat obtenu, le contenu exact, les dépendances, les limites, l'état de disponibilité. Critère : chaque carte pointe vers une route 200, aucune page produit dupliquée sous un autre titre.

**F-003 — Immersion contrôlable :** cinq cartes de l'accueil accessibles par survol souris, focus clavier et toucher. Le mouvement aide à comprendre les fonctions ; jamais d'obstacle à l'activation d'un lien. Critère : les cinq destinations sont cliquables ; une carte sous une couche de décor reste accessible.

**F-004 — Responsive :** vues cibles 320, 390, 768, 1024 et 1440 px ; aucun débordement horizontal non intentionnel, aucun texte/CTA coupé, zones tactiles principales d'environ 44 px. Les formats sont des références de test, pas l'exhaustivité des appareils.

**F-005 — Accessibilité :** accès au contenu par clavier seul, ordre de focus logique, lien d'évitement, intitulés de boutons explicites, contraste de texte visé WCAG AA, aucune information seulement par couleur/hover. Les préférences reduced-motion désactivent mouvements non essentiels. Toute limite auditée est corrigée ou consignées avec justification.

**F-006 — Navigation mobile :** le menu s'ouvre au bouton, expose son état avec aria-expanded, se ferme au lien, à Escape ou au clic extérieur ; les liens restent utilisables au lecteur d'écran.

### Catalogue et aide à la décision
**F-007 — Recherche :** chercher localement un besoin avec accents, synonymes de base et mots multiples, sans transmettre la recherche à un serveur. Test : « email », « vidéo », « site web », « automatiser » trouvent au moins un résultat adapté ; recherche vide restaure l'état initial.

**F-008 — Filtres :** six familles + « Tous ». La sélection est perceptible et indiquée à la technologie d'assistance ; les cartes hors filtre sont masquées ; compteur exact ; état vide clair ; bouton « effacer » réinitialise recherche et famille.

**F-009 — Références tiers :** chaque service du catalogue porte son nom exact, usage, URL officielle, date de contrôle, modèle d'accès et limites ; les prix, capacités et quotas non vérifiés ne doivent pas être annoncés.

**F-010 — Démo honnête :** aucun résultat affiché n'est présenté comme appel IA en direct si le service ne l'exécute pas réellement. Mention de simulation et de données fictives à proximité du résultat.

### Outils et produits
**F-011 — Premier outil réel :** formulaire Rédaction avec champs de contexte, trois formats (email, post, page web), trois tons, validation de champs, sortie exportable en TXT et copiable. Fonctionnement local et hors réseau. Test fonctionnel sur bureau + mobile, champs vides, textes longs, apostrophes et accents ; cohérence grammaticale à relire manuellement.

**F-012 — État éditorial :** guide et modèles utilisent une terminologie compréhensible. Séparer clairement exemple fictif, proposition de l'outil et fait fourni par l'utilisateur. Critère : les informations non fournies ne sont jamais inventées.

**F-013 — Fiches des banques :** minimum : niveau, résultat, fichiers exacts, fichiers de prévisualisation, format, compatibilité, usage hors ligne, outils tiers nécessaires et leurs coûts éventuels, FAQ, support, droit d'utilisation, date de version.

**F-014 — Versionning :** chaque banque suit un manifeste de fichiers horodaté ; les ajouts/retraits sont visibles en changelog. La version achetée et ses mises à jour doivent être explicites.

**F-015 — Essai public vs pack privé :** un essai fonctionnel gratuit peut être distribué sur le site ; les ZIP premium et clés secrètes ne sont ni dans le repo ni dans un dossier Pages indexable.

### Contact et commerce futur (NON ACTIFS)
**F-016 — Contact privé :** canal sans création de compte GitHub et sans publication des données d'un prospect dans une issue publique. Tests : validation, confirmation, message d'erreur, anti-spam raisonnable, lien vers la confidentialité, aucune adresse de tiers affichée.

**F-017 — Offre :** n'afficher « acheter » et un prix que si le produit correspondant est complet, validé et commandable. Les pages de préparation doivent signaler sans ambiguïté l'indisponibilité.

**F-018 — Paiement :** achat par un prestataire adapté à l'activité commerciale, jamais collecte brute de cartes ou secret dans le site statique. Confirmation de commande, traitement des erreurs, justificatif, prise en charge des annulations et réclamations.

**F-019 — Livraison :** accès au produit uniquement après confirmation de paiement ; lien privé, protection contre accès anonyme, vérification de l'intégrité et possibilité de réaccès selon les conditions annoncées.

**F-020 — Support :** coordonnées exploitables, délai de réponse annoncé seulement s'il peut être tenu, FAQ d'installation, procédure de téléchargement interrompu et de réclamation.

### Observabilité et pilotage
**F-021 — Mesures :** mesurer seulement ce qui est nécessaire et légal ; pas d'outil de suivi introduit par défaut. Indicateurs proposés : compréhension de l'offre, fin d'essai, réussite de tâche novice, demandes de prix, commandes réellement payées, tickets support.

**F-022 — Traçabilité :** chaque modification indique fichiers, SHA, contrôles exécutés, statut exact de déploiement et blocages. Les tests automatiques ne remplacent pas une recette sur appareils réels.

**F-023 — Dégradation :** sans JavaScript, les liens et explications essentielles demeurent accessibles ; sans hover, les boutons, la navigation et l'essentiel du contenu restent fonctionnels.

**F-024 — Protection des données :** aucune information saisie dans un outil local ne transite vers un service tiers ; si une fonctionnalité IA distante est ajoutée ultérieurement, nouveau consentement/information, base légale, coûts et choix explicite.

## A.5. Cahiers de recette — cas normal / limites / erreurs
| Test | Préparation | Action | Attendu | Mode de preuve |
|---|---|---|---|---|
| T-001 | Chrome bureau 1440 px | Survoler et cliquer chaque carte | Bonne page, pas de carte masquée | Capture + test navigateur |
| T-002 | Android tactile 390 px | Ouvrir le menu, fermer, naviguer | Sans hover ni scroll bloqué | Vidéo appareil physique |
| T-003 | Clavier uniquement | Tab / Entrée / Escape sur header et cartes | Ordre, focus visible, liens actifs | Grille d'audit |
| T-004 | Reduced-motion active | Charger les 6 showrooms | Pas d'animation non essentielle imposée | Capture + contrôle styles |
| T-005 | Catalogue | Rechercher accentué puis filtrer | Résultat attendu, compteur juste, effacement OK | Test automatisé |
| T-006 | Requête impossible | Taper « xyzaucunoutil » | État vide explicatif et bouton d'effacement | Capture |
| T-007 | Rédaction exemple | Générer trois canaux et trois tons | Texte modifiable par copie, sans résultat hors contexte | Test + relecture humaine |
| T-008 | Rédaction champs vides | Effacer une entrée requise | Erreur accessible, pas de texte pseudo-validé | Test navigateur |
| T-009 | Rédaction hors connexion | Déconnecter réseau après chargement | Génération et export encore utilisables | Test navigateur |
| T-010 | Rédaction données fictives à accents | Copier/exporter TXT | Fichier UTF-8 lisible et texte identique | Comparaison |
| T-011 | Showroom | Activer Guide/Exemples/Contrôle | États cohérents via clavier et tactile | Test navigateur |
| T-012 | Contact actuel | Entrer donnée potentiellement privée | Ne pas demander au prospect de publier dans issue GitHub | Revue de risque |
| T-013 | Préachat | Cliquer les CTA produit en préparation | Pas de panier, paiement ou promesse de ZIP inexistant | Revue navigateur |
| T-014 | Future vente | Transaction autorisée + refus + doublon webhook | Aucun double droit / accès anonyme / paiement perdu | Tests intégration futurs |
| T-015 | Production | Comparer SHA/main au contenu public | Identité vérifiée, route de l'outil 200 | Action CI + vérification URL |

## A.6. Non-fonctionnel et objectifs mesurables
- **Performance mobile** : objectif interne proposé LCP ≤ 2,5 s, CLS ≤ 0,1, INP ≤ 200 ms au 75e percentile sur trafic réel si statistiquement exploitable ; à défaut effectuer des tests Lighthouse/lab documentés et signaler qu'ils ne sont pas des mesures de terrain.
- **Compatibilité** : dernières versions stables de Chrome, Firefox, Safari, Edge ; à tester au minimum Chrome Android, Safari iOS et desktop Chrome/Firefox.
- **Sécurité** : dépendances recensées, zéro secret exposé, pas de données sensibles en URL ou console, links externes vérifiés, pas de scripts third-party non justifiés.
- **Fiabilité** : tests Node et Chromium requis avant fusion ; déploiement et URL publique vérifiés après fusion ; incident documenté si l'une des étapes échoue.
- **Simplicité** : langage « ce que vous obtenez », pas du jargon technique comme « LLM / pipeline / RAG » sans une explication ; une action principale par bloc.

## A.7. Défauts connus / questions de recette à prioriser
- Le contact public ouvre actuellement un mécanisme GitHub Issues : **non acceptable** comme contact confidentiel en production commerciale.
- Les packs sont des aperçus ; aucune livraison premium vérifiée.
- Le premier outil compose des phrases à partir de champs libres : **relecture grammaticale et qualité française non encore réceptionnées** (articles, élisions, capitales, ponctuation et accords).
- Site public vérifié automatiquement sur Chromium desktop et mobile ; **pas** de preuve de recette Safari iOS et d'appareils physiques.
- Prix et fournisseur de boutique **non validés**.

## A.8. Décision de recette
Un lot ne passe en « accepté » qu'avec : US/critère traçable, résultat réel, preuve et validation propriétaire. Les autres statuts possibles sont « codé », « testé automatiquement », « publié » et « testé utilisateur », sans les confondre.
