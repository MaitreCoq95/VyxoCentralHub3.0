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

  // ISO 42001
  {
    id: "iso42001-objectifs",
    moduleId: "iso-42001",
    type: "concept",
    topic: "Objectifs de l'ISO 42001",
    body: "ISO 42001 fournit un cadre pour établir, mettre en œuvre, maintenir et améliorer en continu un système de management de l'IA (AIMS). Elle vise à garantir une utilisation responsable de l'IA, gérer les risques associés et assurer la conformité réglementaire tout en maximisant les bénéfices.",
    tags: ["aims", "objectifs", "gouvernance"]
  },
  {
    id: "iso42001-risques-ia",
    moduleId: "iso-42001",
    type: "concept",
    topic: "Gestion des risques IA",
    body: "L'ISO 42001 exige une approche systématique pour identifier, évaluer et traiter les risques spécifiques à l'IA : biais algorithmiques, manque de transparence, erreurs de prédiction, impacts sociétaux, dérives éthiques, sécurité et confidentialité des données, dépendance excessive à l'IA.",
    tags: ["risques", "analyse-risques", "biais"]
  },
  {
    id: "iso42001-transparence",
    moduleId: "iso-42001",
    type: "requirement",
    topic: "Transparence et explicabilité",
    body: "Les systèmes d'IA doivent être transparents et explicables. L'organisation doit documenter la logique de décision, les données d'entraînement utilisées, les limites du système et fournir des explications compréhensibles sur les résultats générés par l'IA, notamment pour les décisions critiques.",
    tags: ["transparence", "explicabilité", "xai"]
  },
  {
    id: "iso42001-biais",
    moduleId: "iso-42001",
    type: "concept",
    topic: "Biais et équité algorithmique",
    body: "Les biais algorithmiques peuvent provenir des données d'entraînement, de la conception du modèle ou du contexte d'utilisation. L'ISO 42001 exige d'identifier, mesurer et atténuer les biais pour garantir l'équité et éviter la discrimination envers certains groupes de personnes.",
    tags: ["biais", "équité", "fairness", "discrimination"]
  },
  {
    id: "iso42001-checklist",
    moduleId: "iso-42001",
    type: "checklist",
    topic: "Checklist d'évaluation d'un système IA",
    body: "Vérifier : objectif et cas d'usage définis, analyse des risques IA documentée, données d'entraînement qualifiées et représentatives, tests de performance et de biais effectués, transparence et explicabilité assurées, plan de surveillance continue, responsabilités assignées, conformité réglementaire (RGPD, AI Act), documentation complète du cycle de vie.",
    tags: ["checklist", "évaluation", "conformité"]
  },
  {
    id: "iso42001-documentation",
    moduleId: "iso-42001",
    type: "requirement",
    topic: "Documentation et traçabilité",
    body: "L'ISO 42001 exige une documentation complète tout au long du cycle de vie de l'IA : spécifications initiales, données utilisées, architecture du modèle, résultats des tests, décisions de validation, modifications apportées, incidents survenus et actions correctives. Cette traçabilité est essentielle pour les audits et la conformité.",
    tags: ["documentation", "traçabilité", "cycle-de-vie"]
  },
  {
    id: "iso42001-registre",
    moduleId: "iso-42001",
    type: "tool",
    topic: "Registre des systèmes IA",
    body: "Un registre centralisé doit répertorier tous les systèmes d'IA de l'organisation avec : identifiant unique, description et objectif, niveau de criticité, données utilisées, propriétaire et responsable, date de mise en production, statut (développement/production/retiré), résultats des évaluations de risques et conformité.",
    tags: ["registre", "inventaire", "gouvernance"]
  },
  {
    id: "iso42001-cycle-vie",
    moduleId: "iso-42001",
    type: "concept",
    topic: "Cycle de vie des systèmes IA",
    body: "Le cycle de vie IA comprend : conception et planification, collecte et préparation des données, développement et entraînement du modèle, validation et tests, déploiement, surveillance continue, maintenance et mise à jour, retrait éventuel. Chaque phase doit intégrer des contrôles de qualité, sécurité et éthique.",
    tags: ["cycle-de-vie", "mlops", "développement"]
  },
  {
    id: "iso42001-gouvernance",
    moduleId: "iso-42001",
    type: "requirement",
    topic: "Gouvernance et responsabilités",
    body: "L'ISO 42001 exige la désignation claire des rôles et responsabilités : comité de gouvernance IA, responsable IA (AI Officer), data scientists, experts métier, responsables éthique et conformité. La direction doit démontrer son engagement et allouer les ressources nécessaires.",
    tags: ["gouvernance", "rôles", "responsabilités", "leadership"]
  },
  {
    id: "iso42001-risques-specifiques",
    moduleId: "iso-42001",
    type: "risk",
    topic: "Risques spécifiques à l'IA",
    body: "Risques à surveiller : hallucinations (génération de fausses informations), adversarial attacks (manipulation malveillante), data poisoning (corruption des données d'entraînement), model drift (dégradation des performances), surconfiance dans les prédictions, impacts environnementaux (consommation énergétique), dépendance à des fournisseurs tiers.",
    tags: ["risques", "hallucinations", "attacks", "drift"]
  },
  {
    id: "iso42001-surveillance",
    moduleId: "iso-42001",
    type: "requirement",
    topic: "Surveillance et monitoring continu",
    body: "Les systèmes IA en production doivent être surveillés en continu pour détecter : dégradation des performances, apparition de biais, dérives du modèle (drift), anomalies dans les données d'entrée, incidents de sécurité. Des métriques de performance, d'équité et de fiabilité doivent être définies et suivies régulièrement.",
    tags: ["surveillance", "monitoring", "drift", "performance"]
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
