import Gallery from "@/components/Gallery";
import PortableTextComponent from "@/components/PortableTextSection";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import VideoBlock from "@/components/VideoBlock";
import { client, urlForImage } from "@/sanity/client";
import { HomePage } from "@/types";
import { defineQuery } from "next-sanity";
import Image from "next/image";

const HOME_QUERY = defineQuery(`
  *[_type == "home"][0]{
    title,
    homeImage,
    pageBuilder[]{
      _type == "richText" => {
        _type,
        content
      },
      _type == "gallery" => {
        _type,
        images
      },
      _type == "spotifyPlayer" => {
        _type,
        url,
        size
      },
      _type == "videos" => {
        _type,
        title,
        videos[] {
          _type,
          url,
          caption
        }
      }
    }
  }
`);
const options = { next: { revalidate: 600 } };

export default async function Home() {
  const home = await client.fetch<HomePage>(HOME_QUERY, {}, options);

  console.log(home);

  if (!home) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
            return <PortableTextComponent key={index} content={block} />;
          case "gallery":
            return (
              <section key={index} className="my-10">
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
    </>
  );
}
