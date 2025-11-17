import type { Politician, Question } from "./types";

// Deprecated: this file used to export JSON-backed data. The app now loads
// questions and politicians from RDS via `src/lib/db-data.ts`.
export const questions: Question[] = [];
export const politicians: Politician[] = [];
