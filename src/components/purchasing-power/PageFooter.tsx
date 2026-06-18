import Link from 'next/link';

export function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="section-inner page-footer__inner">
        <p>Purchasing Power Roadmap is a portfolio project by Rizwanul Afraim.</p>
        <nav aria-label="Footer">
          <Link href="/tools/purchasing-power/methodology#disclaimer">Disclaimer</Link>
          <Link href="/tools/purchasing-power/methodology#data-sources">Data sources</Link>
          <Link href="/tools/purchasing-power/methodology#corrections">Corrections</Link>
        </nav>
      </div>
    </footer>
  );
}
