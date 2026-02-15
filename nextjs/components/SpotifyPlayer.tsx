import React from "react";

interface SpotifyPlayerProps {
  url: string;
  size?: "compact" | "regular" | "large";
}

export default function SpotifyPlayer({ url, size }: SpotifyPlayerProps) {
  const embedUrl = url.replace(
    "https://open.spotify.com/",
    "https://open.spotify.com/embed/",
  );
  return (
    <iframe
      data-testid="embed-iframe"
      src={embedUrl}
      width="100%"
      height={size === "large" ? 600 : size === "regular" ? 400 : 300}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
}
