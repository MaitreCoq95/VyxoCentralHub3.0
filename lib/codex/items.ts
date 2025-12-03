import { KnowledgeItem } from "@/types/codex";

/**
 * Base de connaissances - Items par module
 * Cette liste sera enrichie au fil du temps
 */
export const knowledgeItems: KnowledgeItem[] = [
  // ISO 9001
  {
    id: "iso9001-context",
    moduleId: "iso-9001",
    type: "concept",
    topic: "Contexte de l'organisme (clause 4)",
    body: "ISO 9001 exige d'identifier les enjeux internes et externes, les parties intéressées pertinentes et le périmètre du système de management de la qualité. Cela permet d'aligner le SMQ avec la réalité de l'entreprise et sa stratégie.",
    tags: ["contexte", "clause-4", "smq"]
  },
  {
    id: "iso9001-leadership",
    moduleId: "iso-9001",
    type: "requirement",
    topic: "Leadership et engagement (clause 5)",
    body: "La direction doit démontrer son engagement envers le SMQ, définir la politique qualité, attribuer les responsabilités, s'assurer de la disponibilité des ressources et promouvoir l'amélioration continue.",
    tags: ["leadership", "direction", "clause-5"]
  },
  {
    id: "iso9001-nc-capa",
    moduleId: "iso-9001",
    type: "checklist",
    topic: "Non-conformités et actions correctives (clause 10.2)",
    body: "Vérifier : enregistrement des non-conformités, analyse des causes, actions immédiates, actions correctives, validation de l'efficacité, mise à jour des risques et des documents si nécessaire.",
    tags: ["nc", "capa", "amelioration"]
  },

  // ISO 14001
  {
    id: "iso14001-aspects",
    moduleId: "iso-14001",
    type: "concept",
    topic: "Aspects environnementaux",
    body: "Identifier les aspects environnementaux de l'activité (émissions, rejets, déchets, consommation de ressources) et déterminer ceux qui sont significatifs pour prioriser les actions.",
    tags: ["aspects", "impacts", "environnement"]
  },

  // ISO 45001
  {
    id: "iso45001-duerp",
    moduleId: "iso-45001",
    type: "checklist",
    topic: "Évaluation des risques professionnels",
    body: "Vérifier l'existence d'un DUERP à jour, la méthodologie d'évaluation des risques (gravité, probabilité, maîtrise), les plans d'action associés et la revue régulière.",
    tags: ["duerp", "risques", "sst"]
  },

  // ISO 27001
  {
    id: "iso27001-annexe-a",
    moduleId: "iso-27001",
    type: "concept",
    topic: "Annexe A – Mesures de sécurité",
    body: "L'annexe A d'ISO 27001 fournit un catalogue de mesures de sécurité (contrôles) pour traiter les risques identifiés dans l'Analyse de Risques SSI (informations, systèmes, processus).",
    tags: ["annexe-a", "controle", "ssi"]
  },

  // GAMP 5
  {
    id: "gamp5-categories",
    moduleId: "gamp-5",
    type: "concept",
    topic: "Catégories GAMP 5",
    body: "GAMP 5 classe les systèmes en catégories (infrastructure, logiciels non configurables, logiciels configurables, développement spécifique) afin d'ajuster l'effort de validation en fonction du risque.",
    tags: ["gamp5", "validation", "csv"]
  },

  // Excellence Opérationnelle
  {
    id: "exop-lean-5s",
    moduleId: "exop",
    type: "tool",
    topic: "5S",
    body: "Méthode pour structurer un poste de travail : Seiri (Trier), Seiton (Ranger), Seiso (Nettoyer), Seiketsu (Standardiser), Shitsuke (Pérenniser). Sert de fondation à la performance, la qualité et la sécurité.",
    tags: ["lean", "5s", "terrain"]
  },
  {
    id: "exop-dmaic",
    moduleId: "exop",
    type: "concept",
    topic: "DMAIC",
    body: "Démarche Six Sigma structurée : Define, Measure, Analyze, Improve, Control. Approche projet orientée réduction de la variabilité et des défauts.",
    tags: ["six-sigma", "dmaic", "amelioration"]
  },

  // GDP
  {
    id: "gdp-principes",
    moduleId: "gdp",
    type: "concept",
    topic: "Objectif des GDP",
    body: "Les Good Distribution Practices visent à garantir que la qualité et l'intégrité des médicaments sont maintenues tout au long de la chaîne de distribution jusqu'au patient.",
    tags: ["gdp", "distribution", "pharma"]
  },
  {
    id: "gdp-cold-chain-checklist",
    moduleId: "gdp",
    type: "checklist",
    topic: "Checklist Cold Chain – Route & Air",
    body: "Vérifier : QMS documenté, personnel formé, véhicules et emballages qualifiés, enregistreurs de température, SOP excursions, traçabilité complète, validation des flux, maîtrise des sous-traitants, conformité GDP/CEIV/IATA, audits réguliers.",
    tags: ["cold-chain", "transport", "checklist"]
  },

  // GMP
  {
    id: "gmp-batch-record",
    moduleId: "gmp",
    type: "requirement",
    topic: "Dossier de lot (Batch Record)",
    body: "Chaque lot doit disposer d'un dossier complet permettant de reconstituer l'historique de fabrication et de contrôle. Les enregistrements doivent être contemporains, lisibles, exacts et revus par la qualité avant libération.",
    tags: ["gmp", "batch-record", "documentation"]
  },

  // CEIV Pharma
  {
    id: "ceiv-pharma-scope",
    moduleId: "ceiv-pharma",
    type: "concept",
    topic: "Portée CEIV Pharma",
    body: "CEIV Pharma (IATA) couvre l'ensemble de la chaîne logistique aérienne : acceptance, handling, stockage, transport, gestion des températures, documentation et formation du personnel pour les produits de santé.",
    tags: ["ceiv", "iata", "air-cargo"]
  },

  // Cold Chain Packaging
  {
    id: "cold-chain-passive-packaging",
    moduleId: "cold-chain-packaging",
    type: "concept",
    topic: "Emballages passifs",
    body: "Les emballages passifs s'appuient sur l'isolation et des éléments frigorigènes pré-conditionnés (PCM, gels). Ils n'utilisent pas de source d'énergie active et doivent être qualifiés pour un profil temps/température donné.",
    tags: ["emballage-passif", "pcm", "qualification"]
  },
  {
    id: "cold-chain-active-packaging",
    moduleId: "cold-chain-packaging",
    type: "concept",
    topic: "Emballages actifs",
    body: "Les emballages actifs utilisent une source d'énergie (batterie, compresseur) pour réguler automatiquement la température. Ils sont adaptés aux trajets longs et aux conditions extrêmes, mais nécessitent une gestion rigoureuse (batteries, paramétrage, pré-refroidissement).",
    tags: ["emballage-actif", "envirotainer", "regulation"]
  },

  // HACCP
  {
    id: "haccp-7-principes",
    moduleId: "haccp",
    type: "concept",
    topic: "Les 7 principes de l'HACCP",
    body: "L'HACCP repose sur 7 principes fondamentaux : 1) Identifier les dangers et analyser les risques, 2) Déterminer les Points Critiques de Contrôle (CCP), 3) Établir les limites critiques, 4) Mettre en place un système de surveillance, 5) Définir les actions correctives, 6) Établir des procédures de vérification, 7) Constituer un système documentaire.",
    tags: ["7-principes", "ccp", "codex-alimentarius"]
  },
  {
    id: "haccp-pcc",
    moduleId: "haccp",
    type: "concept",
    topic: "Point Critique de Contrôle (CCP)",
    body: "Un CCP est une étape du processus où une mesure de maîtrise peut être appliquée et est essentielle pour prévenir, éliminer ou réduire un danger pour la sécurité des aliments à un niveau acceptable. Exemples : température de cuisson, pH, détection de métaux.",
    tags: ["ccp", "point-critique", "maitrise"]
  },
  {
    id: "haccp-arbre-decision",
    moduleId: "haccp",
    type: "tool",
    topic: "Arbre de décision CCP",
    body: "L'arbre de décision du Codex Alimentarius est un outil systématique pour déterminer si une étape est un CCP. Il pose une série de questions : Q1) Existe-t-il une mesure préventive ? Q2) L'étape élimine-t-elle ou réduit-elle le danger ? Q3) Une contamination peut-elle survenir ? Q4) Une étape ultérieure éliminera-t-elle le danger ?",
    tags: ["arbre-decision", "ccp", "methodologie"]
  },
  {
    id: "haccp-limites-critiques",
    moduleId: "haccp",
    type: "requirement",
    topic: "Limites critiques",
    body: "Les limites critiques sont les valeurs qui séparent l'acceptabilité de la non-acceptabilité pour chaque CCP. Elles doivent être mesurables (température ≥75°C, pH ≤4.6, aw ≤0.85) et basées sur des références scientifiques ou réglementaires. Elles permettent de déterminer si un CCP est maîtrisé.",
    tags: ["limites-critiques", "ccp", "mesures"]
  },
  {
    id: "haccp-surveillance",
    moduleId: "haccp",
    type: "checklist",
    topic: "Surveillance des CCP",
    body: "Vérifier : méthodes de surveillance définies (continue ou discontinue), fréquence adaptée au risque, responsabilités assignées, équipements calibrés, enregistrements des mesures, système d'alerte en cas de dérive, traçabilité des lots.",
    tags: ["surveillance", "monitoring", "ccp"]
  },
  {
    id: "haccp-actions-correctives",
    moduleId: "haccp",
    type: "requirement",
    topic: "Actions correctives",
    body: "Des actions correctives doivent être définies pour chaque CCP en cas de dépassement des limites critiques. Elles incluent : correction immédiate du processus, identification et maîtrise des produits non conformes, analyse des causes, mesures pour éviter la récurrence, enregistrement documenté.",
    tags: ["actions-correctives", "non-conformite", "ccp"]
  },
  {
    id: "haccp-verification",
    moduleId: "haccp",
    type: "checklist",
    topic: "Vérification du système HACCP",
    body: "Vérifier : audits HACCP réguliers, validation des limites critiques, calibration des équipements de mesure, analyses microbiologiques/chimiques, revue des enregistrements, tests challenge, formation du personnel, mise à jour du plan HACCP lors de modifications.",
    tags: ["verification", "audit", "validation"]
  },
  {
    id: "haccp-prerequis",
    moduleId: "haccp",
    type: "concept",
    topic: "Programmes Pré-Requis (PRP)",
    body: "Les PRP sont les conditions de base et les activités nécessaires pour maintenir un environnement hygiénique. Ils incluent : conception des locaux, nettoyage et désinfection, lutte contre les nuisibles, hygiène du personnel, maintenance des équipements, gestion des déchets, approvisionnement en eau, maîtrise des fournisseurs.",
    tags: ["prp", "prerequis", "hygiene"]
  },

  // ─────────────────────────────────────────────────────────────────
  // ISO 13485 - Dispositifs médicaux
  // ─────────────────────────────────────────────────────────────────
  {
    id: "iso13485-intro",
    moduleId: "iso-13485",
    type: "concept",
    topic: "ISO 13485 : Spécificités par rapport à ISO 9001",
    body: "ISO 13485 est une norme spécialisée pour les dispositifs médicaux, basée sur ISO 9001 mais avec des exigences supplémentaires : gestion des risques (ISO 14971), traçabilité renforcée, vigilance réglementaire, validation des processus, propreté/contamination, conception et développement obligatoires, dossier technique de dispositif.",
    tags: ["iso-13485", "dispositifs-médicaux", "réglementation"]
  },
  {
    id: "iso13485-reglementation",
    moduleId: "iso-13485",
    type: "requirement",
    topic: "Exigences réglementaires et marquage CE",
    body: "Les dispositifs médicaux doivent respecter le règlement UE 2017/745 (MDR) ou 2017/746 (IVDR). Exigences : classification du dispositif (I, IIa, IIb, III), évaluation de conformité, dossier technique, marquage CE, déclaration de conformité UE, vigilance et traçabilité, organisme notifié si nécessaire.",
    tags: ["marquage-ce", "mdr", "ivdr", "réglementation"]
  },
  {
    id: "iso13485-gestion-risques",
    moduleId: "iso-13485",
    type: "concept",
    topic: "Gestion des risques selon ISO 14971",
    body: "La norme ISO 14971 définit le processus de management des risques pour les dispositifs médicaux : identification des dangers, estimation des risques, évaluation des risques, maîtrise des risques (réduction, transfert, acceptation), réévaluation continue, rapport de management des risques.",
    tags: ["gestion-risques", "iso-14971", "sécurité"]
  },
  {
    id: "iso13485-tracabilite",
    moduleId: "iso-13485",
    type: "requirement",
    topic: "Traçabilité renforcée des dispositifs",
    body: "Exigences de traçabilité : UDI (Unique Device Identification), numéro de série/lot pour chaque dispositif, enregistrement des distributions, capacité de rappel en 24h, registre des utilisateurs finaux pour dispositifs implantables, conservation des enregistrements (min. durée de vie + 5 ans).",
    tags: ["traçabilité", "udi", "rappel", "vigilance"]
  },
  {
    id: "iso13485-biovigilance",
    moduleId: "iso-13485",
    type: "requirement",
    topic: "Système de vigilance et rappel",
    body: "Le fabricant doit établir un système de vigilance : déclaration des incidents graves aux autorités, analyse des réclamations et retours, évaluation des risques post-commercialisation (PMS), procédure de rappel et actions de sécurité, notification aux utilisateurs, rapport périodique de sécurité (PSUR).",
    tags: ["vigilance", "rappel", "sécurité", "pms"]
  },
  {
    id: "iso13485-conception",
    moduleId: "iso-13485",
    type: "checklist",
    topic: "Conception et développement (obligatoire)",
    body: "Étapes obligatoires : planification de la conception, revue des exigences, conception détaillée, vérification de la conception, validation clinique, transfert en production, gestion des modifications de conception, dossier de conception (DHF - Design History File).",
    tags: ["conception", "développement", "dhf", "validation"]
  },

  // ─────────────────────────────────────────────────────────────────
  // Maîtrise d'Audit - Techniques avancées
  // ─────────────────────────────────────────────────────────────────
  {
    id: "audit-techniques-entretien",
    moduleId: "maitrise-audit",
    type: "tool",
    topic: "Techniques d'entretien d'audit",
    body: "Techniques clés : questions ouvertes (Qui/Quoi/Où/Quand/Comment/Pourquoi), écoute active, reformulation, questionnement en entonnoir (large → précis), technique du silence, observation non-verbale, approche STAR (Situation-Tâche-Action-Résultat), prise de notes structurée, triangulation (croiser les sources).",
    tags: ["entretien", "questions", "écoute-active", "observation"]
  },
  {
    id: "audit-risk-based",
    moduleId: "maitrise-audit",
    type: "concept",
    topic: "Audit orienté risques (Risk-Based Audit)",
    body: "Approche d'audit basée sur les risques : identifier les processus critiques via analyse de risques, concentrer les efforts d'audit sur les zones à haut risque, adapter le niveau de détail selon la criticité, utiliser la matrice de criticité (fréquence × gravité), auditer les points de contrôle clés, réduire l'échantillonnage sur les processus à faible risque.",
    tags: ["risk-based", "analyse-risques", "criticité", "ciblage"]
  },
  {
    id: "audit-echantillonnage",
    moduleId: "maitrise-audit",
    type: "tool",
    topic: "Méthodes d'échantillonnage avancées",
    body: "Techniques d'échantillonnage : échantillonnage statistique (taille calculée selon niveau de confiance), échantillonnage par attributs (conformité oui/non), échantillonnage stratifié (par catégorie), échantillonnage en grappes, échantillonnage par jugement (ciblé), formule : n = (Z² × p × (1-p)) / E² où Z=1,96 (95%), E=marge d'erreur.",
    tags: ["échantillonnage", "statistiques", "taille-échantillon", "représentativité"]
  },
  {
    id: "audit-scoring-priorisation",
    moduleId: "maitrise-audit",
    type: "tool",
    topic: "Scoring et priorisation des constats",
    body: "Méthode de scoring des écarts : Gravité (1-5) × Fréquence (1-5) × Détectabilité (1-5) = Score RPN. Classification : Critique (RPN > 100), Majeure (50-100), Mineure (< 50). Critères de gravité : impact sécurité, impact réglementaire, impact client, impact business. Priorisation des actions correctives selon le score.",
    tags: ["scoring", "rpn", "priorisation", "gravité"]
  },
  {
    id: "audit-comportemental",
    moduleId: "maitrise-audit",
    type: "concept",
    topic: "Audit comportemental et culture sécurité",
    body: "Audit comportemental : observer les comportements réels vs procédures, identifier les écarts de pratique, analyser la culture de sécurité, évaluer l'appropriation des règles, détecter les contournements, mesurer l'engagement du management, audit sur le terrain (gemba walk), biais de confirmation à éviter.",
    tags: ["comportemental", "culture-sécurité", "observation", "gemba"]
  },
  {
    id: "audit-multi-sites",
    moduleId: "maitrise-audit",
    type: "tool",
    topic: "Audit multi-sites structuré",
    body: "Méthodologie multi-sites : harmonisation du référentiel d'audit, équipes d'auditeurs calibrées, grille de cotation commune, audit pilote sur site référent, audits simultanés ou séquentiels, consolidation des constats, benchmark inter-sites, identification des meilleures pratiques, plan d'action global + local.",
    tags: ["multi-sites", "harmonisation", "benchmark", "coordination"]
  },
  {
    id: "audit-gdp-integre",
    moduleId: "maitrise-audit",
    type: "checklist",
    topic: "Audit GDP intégré transport-pharma",
    body: "Points d'audit intégrés : autorisation GDP (transport + entrepôt), qualification thermique véhicules et entrepôt, procédures intégrées de gestion des excursions, traçabilité bout-en-bout, interface transport-pharmacien responsable, audits des sous-traitants, gestion des retours et rappels, CAPA partagées, système qualité commun, contrats de qualité.",
    tags: ["gdp", "transport", "pharma", "intégration", "bout-en-bout"]
  }
];

