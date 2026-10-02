import type { NoteTranslations } from "./types";

export const en: NoteTranslations = {
  "one-sign-in-many-apps": {
    title: "One sign-in for many apps",
    summary:
      "How The Circular Net's products moved onto a single OAuth 2.0 sign-in service, and the rules that keep it safe.",
    blocks: [
      {
        type: "p",
        text: "At The Circular Net, every product used to have its own login. That works with one app. With a web app, a mobile app, an events product and a marketing site, it means four places to fix every auth bug, and people juggling several passwords for one company.",
      },
      { type: "h", text: "The shape" },
      {
        type: "p",
        text: "Sign-in moved to its own app on its own domain. Products no longer show a login form. They send people to the SSO service with their client ID and a redirect URL; the service signs them in and sends them back with a short-lived code, which the product exchanges for tokens.",
      },
      { type: "diagram", id: "sso", caption: "Every product signs in through one service." },
      { type: "h", text: "Rules that matter" },
      {
        type: "list",
        items: [
          "Validate the client and the redirect URL against a registry, every time. A sign-in page that redirects anywhere is a phishing kit with your logo on it.",
          "Send a state value out and check it when the person comes back. It stops forged callbacks from signing someone in.",
          "Keep social providers behind the SSO. Products never talk to Google or Apple directly, so adding a provider is one change.",
          "Make the hand-off visible. A short “taking you back” page beats a blank redirect when something is slow.",
        ],
      },
      { type: "h", text: "Trade-offs" },
      {
        type: "p",
        text: "A separate service is one more thing to deploy and monitor, and every product depends on it. In exchange, auth fixes happen once, security reviews have one target, and a new product gets sign-in by registering a client instead of building a form.",
      },
      { type: "p", text: "If I did it again, I'd introduce SSO with the second product, not the fourth." },
    ],
  },
  "share-logic-not-screens": {
    title: "Share logic, not screens",
    summary:
      "What went into the shared package between Circular Ticket's Next.js and Expo apps, what stayed out, and why.",
    blocks: [
      {
        type: "p",
        text: "Circular Ticket started as a web app. When the mobile app arrived, the fastest path was to copy the API calls and rules across. Within weeks the two apps disagreed about small, important things: how to format a naira amount, which order statuses count as paid, when an organiser can request a payout.",
      },
      { type: "h", text: "One package, three rules" },
      {
        type: "p",
        text: "Both apps moved into an npm-workspaces monorepo with one shared package. It follows three rules:",
      },
      {
        type: "list",
        items: [
          "Share what has to agree: API services, query hooks, validation schemas, currency formatting, status mapping and business rules like payout eligibility.",
          "Don't share screens. Each app's interface stays native to its platform, so neither feels like a port of the other.",
          "No platform imports in shared code. If a module needs the DOM or a native API, it doesn't belong in the package.",
        ],
      },
      { type: "diagram", id: "circularTicket", caption: "Two apps, one shared package." },
      { type: "h", text: "The hard part is dependencies" },
      {
        type: "p",
        text: "The code moved easily. The versions didn't. React, TanStack Query and the validation library have to resolve to the same versions for both apps, and package hoisting behaves differently for Next.js and Metro. Versions are aligned in one place, and lockfile changes get checked in review.",
      },
      { type: "h", text: "Was it worth it?" },
      {
        type: "p",
        text: "Yes. A change to when a payout can be requested now happens in one file, and both apps get it. Web and mobile can't disagree about money any more, and that alone paid for the move.",
      },
    ],
  },
  "filter-before-you-think": {
    title: "Filter before you think",
    summary: "Designing Stock Bot, a scheduled LLM agent that reads the Nigerian stock market on a tiny budget.",
    blocks: [
      {
        type: "p",
        text: "Stock Bot is a small agent I'm building. Every day it finds stocks on the Nigerian Exchange that dropped, decides which drops look like opportunities, and sends me the shortlist on Telegram. The interesting part isn't the LLM. It's everything around it.",
      },
      { type: "h", text: "The pipeline" },
      { type: "diagram", id: "stockBot", caption: "A daily run, from schedule to report." },
      {
        type: "list",
        items: [
          "An EventBridge schedule starts a Lambda function once a day.",
          "The function scrapes the day's biggest losers instead of every listed company.",
          "For each one it checks five days of stored prices in DynamoDB, to confirm a real dip and not one noisy day.",
          "Only the survivors go to Gemini with a structured prompt, and the top picks go to Telegram.",
        ],
      },
      { type: "h", text: "Why filter first" },
      {
        type: "p",
        text: "LLM calls are the slowest and most expensive step, so they go last. Plain code removes most candidates for free, and the model only judges the handful worth judging. The same idea applies to any agent: let cheap, deterministic steps narrow the problem, and spend intelligence where it changes the answer.",
      },
      { type: "h", text: "Small packages, fewer surprises" },
      {
        type: "p",
        text: "My first version used pandas, which made the Lambda bundle too big to deploy without extra layers. Swapping it for a lightweight HTML parser removed the problem. Serverless rewards boring dependencies.",
      },
      {
        type: "p",
        text: "It's still in progress: the pipeline works locally and the deployment is being finalised. Next, I want to log every pick and measure the model's calls against what the market actually did.",
      },
    ],
  },
};
