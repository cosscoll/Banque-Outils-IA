# Annexe E — Dossier d'exécution et recette du pack Rédaction
Banque Outils IA · Cahier des charges V1.2 · 02/11/2026
**Objet** : transformer la banque 01 en produit numérique autonome, utile à un indépendant débutant, traçable et testable sans dépendance payante.
**État réel** : outil de démonstration public ; contenus pédagogiques en cours ; **aucun pack final ni vente**.

## E.1. Objectifs et non-objectifs
Le client doit pouvoir, seul, transformer une offre réelle en un brouillon de texte contrôlable pour une utilisation professionnelle. Le résultat est une **aide à la rédaction**, pas un contenu automatiquement exact ou légal, ni un service d'envoi ou de publication. Une banque ne se résume pas à des listes de prompts ou à des liens vers des abonnements tiers.

### Scénarios fonctionnels à valider
- U1 : artisan local annonce un nouveau service et exporte un e-mail.
- U2 : commerçant crée un post non trompeur et le personnalise.
- U3 : indépendant prépare une présentation courte pour son site web.
- U4 : utilisateur novice suit le guide sans comprendre les termes « prompt », « API », « LLM ».
- U5 : utilisateur ayant des données clients comprend ce qu'il ne doit **pas** coller dans un service externe ; l'outil public ne transmet pas les champs.
- U6 : utilisateur coupe le réseau après chargement et poursuit rédaction, édition, copie et export.

### Fonctions explicitement exclues du MVP
Envoi d'e-mails, diffusion sociale, publication automatisée, récupération d'un carnet d'adresses, collecte de leads, connexion à un modèle génératif, comptes utilisateurs, paiement, stockage cloud des brouillons. Toute introduction ultérieure exige consentement et validation des coûts/sécurité.

## E.2. Contrat fonctionnel précis de l'outil gratuit (R-01/R-02)
| ID | Champ / comportement | Contrat d'entrée | Attendu |
|---|---|---|---|
| RQ-01 | Activité | Texte 1–80 caractères, après trim | Mention du nom inchangée dans le brouillon |
| RQ-02 | Public | 1–110, sans espace seul | Conserver le public tel que saisi ; ne pas rajouter « à les » |
| RQ-03 | Offre | 1–160, sans espace seul | Reprise exacte dans une section dédiée |
| RQ-04 | Bénéfice | 1–160, factuel et vérifié par l'utilisateur | Aucune statistique ou preuve inventée |
| RQ-05 | CTA | 1–160 | Conserver une question finale, ne pas ajouter « .. » ou « ?. » |
| RQ-06 | Canal | email, post ou web | Contenu distinct, sortie non vide |
| RQ-07 | Ton | pro, chaleureux, direct | Variation explicite sans changer les faits fournis |
| RQ-08 | Validation | Browser required + trim et choix autorisés | Entrée vide / espaces rejetée sans nouvelle sortie |
| RQ-09 | Édition | Zone textarea après génération | L'utilisateur peut réécrire librement le résultat |
| RQ-10 | Copier | Clipboard API, sinon sélection manuelle | Copie du texte **édité**, aucune recopie de valeurs obsolètes |
| RQ-11 | Exporter | UTF-8, MIME text/plain, extension .txt | Télécharger exactement le texte édité, accents compris |
| RQ-12 | Réinitialiser | Bouton form reset | Exemple restauré, sortie vidée, copie/export désactivés |
| RQ-13 | Changement de saisie | Champs modifiés après génération | Indiquer que le brouillon doit être recalculé |
| RQ-14 | Texte effacé | Textarea vidé | Copier et exporter désactivés |
| RQ-15 | Réseau | Aucun fetch, POST, stockage ou SDK IA | Aucune entrée envoyée ni conservée par l'outil |
| RQ-16 | Transparence | Texte visible « générateur de modèles » | Pas de promesse « IA en direct » |
| RQ-17 | Accessibilité | Labels, aria-live, tabulation | Compréhensible au clavier, messages d'erreur annoncés |
| RQ-18 | Mobiles | 320–390 px, boutons ≥44 px visés | Tous les champs/contrôles accessibles |
| RQ-19 | Reduced-motion | Respect OS | Aucune transition indispensable au parcours |
| RQ-20 | Exports | Aucun PDF généré ni email envoyé sans fonction réelle | Ne promettre que TXT/copier |
| RQ-21 | Français | Articles de la cible et accord délicats | Utiliser des champs explicitement libellés plutôt que des concaténations risquées |
| RQ-22 | Données longues | Limites HTML et pas d'overflow | Le texte s'affiche sans masquer le CTA |
| RQ-23 | Résilience | Clipboard API indisponible | Sélection manuelle possible |
| RQ-24 | Relecture | Checklist factuelle/marketing | Aucune publication automatique possible |

