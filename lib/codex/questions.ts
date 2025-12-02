import { QuizQuestion } from "@/types/codex";

/**
 * Base de questions de quiz
 * Cette liste sera enrichie au fil du temps via l'API ChatGPT
 */
export const quizQuestions: QuizQuestion[] = [
  // ISO 9001
  {
    id: "q-iso9001-nc",
    moduleId: "iso-9001",
    difficulty: "easy",
    question: "Dans ISO 9001, que doit-on faire lorsqu'une non-conformité est détectée ?",
    choices: [
      "La corriger si on a le temps",
      "L'ignorer si le client ne s'en rend pas compte",
      "L'enregistrer, analyser les causes, définir et suivre des actions correctives",
      "En parler uniquement à la direction"
    ],
    correctIndex: 2,
    explanation: "La clause 10.2 exige d'enregistrer les non-conformités, d'analyser les causes, de mettre en œuvre des actions correctives et de vérifier leur efficacité.",
    tags: ["nc", "capa"]
  },
  {
    id: "q-iso9001-context",
    moduleId: "iso-9001",
    difficulty: "medium",
    question: "Quelle clause de l'ISO 9001 traite du contexte de l'organisme ?",
    choices: [
      "Clause 3",
      "Clause 4",
      "Clause 5",
      "Clause 6"
    ],
    correctIndex: 1,
    explanation: "La clause 4 de l'ISO 9001 traite du contexte de l'organisme, incluant les enjeux internes/externes et les parties intéressées.",
    tags: ["contexte", "clause-4"]
  },

  // GDP
  {
    id: "q-gdp-temp",
    moduleId: "gdp",
    difficulty: "medium",
    question: "Dans le cadre GDP, que doit-on faire en cas d'excursion de température pendant un transport ?",
    choices: [
      "Livrer quand même et ne rien dire",
      "Remettre le produit au froid et continuer sans analyse",
      "Documenter l'excursion, analyser l'impact produit et décider avec la qualité si le lot reste conforme",
      "Retourner systématiquement tous les produits au fabricant"
    ],
    correctIndex: 2,
    explanation: "Une excursion exige une investigation documentée, une analyse d'impact et une décision qualité justifiable (GDP, CEIV).",
    tags: ["excursion", "cold-chain"]
  },
  {
    id: "q-gdp-objective",
    moduleId: "gdp",
    difficulty: "easy",
    question: "Quel est l'objectif principal des Good Distribution Practices ?",
    choices: [
      "Réduire les coûts de transport",
      "Garantir la qualité et l'intégrité des médicaments tout au long de la distribution",
      "Accélérer les livraisons",
      "Simplifier la documentation"
    ],
    correctIndex: 1,
    explanation: "Les GDP visent à garantir que la qualité et l'intégrité des médicaments sont maintenues tout au long de la chaîne de distribution jusqu'au patient.",
    tags: ["gdp", "distribution"]
  },

  // CEIV Pharma
  {
    id: "q-ceiv-scope",
    moduleId: "ceiv-pharma",
    difficulty: "medium",
    question: "Que certifie principalement CEIV Pharma pour un opérateur de fret aérien ?",
    choices: [
      "Uniquement la qualité de la relation client",
      "La conformité aux GDP, aux exigences IATA TCR et la maîtrise de la chaîne du froid pour les produits pharma",
      "La rapidité de traitement de tout type de colis",
      "Le plus bas coût de transport"
    ],
    correctIndex: 1,
    explanation: "CEIV Pharma vise à harmoniser et élever le niveau de conformité GDP/IATA pour la chaîne logistique aérienne des produits de santé.",
    tags: ["ceiv", "iata", "gdp"]
  },

  // Cold Chain Packaging
  {
    id: "q-cold-chain-passive-vs-active",
    moduleId: "cold-chain-packaging",
    difficulty: "medium",
    question: "Quel est l'avantage principal d'un emballage actif par rapport à un emballage passif ?",
    choices: [
      "Il est toujours moins cher",
      "Il ne nécessite aucune qualification",
      "Il régule la température de manière autonome sur de longues durées",
      "Il ne nécessite aucun pré-conditionnement de la part des équipes"
    ],
    correctIndex: 2,
    explanation: "Les emballages actifs embarquent un système de régulation (batterie, compresseur) offrant une meilleure stabilité sur des trajets longs ou complexes.",
    tags: ["emballage-actif"]
  },
  {
    id: "q-cold-chain-passive",
    moduleId: "cold-chain-packaging",
    difficulty: "easy",
    question: "Sur quoi s'appuient principalement les emballages passifs ?",
    choices: [
      "Des batteries électriques",
      "L'isolation et des éléments frigorigènes pré-conditionnés (PCM)",
      "Un système de compresseur",
      "Des ventilateurs actifs"
    ],
    correctIndex: 1,
    explanation: "Les emballages passifs utilisent l'isolation thermique et des éléments frigorigènes comme les PCM (Phase Change Materials) ou gels.",
    tags: ["emballage-passif", "pcm"]
  },

  // ISO 14001
  {
    id: "q-iso14001-aspects",
    moduleId: "iso-14001",
    difficulty: "medium",
    question: "Que sont les 'aspects environnementaux' dans ISO 14001 ?",
    choices: [
      "Les audits environnementaux",
      "Les éléments des activités, produits ou services qui peuvent interagir avec l'environnement",
      "Les certifications obtenues",
      "Les sanctions environnementales"
    ],
    correctIndex: 1,
    explanation: "Les aspects environnementaux sont les éléments des activités de l'organisation (émissions, déchets, consommation) qui peuvent avoir un impact sur l'environnement.",
    tags: ["aspects", "environnement"]
  },

  // ISO 45001
  {
    id: "q-iso45001-duerp",
    moduleId: "iso-45001",
    difficulty: "medium",
    question: "Que signifie DUERP ?",
    choices: [
      "Document Unique d'Évaluation des Risques Professionnels",
      "Directive Unique d'Entreprise pour les Risques Potentiels",
      "Document d'Urgence et de Réponse aux Problèmes",
      "Dossier Universel d'Enregistrement des Risques Particuliers"
    ],
    correctIndex: 0,
    explanation: "Le DUERP est le Document Unique d'Évaluation des Risques Professionnels, obligatoire en France pour toute entreprise ayant au moins un salarié.",
    tags: ["duerp", "sst"]
  },

  // GAMP 5
  {
    id: "q-gamp5-purpose",
    moduleId: "gamp-5",
    difficulty: "medium",
    question: "Quel est le principe fondamental de GAMP 5 ?",
    choices: [
      "Valider tous les systèmes de la même manière",
      "Adapter l'effort de validation en fonction du risque et de la catégorie du système",
      "Ne valider que les systèmes critiques",
      "Externaliser toutes les validations"
    ],
    correctIndex: 1,
    explanation: "GAMP 5 préconise une approche basée sur les risques, adaptant l'effort de validation selon la catégorie du système et son impact sur la qualité produit.",
    tags: ["gamp5", "validation", "risque"]
  },

  // Excellence Opérationnelle
  {
    id: "q-exop-5s",
    moduleId: "exop",
    difficulty: "easy",
    question: "Combien de S y a-t-il dans la méthode 5S ?",
    choices: [
      "3",
      "5",
      "7",
      "10"
    ],
    correctIndex: 1,
    explanation: "La méthode 5S comprend 5 étapes : Seiri (Trier), Seiton (Ranger), Seiso (Nettoyer), Seiketsu (Standardiser), Shitsuke (Pérenniser).",
    tags: ["5s", "lean"]
  },
  {
    id: "q-exop-dmaic",
    moduleId: "exop",
    difficulty: "medium",
    question: "Que signifie l'acronyme DMAIC en Six Sigma ?",
    choices: [
      "Design, Make, Analyze, Improve, Control",
      "Define, Measure, Analyze, Improve, Control",
      "Develop, Monitor, Act, Implement, Check",
      "Document, Measure, Apply, Inspect, Correct"
    ],
    correctIndex: 1,
    explanation: "DMAIC est l'acronyme de Define (Définir), Measure (Mesurer), Analyze (Analyser), Improve (Améliorer), Control (Contrôler).",
    tags: ["dmaic", "six-sigma"]
  }
];

/**
 * Helper pour récupérer les questions d'un module
 */
export function getQuestionsByModule(moduleId: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.moduleId === moduleId);
}

/**
 * Helper pour récupérer des questions aléatoires
 */
export function getRandomQuestions(count: number, moduleId?: string): QuizQuestion[] {
  let pool = quizQuestions;

  if (moduleId) {
    pool = pool.filter(q => q.moduleId === moduleId);
  }

  // Shuffle et prendre les n premières
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Helper pour récupérer des questions par difficulté
 */
export function getQuestionsByDifficulty(
  difficulty: QuizQuestion['difficulty'],
  moduleId?: string
): QuizQuestion[] {
  let pool = quizQuestions;

  if (moduleId) {
    pool = pool.filter(q => q.moduleId === moduleId);
  }

  return pool.filter(q => q.difficulty === difficulty);
}

/**
 * Helper pour récupérer une question par ID
 */
export function getQuestionById(id: string): QuizQuestion | undefined {
  return quizQuestions.find(q => q.id === id);
}
