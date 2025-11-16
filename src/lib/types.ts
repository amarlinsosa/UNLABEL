export const policyCategories = [
  "Education",
  "Healthcare",
  "Economy",
  "Environment",
  "Infrastructure",
  "Criminal Justice",
  "Social Issues",
  "Immigration",
] as const;

export type PolicyCategory = (typeof policyCategories)[number];

export interface Question {
  id: number;
  text: string;
  category: PolicyCategory;
  /**
   * If true, a user's high agreement (5/5) maps to a low policy score (0/100).
   * Used for questions phrased in a "conservative" way.
   * e.g., "Corporate taxes should be lowered."
   */
  isInverted: boolean;
}

export interface Politician {
  id: number;
  name: string;
  office: string;
  avatarUrl: string;
  realPhotoUrl: string;
  scores: Record<PolicyCategory, number>;
  longDescription: string;
  website: string;
}

export type UserAnswers = Record<number, number>; // questionId -> score (1-5)

export type PolicyScores = Record<PolicyCategory, number>;

/**
 * Represents a single politician's result, including their match percentage
 * and AI-generated description.
 */
export interface PoliticianResult {
  politician: Politician;
  matchPercentage: number;
  rpgDescription: string;
}

/**
 * Represents the results for a single political office, containing a list
 * of politician results.
 */
export interface OfficeResult {
  office: string;
  results: PoliticianResult[];
}
