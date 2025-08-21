import React from "react";
import { client } from "@/sanity/client";
import { Concert } from "@/types";
import ConcertList from "@/components/ConcertList";
import { defineQuery } from "next-sanity";
import Image from "next/image";
import concertPageImage from "@/public/concertPage.jpg";

const UPCOMING_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date >= now()] | order(date asc) {
  date,
  time,
  location,
  ticketsLink,
  description
}`);

const PAST_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date < now()] | order(date desc) {
  date,
  location,
  description
}`);

const options = { next: { revalidate: 600 } };

export default async function page() {
  const upcoming_concerts = await client.fetch<Concert[]>(
    UPCOMING_CONCERTS_QUERY,
    {},
    options
  );

  const past_concerts = await client.fetch<Concert[]>(
    PAST_CONCERTS_QUERY,
    {},
    options
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4">
      <article>
        <h1>Concerts</h1>
        <ConcertList
          upcoming_concerts={upcoming_concerts}
          past_concerts={past_concerts}
        />
      </article>
      <aside className="lg:pt-24">
        <Image
          src={concertPageImage}
          alt="Concert Page"
          width={500}
          height={300}
          className="aspect-video object-cover lg:aspect-[3/4] w-full"
        />
      </aside>
    </div>
  );
}
