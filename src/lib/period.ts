import { localeTags, type Locale } from "@/i18n/routing";
import type { Period } from "@/content/projects";

/** "Dec 2023 – Present" in the reader's language. */
export function formatPeriod(period: Period, locale: Locale, present: string) {
  const fmt = new Intl.DateTimeFormat(localeTags[locale], { month: "short", year: "numeric", timeZone: "UTC" });
  const toDate = (m: string) => {
    const [y, mo] = m.split("-").map(Number);
    return new Date(Date.UTC(y, mo - 1, 1));
  };
  const start = fmt.format(toDate(period.start));
  const end = period.end ? fmt.format(toDate(period.end)) : present;
  return start === end ? start : `${start} – ${end}`;
}