/**
 * Helper pour récupérer tous les items
 */
export function getAllItems(): KnowledgeItem[] {
  return knowledgeItems;
}

/**
 * Helper pour récupérer les items d'un module
 */
export function getItemsByModule(moduleId: string): KnowledgeItem[] {
  return knowledgeItems.filter(item => item.moduleId === moduleId);
}

/**
 * Helper pour récupérer les items par type
 */
export function getItemsByType(moduleId: string, type: KnowledgeItem['type']): KnowledgeItem[] {
  return knowledgeItems.filter(item => item.moduleId === moduleId && item.type === type);
}

/**
 * Helper pour rechercher dans les items
 */
export function searchItems(query: string, moduleId?: string): KnowledgeItem[] {
  const lowerQuery = query.toLowerCase();
  let items = knowledgeItems;

  if (moduleId) {
    items = items.filter(item => item.moduleId === moduleId);
  }

  return items.filter(item =>
    item.topic.toLowerCase().includes(lowerQuery) ||
    item.body.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Helper pour grouper les items par type
 */
export function groupItemsByType(moduleId: string): Record<KnowledgeItem['type'], KnowledgeItem[]> {
  const items = getItemsByModule(moduleId);
  return {
    concept: items.filter(i => i.type === 'concept'),
    requirement: items.filter(i => i.type === 'requirement'),
    checklist: items.filter(i => i.type === 'checklist'),
    tool: items.filter(i => i.type === 'tool'),
    risk: items.filter(i => i.type === 'risk'),
  };
}
