# Chatbot d'orientation — fonctionnement multi-tours V1.6
Banque Outils IA · Cahier des charges, annexe I · 02 novembre 2026

## Problème détecté
La V1.5 traitait chaque question indépendamment. Exemple : « Je suis artisan → je veux plus de clients → comment faire ? » perdait le contexte. Un chatbot réellement utile à la découverte des banques doit reprendre la question posée, afficher des options claires et expliquer les recommandations.

## Conversation cible
- Message libre ou choix guidé ; aucune information personnelle obligatoire.
- Si le besoin est précis : proposer une ou deux banques adaptées, avec **pourquoi**, résultat visé, lien vers le véritable showroom et état de disponibilité.
- Si le besoin est vague : question ciblée pour la **visibilité** (site, messages, visuels), les **réseaux sociaux** (texte, visuel, vidéo) ou le **gain de temps** (automatisation, rédaction, analyse). Le visiteur peut choisir une suggestion ou répondre en texte libre.
- Garder uniquement en mémoire volatile le métier éventuellement indiqué, la dernière recommandation et le type de question en cours.
- Après la recommandation : répondre à « Pourquoi cette banque / ces produits ? », « Quel est le prix ? » puis permettre de choisir un autre besoin ou recommencer.
- Questions sur l'IA : répondre que c'est un **guide local à règles**, pas un modèle génératif connecté.
- Distinguer « Je veux ajouter un paiement à mon site » (besoin Web) et « Puis-je payer ce pack ? » (réponse : vente non ouverte).

## Sécurité, limites et coûts
Pas de clé API, abonnement IA, appel réseau, sauvegarde de messages, compte utilisateur, lead capture ni vente. Les réponses restent des recommandations fondées sur les règles du catalogue, pas une expertise juridique, commerciale ou un conseil humain. Une formulation non reconnue peut encore nécessiter un choix explicite ; ce n'est pas un LLM. Le bot ne doit inventer ni tarifs, ni disponibilité, ni contenu premium prêt à livrer.

## Recette
| ID | Test | État du test |
|---|---|---|
| BOT-V2-01 | « Je suis artisan » → demander le besoin, ne pas choisir au hasard | Automatisé |
| BOT-V2-02 | « Je veux attirer des clients » → trois possibilités de visibilité | Automatisé |
| BOT-V2-03 | « Gagner du temps » → question ciblée et trois options | Automatisé |
| BOT-V2-04 | Après clarification « Créer un site » → banque Web et lien réel | Automatisé |
| BOT-V2-05 | « Pourquoi cette banque ? » → explication de la recommandation précédente | Automatisé |
| BOT-V2-06 | « Quel prix ? » et « Est-ce gratuit ? » → pas de tarifs inventés | Automatisé |
| BOT-V2-07 | « Site avec paiement en ligne » → besoin Web, pas question de prix | Automatisé |
| BOT-V2-08 | Fenêtre à 320/390/1440 px, fermeture, reset, saisie, choix et absence de débordement | Chromium CI |
| BOT-V2-09 | Test accompagné avec au moins trois personnes novices, y compris sur téléphone physique | Non réalisé |

## Décisions
- L'outil reste offert en **démonstration gratuite** ; les six banques sont en préparation.
- Les échanges ne sont ni conservés ni utilisés en analyse comportementale.
- Évoluer vers une véritable IA générative nécessitera une architecture serveur protégeant les clés, la gestion des coûts et une autorisation explicite ; **pas d'activation ici**.
