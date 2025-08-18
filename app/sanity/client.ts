import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ppropift",
  dataset: "production",
  apiVersion: "2025-08-18",
  useCdn: false,
});
