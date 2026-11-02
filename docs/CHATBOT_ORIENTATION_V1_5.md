# Annexe H — Chatbot d'orientation des six banques

> **État historique V1.5** : le moteur a été enrichi ensuite d'un contexte de conversation et de questions de clarification, voir [annexe I V1.6](./CHATBOT_FONCTIONNEL_V1_6.md).
Banque Outils IA · Spécification et recette · 02 novembre 2026 · V1.5

## Mission
Aider un indépendant ou une TPE à choisir la banque correspondant à sa **tâche**, sans multiplier les pages, poser des questions personnelles ou demander de créer un compte.

## Ce qui fonctionne et limites transparentes
Assistant local, fondé sur des règles et des indices de vocabulaire (pas un grand modèle de langage / pas de conversation avec une IA distante). Les demandes sont analysées en mémoire dans le navigateur ; aucune API, authentification, cookies, journal d'échange ou transmission des messages n'est mise en place. Les réponses sont donc **des pistes d'orientation, non un diagnostic expert**. Les cas vagues demandent un exemple plus concret au lieu de tirer un produit au hasard.

## Parcours
1. Bouton discret « Quel produit choisir ? » fixe en bas à droite ; chatbot **fermé par défaut**.
2. Ouverture avec « Que souhaitez-vous réaliser ? » ; trois exemples populaires et accès aux six tâches ; texte libre disponible.
3. Analyse des mots du besoin ; recommandation principale et, si deux besoins forts, une recommandation complémentaire.
4. Chaque recommandation donne nom, raison, résultat attendu et **lien direct vers la vraie fiche**. Mention « en préparation / pas encore disponible à l'achat ».
5. Relance possible : nouveau besoin, six suggestions ou recommencer. Fermeture par bouton ou Escape.
6. Aucun message de vente ou d'achat actif, aucun paiement, aucune collecte de données.

## Mapping des besoins
| Intention détectée | Banque | Adresse |
|---|---|---|
| Rédiger un e-mail, un texte, un post, une newsletter | Rédaction & communication | /pack-redaction.html |
| Affiche, visuel, logo, bannière, graphisme | Design & visuels | /pack-visuel.html |
| Site vitrine, site web, landing page, prototype | Sites web & prototypes | /pack-sites-web.html |
| Vidéo, podcast, montage, audio, sous-titres | Vidéo & audio | /pack-video-audio.html |
| Automatiser, tâche répétitive, workflow | Première automatisation | /pack-automatisation.html |
| Comparer, recherche, étude, analyse, sources | Recherche & analyse | /pack-recherche-analyse.html |

## Critères de recette
| ID | Exigence | Preuve |
|---|---|---|
| BOT-01 | Un seul accès flottant visible, non intrusif, fermé par défaut | Chromium desktop/mobile |
| BOT-02 | Le guide est utilisable depuis l'accueil, Produit, les showrooms et les pages essentielles | Test des 13 pages |
| BOT-03 | Six catégories identifiables en français, accents/casse normalisés | 18 cas unitaires |
| BOT-04 | Demande mixte => 2 banques, pas un choix arbitraire | Tests unitaires |
| BOT-05 | Besoin vague => demander une précision, pas inventer un produit | Tests unitaires |
| BOT-06 | Boutons de choix sans saisie possible, saisie libre de 250 caractères maximum | Chromium + source |
| BOT-07 | Message utilisateur échappé en texte, aucune injection DOM | Unitaires + Chromium |
| BOT-08 | Aucune API, réseau, stockage local ou clé facturée | Revue du script |
| BOT-09 | Pas de précommande ni de produit déclaré disponible ; transparence sur les règles locales | Inspection et tests |
| BOT-10 | Sur mobile 320/390px, pas de débordement ; fermeture Escape et focus | QA Chromium |
| BOT-11 | Quitter le guide permet de reprendre la navigation du site, sans trap de scroll | QA navigateur |
| BOT-12 | Tester auprès de 3 clients débutants : comprendre l'objectif et accéder au bon produit sans aide | À réaliser physiquement |

## Limitations et prochaines améliorations
- Le classement par mots-clés reconnaît les intentions les plus courantes, mais pas toutes les nuances. Il ne doit jamais promettre d'analyse intelligente approfondie.
- La catégorie client (artisan, indépendant, commerce) ne suffit pas à déterminer un pack : la **tâche concrète** prime. Le chatbot demande une précision.
- Aucun enregistrement d'échanges. Cette version ne génère pas de leads ni de notifications.
- Une évolution vers un modèle IA externe requerrait l'accord préalable sur le fournisseur, les clés serveur, coûts, données, consentements et sécurité ; **aucun appel payant autorisé ici**.

## État du projet
La mise en place du chatbot n'ouvre ni ventes ni paiements. Les banques restent présentées comme des projets en préparation, sauf l'outil de rédaction de démonstration gratuit.
