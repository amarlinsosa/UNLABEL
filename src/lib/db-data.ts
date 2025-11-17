// src/lib/db-data.ts
import { query } from "./db";
import {
  policyCategories,
  type PolicyCategory,
  type Question,
  type Politician,
} from "./types";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// ---------- QUESTIONS ----------

type QuestionRow = {
  id: number;
  text: string;
  category: PolicyCategory; // joined from policy_categories.name
  is_inverted: 0 | 1;
};

export async function getQuestionsFromDb(): Promise<Question[]> {
  const rows = await query<QuestionRow>(
    `SELECT q.id,
            q.text,
            pc.name AS category,
            q.is_inverted
     FROM questions q
     JOIN policy_categories pc ON pc.id = q.category_id
     ORDER BY q.id`
  );

  return rows.map((row) => ({
    id: row.id,
    text: row.text,
    category: row.category,
    isInverted: !!row.is_inverted,
  }));
}

// ---------- POLITICIANS + SCORES ----------

type PoliticianScoreRow = {
  id: number;
  name: string;
  office: string;
  avatar_slug: string;
  real_photo_url: string;
  long_description: string;
  website: string | null;
  category: PolicyCategory;
  score: number;
};

export async function getPoliticiansFromDb(): Promise<Politician[]> {
  const rows = await query<PoliticianScoreRow>(
    `SELECT p.id,
            p.name,
            p.office,
            p.avatar_slug,
            p.real_photo_url,
            p.long_description,
            p.website,
            pc.name AS category,
            s.score
     FROM politicians p
     JOIN politician_policy_scores s ON s.politician_id = p.id
     JOIN policy_categories pc ON pc.id = s.category_id
     ORDER BY p.id, pc.id`
  );

  const byId = new Map<number, Politician>();

  for (const row of rows) {
    if (!byId.has(row.id)) {
      const emptyScores: Record<PolicyCategory, number> = {} as any;
      for (const cat of policyCategories) {
        emptyScores[cat] = 0;
      }

      byId.set(row.id, {
        id: row.id,
        name: row.name,
        office: row.office,
        avatarUrl: row.avatar_slug,
        realPhotoUrl: row.real_photo_url,
        // SOURCE OF TRUTH: The detailed politician bio comes directly from
        // the `politicians.long_description` column in the MySQL RDS database.
        // Keep this mapping here so the UI reads the DB value at runtime.
        longDescription: row.long_description,
        website: row.website ?? "",
        scores: emptyScores,
      });
    }

    const pol = byId.get(row.id)!;
    pol.scores[row.category] = row.score;
  }

  return Array.from(byId.values());
}

// (optional helper if you ever need 1 politican)
export async function getPoliticianByIdFromDb(id: number): Promise<Politician | null> {
  const all = await getPoliticiansFromDb();
  return all.find((p) => p.id === id) ?? null;
}

// ---------- PLACEHOLDER IMAGES FROM DB ----------

type ImageRow = {
  id: string;
  description: string | null;
  image_url: string;
  image_hint: string | null;
};

export async function getPlaceholderImagesFromDb(): Promise<ImagePlaceholder[]> {
  const rows = await query<ImageRow>(
    `SELECT id, description, image_url, image_hint
     FROM politician_images
     ORDER BY id`
  );

  return rows.map((row) => ({
    id: row.id,
    description: row.description ?? "",
    imageUrl: row.image_url,
    imageHint: row.image_hint ?? "",
  }));
}
