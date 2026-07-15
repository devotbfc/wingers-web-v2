import {
  dayKeys,
  dayLabels,
  formatRange,
  type Location,
} from "@/lib/locations";

interface OpeningHoursTableProps {
  location: Location;
}

export function OpeningHoursTable({ location }: OpeningHoursTableProps) {
  return (
    <table
      data-hours-table={location.slug}
      className="w-full border-collapse text-left font-body"
    >
      <caption className="sr-only">
        Weekly opening hours for {location.name}
      </caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {dayKeys.map((dayKey) => {
          const hours = location.openingHours[dayKey];
          const range = formatRange(hours);
          return (
            <tr
              key={dayKey}
              data-day-key={dayKey}
              className="border-b border-brand-black/10 last:border-b-0"
            >
              <th
                scope="row"
                className="relative py-3 pl-5 pr-3 font-display text-base font-bold uppercase tracking-wide text-brand-black"
              >
                <span
                  aria-hidden="true"
                  className="hours-today-bar absolute left-0 top-2 bottom-2 w-1 bg-brand-pink"
                />
                {dayLabels[dayKey]}
              </th>
              <td
                className={`py-3 pr-4 text-right tabular-nums font-display text-base tracking-wide ${
                  hours.closed ? "text-brand-black/40" : "text-brand-black/80"
                }`}
              >
                {range}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
