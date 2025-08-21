import Gallery from "@/components/Gallery";
import PortableTextComponent from "@/components/PortableTextSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { client, urlForImage } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableTextBlock } from "next-sanity";

import Image from "next/image";

const HOME_QUERY = defineQuery(`*[_type == "home"][0]{
  title,
  homeImage,
  pageBuilder[] {
    _type,
    content,
    images,
    url,
    size,
  }
}`);
const options = { next: { revalidate: 3600 } };

interface HomePage {
  title?: string;
  homeImage?: {
    image: any;
    alt?: string;
    caption?: string;
  };
  pageBuilder?: Array<{
    _type: string;
    content?: Array<PortableTextBlock>;
    images?: Array<SanityImageSource>;
    url?: string;
    size?: "compact" | "regular" | "large";
  }>;
}

export default async function Home() {
  const home = await client.fetch<HomePage>(HOME_QUERY, {}, options);

  console.log(home);

  if (!home) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h1>{home.title || "Welcome"}</h1>

      {home.homeImage && (
        <section>
          <Image
            src={urlForImage(home.homeImage.image).url()}
            alt={home.homeImage.alt || "Home Image"}
            width={800}
            height={600}
            className="w-full aspect-square sm:aspect-video object-cover"
          />
          {home.homeImage.caption && (
            <figcaption>{home.homeImage.caption}</figcaption>
          )}
        </section>
      )}

      {home.pageBuilder?.map((block, index) => {
        switch (block._type) {
          case "richText":
            return <PortableTextComponent key={index} block={block} />;
          case "gallery":
            return (
              <section key={index} className="my-10">
                <Gallery images={block.images || []} />
              </section>
            );
          case "spotifyPlayer":
            return (
              <section key={index} className="my-10">
                <SpotifyPlayer url={block.url || ""} size={block.size} />
              </section>
            );

          default:
            return null;
        }
      })}
    </main>
  );
}
