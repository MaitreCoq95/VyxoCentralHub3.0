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

  // ISO 42001
  {
    id: "q-iso42001-definition",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Qu'est-ce que l'ISO 42001 ?",
    choices: [
      "Une norme sur la cybersécurité",
      "Une norme sur les systèmes de management de l'intelligence artificielle",
      "Une norme sur la gestion de la qualité",
      "Une norme sur la protection des données personnelles"
    ],
    correctIndex: 1,
    explanation: "L'ISO 42001 est la première norme internationale sur les systèmes de management de l'intelligence artificielle (AIMS), publiée en décembre 2023.",
    tags: ["definition", "aims", "base"]
  },
  {
    id: "q-iso42001-objectif",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Quel est l'objectif principal de l'ISO 42001 ?",
    choices: [
      "Développer des algorithmes plus performants",
      "Garantir une utilisation responsable et éthique de l'IA",
      "Réduire les coûts de développement IA",
      "Accélérer le déploiement des systèmes IA"
    ],
    correctIndex: 1,
    explanation: "L'ISO 42001 vise à établir un cadre de gouvernance pour une utilisation responsable de l'IA, gérer les risques associés et assurer la conformité réglementaire.",
    tags: ["objectif", "éthique", "gouvernance"]
  },
  {
    id: "q-iso42001-biais",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Que sont les biais algorithmiques dans le contexte de l'ISO 42001 ?",
    choices: [
      "Des erreurs de programmation dans le code",
      "Des distorsions systématiques qui peuvent mener à des discriminations injustes",
      "Des bugs dans les algorithmes",
      "Des ralentissements de performance"
    ],
    correctIndex: 1,
    explanation: "Les biais algorithmiques sont des distorsions systématiques qui peuvent provenir des données d'entraînement ou de la conception du modèle, et peuvent conduire à des discriminations injustes envers certains groupes.",
    tags: ["biais", "discrimination", "équité"]
  },
  {
    id: "q-iso42001-transparence",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Pourquoi l'explicabilité des systèmes IA est-elle importante selon l'ISO 42001 ?",
    choices: [
      "Pour accélérer les calculs",
      "Pour permettre de comprendre et justifier les décisions prises par l'IA, notamment pour les décisions critiques",
      "Pour réduire la consommation énergétique",
      "Pour faciliter la programmation"
    ],
    correctIndex: 1,
    explanation: "L'explicabilité (XAI - Explainable AI) permet de comprendre comment l'IA arrive à ses décisions, ce qui est essentiel pour la confiance, la responsabilité et la conformité, particulièrement pour les décisions à fort impact.",
    tags: ["explicabilité", "transparence", "xai"]
  },
  {
    id: "q-iso42001-registre",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Que doit contenir un registre des systèmes IA selon l'ISO 42001 ?",
    choices: [
      "Uniquement le code source des algorithmes",
      "Uniquement les performances des modèles",
      "L'inventaire complet des systèmes avec description, criticité, données, responsables et évaluations",
      "Uniquement les coûts de développement"
    ],
    correctIndex: 2,
    explanation: "Le registre des systèmes IA doit répertorier tous les systèmes avec leurs caractéristiques, niveau de criticité, données utilisées, responsables, statut et résultats des évaluations de risques.",
    tags: ["registre", "inventaire", "documentation"]
  },
  {
    id: "q-iso42001-risques",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Parmi les risques suivants, lequel est spécifique aux systèmes d'IA ?",
    choices: [
      "Les cyberattaques",
      "Les hallucinations (génération de fausses informations plausibles)",
      "Les pannes matérielles",
      "Les erreurs de saisie utilisateur"
    ],
    correctIndex: 1,
    explanation: "Les hallucinations sont un risque spécifique aux systèmes d'IA, particulièrement les LLM (Large Language Models), où le modèle génère des informations qui semblent plausibles mais qui sont factuellement incorrectes.",
    tags: ["risques", "hallucinations", "llm"]
  },
  {
    id: "q-iso42001-cycle-vie",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Quelle phase du cycle de vie IA est critique pour détecter le 'model drift' ?",
    choices: [
      "La conception initiale",
      "L'entraînement du modèle",
      "La surveillance continue en production",
      "La collecte des données"
    ],
    correctIndex: 2,
    explanation: "Le model drift (dérive du modèle) se produit lorsque les performances d'un modèle IA se dégradent au fil du temps en production, souvent parce que les données réelles évoluent. La surveillance continue est essentielle pour le détecter et y remédier.",
    tags: ["cycle-de-vie", "drift", "surveillance", "production"]
  },
  {
    id: "q-iso42001-gouvernance",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Qui doit être impliqué dans la gouvernance des systèmes IA selon l'ISO 42001 ?",
    choices: [
      "Uniquement les data scientists",
      "Uniquement la direction",
      "Un comité pluridisciplinaire incluant direction, experts IA, experts métier, responsables éthique et conformité",
      "Uniquement les développeurs"
    ],
    correctIndex: 2,
    explanation: "L'ISO 42001 exige une gouvernance pluridisciplinaire avec des rôles clairs : comité de gouvernance IA, responsable IA, data scientists, experts métier, responsables éthique et conformité, avec l'engagement de la direction.",
    tags: ["gouvernance", "rôles", "multidisciplinaire"]
  },
  {
    id: "q-iso42001-data-quality",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Un modèle d'IA de recrutement a été entraîné sur 10 ans d'historique de CV acceptés. Quel risque principal doit être évalué selon l'ISO 42001 ?",
    choices: [
      "Le modèle sera trop lent",
      "Le modèle pourrait reproduire des biais historiques de discrimination présents dans les données d'entraînement",
      "Le modèle nécessitera trop de mémoire",
      "Le modèle sera trop complexe à programmer"
    ],
    correctIndex: 1,
    explanation: "Si les données historiques contiennent des biais (par exemple, discrimination de genre ou d'origine dans les recrutements passés), le modèle IA apprendra et reproduira ces biais. L'ISO 42001 exige d'identifier et d'atténuer ces risques de discrimination algorithmique.",
    tags: ["biais", "données", "discrimination", "cas-pratique"]
  },
  {
    id: "q-iso42001-monitoring",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Quelles métriques doivent être surveillées en production pour un système IA selon l'ISO 42001 ?",
    choices: [
      "Uniquement la précision (accuracy) du modèle",
      "Uniquement le temps de réponse",
      "Performance, équité (fairness), fiabilité, détection de drift, anomalies de sécurité",
      "Uniquement les coûts d'infrastructure"
    ],
    correctIndex: 2,
    explanation: "L'ISO 42001 exige une surveillance multidimensionnelle : performance technique (précision, rappel), équité (absence de biais), fiabilité, détection de drift, anomalies dans les entrées et incidents de sécurité.",
    tags: ["monitoring", "métriques", "performance", "équité"]
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
  },

  // HACCP
  {
    id: "q-haccp-principes",
    moduleId: "haccp",
    difficulty: "easy",
    question: "Combien de principes fondamentaux comporte la méthode HACCP ?",
    choices: [
      "5 principes",
      "7 principes",
      "10 principes",
      "12 principes"
    ],
    correctIndex: 1,
    explanation: "L'HACCP repose sur 7 principes fondamentaux établis par le Codex Alimentarius : analyse des dangers, détermination des CCP, établissement des limites critiques, surveillance, actions correctives, vérification, et documentation.",
    tags: ["7-principes", "base", "haccp"]
  },
  {
    id: "q-haccp-ccp",
    moduleId: "haccp",
    difficulty: "medium",
    question: "Que signifie l'acronyme CCP dans la méthode HACCP ?",
    choices: [
      "Contrôle Continu du Processus",
      "Point Critique de Contrôle",
      "Certification de Conformité des Produits",
      "Contrôle Critique Préventif"
    ],
    correctIndex: 1,
    explanation: "CCP signifie Point Critique de Contrôle (Critical Control Point en anglais). C'est une étape où une mesure de maîtrise peut être appliquée et est essentielle pour prévenir, éliminer ou réduire un danger pour la sécurité des aliments.",
    tags: ["ccp", "point-critique", "definition"]
  },
  {
    id: "q-haccp-limite-critique",
    moduleId: "haccp",
    difficulty: "medium",
    question: "Lors d'une cuisson (CCP), la température mesurée à cœur est de 68°C alors que la limite critique est fixée à 75°C. Que doit-on faire ?",
    choices: [
      "Accepter le produit car la différence est faible",
      "Prolonger la cuisson puis remettre en surveillance",
      "Déclencher immédiatement l'action corrective prévue (prolonger cuisson, isoler le lot, analyser la cause)",
      "Attendre la prochaine mesure pour confirmer"
    ],
    correctIndex: 2,
    explanation: "Lorsqu'une limite critique est dépassée, l'action corrective doit être déclenchée immédiatement selon le principe 5 de l'HACCP. On doit corriger le processus (prolonger la cuisson), maîtriser le lot concerné, identifier la cause et documenter l'événement.",
    tags: ["limite-critique", "action-corrective", "ccp"]
  },
  {
    id: "q-haccp-prerequis",
    moduleId: "haccp",
    difficulty: "medium",
    question: "Quelle est la différence entre un Programme Pré-Requis (PRP) et un Point Critique de Contrôle (CCP) ?",
    choices: [
      "Il n'y a pas de différence, ce sont des synonymes",
      "Les PRP sont les conditions de base nécessaires avant d'appliquer l'HACCP, les CCP sont spécifiques au produit/procédé",
      "Les CCP concernent l'hygiène, les PRP concernent la sécurité alimentaire",
      "Les PRP sont optionnels, les CCP sont obligatoires"
    ],
    correctIndex: 1,
    explanation: "Les Programmes Pré-Requis (PRP) sont les conditions de base et activités nécessaires pour maintenir un environnement hygiénique (nettoyage, maintenance, lutte contre les nuisibles, etc.). Les CCP sont des étapes spécifiques au processus de fabrication où un contrôle est essentiel pour maîtriser un danger identifié.",
    tags: ["prp", "ccp", "difference"]
  },
  {
    id: "q-haccp-arbre-decision",
    moduleId: "haccp",
    difficulty: "hard",
    question: "Lors de l'analyse HACCP d'un processus de fabrication de yaourt, la fermentation à 42°C est-elle un CCP ?",
    choices: [
      "Non, car il n'y a pas de danger à cette étape",
      "Oui, car la température et la durée de fermentation doivent être maîtrisées pour garantir l'acidification et inhiber les pathogènes",
      "Non, c'est uniquement un paramètre qualité",
      "Oui, mais seulement pour le contrôle de la texture"
    ],
    correctIndex: 1,
    explanation: "La fermentation est typiquement un CCP car la température (42°C) et la durée permettent aux ferments lactiques de produire de l'acide lactique qui abaisse le pH (<4.6), créant ainsi un environnement défavorable aux pathogènes. C'est une étape critique pour la sécurité microbiologique du produit.",
    tags: ["ccp", "fermentation", "application"]
  },
  {
    id: "q-haccp-validation",
    moduleId: "haccp",
    difficulty: "hard",
    question: "Quelle est la différence entre la 'surveillance' (principe 4) et la 'vérification' (principe 6) dans l'HACCP ?",
    choices: [
      "Il n'y a pas de différence",
      "La surveillance est continue/régulière pour s'assurer que les CCP sont maîtrisés ; la vérification confirme périodiquement que le système HACCP fonctionne efficacement",
      "La surveillance est faite par la production, la vérification par le laboratoire",
      "La surveillance concerne les CCP, la vérification concerne les PRP"
    ],
    correctIndex: 1,
    explanation: "La surveillance (monitoring) est l'observation ou la mesure planifiée et continue des paramètres des CCP pour s'assurer qu'ils restent dans les limites critiques. La vérification est l'application de méthodes, procédures, tests et audits supplémentaires pour confirmer périodiquement que le système HACCP fonctionne comme prévu (ex: audits, calibration, analyses).",
    tags: ["surveillance", "verification", "difference", "principes"]
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
