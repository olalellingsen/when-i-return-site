import { ALBUM_QUERY, SINGLES_QUERY } from "@/queries";
import { client, urlForImage } from "@/sanity/client";
import { Album, Single } from "@/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const albums = await client.fetch<Album[]>(ALBUM_QUERY);
  const singles = await client.fetch<Single[]>(SINGLES_QUERY);

  return (
    <main className="max-w-5xl mx-auto space-y-10 px-2">
      {albums && (
        <section>
          <h2>Albums</h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {albums.map((album) => (
              <li key={album.title}>
                {album.coverArt && (
                  <Image
                    src={urlForImage(album.coverArt).url()}
                    alt={album.title}
                    width={200}
                    height={200}
                    className="w-full"
                  />
                )}
                <h3>{album.title}</h3>
                <p>
                  {album.releaseDate &&
                    new Date(album.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                {album.spotifyLink && (
                  <Link
                    href={album.spotifyLink || "#"}
                    target="_blank"
                    className="underline hover:no-underline"
                  >
                    Listen here!
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {singles && (
        <section>
          <h2>Singles</h2>
          <ul className="grid grid-cols-2 gap-2">
            {singles.map((single) => (
              <li key={single.title}>
                {single.coverArt && (
                  <Image
                    src={urlForImage(single.coverArt).url()}
                    alt={single.title}
                    width={200}
                    height={200}
                    className="w-full"
                  />
                )}
                <h3>{single.title}</h3>
                <p>
                  {single.releaseDate &&
                    new Date(single.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                {single.spotifyLink && (
                  <Link
                    href={single.spotifyLink || "#"}
                    target="_blank"
                    className="underline hover:no-underline"
                  >
                    Listen here!
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
