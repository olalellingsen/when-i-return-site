import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Link from "next/dist/client/link";
import React from "react";

const CONTACT_QUERY = defineQuery(`*[_type == "contact"][0] {
  email,
  phone
}`);

export default async function page() {
  const contactData = await client.fetch(CONTACT_QUERY);

  return (
    <div className="px-2 max-w-5xl mx-auto mt-10">
      <h1>Contact</h1>
      <div>
        <h3>Email:</h3>
        <Link href={`mailto:${contactData.email}`}>{contactData.email}</Link>
      </div>
      <br />
      <div>
        <h3>Phone:</h3>
        <Link href={`tel:${contactData.phone}`}>{contactData.phone}</Link>
      </div>
    </div>
  );
}
