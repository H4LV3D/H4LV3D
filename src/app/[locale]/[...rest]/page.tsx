import { notFound } from "next/navigation";

/** Unknown localised paths render the localised not-found page. */
export default function CatchAll() {
  notFound();
}
