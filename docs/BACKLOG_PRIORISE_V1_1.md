# Annexe D — Backlog d'exécution et critères de passage des lots
Banque Outils IA · V1.1 · 02/11/2026. Référentiel de pilotage rattaché au cahier des charges principal.

## D.1. Légende (anti-faux-avancement)
- **Vérifié** = preuves techniques consultées (SHA, workflow, capture/rapport ou test) sur le périmètre exact.
- **Partiel** = une partie est livrée mais le critère final n'est pas rempli.
- **Documenté** = les instructions/spécifications existent, pas le produit opérationnel.
- **À faire** = ni produit ni preuve complète. **Bloqué** = dépend d'une décision, d'une ressource réelle ou d'un contrôle.
- **P0** nécessaire à la qualité/sécurité du lot immédiatement prioritaire ; **P1** avant vente ; **P2** amélioration après preuve de valeur.
- Taille **S/M/L** = estimation comparative, jamais délai contractuel, coût ni consommation de quota.

## D.2. Référence technique actuelle
- Main à l'ouverture de ce document : d1f86439cfff5bf85a652241357c915481ba2654 (fusion PR #9 du 02/11/2026).
- Workflow Node « Verify public preview » : **success** sur ce SHA.
- « Verify live website after deployment » : **success** sur ce SHA, contrôles Chromium bureau/mobile du HTML et des interactions du héros.
- « pages build and deployment » : **success** sur ce SHA.
- Workflow QA navigateur de PR : **success** sur SHA 208fe4d4611a5deafd04d88f41085352d7683512.
- Aucune preuve de tests physiques sur iOS/Android, de consultation réellement indépendante ni de qualité éditoriale finale du premier outil.
- Outil public : /outils/assistant-messages.html ; 12 modèles + trois cas de rédaction en **brouillon privé** Drive. Les cinq autres outils de banque n'existent pas encore comme produits complets.

## D.3. Backlog priorisé — livrables et critères concrets

### Lot L0 — fiabilité du socle et premier outil
| ID | Priorité / taille | Tâche | Critère de réussite | Preuve / état |
|---|---|---|---|---|
| SOC-01 | P0/S | Tests Node cohérents avec Obscure Pop | Catalogue, 5 cartes, 6 showrooms, menu et outil testés | **Vérifié automatiquement**, PR #9 |
| SOC-02 | P0/M | QA navigateur responsive sur site courant | Rendu + parcours desktop/mobile automatisés | **Vérifié en CI**, vrai appareil à faire |
| SOC-03 | P0/S | Vérifier livraison main→Pages | SHA public conforme, build et HTTP/interaction vérifiés | **Vérifié** pour SHA d1f86439 |
| SOC-04 | P0/M | Revue manuelle iOS/Android + clavier | 320/390/768/1440, Safari iOS/Chrome Android, focus, overflow, animations | **À faire** |
| SOC-05 | P0/M | Audit temps de chargement et accessibilité | Mesures lab/terrain si possibles, anomalies priorisées | **À faire** |
| R-01 | P0/S | Outil de rédaction local public | 3 canaux, 3 tons, copie/export, champs validés, aucune API | **Vérifié automatiquement** ; qualité à approfondir |
| R-02 | P0/M | Corriger qualité grammaticale du moteur | 20 entrées fictives couvrant articles, élisions, pronoms, ponctuation | **À faire** |
| R-03 | P0/M | Recette de novices | 3 indépendants sans aide obtiennent un résultat pertinent et expliquent ses limites | **À faire**, dépend de R-02 |
| R-04 | P0/M | Inventaire des 12 modèles privés | Chaque modèle a usage, champs, exemple et contrôle, aucun fait inventé | **Partiel** : brouillon Drive |
| R-05 | P0/M | Trois cas pratiques finalisés | Contexte→entrée→brouillon→relecture→sortie pour chacun | **Partiel** : cas fictifs brouillons |

