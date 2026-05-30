/**
 * Centralized OG Image metadata helpers.
 * All OG images are 1200 × 630 px JPEG.
 * All URLs use the absolute production domain.
 */

const BASE_URL = "https://www.rizwanulafraim.com";

export type OGSection =
  | "homepage"
  | "blog"
  | "case-studies"
  | "projects"
  | "research"
  | "solutions"
  | "wiki"
  | "manifesto";

const OG_IMAGE_MAP: Record<OGSection, { file: string; alt: string }> = {
  homepage: {
    file: "og-image.jpg",
    alt: "Rizwanul Islam Afraim — Marketing, Sales & Systems",
  },
  blog: {
    file: "og-blog.jpg",
    alt: "Blog — The Thinking Behind Better Systems",
  },
  "case-studies": {
    file: "og-case-studies.jpg",
    alt: "Case Studies — Proof Behind the Systems",
  },
  projects: {
    file: "og-projects.jpg",
    alt: "Projects — Built From Idea to Execution",
  },
  research: {
    file: "og-research.jpg",
    alt: "Research — SSRN-Backed Systems Thinking",
  },
  solutions: {
    file: "og-solutions.jpg",
    alt: "Solutions — Build the Right Business System",
  },
  wiki: {
    file: "og-wiki.jpg",
    alt: "Wiki — The Vocabulary of Business Systems",
  },
  manifesto: {
    file: "og-manifesto.jpg",
    alt: 'Manifesto — Structure Beats "We\'ll Figure It Out"',
  },
};

/**
 * Returns the full OG image metadata fields for a given section.
 * Use in openGraph.images and twitter.images arrays.
 */
export function getOGImage(section: OGSection) {
  const { file, alt } = OG_IMAGE_MAP[section];
  const url = `${BASE_URL}/${file}`;
  return {
    openGraphImage: {
      url,
      secureUrl: url,
      type: "image/jpeg" as const,
      width: 1200,
      height: 630,
      alt,
    },
    twitterImage: {
      url,
      alt,
    },
  };
}

/**
 * Returns full OpenGraph metadata block for a page.
 * Merges section image with provided title/description.
 */
export function buildOGMetadata(
  section: OGSection,
  opts: {
    title: string;
    description: string;
    url: string;
    type?: "website" | "article";
  }
) {
  const { openGraphImage, twitterImage } = getOGImage(section);
  return {
    openGraph: {
      type: opts.type || ("website" as const),
      locale: "en_US",
      url: opts.url,
      title: opts.title,
      description: opts.description,
      siteName: "Rizwanul Islam Afraim",
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: opts.title,
      description: opts.description,
      images: [twitterImage],
      creator: "@rizwanul_afraim",
    },
  };
}
