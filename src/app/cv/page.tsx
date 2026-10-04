import { cv, type CvRole } from "@/content/cv";
import { getCompany } from "@/content/projects";
import { site } from "@/config/site";
import { formatPeriod } from "@/lib/period";
import { PrintButton } from "./print-button";

const PDF = "/toluwalope-akinkunmi-cv.pdf";

const bare = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Role({ entry }: { entry: CvRole }) {
  const period = formatPeriod(getCompany(entry.company).period, "en", "Present");
  return (
    <section className="cv-role">
      <header className="cv-role-head">
        <h3>
          {entry.name}
          {entry.url && <span className="cv-muted"> · {entry.url}</span>}
        </h3>
        <span className="cv-period">{period}</span>
      </header>
      <p className="cv-role-title">{entry.role}</p>
      <ul>
        {entry.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </section>
  );
}

export default function CvPage() {
  const linkedin = site.socials.find((s) => s.id === "linkedin")!;
  const github = site.socials.find((s) => s.id === "github")!;
  const [first, second] = cv.pages;

  return (
    <main className="cv-root">
      <nav className="cv-toolbar" aria-label="CV actions">
        <a href={site.url} className="cv-link">
          ← {bare(site.url)}
        </a>
        <div className="cv-actions">
          <PrintButton>Print</PrintButton>
          <a href={PDF} download className="cv-button cv-button-primary">
            Download PDF
          </a>
        </div>
      </nav>

      <article className="cv-page" aria-label="CV, page 1">
        <header className="cv-header">
          <div>
            <h1>{site.name}</h1>
            <p className="cv-headline">{cv.headline}</p>
          </div>
          <ul className="cv-contact">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.url}>{bare(site.url)}</a>
            </li>
            <li>
              <a href={github.href}>{bare(github.href)}</a>
            </li>
            <li>
              <a href={linkedin.href}>{bare(linkedin.href).replace("www.", "")}</a>
            </li>
          </ul>
        </header>

        <p className="cv-summary">{cv.summary}</p>

        <h2>Experience</h2>
        {first.map((entry) => (
          <Role key={entry.company} entry={entry} />
        ))}
        <footer className="cv-page-foot">1 / 2</footer>
      </article>

      <article className="cv-page" aria-label="CV, page 2">
        <h2 className="cv-continued">Experience, continued</h2>
        {second.map((entry) => (
          <Role key={entry.company} entry={entry} />
        ))}

        <h2>Projects</h2>
        {cv.projects.map((p) => (
          <p key={p.name} className="cv-project">
            <strong>{p.name}.</strong> {p.detail}
          </p>
        ))}

        <h2>Skills</h2>
        <dl className="cv-skills">
          {cv.skills.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>

        <h2>More</h2>
        <p className="cv-more">
          Case studies, system diagrams and notes on how I design systems:{" "}
          <a href={`${site.url}/work`}>{bare(site.url)}/work</a> ·{" "}
          <a href={`${site.url}/notes`}>{bare(site.url)}/notes</a>
        </p>
        <footer className="cv-page-foot">2 / 2</footer>
      </article>
    </main>
  );
}