### Lot L1 — banque Rédaction finie et valeur démontrée
| ID | Priorité / taille | Tâche | Critère de réussite | État |
|---|---|---|---|---|
| R-06 | P0/M | Guide réellement pédagogique | Méthode explicite + instructions bureau/mobile, captures autorisées | À faire |
| R-07 | P0/S | Checklist métier, prospection et confidentialité | Peut être remplie sans logiciel externe | À faire |
| R-08 | P0/M | Empaqueter ZIP privé v1 | 8 composants STD-01..08, inventaire, checksum, version et guide | À faire ; dépend R-02..07 |
| R-09 | P0/M | Recette ZIP hors contexte GitHub | Ouvrir le ZIP sur deux OS et mobile, exports et instructions conformes | À faire |
| R-10 | P1/M | 5 entretiens sur valeur et prix | Transcription anonymisée, objections, demande et scénarios réels | À faire, sous réserves RGPD |
| R-11 | P1/S | Fiche produit véridique | Une phrase de valeur, fichiers réels, limites et coûts explicités | À faire ; après ZIP |
| LIC-01 | P0/M | Registre droits du pack pilote | Pour chaque asset origine/licence/redistribution/notice | À faire ; bloque vente |

### Lot L2 — industrialisation des cinq autres banques
| ID | Priorité / taille | Tâche | Critère de réussite | État |
|---|---|---|---|---|
| W-01 | P1/L | Outil Cadrage Site | Arborescence export Markdown et prototype HTML local accessible | Spécifié, non réalisé |
| W-02 | P1/M | 10 gabarits + 3 cas Sites | Cas complets, zéro faux avis / zéro secret | Spécifié |
| A-01 | P1/L | Cartographe et simulateur de flux | Branches approbation/refus/doublon/erreur, zéro action réelle | Spécifié |
| A-02 | P1/M | 10 workflows pédagogiques + 3 cas | Dépendances et coûts tiers indiqués | Spécifié |
| V-01 | P1/L | Brief visuel + gabarits éditables | Export original, mobile, droits image/police vérifiés | Spécifié |
| V-02 | P1/M | 10 modèles + 3 cas Visuel | Variantes accessibles, pas de ressource sans licence | Spécifié |
| M-01 | P1/L | Storyboard audio/vidéo local | CSV/TXT, durées cohérentes, aucun asset sans autorisation | Spécifié |
| M-02 | P1/M | 10 scripts + 3 cas Médias | Modes 15/30/60 sec, droits et sous-titres | Spécifié |
| Q-01 | P1/L | Matrice sources et comparaison | CSV/MD, date/auteur/incertitude, alerte contradiction | Spécifié |
| Q-02 | P1/M | 10 modèles + 3 cas Recherche | Aucune source fictive présentée comme factuelle | Spécifié |

**Règle d'arbitrage** : aucun outil d'une banque suivante n'est déclaré « terminé » tant que les cas d'erreur, formats d'export, modèles et guide ne sont pas vérifiés. Les ordres de lots sont une proposition de dépendances, pas une activation automatique.

### Lot L3 — préparation commerciale / décision propriétaire obligatoire
| ID | Priorité / taille | Tâche | Critère de réussite | État |
|---|---|---|---|---|
| MKT-01 | P0/M | Contact privé sans GitHub | Formulaire professionnel fiable et mentions RGPD | Bloqué : canal cible à choisir |
| MKT-02 | P0/M | Plateforme e-commerce compatible | Hébergement principal hors GitHub Pages, coûts et contrat validés | Bloqué : choix/autorisation |
| LEG-01 | P0/L | Identité vendeur, mentions légales, CGV, rétractation | Documents avec informations réelles et revue professionnelle | Bloqué : données réelles |
| LEG-02 | P0/M | RGPD et sous-traitants | Registre finalités, durées, droits, DPA/prestataires selon le cas | Bloqué |
| LEG-03 | P0/M | Fiscalité/taxes/factures | Mécanique TVA/recettes et justificatifs validée par expert compétent | Bloqué |
| BIZ-01 | P1/M | Tarification pilote | Prix, devise, frais, support, acquisition et retour marché documentés | Prix 29 EUR = hypothèse historique |
| PAY-01 | P0/L | Checkout, refus, reçu, remboursements | Tests B2C/B2B et erreurs, traitement par fournisseur adapté | Interdit sans autorisation |
| DEL-01 | P0/L | Livraison numérique sécurisée | Paiement confirmé, accès autorisé, pas de ZIP public, récupération | Interdit sans autorisation |
| SUP-01 | P1/M | Support acheteur | Canal privé, FAQ et procédure de résolution | À faire |

