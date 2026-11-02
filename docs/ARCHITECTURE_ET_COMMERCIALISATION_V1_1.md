# Annexe C — Architecture, commercialisation, conformité et économie
Banque Outils IA · V1.1 · 02/11/2026 · **Dossier de décision : aucune boutique activée, aucune dépense engagée**.

## C.1. Trois environnements distincts
**ENV-1 / Démonstrateur actuel** : dépôt GitHub public, site statique Pages et exemples gratuits. Fonction : valider visuellement les besoins et méthodes ; pas d'encaissement, pas de stockage de données client.
**ENV-2 / Fabrication privée** : Google Drive privé du projet et sauvegarde des guides originaux, modèles, captures autorisées, ZIP en préparation. Fonction : rédiger et tester avant mise à disposition ; accès réservé aux personnes autorisées.
**ENV-3 / Distribution commerciale future** : prestataire e-commerce / hébergement conforme à la vente, gestion des paiements, courriels transactionnels et liens d'accès aux fichiers. **Non configuré**.

### Contrainte bloquante : GitHub Pages
La documentation officielle GitHub Pages précise que le service n'est pas autorisé comme hébergement gratuit d'une activité principalement dirigée vers les transactions commerciales ou un SaaS commercial. Il ne faut donc **pas transformer le démonstrateur GitHub Pages en boutique de vente principale**. Prévoir une vitrine et un parcours d'achat sur une plateforme adaptée avant ouverture des ventes. Pas de paiement, mot de passe ou données bancaires saisis sur Pages.
Source : https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## C.2. Options d'hébergement et recommandation conditionnelle
| Option | Avantage | Limite / risque | Décision |
|---|---|---|---|
| Payhip + Store Builder / fichiers numériques | Peut héberger boutique, paiement externe et livraison de fichiers, sans développer de backend personnel | Compte vendeur, processeur de paiement, frais par vente, conformité, contraintes de marque et contrat à valider | **Candidat documentaire**, non configuré |
| Hébergement commercial + prestataire de paiement + stockage privé | Personnalisation complète UX et domaine | Coût ou quota potentiel, sécurité et webhooks à développer, support et exploitation | À étudier plus tard, budget soumis à accord |
| GitHub Pages comme vitrine de vente principale | Déjà fonctionnel pour la démonstration | Incompatible avec la limitation officielle sur la finalité commerciale principale | **Écarté pour l'e-commerce** |

Payhip indique au 02/11/2026 un plan Free Forever : **0 USD/mois + 5 % par transaction**, hors frais processeur ; Plus 29 USD/mois + 2 % ; Pro 99 USD/mois + 0 % de commission Payhip. Ce sont les prix publics affichés, pas des frais garantis pour le compte du projet. Réévaluer taxes et conditions avant toute décision.
Sources : https://payhip.com/pricing ; https://help.payhip.com/article/59-adding-a-digital-product

**Étape autorisée maintenant** : comparer documentation et préparer les fichiers en privé. **Étape nécessitant autorisation explicite** : création d'un compte marchand, connexion bancaire, acceptation de conditions, paiement réel/test ou souscription. Aucun abonnement n'est à activer implicitement.

## C.3. Événements et flux métier cibles (pour la plateforme de vente choisie)
### Parcours public
1. Page pack : résultat concret, contenu exact, aperçu, dépendances, prix TTC/HT selon cible, conditions.
2. Page checkout chez le fournisseur habilité : synthèse du panier, coordonnées nécessaires, paiement.
3. Transaction refusée : aucun droit délivré, message utile et aucune perte de données.
4. Transaction confirmée : commande identifiable, reçu / facture selon obligations et accès au fichier.
5. Téléchargement : lien unique/expirable si disponible, assistance sur problème et accès ultérieur selon contrat.
6. Support/rétractation/remboursement : canal réel, procédure documentée et historiques conformes.

### Invariants de sécurité si une implémentation sur mesure est finalement retenue
- Jamais faire confiance à une redirection « paiement réussi » en tant que preuve ; confirmer côté serveur et vérifier signature/fournisseur.
- Les événements d'achat doivent être idempotents : un doublon ne crée ni deux ventes ni deux droits.
- Ne jamais stocker des données bancaires ou identifiants de paiement dans des pages statiques.
- Une URL de ZIP public n'est pas une protection ; utiliser l'accès natif de la plateforme ou stockage privé avec contrôle serveur.
- Aucun achat d'un produit marqué indisponible ne doit être possible ; les données client et packs internes ne transitent pas en query string ou issues GitHub publiques.
- Rôles administrateur, accès minimal, 2FA lorsque disponible, sauvegarde, procédure de révocation des accès.

