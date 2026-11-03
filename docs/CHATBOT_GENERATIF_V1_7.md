# Chatbot IA générative — architecture et recette V1.7
Banque Outils IA · 03 novembre 2026 · Annexe J

## Objectif
Supprimer les réponses programmées par mots-clés du chatbot pour les remplacer par un véritable modèle de langage. Chaque question doit déclencher une génération à partir du prompt et de l'historique de la conversation.

## Architecture
Site GitHub Pages → widget Obscure Pop → API HTTPS sur Vercel Functions → AI Gateway (identifiants côté serveur uniquement) → modèle reflection/beam-free, affiché gratuit à la date de vérification. Un modèle gratuit ne signifie pas hébergement gratuit sans limite. Aucun modèle payant de secours n'est prévu.

## Comportement
- Réponses générées en français à partir du dialogue réel ; seules les invitations initiales de l'interface sont statiques.
- Maximum de deux banques recommandées ; toutes les URL issues d'une liste de six produits contrôlée côté serveur et navigateur.
- Les six packs ne sont pas encore en vente ; prix non fixés, aucune précommande.
- Le visiteur consent à transmettre son texte au fournisseur d'IA. Ne pas demander de données personnelles. Les messages sont conservés en mémoire de l'onglet, sans sauvegarde côté application ; le prestataire peut appliquer ses propres politiques.
- Si le modèle est indisponible, afficher une erreur véridique au lieu d'une fausse recommandation.
- API avec validation stricte des rôles, tailles, CORS, limite de requêtes par IP et par processus. Ces limites mémoire ne remplacent pas un plafond budgétaire solide.

## Recette V1.7
| ID | Résultat attendu |
|---|---|
| LLM-01 | Aucune liste de réponses préenregistrées utilisée pour répondre |
| LLM-02 | Envoi de chaque message avec le contexte limité au serveur |
| LLM-03 | Réponse libre et pertinente générée par modèle en français |
| LLM-04 | Liens uniquement vers les six produits réels |
| LLM-05 | Pas de prix ou date de vente inventés |
| LLM-06 | Consentement explicite avant appel fournisseur |
| LLM-07 | Indisponibilité annoncée, sans réponse locale trompeuse |
| LLM-08 | Tests Node : validation, origines, sorties, erreurs |
| LLM-09 | Tests navigateur simulant une API générative, sur mobile/ordinateur |
| LLM-10 | Vérification d'une vraie requête LLM sur la production |
| LLM-11 | Test cross-origin de GitHub Pages vers Vercel |
| LLM-12 | Revue humaine sur au moins trois débutants, non encore réalisée |

## Prérequis de production
Le site actuel est statique : une fonction serveur est nécessaire. Activer un budget ferme AI Gateway par projet et un mécanisme anti-abus durable avant une forte fréquentation. Vérifier les politiques de conservation du fournisseur. Ne pas engager d'achats de crédits ou de recharge automatique. Ne pas annoncer un chatbot IA en ligne avant un échange réel validé.

## État d'activation au 03/11/2026
Le test Vercel réel sur déploiement protégé a renvoyé HTTP 403 avec le code customer_verification_required : Vercel exige une carte bancaire pour activer même les crédits gratuits AI Gateway. Aucun moyen de paiement n'a été ajouté. L'API comporte donc une porte de sécurité BANQUE_CHAT_ENABLED désactivée par défaut. Elle ne peut répondre avec un LLM tant que l'utilisateur n'a pas validé le fournisseur et que ce paramètre n'a pas été activé. La fonction utilise le header runtime x-vercel-oidc-token de Vercel (plutôt qu'une variable d'environnement absente) lorsque l'activation sera autorisée. Les coûts potentiels du modèle/hébergement nécessitent un plafond budgétaire.
