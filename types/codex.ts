/**
 * Types pour le module Vyxo Codex
 * Système de gestion de connaissances et d'entraînement quotidien
 */

export type KnowledgeCategory = "ISO" | "ExOp" | "Pharma" | "Transport" | "ITSec";

export type KnowledgeModule = {
  id: string;            // ex: "iso-9001"
  code?: string;         // ex: "ISO 9001"
  title: string;         // ex: "ISO 9001 – Système de management de la qualité"
  category: KnowledgeCategory;
  shortDescription: string;
  sectors?: string[];    // ex: ["Industrie", "Transport", "Pharma"]
  level: "basic" | "intermediate" | "advanced";
  tags: string[];
};

export type KnowledgeItemType =
  | "concept"
  | "requirement"
  | "checklist"
  | "tool"
  | "risk";

export type KnowledgeItem = {
  id: string;
  moduleId: string;      // référence à KnowledgeModule.id
  type: KnowledgeItemType;
  topic: string;
  body: string;          // texte explicatif
  tags: string[];
};

export type QuizQuestion = {
  id: string;
  moduleId: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  choices: string[];
  correctIndex: number;
  explanation: string;
  tags: string[];
};

/**
 * Type pour les résultats de quiz
 */
export type QuizResult = {
  questionId: string;
  userAnswer: number;
  isCorrect: boolean;
  timeSpent?: number; // en secondes
};

/**
 * Type pour une session de quiz
 */
export type QuizSession = {
  id: string;
  moduleId?: string; // undefined pour quiz global
  questions: QuizQuestion[];
  results: QuizResult[];
  startedAt: Date;
  completedAt?: Date;
  score?: number; // pourcentage
};

/**
 * Type pour les statistiques utilisateur
 */
export type UserStats = {
  totalQuizzes: number;
  averageScore: number;
  moduleStats: Record<string, {
    quizzesTaken: number;
    averageScore: number;
    lastAttempt?: Date;
  }>;
};
