import React from "react";
import { client } from "@/sanity/client";
import { Concert } from "@/types";
import ConcertList from "@/components/ConcertList";
import Image from "next/image";
import concertPageImage from "@/public/concertPage.jpg";
import { PAST_CONCERTS_QUERY, UPCOMING_CONCERTS_QUERY } from "@/queries";

const today = new Date().toISOString().split("T")[0];

export default async function page() {
  const upcoming_concerts = await client.fetch<Concert[]>(
    UPCOMING_CONCERTS_QUERY,
    { today },
  );

  const past_concerts = await client.fetch<Concert[]>(PAST_CONCERTS_QUERY, {
    today,
  });

  return (
    <div className="grid lg:grid-cols-2 gap-4 pt-12">
      <article>
        <ConcertList
          upcoming_concerts={upcoming_concerts}
          past_concerts={past_concerts}
        />
      </article>
      <aside className="lg:px-4">
        <Image
          src={concertPageImage}
          alt="Concert Page"
          width={500}
          height={500}
          className="w-full aspect-square object-cover"
        />
      </aside>
    </div>
  );
}