**Attention** : ces exigences sont un objectif de recette. Une réussite automatisée n'atteste pas la qualité stylistique ni l'ergonomie sur téléphone physique.

## E.3. Matrice des tests (à joindre au rapport de recette)
| Test | Jeu | Vérifier | Preuve attendue |
|---|---|---|---|
| RT-01 | Papeterie/les commerces/un atelier | E-mail pro, ton et structure | Node + Chromium |
| RT-02 | Artisan/des associations/une rénovation | Post chaleureux sans « à des » | Node + relecture |
| RT-03 | Cabinet/les indépendants/un accompagnement | Page web directe et CTA inchangé | Node |
| RT-04 | 20 jeux sectoriels × 3 canaux × 3 tons | 180 sorties cohérentes, tous champs présents | Node, statut CI |
| RT-05 | Bénéfice final « ? », CTA final « ! » | Pas de ponctuation dupliquée | Node |
| RT-06 | Activité et audience avec apostrophes | Caractères préservés | Node |
| RT-07 | Entrée «  » / espaces seulement | Rejet, pas de sortie validée | Node + navigateur |
| RT-08 | Éditer un résultat puis copier | Clipboard prend la version éditée | Node + navigateur |
| RT-09 | Effacer le résultat | Boutons désactivés | Node |
| RT-10 | Export UTF-8 avec « é », « œ », « € » | Fichier relisible à l'identique | Navigateur |
| RT-11 | Clipboard non disponible | Texte sélectionné, explication Ctrl+C | Node/navigateur |
| RT-12 | Reset après édition | Texte vide, boutons désactivés | Node/navigateur |
| RT-13 | Réseau bloqué après chargement | Génération toujours possible | Test navigateur |
| RT-14 | Chrome Android tactile | Toute fonctionnalité atteignable | **Appareil réel non testé** |
| RT-15 | Safari iOS tactile | Édition/copie/export accessibles | **Appareil réel non testé** |
| RT-16 | Focus clavier et reduced motion | Focus visible, aucun piège clavier | Test manuel |
| RT-17 | Texte très long aux maxlength | Sortie non tronquée et pas de débordement | Navigateur |

## E.4. Guide pédagogique client à produire et vérifier (R-06)
Sections exactes :
1. **Ce que vous allez obtenir** : e-mail, post ou texte de page, en quelques étapes ; sans garantie de gain de temps.
2. **Avant de commencer** : activité réelle, offre vérifiée, public, bénéfice factuel, action réalisable. Prévoir des coordonnées fiables mais ne pas coller d'informations clients dans un service tiers.
3. **Choisir le canal** : pourquoi e-mail ≠ publication ≠ page web, longueur indicatives non obligatoires.
4. **Choisir le ton** : professionnel, chaleureux, direct ; aucun ton ne crée une preuve.
5. **Générer et corriger** : remplir, lancer, relire la logique, modifier le texte librement.
6. **Vérifier les faits** : prix, délais, garantie, preuve, adresse, consentement marketing et droit d'image.
7. **Copier / exporter** : utiliser les fonctions locales, savoir où retrouver un TXT et l'ouvrir sur téléphone.
8. **Trois exemples réels mais fictifs** : artisan, commerce, consultant ; entrée → texte initial → corrections → version finale.
9. **Limites** : il ne prospecte pas, ne publie pas, ne fait pas de recherche et n'a pas de connexion IA.
10. **Dépannage** : boutons inactifs si aucun brouillon, accès presse-papiers refusé, fichier enregistré dans Téléchargements, retour à l'exemple.

**Critère pédagogique** : une personne n'ayant pas assisté au développement réussit U1 ou U2 sans explication supplémentaire. Prendre note des blocages, sans inventer de temps gagné.