## C.4. Matrice des données (état actuel vs futur)
| Donnée | Aujourd'hui | Si la vente est activée | Exigence |
|---|---|---|---|
| Texte saisi dans outil gratuit | Traitement local en navigateur, aucune persistance volontaire | Ne pas collecter par défaut | Informer clairement et éviter scripts tiers sur l'outil |
| Recherche catalogue | Locale, filtrage en mémoire | Ne pas journaliser automatiquement | Aucune analyse comportementale sans décision documentée |
| Message de contact | Renvoi vers une issue GitHub publique, impropre aux prospects | Formulaire ou canal privé | Remplacer avant collecte, afficher les mentions d'information |
| Identité commande / e-mail | Absent | Traitement par vendeur et prestataire | Finalité, base légale, destinataires, durée, droits et sécurité |
| Reçu/facture | Absent | Transaction et justificatif | Conservation conforme au type de document et statut fiscal |
| Informations de paiement | Aucune | Traitées chez le prestataire adapté | Ne pas traiter ni stocker les cartes en propre |
| Fichier premium | Aucun livré | Hébergé privé ou dans plateforme marchande | Accès limité aux acheteurs autorisés |

Le registre RGPD final doit attribuer les rôles de responsable de traitement/sous-traitant selon les contrats réels, définir une durée par finalité, l'exercice des droits et la gestion des incidents. Source CNIL : https://www.cnil.fr/fr/passer-laction/rgpd-les-premieres-etapes

