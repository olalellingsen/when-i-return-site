import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function Gallery({ images }: { images: SanityImageSource[] }) {
  return (
    <ul className="w-full py-4 flex flex-row gap-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar lg:grid lg:grid-cols-3">
      {images?.map((image: any, imgIndex: number) => (
        <li key={imgIndex} className="min-w-9/10 sm:min-w-4/10 snap-start">
          <Image
            src={urlForImage(image.image).url()}
            alt={image.alt || "Gallery Image " + (imgIndex + 1)}
            width={500}
            height={800}
            className="aspect-[5/8] object-cover w-full"
          />
        </li>
      ))}
    </ul>
  );
}