## E.5. Contrat du contenu premium (STD-01…08)
| ID | Livrable client | Format / quantité | État au 02/11 |
|---|---|---|---|
| STD-01 | Lisez-moi / prise en main | PDF + TXT, 1 | À finaliser |
| STD-02 | Outil autonome | HTML/CSS/JS packagé, 1 | Prototype public ; version ZIP privée à faire |
| STD-03 | Guide pas-à-pas | PDF + HTML/MD, 1 | Plan complet rédigé ; fichier privé à produire |
| STD-04 | Modèles originaux | 12 modèles, TXT/MD | Brouillon Drive privé, à revoir |
| STD-05 | Exemples guidés | 3 dossiers complets fictifs | Brouillons Drive privés, à illustrer/corriger |
| STD-06 | Checklist | TXT + PDF | Contenu à rédiger et faire relire |
| STD-07 | Notices de droit | LICENCES/NOTICE, provenance détaillée | À vérifier |
| STD-08 | SUPPORT + CHANGELOG + MANIFESTE | TXT, version/hachages | À produire avant vente |

Le ZIP premium **ne doit jamais** être placé dans GitHub Pages, même avec une URL non indexée.

## E.6. Validation par trois utilisateurs débutants (R-03)
**Recrutement** : trois indépendants/acteurs TPE volontaires, non impliqués dans la conception et sans accès aux données clients. Ne recueillir que des données anonymisées nécessaires, avec information préalable.

**Protocole** (sans indicateurs inventés) :
- Donner l'objectif « Préparez un message sur un nouveau service fictif, puis exportez-le » sans indiquer les boutons.
- Observer : choix du canal, ton, remplissage, génération, compréhension du caractère non IA, correction d'une phrase, copie ou TXT.
- Demander « Quelle information devez-vous vérifier avant de publier ? » ; l'utilisateur doit citer au moins une donnée factuelle à contrôler.
- Enregistrer dans une grille : participant P01–P03, support/navigateur, tâche réussie oui/non, erreurs, incompréhensions, aide éventuelle, correction envisagée, nouvelle tentative.
- Condition d'acceptation proposée : **3/3** terminent le scénario sans aide humaine directe, aucune confusion sur « IA réelle » et aucune exposition de données personnelles. Sinon corriger et retester.

**Preuves** : anonymisées, sans nom, e-mail, photo ni enregistrement audio imposé.

## E.7. Préparation du ZIP privé et sécurité
- Conserver les modèles premium uniquement dans le dossier Drive privé du projet ou un stockage strictement contrôlé.
- Préparer un ZIP **hors dépôt public**, incluant les fichiers dont la licence de distribution est validée ; contrôler son manifeste, un SHA256 et une extraction à blanc.
- Tester hors ligne, dans un dossier quelconque, et sur système n'ayant pas de serveur ou d'outils de développement.
- Fichiers sans API key, tokens, liens signés réutilisables, données personnelles ou dépendance externe imprévue.
- La **licence commerciale et les conditions de mise à jour** devront être validées avant de promettre une utilisation ou redistribution précise au client.
- Vérifier aussi tous les composants annexes : polices, photos, icônes, captures et scripts externes.

## E.8. Registre de défauts à fermer
| ID | Défaut / risque | Traitement | Statut |
|---|---|---|---|
| DEF-R-01 | « à les commerces », autres articles maladroits | Sections de champs plutôt que concaténation | Corrigé dans prototype V2, relecture humaine encore à faire |
| DEF-R-02 | Résultat non éditable dans la page | Retirer readonly, copier/exporter texte modifié | Corrigé dans prototype V2, QA à confirmer |
| DEF-R-03 | CTA avec ponctuation « ?. » | Ne pas doubler les fins de phrase | Code V2, QA à confirmer |
| DEF-R-04 | Spécimens 20 secteurs × 9 combinaisons | Test automatisé fonctionnel | Code V2, QA à confirmer |
| DEF-R-05 | Grammaire variée et style commercial | Validation éditoriale humaine | Ouvert |
| DEF-R-06 | Usagers novices et Safari/iOS | Protocole utilisateur + appareil réel | Ouvert |
| DEF-R-07 | Package, licences et support | Manifeste, preuves, ZIP privé | Ouvert |

## E.9. Dépendances et ordre de réalisation
**P0-1** fermer DEF-R-01 à 04 avec preuves CI + recette navigateur ; **P0-2** finaliser le guide et les cas, puis relecture qualité ; **P0-3** assembler les fichiers dans Drive privé ; **P0-4** tests novices et vrais appareils ; **P0-5** audit de licence et manifeste ; **P1** étude de prix et vente future, seulement après approbation.

**Décisions en attente** : licence client, durée du support, politique des mises à jour, hébergement commercial et prix. Ces questions n'empêchent pas de construire un pack privé vérifiable.
