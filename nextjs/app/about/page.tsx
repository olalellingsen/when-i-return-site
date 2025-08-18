import React from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";

const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]{
  title,
  content,
  image
}`);
const options = { next: { revalidate: 30 } };

export default async function page() {
  const aboutInfo = await client.fetch<SanityDocument>(
    ABOUT_QUERY,
    {},
    options
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        {aboutInfo.title}
      </h1>

      <section className="prose prose-lg max-w-none">
        {Array.isArray(aboutInfo.content) && (
          <PortableText value={aboutInfo.content} />
        )}
      </section>
    </main>
  );
}
