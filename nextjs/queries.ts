import { defineQuery } from "next-sanity";

export const HOME_QUERY = defineQuery(`
  *[_type == "home"][0]{
    title,
    homeImage,
    pageBuilder[]{
      _type == "richText" => {
        _type,
        content
      },
      _type == "gallery" => {
        _type,
        images
      },
      _type == "spotifyPlayer" => {
        _type,
        url,
        size
      },
      _type == "videos" => {
        _type,
        title,
        videos[] {
          _type,
          url,
          caption
        }
      }
    }
  }
`);

export const ALBUM_QUERY = defineQuery(`
  *[_type == "albums"] | order(releaseDate desc) {
    title,
    coverArt,
    releaseDate,
    spotifyLink,
    trackList,
    personnel,
    description
  }
`);

export const SINGLES_QUERY = defineQuery(`
  *[_type == "Singles"] | order(releaseDate desc) {
    title,
    coverArt,
    releaseDate,
    spotifyLink
  }
`);

export const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]{
  title,
  content,
  image
}`);

export const UPCOMING_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date >= $today] | order(date asc) {
  date,
  time,
  location,
  ticketsLink,
  description
}`);

export const PAST_CONCERTS_QUERY =
  defineQuery(`*[_type == "concerts" && date < $today] | order(date desc) {
  date,
  location,
  description
}`);
