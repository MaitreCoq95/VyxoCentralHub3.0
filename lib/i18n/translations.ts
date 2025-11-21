export type Language = "en" | "fr"

export type TranslationKeys = keyof typeof translations.en

export const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.clients": "Clients",
    "nav.audits": "Audits",
    "nav.documents": "Documents",
    "nav.ai": "Vyxo Society",
    "nav.settings": "Settings",
    "nav.search": "Search...",

    // Dashboard
    "dash.welcome": "Welcome back,",
    "dash.revenue": "Revenue this Month",
    "dash.activeClients": "Active Clients",
    "dash.pendingAudits": "Pending Audits",
    "dash.recentActivity": "Recent Activity",
    "dash.clientMap": "Client Distribution",

    // CRM
    "crm.title": "Clients",
    "crm.subtitle": "Manage your relationships and sales pipeline.",
    "crm.addClient": "Add Client",
    "crm.list": "List",
    "crm.pipeline": "Pipeline",
    "crm.search": "Search clients...",
    "crm.status.active": "Active",
    "crm.status.lead": "Lead",
    "crm.status.inactive": "Inactive",
    "crm.status.archived": "Archived",

    // Audits
    "audit.title": "Audits",
    "audit.subtitle": "Manage compliance and generate reports.",
    "audit.new": "New Audit",
    "audit.start": "Start New Audit",
    "audit.selectTemplate": "Select a template and begin the assessment.",
    "audit.download": "Download PDF",
    "audit.generating": "Generating...",
    "audit.continue": "Continue",
    "audit.score": "Score",

    // AI
    "ai.title": "Vyxo Society",
    "ai.subtitle": "Your AI-powered board of directors.",
    "ai.selectAgent": "Select Agent",
    "ai.walter": "Walter-Cash (Finance)",
    "ai.agentAudit": "Agent-Audit (QSE)",
    "ai.startPrompt": "Start a conversation with",
    "ai.placeholder.walter": "Ask about invoices...",
    "ai.placeholder.audit": "Ask about ISO standards...",
  },
  fr: {
    // Navigation
    "nav.dashboard": "Tableau de Bord",
    "nav.clients": "Clients",
    "nav.audits": "Audits",
    "nav.documents": "Documents",
    "nav.ai": "Vyxo Society",
    "nav.settings": "Paramètres",
    "nav.search": "Rechercher...",

    // Dashboard
    "dash.welcome": "Bon retour,",
    "dash.revenue": "Revenu ce Mois",
    "dash.activeClients": "Clients Actifs",
    "dash.pendingAudits": "Audits en Attente",
    "dash.recentActivity": "Activité Récente",
    "dash.clientMap": "Répartition des Clients",

    // CRM
    "crm.title": "Clients",
    "crm.subtitle": "Gérez vos relations et votre pipeline de vente.",
    "crm.addClient": "Ajouter Client",
    "crm.list": "Liste",
    "crm.pipeline": "Pipeline",
    "crm.search": "Rechercher clients...",
    "crm.status.active": "Actif",
    "crm.status.lead": "Prospect",
    "crm.status.inactive": "Inactif",
    "crm.status.archived": "Archivé",

    // Audits
    "audit.title": "Audits",
    "audit.subtitle": "Gérez la conformité et générez des rapports.",
    "audit.new": "Nouvel Audit",
    "audit.start": "Démarrer un Audit",
    "audit.selectTemplate": "Sélectionnez un modèle et commencez l'évaluation.",
    "audit.download": "Télécharger PDF",
    "audit.generating": "Génération...",
    "audit.continue": "Continuer",
    "audit.score": "Score",

    // AI
    "ai.title": "Vyxo Society",
    "ai.subtitle": "Votre conseil d'administration alimenté par l'IA.",
    "ai.selectAgent": "Choisir l'Agent",
    "ai.walter": "Walter-Cash (Finance)",
    "ai.agentAudit": "Agent-Audit (QSE)",
    "ai.startPrompt": "Commencez une conversation avec",
    "ai.placeholder.walter": "Posez une question sur les factures...",
    "ai.placeholder.audit": "Posez une question sur les normes ISO...",
  }
}
