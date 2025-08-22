import { Concert } from "@/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ConcertList({
  upcoming_concerts,
  past_concerts,
}: {
  upcoming_concerts: Concert[];
  past_concerts: Concert[];
}) {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <>
      {upcoming_concerts.length > 0 && (
        <section className="mt-10">
          <h2>Upcoming concerts</h2>
          <ul className="space-y-2">
            {upcoming_concerts.map((concert, index) => (
              <li
                key={index}
                className="flex justify-between max-w-md py-1 border-b border-gray-300"
              >
                <div>
                  <h3>{concert.location}</h3>
                  <p>
                    {formatDate(concert.date || "")} - {concert.time}
                  </p>
                </div>
                {concert.ticketsLink && (
                  <div className="flex items-end">
                    <Link
                      href={concert.ticketsLink}
                      target="_blank"
                      className="flex gap-1 hover:underline px-2"
                    >
                      Tickets
                      <ExternalLink strokeWidth={1} />
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      {past_concerts.length > 0 && (
        <section className="mt-10">
          <h2>Past concerts</h2>

          <ul className="space-y-2">
            {past_concerts.map((concert, index) => (
              <li
                key={index}
                className="max-w-md py-1 border-b border-gray-300"
              >
                <h3>{concert.location}</h3>
                <p>{formatDate(concert.date || "")}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
