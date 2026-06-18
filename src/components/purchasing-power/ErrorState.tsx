import Link from 'next/link';

type ErrorStateProps = {
  title: string;
  message: string;
  years?: Array<{ label: string; href: string }>;
};

export function ErrorState({ title, message, years }: ErrorStateProps) {
  return (
    <main className="error-state">
      <section className="section-inner">
        <p className="eyebrow">Unavailable</p>
        <h1>{title}</h1>
        <p className="lead">{message}</p>
        {years?.length ? (
          <div className="year-links" aria-label="Nearest available years">
            {years.map((year) => (
              <Link key={year.href} href={year.href}>
                {year.label}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="cta-row">
          <Link className="button button--primary" href="/tools/purchasing-power">
            Back to calculator
          </Link>
          <Link className="button" href="/tools/purchasing-power/methodology">
            Methodology
          </Link>
        </div>
      </section>
    </main>
  );
}
