import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

// Base image type used throughout the schema
export type SanityImage = {
  image: SanityImageSource;
  alt?: string;
  caption?: string;
};

// Rich text block type
export type RichTextBlock = {
  _type: "richText";
  content: PortableTextBlock[];
};

// Gallery block type
export type GalleryBlock = {
  _type: "gallery";
  title?: string;
  images: SanityImage[];
};

// Spotify player block type
export type SpotifyBlock = {
  _type: "spotifyPlayer";
  url: string;
  size: "compact" | "regular" | "large";
};

// Video block type
export type VideoBlock = {
  _type: "videos";
  videos: Array<{
    _type: string;
    url: string;
    caption: string;
  }>;
};

// Union type for all page builder blocks
export type PageBuilderBlock =
  | RichTextBlock
  | GalleryBlock
  | SpotifyBlock
  | VideoBlock;

// Main HomePage type
export type HomePage = {
  title?: string;
  homeImage?: SanityImage;
  pageBuilder?: PageBuilderBlock[];
};

// About page type
export type AboutPage = {
  title?: string;
  image?: SanityImageSource;
  content?: PortableTextBlock[];
};

export type Concert = {
  date?: string;
  time?: string;
  location?: string;
  ticketsLink?: string;
  description?: string;
};
