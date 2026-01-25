import { createClient } from "@sanity/client";

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const sanityClient = createClient({
  projectId: required("SANITY_PROJECT_ID"),
  dataset: required("SANITY_DATASET"),
  apiVersion: process.env.SANITY_API_VERSION || "2025-01-01",
  useCdn: true,
});
