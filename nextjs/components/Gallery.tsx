import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { SanityImage } from "@/types";

export default function Gallery({ images }: { images: SanityImage[] }) {
  return (
    <ul className="w-full py-4 flex flex-row gap-2 md:gap-4 overflow-x-auto no-scrollbar overflow-y-hidden snap-x snap-mandatory no-scrollbar scroll-smooth lg:grid lg:grid-cols-3">
      {images?.map((imageObj, imgIndex: number) => (
        <li key={imgIndex} className="min-w-9/10 sm:min-w-4/10 snap-start">
          <Image
            src={urlForImage(imageObj.image).url()}
            alt={imageObj.alt || "Gallery Image " + (imgIndex + 1)}
            width={500}
            height={800}
            className="aspect-[5/8] object-cover w-full"
          />
        </li>
      ))}
    </ul>
  );
}
