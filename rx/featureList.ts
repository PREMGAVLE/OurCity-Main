import { db } from "./db";
import { FeatureItem } from "./type";
import { defaultFeatures } from "./type";

/** Add a new feature */
export async function addFeature(item: Omit<FeatureItem, 'id'>): Promise<number> {
  return await db.features.add(item);
}
/** Get all features */
export async function getAllFeatures(): Promise<(FeatureItem & { id: number })[]> {
  return await db.features.toArray() as (FeatureItem & { id: number })[];
}

/** Get by ID */
export async function getFeatureById(id: number): Promise<(FeatureItem & { id: number }) | undefined> {
  return await db.features.get(id) as (FeatureItem & { id: number }) | undefined;
}

/** Update feature */
export async function updateFeature(id: number, updates: Partial<Omit<FeatureItem, 'id'>>): Promise<void> {
  await db.features.update(id, updates);
}

/** Delete feature */
export async function deleteFeature(id: number): Promise<void> {
  await db.features.delete(id);
}

/** Query by category */
export async function getFeaturesByCategory(category: string): Promise<(FeatureItem & { id: number })[]> {
  return await db.features.where('category').equals(category).toArray() as (FeatureItem & { id: number })[];
}

/** Query by tag */
export async function getFeaturesByTag(tag: string): Promise<(FeatureItem & { id: number })[]> {
  return await db.features.where('tags').equals(tag).toArray() as (FeatureItem & { id: number })[];
}

/**
 * Seed the default features into IndexedDB if none exist.
 */
export async function seedDefaultFeatures(): Promise<void> {
  // Clear all existing features
  await db.features.clear();
  // Bulk add default features
  await db.features.bulkAdd(defaultFeatures);
}