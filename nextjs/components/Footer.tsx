import React from "react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0] {
  links[]
}`);

type Footer = {
  links: {
    title: string;
    url: string;
  }[];
};

export default async function Footer() {
  const footerData = await client.fetch<Footer>(FOOTER_QUERY);

  return (
    <footer className="p-8">
      {footerData && (
        <ul className="flex flex-wrap gap-4 justify-center">
          {footerData.links.map((link) => (
            <li key={link.url}>
              <Link className="hover:underline" href={link.url}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <br />

      <p className="text-center text-gray-500">
        © {new Date().getFullYear()} When I Return
      </p>
    </footer>
  );
}
