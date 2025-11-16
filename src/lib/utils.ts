
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PolicyScores, UserAnswers, Politician } from "./types";
import { policyCategories } from "./types";
import { questions } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string into a URL-friendly slug.
 * @param text The string to convert.
 * @returns The slugified string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Converts a slug back into a readable string with proper capitalization.
 * @param slug The slug to convert.
 * @returns The readable string.
 */
export function unslugify(slug: string): string {
  const wordsToUppercase = ["U.s."];
  const wordsToLowercase = ["of", "and", "the", "in"];

  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word, index) => {
      if (wordsToUppercase.includes(word.toLowerCase())) {
        return word.toUpperCase().replace('.', '. ');
      }
      
      const isDistrict = /district/i.test(word);
      const nextWordIsNumber = /^\d+$/.test(slug.split('-')[index + 1]);

      if (isDistrict && nextWordIsNumber) {
         return word.charAt(0).toUpperCase() + word.slice(1);
      }


      if (index > 0 && wordsToLowercase.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }

      if (word.toLowerCase() === 'us') {
          return 'U.S.';
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}


/**
 * Calculates the user's policy scores based on their quiz answers.
 * @param answers - A record of question IDs to user scores (1-5).
 * @returns A record of policy categories to scores (0-100).
 */
export function calculateUserPolicyScores(answers: UserAnswers): PolicyScores {
  const userScores: PolicyScores = {} as PolicyScores;

  for (const category of policyCategories) {
    const categoryQuestions = questions.filter((q) => q.category === category);
    if (categoryQuestions.length === 0) {
      userScores[category] = 50; // Default to neutral if no questions
      continue;
    }

    const categoryScores = categoryQuestions.map((q) => {
      const answer = answers[q.id];
      if (answer === undefined) return 50; // Neutral if unanswered

      const rawScore = (answer - 1) * 25; // Map 1-5 scale to 0-100
      return q.isInverted ? 100 - rawScore : rawScore;
    });

    const averageScore = categoryScores.reduce((sum, score) => sum + score, 0) / categoryScores.length;
    userScores[category] = averageScore;
  }

  return userScores;
}

/**
 * Calculates the match percentage between a user's policy scores and a politician's scores.
 * @param userScores - The user's calculated policy scores.
 * @param politician - The politician object with their scores.
 * @returns A match percentage from 0 to 100.
 */
export function calculateMatchPercentage(
  userScores: PolicyScores,
  politician: Politician
): number {
  let totalDifference = 0;

  for (const category of policyCategories) {
    const userScore = userScores[category] || 50;
    const politicianScore = politician.scores[category] || 50;
    totalDifference += Math.abs(userScore - politicianScore);
  }

  const averageDifference = totalDifference / policyCategories.length;
  const matchPercentage = 100 - averageDifference;

  return Math.max(0, Math.round(matchPercentage));
}


/**
 * Parses and validates user answers from a URL query string.
 * @param answersParam - The URL query parameter for answers.
 * @returns An object containing the user's scores or an error message.
 */
export function getUserScoresFromURL(answersParam?: string): { userScores: PolicyScores | null; error: string | null } {
    if (!answersParam) {
        return { userScores: null, error: "No answers provided. Please take the quiz first." };
    }

    let answers: UserAnswers;
    try {
        answers = JSON.parse(decodeURIComponent(answersParam));
        // Basic validation to ensure it's a non-empty object
        if (typeof answers !== 'object' || answers === null || Object.keys(answers).length === 0) {
            throw new Error("Invalid answers format.");
        }
    } catch (e) {
        return { userScores: null, error: "Could not parse your answers. Please try the quiz again." };
    }

    const userScores = calculateUserPolicyScores(answers);

    if (Object.values(userScores).some(score => isNaN(score))) {
        return { userScores: null, error: "There was an error calculating your scores. Please try the quiz again." };
    }
    
    return { userScores, error: null };
}
