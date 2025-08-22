function getEmbedUrl(url?: string) {
  if (!url) return "";
  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\&\?\/]+)/
  );
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  return url; // fallback if it's already an embed or a different provider
}

export default function VideoBlock({
  videos,
}: {
  videos: Array<{
    _type: string;
    url: string;
    caption: string;
  }>;
}) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {videos.map((video) => {
        const embedUrl = getEmbedUrl(video.url);
        return (
          <li key={video.url}>
            {video.caption && <h2>{video.caption}</h2>}
            {embedUrl && (
              <iframe
                src={embedUrl}
                title={video.caption}
                className="w-full aspect-video"
                allowFullScreen
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