### Lot L4 — améliorations uniquement si pilote concluant
| ID | Priorité / taille | Tâche | Critère de réussite | État |
|---|---|---|---|---|
| DATA-01 | P2/M | Tableau de pilotage commercial | Intérêts qualifiés, commandes réelles, coûts, qualité support | À faire |
| UX-02 | P2/M | Améliorer onboarding guidé | Tests novices et preuve d'amélioration, sans surcharge | À faire |
| PROD-07 | P2/L | Révisions des autres packs | Feedback utilisateur et corrections avant multiplication des produits | À faire |

## D.4. Chemin critique et séquence recommandée
1. **Sans dépendance externe** : SOC-04, SOC-05, R-02, R-04, R-05, R-06, R-07, LIC-01.
2. **Avant test pack** : R-08, R-09, R-03 ; documenter les erreurs, ne pas promettre la commercialisation.
3. **Avant décision de vente** : R-10 et R-11 ; les entrevues ont pour finalité la validation du besoin, pas une collecte massive.
4. **Sous accord explicite du propriétaire** : MKT-01, MKT-02, LEG-01..03, BIZ-01, PAY-01, DEL-01 et SUP-01. Aucune étape ne doit déclencher un paiement ni relancer d'automatisation.
5. **Ensuite seulement** : W-01/A-01 et les autres produits, en réutilisant le socle commun.

## D.5. Portes de qualité (release gates)
| Porte | Contenu | Condition de passage |
|---|---|---|
| G0 Spécifié | User stories, entrées/sorties, critères et contraintes | Relecture ; aucune exigence contradictoire |
| G1 Développé | Fichiers présents sur branche dédiée, pas de secret | Build et revue source |
| G2 Testé | Node + Chromium, cas limites + contrôle humain | Contrôles pertinents PASS |
| G3 Publié (démo) | Fusion main, build Pages, URL et rendu vérifiés | SHA réel + HTTP + parcours |
| G4 Accepté (produit) | ZIP complet privé, droits, novices et documentation | 3 tests + licence + checklist |
| G5 Commercialisable | Hébergement compatible, identité, droit, prix, paiement et livraison | Feu vert explicite et tests bout en bout |

**G2/G3 ne signifient jamais G4/G5.** Le site peut fonctionner parfaitement sans qu'une banque soit achetable.

## D.6. Registre de décisions (ne pas prendre à la place du propriétaire)
| Référence | Choix | État |
|---|---|---|
| DEC-01 | Obscure Pop / jaune atténué / cinq cartes hover / menu 3 entrées | Validé historiquement |
| DEC-02 | Showroom 01 comme famille visuelle de pages | Validé historiquement |
| DEC-03 | Six banques initiales | Retenues |
| DEC-04 | Prix commercial définitif | **Non décidé** |
| DEC-05 | Marchand / plateforme de vente et localisation de la boutique | **Non décidé** |
| DEC-06 | Coordonnées contact/support et identité vendeur | **Non renseignées** |
| DEC-07 | Dépenses, quota Work/Codex, relance d'automatisations | **Non autorisés** |
| DEC-08 | Périmètre de mises à jour gratuites / licence d'utilisation des packs | **Non décidé** |

## D.7. Journal de changement
- 02/11/2026 v1.1 : exigences fonctionnelles A, produit B, architecture commerciale C, backlog D. Pas de changement du site dans ce lot de documentation.
- Référence technique conservée : PR #9 et SHA d1f86439.
- Prochaine réalisation prioritaire après ces spécifications : améliorer le français de l'outil Rédaction, finaliser la banque 01 et tester auprès d'indépendants.
