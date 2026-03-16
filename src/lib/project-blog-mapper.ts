export const projectToBlogSlugMap: Record<string, string> = {
    "gaari": "building-gaari-booking-system",
    "the-trail": "launching-trail-news-platform",
    "yagacalls": "4-layer-seo-framework-yagacalls",
    "leads-sales-crm": "building-leads-and-sales-crm",
    "arrivals-cave": "meta-capi-nextjs",
    "inshortbd": "playwright-cicd",
    "shahriar-kabir": "deterministic-motion-editorial-ux",
};

export function getBlogSlugForProject(projectSlug: string): string | null {
    return projectToBlogSlugMap[projectSlug] || null;
}

export function getCaseStudySlugForProject(projectSlug: string): string | null {
    const map: Record<string, string> = {
        "gaari": "gaari",
        "the-trail": "the-trail",
        "yagacalls": "yagacalls",
        "carnival-of-crust": "carnival-of-crust",
        "leads-sales-crm": "leads-sales-crm",
        "inshortbd": "inshortbd",
        "arrivals-cave": "arrivalscave",
        "shahriar-kabir": "shahriar-portfolio"
    };
    return map[projectSlug] || null;
}
