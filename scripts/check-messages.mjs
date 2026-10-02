// Fails if any locale is missing (or has extra) message keys compared to en.json.
import { readFileSync, readdirSync } from "node:fs";

const flat = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? flat(v, `${p}${k}.`) : [`${p}${k}`]));
const load = (f) => new Set(flat(JSON.parse(readFileSync(`messages/${f}`, "utf8"))));

const base = load("en.json");
let failed = false;
for (const file of readdirSync("messages").filter((f) => f.endsWith(".json") && f !== "en.json")) {
  const keys = load(file);
  const missing = [...base].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !base.has(k));
  if (missing.length || extra.length) {
    failed = true;
    console.error(`${file}: missing ${JSON.stringify(missing)} extra ${JSON.stringify(extra)}`);
  }
}
if (failed) process.exit(1);
console.log("messages: all locales match en.json");
