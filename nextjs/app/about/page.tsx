import React from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client, urlForImage } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Image from "next/image";

const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]{
  title,
  content,
  image
}`);
const options = { next: { revalidate: 30 } };

export default async function page() {
  const about = await client.fetch<SanityDocument>(ABOUT_QUERY, {}, options);

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        {about.title}
      </h1>

      <Image
        src={urlForImage(about?.image).url()}
        alt="About Image"
        width={800}
        height={600}
      />

      <section className="prose prose-lg max-w-none">
        {Array.isArray(about.content) && <PortableText value={about.content} />}
      </section>
    </main>
  );
}
