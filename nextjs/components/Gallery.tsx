import React from "react";
import Image from "next/image";
import { urlForImage } from "@/sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function Gallery({ images }: { images: SanityImageSource[] }) {
  return (
    <ul>
      {images?.map((image: any, imgIndex: number) => (
        <li key={imgIndex}>
          <Image
            src={urlForImage(image.image).url()}
            alt={image.alt || "Gallery Image " + (imgIndex + 1)}
            width={800}
            height={600}
          />
        </li>
      ))}
    </ul>
  );
}
