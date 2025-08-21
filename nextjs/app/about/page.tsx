import React from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { client, urlForImage } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import PortableTextComponent from "@/components/PortableTextSection";

const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]{
  title,
  content,
  image
}`);
const options = { next: { revalidate: 3600 } };

export default async function page() {
  const about = await client.fetch<SanityDocument>(ABOUT_QUERY, {}, options);

  return (
    <main>
      <h1>{about.title}</h1>

      <Image
        src={urlForImage(about?.image).url()}
        alt="About Image"
        width={800}
        height={600}
        className="w-full aspect-square sm:aspect-video object-cover"
      />

      <PortableTextComponent block={about} />
    </main>
  );
}
