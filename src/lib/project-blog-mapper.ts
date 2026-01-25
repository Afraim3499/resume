export const projectToBlogSlugMap: Record<string, string> = {
    "gaari": "building-gaari-booking-system",
    "the-trail": "launching-trail-news-platform",
    "yagacalls": "4-layer-seo-framework-yagacalls",
    "leads-sales-crm": "building-leads-and-sales-crm",
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
        "leads-sales-crm": "leads-sales-crm"
    };
    return map[projectSlug] || null;
}
