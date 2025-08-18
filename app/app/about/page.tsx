import React from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  content,
  image
}`;
const options = { next: { revalidate: 30 } };

export default async function page() {
  const aboutInfo = await client.fetch<SanityDocument>(
    ABOUT_QUERY,
    {},
    options
  );

  return (
    <main>
      <h1>{aboutInfo.title}</h1>
      <div>
        {aboutInfo.content.map((block: SanityDocument, index: number) => (
          <p key={index}>{block.children[0].text}</p>
        ))}
      </div>
    </main>
  );
}
