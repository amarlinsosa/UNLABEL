import type { Politician, Question } from "./types";
import data from "./political-data.json";

export const questions: Question[] = data.questions;
export const politicians: Politician[] = data.politicians;
