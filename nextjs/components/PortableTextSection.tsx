import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { PortableText } from "@portabletext/react";

const stylings = {
  types: {
    image: ({ value }: { value: any }) => (
      <figure className="my-6">
        <Image
          src={urlForImage(value).url()}
          alt={value.alt || ""}
          width={800}
          height={600}
          className="aspect-square sm:aspect-video object-cover w-full"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    normal: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value?.href || "#"}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function PortableTextSection({ block }: { block: any }) {
  return (
    <section className="prose text-foreground max-w-3xl mx-auto mt-8">
      <PortableText value={block.content || []} components={stylings} />
    </section>
  );
}