## C.5. Check-list juridique et confiance — blocage de mise en vente
- Identifier le **véritable vendeur** : forme juridique, SIREN, immatriculation applicable, nom commercial, coordonnées postales/e-mail, responsable publication et hébergeur.
- Mentions légales, CGV conformes à la clientèle effectivement visée (B2B ou B2C), prix, contenu, garanties légales, modalités d'exécution, livraison, mises à jour, support, recours et médiation lorsque requis.
- Pour le contenu numérique non fourni sur support matériel, vérifier les obligations de rétractation ; une exception ne doit pas être prétendue par défaut. La DGCCRF évoque notamment le commencement d'exécution avec **accord préalable exprès** et **renoncement exprès** du consommateur sous conditions légales.
- Vérifier TVA/territoires, justificatifs et rôle fiscal du fournisseur ; les fonctions « taxes gérées par le prestataire » ne remplacent pas l'analyse du statut vendeur.
- Protection des consommateurs : descriptif exact, pas de faux avis, pas de compte à rebours artificiel, pas de gains de temps garantis.
- E-mails de prospection : la CNIL distingue particuliers (consentement préalable en général) et professionnels (sous conditions, information et opposition gratuite si sollicitation liée à l'activité), avec identification de l'émetteur dans chaque message.
- RGPD : finalités, base légale, conservation, accès, droits, information au niveau du formulaire ; pas de case précochée à valeur de consentement.
- Licence : composants tiers (code, prompts achetés, illustrations, photos, vidéos, musiques, fonts et captures d'interface) évalués individuellement pour la redistribution commerciale.

Sources de vérification officielles, consultées pour ce cadrage :
- https://entreprendre.service-public.gouv.fr/vosdroits/F33527 (CGV)
- https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/le-contrat-un-accord-entre-des-parties-bien-informees-prealablement
- https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques/delais-de-reflexion-ou-de-retractation-comment-sappliquent-t-ils
- https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique
- https://www.cnil.fr/fr/rgpd-en-pratique-communiquer-en-ligne

**Interdiction de mise en vente** tant que cette matrice n'est pas vérifiée avec les informations réelles du vendeur. Ce document ne remplace pas un avis juridique ou fiscal individualisé.

## C.6. Tarification, validation de la demande et économies unitaires
La proposition historique de **29 EUR** pour un premier pack « automatiser son activité » est un **prix candidat de test**, pas un prix approuvé ni une vente observée. Ne pas le reporter automatiquement sur les six produits. Référence interne : « Business 02 — Plan de lancement Payhip V0.4 », daté du 15/10/2026 et conservé dans le Drive du projet.

### Grille de prix à remplir **après** étude utilisateur
| Variable | Description | État |
|---|---|---|
| p | Prix public de l'offre, devise, TTC/HT et marché | À arbitrer |
| t | Taxes effectivement dues / collectées | À confirmer avec conseiller fiscal et prestataire |
| c | Commission plateforme (par exemple Payhip Free 5 %) | Scénario indicatif, non contractuel |
| f | Frais de paiement et change | À vérifier pour le compte et l'acheteur |
| s | Coût de support variable, par commande | À estimer sur pilotes |
| r | Provision de remboursements/litiges | À mesurer, ne pas présumer zéro |
| a | Coût d'acquisition par vente | Non observé |
| n | Ventes payées réelles et nettes de remboursement | Aujourd'hui 0 mesuré dans le projet |

**Marge contributive estimative par vente** = prix encaissé attribuable au vendeur − taxes à reverser − commissions − paiement − support variable − remboursement estimé − coût d'acquisition attribuable. La commission 5 % de 29 EUR est **1,45 EUR** ; 27,55 EUR est seulement une différence arithmétique avant toutes les autres charges, pas un bénéfice.

### Protocole de validation proposé
- 10 entretiens exploratoires avec indépendants volontaires correspondant à la cible, sans envoyer d'e-mails non autorisés. Trois premières observations réelles d'utilisation du pack.
- Questions ouvertes d'abord : problème, solution actuelle, fréquence, coûts, résultat désiré, puis compréhension de l'offre et prix spontané.
- Montrer le produit réel plutôt qu'une promesse d'IA ; distinguer intention déclarée, demande de devis, achat effectif.
- Seuil pilote indicatif hérité du travail V0.4 : au moins 3/10 expriment une intention d'achat explicite et 2/10 un prix spontané d'au moins 29 EUR pour **le pack testé** ; petit échantillon non représentatif, signal qualitatif uniquement.
- Un refus ou incompréhension déclenche une révision de la proposition de valeur, pas un prix artificiellement baissé sans diagnostic.

## C.7. Décisions à obtenir avant vente (aucune n'est autorisée par défaut)
| Décision | Pourquoi indispensable | Responsable |
|---|---|---|
| Choix de l'entité vendeuse et du pays de facturation | Mentions, TVA, assurance, contrats | Propriétaire / expert |
| Choix du produit pilote et prix | Cohérence offre/besoin | Propriétaire après retours |
| Plateforme conforme + budget | GitHub Pages exclu de la boutique principale | Propriétaire |
| Coordonnées publiques et support | Droit du consommateur, confiance, données | Propriétaire |
| CGV/confidentialité/licences validées | Légalité, sécurité, traçabilité | Propriétaire + professionnel compétent |
| Test compte et paiement | Nécessite une identité et consentement explicite à l'action | Propriétaire |
| Publication du ZIP payant | Vérifier qu'il n'a aucune ressource sous droits non redistribuables | Propriétaire |

## C.8. Tests de recette commerce à réaliser uniquement après feu vert
- Achat accepté, refusé, double clic, double confirmation et paiement interrompu : statuts cohérents.
- Produit non disponible : checkout interdit, message exact.
- Paiement reçu : ZIP correct, checksum/manifest et reçu ; sans droit : téléchargement impossible.
- Lien expiré : canal de récupération ; mauvais achat : pas d'accès aux autres banques.
- Confirmation et SAV : aucune donnée bancaire exposée au vendeur et réponse privée aux réclamations.
- Règle de rétractation expliquée avant achat, consentements requis correctement captés et archivés.
- Test mobile + desktop en session déconnectée ; aucun événement de production non autorisé.

## C.9. Risques et arbitrages
| Risque | Impact | Mesure préventive |
|---|---|---|
| Boutique commerciale déployée sur Pages | Élevé | Plateforme commerciale dédiée avant ventes |
| Contenus tiers revendus sans droits | Élevé | Registre de licence, absence par défaut |
| Paiement sans livraison sécurisée | Critique | Tests checkout/entitlements et contrôle serveur ou prestataire |
| Faux gains de temps et résultats IA simulés | Élevé | Preuves, disclaimers et essais honnêtes |
| Contacts exposés publiquement | Élevé | Remplacer GitHub Issues par canal privé |
| Quotas/abonnements lancés involontairement | Élevé | Aucun abonnement, dépense ou automation sans accord |
| Multiplication de six packs superficiels | Élevé | Finir et tester un pack avant la suite |

## C.10. Statut effectif au 02/11/2026
Site démo et premier outil public : oui. Six showrooms : oui. Boutique, compte marchand, vente, tarification finale, livraison sécurisée, CGV et SAV opérationnels : **non**. Il n'existe aucun mandat pour les déclencher.
