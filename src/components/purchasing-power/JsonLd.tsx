import { stringifyJsonLd } from '@/lib/purchasing-power/seo';

type JsonLdProps = {
  data: unknown;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: stringifyJsonLd(data)
      }}
    />
  );
}
