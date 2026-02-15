import Gallery from "@/components/Gallery";
import PortableTextComponent from "@/components/PortableTextSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import VideoBlock from "@/components/VideoBlock";
import { HOME_QUERY } from "@/queries";
import { client, urlForImage } from "@/sanity/client";
import { HomePage } from "@/types";
import Image from "next/image";

export default async function Home() {
  const home = await client.fetch<HomePage>(HOME_QUERY);

  if (!home) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {home.homeImage && home.title && (
        <header className="md:mt-10">
          <h1 className="text-center">{home.title}</h1>
          <Image
            src={urlForImage(home.homeImage.image).url()}
            alt={home.homeImage.alt || "Home Image"}
            width={800}
            height={600}
            className="w-full aspect-square sm:aspect-10/4 object-cover"
          />
          {home.homeImage.caption && (
            <figcaption>{home.homeImage.caption}</figcaption>
          )}
        </header>
      )}

      <article className="max-w-5xl mx-auto px-2">
        {home.pageBuilder?.map((block, index) => {
          switch (block._type) {
            case "richText":
              return <PortableTextComponent key={index} content={block} />;
            case "gallery":
              return (
                <section key={index} className="my-10 -mx-2 lg:mx-0">
                  <Gallery images={block.images} />
                </section>
              );
            case "spotifyPlayer":
              return (
                <section key={index} className="my-10">
                  <SpotifyPlayer url={block.url} size={block.size} />
                </section>
              );
            case "videos":
              return (
                <section key={index} className="my-10">
                  <VideoBlock videos={block.videos} />
                </section>
              );

            default:
              return null;
          }
        })}
      </article>
    </>
  );
}
