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
  }
];

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
