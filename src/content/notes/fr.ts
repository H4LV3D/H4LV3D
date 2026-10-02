import type { NoteTranslations } from "./types";

export const fr: NoteTranslations = {
  "one-sign-in-many-apps": {
    title: "Une seule connexion pour plusieurs apps",
    summary:
      "Comment les produits de The Circular Net sont passés à un service de connexion unique en OAuth 2.0, et les règles qui le gardent sûr.",
    blocks: [
      {
        type: "p",
        text: "Chez The Circular Net, chaque produit avait sa propre connexion. Avec une seule app, ça tient. Avec une app web, une app mobile, un produit d'événements et un site vitrine, cela fait quatre endroits où corriger chaque bug d'authentification, et des gens qui jonglent avec plusieurs mots de passe pour une même entreprise.",
      },
      { type: "h", text: "La forme" },
      {
        type: "p",
        text: "La connexion est devenue une app à part, sur son propre domaine. Les produits n'affichent plus de formulaire de connexion. Ils envoient les gens vers le service SSO avec leur identifiant client et une URL de redirection ; le service les connecte puis les renvoie avec un code de courte durée, que le produit échange contre des jetons.",
      },
      { type: "diagram", id: "sso", caption: "Tous les produits se connectent via un seul service." },
      { type: "h", text: "Les règles qui comptent" },
      {
        type: "list",
        items: [
          "Valider le client et l'URL de redirection contre un registre, à chaque fois. Une page de connexion qui redirige n'importe où, c'est un kit d'hameçonnage avec votre logo.",
          "Envoyer une valeur d'état et la vérifier au retour. Cela empêche un faux retour de connecter quelqu'un.",
          "Garder les fournisseurs sociaux derrière le SSO. Les produits ne parlent jamais directement à Google ou Apple : ajouter un fournisseur, c'est une seule modification.",
          "Rendre la transition visible. Une courte page « on vous ramène » vaut mieux qu'une redirection blanche quand quelque chose est lent.",
        ],
      },
      { type: "h", text: "Les compromis" },
      {
        type: "p",
        text: "Un service séparé, c'est une chose de plus à déployer et à surveiller, et tous les produits en dépendent. En échange, les correctifs d'authentification se font une fois, les revues de sécurité ont une seule cible, et un nouveau produit obtient la connexion en enregistrant un client au lieu de construire un formulaire.",
      },
      { type: "p", text: "Si c'était à refaire, j'introduirais le SSO dès le deuxième produit, pas au quatrième." },
    ],
  },
  "share-logic-not-screens": {
    title: "Partager la logique, pas les écrans",
    summary:
      "Ce qui est entré dans le paquet partagé entre les apps Next.js et Expo de Circular Ticket, ce qui en est resté dehors, et pourquoi.",
    blocks: [
      {
        type: "p",
        text: "Circular Ticket a commencé comme une app web. À l'arrivée de l'app mobile, le plus rapide était de recopier les appels d'API et les règles. En quelques semaines, les deux apps divergeaient sur de petites choses importantes : comment formater un montant en nairas, quels statuts de commande comptent comme payés, quand un organisateur peut demander un versement.",
      },
      { type: "h", text: "Un paquet, trois règles" },
      {
        type: "p",
        text: "Les deux apps sont passées dans un monorepo npm workspaces avec un seul paquet partagé. Il suit trois règles :",
      },
      {
        type: "list",
        items: [
          "Partager ce qui doit concorder : services d'API, hooks de requêtes, schémas de validation, formatage des montants, correspondance des statuts et règles métier comme l'éligibilité aux versements.",
          "Ne pas partager les écrans. L'interface de chaque app reste native à sa plateforme : aucune ne ressemble à un portage de l'autre.",
          "Aucun import spécifique à une plateforme dans le code partagé. Un module qui a besoin du DOM ou d'une API native n'a pas sa place dans le paquet.",
        ],
      },
      { type: "diagram", id: "circularTicket", caption: "Deux apps, un paquet partagé." },
      { type: "h", text: "Le plus dur, ce sont les dépendances" },
      {
        type: "p",
        text: "Le code a bougé facilement. Les versions, non. React, TanStack Query et la bibliothèque de validation doivent se résoudre aux mêmes versions pour les deux apps, et le hoisting des paquets ne se comporte pas pareil pour Next.js et Metro. Les versions sont alignées à un seul endroit, et les changements de lockfile sont vérifiés en revue.",
      },
      { type: "h", text: "Est-ce que ça valait le coup ?" },
      {
        type: "p",
        text: "Oui. Changer le moment où un versement peut être demandé se fait désormais dans un seul fichier, et les deux apps en profitent. Web et mobile ne peuvent plus diverger sur l'argent, et cela seul a justifié le déménagement.",
      },
    ],
  },
  "filter-before-you-think": {
    title: "Filtrer avant de réfléchir",
    summary: "La conception de Stock Bot, un agent LLM planifié qui lit la bourse nigériane avec un tout petit budget.",
    blocks: [
      {
        type: "p",
        text: "Stock Bot est un petit agent en cours de construction. Chaque jour, il repère les titres de la bourse nigériane qui ont baissé, décide quelles baisses ressemblent à des opportunités et m'envoie la sélection sur Telegram. Le plus intéressant, ce n'est pas le LLM, c'est tout ce qu'il y a autour.",
      },
      { type: "h", text: "Le pipeline" },
      { type: "diagram", id: "stockBot", caption: "Une exécution quotidienne, du planning au rapport." },
      {
        type: "list",
        items: [
          "Une planification EventBridge lance une fonction Lambda une fois par jour.",
          "La fonction récupère les plus fortes baisses du jour plutôt que toutes les sociétés cotées.",
          "Pour chacune, elle vérifie cinq jours de cours stockés dans DynamoDB, pour confirmer une vraie baisse et pas une seule journée agitée.",
          "Seuls les titres restants partent vers Gemini avec un prompt structuré, et les meilleurs choix arrivent sur Telegram.",
        ],
      },
      { type: "h", text: "Pourquoi filtrer d'abord" },
      {
        type: "p",
        text: "Les appels au LLM sont l'étape la plus lente et la plus chère, donc ils arrivent en dernier. Du code simple élimine gratuitement la plupart des candidats, et le modèle ne juge que la poignée qui mérite de l'être. L'idée vaut pour n'importe quel agent : laisser des étapes déterministes et bon marché réduire le problème, et dépenser l'intelligence là où elle change la réponse.",
      },
      { type: "h", text: "Des paquets légers, moins de surprises" },
      {
        type: "p",
        text: "Ma première version utilisait pandas, ce qui rendait le paquet Lambda trop lourd à déployer sans couches supplémentaires. Le remplacer par un parseur HTML léger a réglé le problème. Le serverless récompense les dépendances ennuyeuses.",
      },
      {
        type: "p",
        text: "C'est encore en cours : le pipeline fonctionne en local et le déploiement est en voie de finalisation. Prochaine étape : enregistrer chaque choix et comparer les jugements du modèle à ce que le marché a réellement fait.",
      },
    ],
  },
};
