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

  // Clause 4 : Contexte de l'organisation
  {
    id: "q-iso42001-clause4-context",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon la clause 4 de l'ISO 42001, quels enjeux externes doivent être analysés pour un AIMS ?",
    choices: [
      "Uniquement les concurrents directs",
      "Uniquement les technologies disponibles",
      "Les exigences légales (RGPD, AI Act), les régulateurs, les valeurs éthiques, le paysage concurrentiel et le changement climatique si pertinent",
      "Uniquement les fournisseurs de cloud"
    ],
    correctIndex: 2,
    explanation: "La clause 4 exige d'identifier les enjeux externes pertinents incluant : exigences légales (RGPD, AI Act), politiques des régulateurs, valeurs culturelles et éthiques, concurrence, tendances IA, et changement climatique si applicable.",
    tags: ["clause-4", "contexte", "enjeux-externes", "réglementation"]
  },
  {
    id: "q-iso42001-clause4-parties",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Qui sont les parties intéressées à considérer dans un AIMS selon la clause 4 ?",
    choices: [
      "Uniquement les actionnaires",
      "Uniquement les clients",
      "Clients, utilisateurs finaux, régulateurs, fournisseurs, partenaires, employés, communautés affectées, ONG, syndicats",
      "Uniquement les développeurs IA"
    ],
    correctIndex: 2,
    explanation: "L'ISO 42001 clause 4.2 exige d'identifier toutes les parties intéressées pertinentes : clients, utilisateurs finaux, régulateurs, fournisseurs, employés, communautés impactées, ONG, syndicats, etc., et leurs exigences.",
    tags: ["clause-4", "parties-intéressées", "stakeholders"]
  },
  {
    id: "q-iso42001-clause4-scope",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Que doit inclure le périmètre (scope) d'un AIMS selon la clause 4.3 ?",
    choices: [
      "Uniquement les systèmes IA déjà en production",
      "Les limites physiques et organisationnelles, les activités/produits/services incluant l'IA, et les justifications d'exclusions",
      "Uniquement les nouveaux projets IA",
      "Uniquement les systèmes IA critiques"
    ],
    correctIndex: 1,
    explanation: "La clause 4.3 exige de documenter clairement le périmètre de l'AIMS avec : les limites physiques et organisationnelles, les activités/produits/services incluant l'IA, et toute justification pour les exclusions du périmètre.",
    tags: ["clause-4", "périmètre", "scope"]
  },

  // Clause 5 : Leadership
  {
    id: "q-iso42001-clause5-engagement",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Selon la clause 5, quel est le rôle de la direction dans un AIMS ?",
    choices: [
      "Déléguer entièrement la gestion IA aux data scientists",
      "Seulement approuver le budget",
      "Démontrer son engagement : établir la politique IA, allouer les ressources, promouvoir l'amélioration continue et assurer l'intégration dans les processus métier",
      "Seulement signer les documents"
    ],
    correctIndex: 2,
    explanation: "La clause 5.1 exige que la direction démontre son leadership et engagement en établissant la politique IA, en allouant les ressources nécessaires, en promouvant l'amélioration continue et en assurant l'intégration de l'AIMS dans les processus métier.",
    tags: ["clause-5", "leadership", "engagement-direction"]
  },
  {
    id: "q-iso42001-clause5-politique",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Que doit contenir la politique IA selon la clause 5.2 de l'ISO 42001 ?",
    choices: [
      "Uniquement les objectifs techniques",
      "L'engagement d'utiliser l'IA, de satisfaire les exigences applicables, d'améliorer continuellement l'AIMS, et être adaptée au contexte de l'organisation",
      "Uniquement les règles de sécurité informatique",
      "Uniquement la liste des outils IA autorisés"
    ],
    correctIndex: 1,
    explanation: "La clause 5.2 exige que la politique IA : soit adaptée au contexte de l'organisation, fournisse un cadre pour les objectifs IA, inclue l'engagement de satisfaire les exigences applicables, et d'améliorer continuellement l'AIMS.",
    tags: ["clause-5", "politique-ia", "politique"]
  },
  {
    id: "q-iso42001-clause5-roles",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Votre organisation lance un AIMS. Qui doit être responsable de l'évaluation des risques IA selon la clause 5.3 ?",
    choices: [
      "N'importe qui dans l'équipe IT",
      "Uniquement le responsable sécurité",
      "Des rôles et responsabilités clairement assignés et documentés, avec l'autorité appropriée pour gérer l'AIMS et rapporter à la direction",
      "Uniquement les consultants externes"
    ],
    correctIndex: 2,
    explanation: "La clause 5.3 exige que la direction assigne les rôles, responsabilités et autorités pour l'AIMS. Les responsabilités doivent être clairement documentées, avec l'autorité appropriée pour gérer les risques IA et rapporter les performances de l'AIMS à la direction.",
    tags: ["clause-5", "rôles", "responsabilités", "cas-pratique"]
  },

  // Clause 6 : Planification
  {
    id: "q-iso42001-clause6-risques-opportunites",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon la clause 6.1, que doit faire l'organisation avec les risques et opportunités liés à l'AIMS ?",
    choices: [
      "Les ignorer si les systèmes IA fonctionnent bien",
      "Les identifier, les évaluer et planifier des actions pour y répondre, tout en évaluant l'efficacité de ces actions",
      "Les documenter une seule fois lors de la certification",
      "Les traiter uniquement après un incident"
    ],
    correctIndex: 1,
    explanation: "La clause 6.1 exige que l'organisation détermine les risques et opportunités à traiter pour : assurer que l'AIMS atteigne ses résultats escomptés, prévenir/réduire les effets indésirables, et atteindre l'amélioration continue. Des actions doivent être planifiées et leur efficacité évaluée.",
    tags: ["clause-6", "risques", "opportunités", "planification"]
  },
  {
    id: "q-iso42001-clause6-objectives",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Les objectifs IA définis dans la clause 6.2 doivent-ils être mesurables ?",
    choices: [
      "Non, ils peuvent rester qualitatifs",
      "Oui, ils doivent être mesurables, surveillés, communiqués et mis à jour",
      "Uniquement pour les grandes organisations",
      "Uniquement si exigé par les régulateurs"
    ],
    correctIndex: 1,
    explanation: "La clause 6.2 exige que les objectifs IA soient : cohérents avec la politique IA, mesurables, surveillés, communiqués aux personnes pertinentes, et mis à jour selon les besoins.",
    tags: ["clause-6", "objectifs", "mesurables"]
  },
  {
    id: "q-iso42001-ai-risk-assessment",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Un système IA de recommandation de crédits est en cours de développement. Selon le processus d'évaluation des risques IA (clause 6.1.2), que faut-il analyser ?",
    choices: [
      "Uniquement les risques techniques (pannes serveur)",
      "Les conséquences potentielles pour l'organisation, les individus et la société, la probabilité des risques, et les niveaux de risque par rapport aux critères établis",
      "Uniquement les coûts de développement",
      "Uniquement la conformité RGPD"
    ],
    correctIndex: 1,
    explanation: "Le processus d'évaluation des risques IA doit : identifier les risques qui aident ou empêchent d'atteindre les objectifs, analyser en évaluant les conséquences pour l'organisation/individus/société ET la probabilité, déterminer les niveaux de risque, puis comparer aux critères et prioriser pour traitement.",
    tags: ["clause-6", "évaluation-risques", "risk-assessment", "cas-pratique"]
  },
  {
    id: "q-iso42001-ai-risk-treatment",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Quelles sont les options de traitement des risques IA selon l'ISO 42001 ?",
    choices: [
      "Uniquement accepter ou transférer les risques",
      "Éviter, réduire, transférer ou accepter les risques, avec documentation des décisions",
      "Uniquement réduire les risques par des contrôles techniques",
      "Uniquement acheter des assurances"
    ],
    correctIndex: 1,
    explanation: "Le traitement des risques IA peut inclure : éviter le risque (ne pas développer/déployer), réduire le risque (contrôles techniques/organisationnels), transférer le risque (assurance, contractualisation), ou accepter le risque (décision documentée avec justification).",
    tags: ["clause-6", "traitement-risques", "risk-treatment"]
  },
  {
    id: "q-iso42001-ai-impact-assessment",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Votre organisation développe un système IA de reconnaissance faciale pour contrôle d'accès. Que doit inclure l'AI System Impact Assessment selon la clause 6.1.3 ?",
    choices: [
      "Uniquement le coût du projet",
      "Uniquement les performances techniques",
      "L'évaluation des impacts négatifs sur les droits humains, la démocratie, l'environnement et la société, avec des mesures d'atténuation appropriées",
      "Uniquement la conformité légale"
    ],
    correctIndex: 2,
    explanation: "L'AI System Impact Assessment doit évaluer les impacts négatifs potentiels sur : les droits fondamentaux (vie privée, non-discrimination), la démocratie et les processus démocratiques, l'environnement (consommation énergétique), et la société. Des mesures d'atténuation doivent être identifiées et documentées.",
    tags: ["clause-6", "impact-assessment", "évaluation-impact", "droits-humains", "cas-pratique"]
  },

  // Clause 7 : Support
  {
    id: "q-iso42001-clause7-resources",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Selon la clause 7.1, quels types de ressources doivent être déterminées et fournies pour l'AIMS ?",
    choices: [
      "Uniquement le budget informatique",
      "Uniquement les serveurs GPU",
      "Ressources humaines, infrastructure, environnement de travail et ressources de surveillance/mesure",
      "Uniquement les licences logicielles"
    ],
    correctIndex: 2,
    explanation: "La clause 7.1 exige de déterminer et fournir les ressources nécessaires : personnes compétentes, infrastructure (GPU, stockage, cloud), environnement de travail approprié, et ressources pour la surveillance et mesure des performances.",
    tags: ["clause-7", "ressources", "infrastructure"]
  },
  {
    id: "q-iso42001-clause7-competence",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Un nouveau data scientist rejoint l'équipe IA. Que doit faire l'organisation selon la clause 7.2 ?",
    choices: [
      "Lui donner uniquement accès aux outils IA",
      "Déterminer les compétences nécessaires, s'assurer qu'il est compétent, fournir la formation si nécessaire, et conserver des preuves de compétence",
      "Uniquement vérifier son diplôme",
      "Attendre qu'il apprenne sur le tas"
    ],
    correctIndex: 1,
    explanation: "La clause 7.2 exige que l'organisation : détermine les compétences nécessaires pour les personnes affectant les performances de l'AIMS, s'assure qu'elles sont compétentes (éducation, formation, expérience), prenne des actions pour acquérir les compétences manquantes (formation, mentorat), et conserve les informations documentées comme preuves.",
    tags: ["clause-7", "compétence", "formation", "cas-pratique"]
  },
  {
    id: "q-iso42001-clause7-awareness",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon la clause 7.3, de quoi les personnes travaillant sous le contrôle de l'organisation doivent-elles être sensibilisées ?",
    choices: [
      "Uniquement des procédures informatiques",
      "De la politique IA, de leur contribution à l'efficacité de l'AIMS, des bénéfices d'améliorer les performances, et des implications de non-conformité",
      "Uniquement des horaires de travail",
      "Uniquement des outils utilisés"
    ],
    correctIndex: 1,
    explanation: "La clause 7.3 exige que les personnes soient sensibilisées à : la politique IA, les objectifs IA pertinents pour eux, leur contribution à l'efficacité de l'AIMS (y compris les bénéfices d'améliorer les performances), et les implications de ne pas se conformer aux exigences de l'AIMS.",
    tags: ["clause-7", "sensibilisation", "awareness"]
  },
  {
    id: "q-iso42001-clause7-communication",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "La clause 7.4 exige-t-elle de définir un processus de communication pour l'AIMS ?",
    choices: [
      "Non, la communication est informelle",
      "Oui, incluant quoi communiquer, quand, à qui, comment et qui communique",
      "Uniquement pour les grandes organisations",
      "Uniquement pour les incidents"
    ],
    correctIndex: 1,
    explanation: "La clause 7.4 exige que l'organisation détermine les besoins de communication interne et externe pertinents pour l'AIMS, incluant : sur quoi communiquer, quand communiquer, avec qui communiquer, comment communiquer, et qui communique.",
    tags: ["clause-7", "communication", "processus"]
  },
  {
    id: "q-iso42001-clause7-documentation",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Que doit inclure l'information documentée exigée par la clause 7.5 ?",
    choices: [
      "Uniquement le manuel qualité",
      "Celle exigée par la norme ET celle déterminée par l'organisation comme nécessaire pour l'efficacité de l'AIMS",
      "Uniquement les procédures obligatoires",
      "Uniquement les enregistrements d'audit"
    ],
    correctIndex: 1,
    explanation: "La clause 7.5 exige que l'AIMS inclue l'information documentée : exigée par l'ISO 42001 ET déterminée par l'organisation comme nécessaire pour l'efficacité de l'AIMS. Elle doit être contrôlée pour assurer disponibilité, protection et maîtrise des modifications.",
    tags: ["clause-7", "documentation", "informations-documentées"]
  },

  // Clause 8 : Opération
  {
    id: "q-iso42001-clause8-operational-planning",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon la clause 8.1, que doit faire l'organisation avant de déployer un nouveau système IA ?",
    choices: [
      "Uniquement tester les fonctionnalités de base",
      "Planifier, implémenter et maîtriser les processus nécessaires pour satisfaire les exigences et mettre en œuvre les actions de traitement des risques",
      "Uniquement obtenir l'approbation budgétaire",
      "Uniquement former les utilisateurs finaux"
    ],
    correctIndex: 1,
    explanation: "La clause 8.1 exige de planifier, implémenter et maîtriser les processus nécessaires pour : satisfaire les exigences de l'AIMS, mettre en œuvre les actions déterminées (traitement des risques, objectifs), établir des critères pour les processus, et maîtriser les modifications planifiées.",
    tags: ["clause-8", "planification-opérationnelle", "déploiement"]
  },
  {
    id: "q-iso42001-clause8-impact-new-system",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Votre entreprise veut déployer un chatbot IA pour le service client. Selon la clause 8.2, que doit inclure l'AI System Impact Assessment avant déploiement ?",
    choices: [
      "Uniquement le ROI financier",
      "L'objectif du système, l'évaluation des risques IA, l'analyse des impacts (droits, démocratie, environnement, société), les mesures d'atténuation et les métriques de surveillance",
      "Uniquement les tests de performance technique",
      "Uniquement l'avis des développeurs"
    ],
    correctIndex: 1,
    explanation: "La clause 8.2 exige que l'AI System Impact Assessment inclue : l'objectif et le contexte, l'évaluation des risques IA, l'analyse des impacts négatifs potentiels (droits fondamentaux, démocratie, environnement, société), les mesures d'atténuation appropriées, et les métriques de surveillance pour les impacts identifiés.",
    tags: ["clause-8", "impact-assessment", "déploiement", "chatbot", "cas-pratique"]
  },
  {
    id: "q-iso42001-clause8-external-providers",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Votre organisation utilise une API IA fournie par un tiers. Selon la clause 8.3, que devez-vous faire ?",
    choices: [
      "Faire confiance au fournisseur sans vérification",
      "Déterminer et appliquer des critères d'évaluation, de sélection et de surveillance des fournisseurs externes",
      "Uniquement signer un contrat standard",
      "Uniquement vérifier le prix"
    ],
    correctIndex: 1,
    explanation: "La clause 8.3 exige que l'organisation détermine et applique des critères pour : l'évaluation et la sélection des fournisseurs externes (capacités IA, sécurité, éthique), et la surveillance de la performance des fournisseurs. Cela inclut l'évaluation des risques des services externalisés.",
    tags: ["clause-8", "fournisseurs-externes", "sous-traitance", "cas-pratique"]
  },

  // Clause 9 : Évaluation des performances
  {
    id: "q-iso42001-clause9-monitoring",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Selon la clause 9.1, que doit surveiller l'organisation pour l'AIMS ?",
    choices: [
      "Uniquement les coûts",
      "Les performances de l'AIMS, l'efficacité des contrôles, la conformité aux exigences et l'efficacité du traitement des risques",
      "Uniquement les temps de réponse des systèmes",
      "Uniquement les réclamations clients"
    ],
    correctIndex: 1,
    explanation: "La clause 9.1 exige de déterminer : ce qui doit être surveillé et mesuré (performances AIMS, efficacité des contrôles, conformité, traitement des risques), les méthodes de surveillance/mesure/analyse/évaluation, quand surveiller et mesurer, quand analyser et évaluer les résultats.",
    tags: ["clause-9", "surveillance", "monitoring", "performance"]
  },
  {
    id: "q-iso42001-clause9-audit",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "À quelle fréquence doivent être réalisés les audits internes de l'AIMS selon la clause 9.2 ?",
    choices: [
      "Une fois par an obligatoirement",
      "À des intervalles planifiés pour déterminer si l'AIMS est conforme et efficacement mis en œuvre et maintenu",
      "Uniquement avant l'audit de certification",
      "Uniquement en cas de problème"
    ],
    correctIndex: 1,
    explanation: "La clause 9.2 exige de réaliser des audits internes à intervalles planifiés pour vérifier que l'AIMS : est conforme aux exigences de l'organisation et de l'ISO 42001, est efficacement mis en œuvre et maintenu. La fréquence dépend de l'importance des processus et des résultats d'audits précédents.",
    tags: ["clause-9", "audit-interne", "conformité"]
  },
  {
    id: "q-iso42001-clause9-management-review",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Votre direction réalise la revue de direction annuelle de l'AIMS. Selon la clause 9.3, quels éléments d'entrée sont obligatoires ?",
    choices: [
      "Uniquement le budget de l'année suivante",
      "Uniquement les résultats d'audits",
      "Le statut des actions des revues précédentes, les changements de contexte, les performances et efficacité de l'AIMS, les retours des parties intéressées, les résultats d'audits, les non-conformités, les résultats de surveillance, les objectifs atteints, les risques et opportunités, les opportunités d'amélioration",
      "Uniquement les nouvelles réglementations"
    ],
    correctIndex: 2,
    explanation: "La clause 9.3 exige que la revue de direction considère : le statut des actions des revues précédentes, les changements dans les enjeux externes/internes et les exigences des parties intéressées, les performances et l'efficacité de l'AIMS, les retours des parties intéressées, les résultats d'évaluation des risques, les résultats d'audits, les non-conformités et actions correctives, les résultats de surveillance et mesure, la réalisation des objectifs, les opportunités d'amélioration continue.",
    tags: ["clause-9", "revue-direction", "management-review"]
  },

  // Clause 10 : Amélioration
  {
    id: "q-iso42001-clause10-nonconformity",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Un audit interne révèle qu'un système IA en production n'a pas d'évaluation des risques documentée. Selon la clause 10.1, que doit faire l'organisation ?",
    choices: [
      "Ignorer si le système fonctionne bien",
      "Attendre le prochain audit",
      "Réagir immédiatement, évaluer les actions correctives, mettre en œuvre les actions nécessaires, examiner l'efficacité et modifier l'AIMS si nécessaire",
      "Uniquement documenter le constat"
    ],
    correctIndex: 2,
    explanation: "La clause 10.1 exige que lors d'une non-conformité, l'organisation : réagisse et prenne des actions pour la maîtriser et corriger, évalue le besoin d'actions pour éliminer les causes (pour éviter la récurrence), mette en œuvre toute action nécessaire, examine l'efficacité des actions correctives, et modifie l'AIMS si nécessaire.",
    tags: ["clause-10", "non-conformité", "actions-correctives", "cas-pratique"]
  },
  {
    id: "q-iso42001-clause10-improvement",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Selon la clause 10.2, l'organisation doit-elle chercher à améliorer continuellement l'AIMS ?",
    choices: [
      "Non, uniquement lors des audits",
      "Oui, en améliorant continuellement la pertinence, l'adéquation et l'efficacité de l'AIMS",
      "Uniquement si exigé par les clients",
      "Uniquement tous les 3 ans"
    ],
    correctIndex: 1,
    explanation: "La clause 10.2 exige que l'organisation améliore continuellement la pertinence, l'adéquation et l'efficacité de l'AIMS. Cela inclut l'amélioration des processus, des contrôles, et des performances globales du système de management de l'IA.",
    tags: ["clause-10", "amélioration-continue", "efficacité"]
  },

  // Annex A Controls
  {
    id: "q-iso42001-annexa-a2-policies",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon l'Annexe A.2, quels sujets doivent être couverts par les politiques de sécurité de l'information pour l'IA ?",
    choices: [
      "Uniquement les mots de passe",
      "Uniquement le chiffrement des données",
      "Sécurité de l'information, classification et traitement de l'information, sécurité des ressources humaines, contrôle d'accès, sécurité opérationnelle et communications",
      "Uniquement les sauvegardes"
    ],
    correctIndex: 2,
    explanation: "L'Annexe A.2 exige des politiques couvrant : sécurité de l'information (A.2.1.1), classification et traitement de l'information (A.2.1.2), sécurité des ressources humaines (A.2.2), contrôle d'accès (A.2.3), sécurité opérationnelle (A.2.4), sécurité des communications (A.2.5).",
    tags: ["annexe-a", "a2", "politiques", "sécurité"]
  },
  {
    id: "q-iso42001-annexa-a3-governance",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Votre organisation met en place la gouvernance IA selon l'Annexe A.3. Que doit documenter le contrôle A.3.1.1 sur la structure de gouvernance ?",
    choices: [
      "Uniquement l'organigramme informatique",
      "Les rôles, responsabilités et autorités pour l'utilisation de l'IA, incluant la direction et les personnes responsables de la sécurité de l'information et des systèmes IA",
      "Uniquement les budgets alloués",
      "Uniquement les outils utilisés"
    ],
    correctIndex: 1,
    explanation: "Le contrôle A.3.1.1 exige de documenter et attribuer les rôles, responsabilités et autorités pour l'utilisation de l'IA dans l'organisation, incluant spécifiquement les responsabilités de la direction et des personnes responsables de la sécurité de l'information et des systèmes IA.",
    tags: ["annexe-a", "a3", "gouvernance", "rôles", "cas-pratique"]
  },
  {
    id: "q-iso42001-annexa-a4-hr",
    moduleId: "iso-42001",
    difficulty: "easy",
    question: "Selon l'Annexe A.4, que doit-on vérifier avant d'embaucher une personne pour travailler sur des systèmes IA critiques ?",
    choices: [
      "Uniquement son diplôme",
      "Uniquement son CV",
      "Les vérifications d'antécédents (background checks) pour tous les candidats, proportionnellement aux exigences métier et aux risques",
      "Uniquement ses références"
    ],
    correctIndex: 2,
    explanation: "Le contrôle A.4.1.2 de l'Annexe A.4 exige que des vérifications d'antécédents (background checks) soient menées pour tous les candidats selon les lois applicables, proportionnellement aux exigences métier, à la classification de l'information accessible, et aux risques perçus.",
    tags: ["annexe-a", "a4", "ressources-humaines", "recrutement"]
  },
  {
    id: "q-iso42001-annexa-a5-asset",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon l'Annexe A.5, que doit contenir l'inventaire des actifs pour les systèmes IA ?",
    choices: [
      "Uniquement les serveurs physiques",
      "Uniquement les logiciels IA",
      "Tous les actifs IA : systèmes, modèles, données d'entraînement, jeux de données de test, code source, documentation, avec leurs propriétaires et classification",
      "Uniquement les licences"
    ],
    correctIndex: 2,
    explanation: "Le contrôle A.5.1.1 exige d'identifier et maintenir un inventaire de tous les actifs associés à l'information et au traitement de l'information pour les systèmes IA, incluant : systèmes IA, modèles, données d'entraînement et de test, code source, documentation technique, avec leurs propriétaires et niveau de classification.",
    tags: ["annexe-a", "a5", "actifs", "inventaire"]
  },
  {
    id: "q-iso42001-annexa-a6-dev-lifecycle",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Un système IA de diagnostic médical est en développement. Selon le contrôle A.6.2.4 de l'Annexe A.6, que doit inclure la vérification et validation ?",
    choices: [
      "Uniquement tester l'interface utilisateur",
      "Uniquement la précision du modèle",
      "Les mesures de vérification et validation définies et documentées, avec critères d'utilisation pour confirmer que les exigences sont satisfaites et que le système fonctionne comme prévu",
      "Uniquement l'avis du chef de projet"
    ],
    correctIndex: 2,
    explanation: "Le contrôle A.6.2.4 exige de définir et documenter les mesures de vérification et validation pour le système IA et spécifier les critères pour leur utilisation. Cela permet de confirmer que les exigences du système IA sont satisfaites et que le système fonctionne comme prévu.",
    tags: ["annexe-a", "a6", "vérification", "validation", "cycle-de-vie", "cas-pratique"]
  },
  {
    id: "q-iso42001-annexa-a7-data-quality",
    moduleId: "iso-42001",
    difficulty: "hard",
    question: "Votre système IA de recommandation e-commerce montre des performances dégradées. Selon l'Annexe A.7.2, quels aspects de qualité des données devez-vous vérifier ?",
    choices: [
      "Uniquement la quantité de données",
      "Uniquement la vitesse de traitement",
      "Exactitude, complétude, cohérence, actualité, validité, intégrité et disponibilité des données, ainsi que leur provenance",
      "Uniquement le format des fichiers"
    ],
    correctIndex: 2,
    explanation: "L'Annexe A.7.2 exige de définir et documenter les objectifs de qualité des données pour les systèmes IA, incluant : exactitude, complétude, cohérence, actualité (timeliness), validité, intégrité, et disponibilité. La provenance des données (A.7.3) doit aussi être tracée.",
    tags: ["annexe-a", "a7", "qualité-données", "provenance", "cas-pratique"]
  },
  {
    id: "q-iso42001-annexa-a9-third-party",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Selon l'Annexe A.9, que doit inclure l'accord avec un fournisseur de services IA cloud ?",
    choices: [
      "Uniquement le prix du service",
      "Uniquement le SLA de disponibilité",
      "Les exigences de sécurité de l'information, les exigences IA spécifiques, la gestion de la chaîne logistique des services et la surveillance/revue des services tiers",
      "Uniquement les conditions de paiement"
    ],
    correctIndex: 2,
    explanation: "L'Annexe A.9 exige que les accords avec fournisseurs tiers incluent : les exigences de sécurité de l'information (A.9.1), les exigences spécifiques aux systèmes IA (performance, équité, explicabilité), la gestion de la chaîne logistique des services IA (A.9.2), et la surveillance/revue régulière des services tiers (A.9.3).",
    tags: ["annexe-a", "a9", "tiers", "fournisseurs", "cloud"]
  },
  {
    id: "q-iso42001-annexa-a10-customer",
    moduleId: "iso-42001",
    difficulty: "medium",
    question: "Votre entreprise fournit une solution IA SaaS à des clients. Selon l'Annexe A.10, que devez-vous documenter pour les clients ?",
    choices: [
      "Uniquement le manuel utilisateur",
      "Uniquement le prix d'abonnement",
      "Les capacités et limitations du système IA, les cas d'utilisation appropriés, les exigences de qualité des données d'entrée, et les informations sur la surveillance humaine nécessaire",
      "Uniquement les conditions générales de vente"
    ],
    correctIndex: 2,
    explanation: "Le contrôle A.10.1.1 exige de fournir aux clients une documentation claire sur : les capacités et limitations du système IA, les cas d'utilisation appropriés et inappropriés, les exigences de qualité des données d'entrée, le niveau de surveillance humaine nécessaire, et comment interpréter les résultats de l'IA.",
    tags: ["annexe-a", "a10", "clients", "documentation", "saas"]
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
