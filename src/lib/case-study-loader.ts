
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { CaseStudy } from '../data/case-studies';

const contentDirectory = path.join(process.cwd(), 'src/content/case-studies');

export function getAllCaseStudies(): CaseStudy[] {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const files = fs.readdirSync(contentDirectory).filter(file => file.endsWith('.md'));

    const studies = files.map(filename => {
        const filePath = path.join(contentDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
            slug: data.slug,
            projectSlug: data.projectSlug,
            title: data.title,
            problem: data.problem,
            solution: data.solution,
            results: {
                metrics: data.results?.metrics || [],
                impact: data.results?.impact || '',
                improvements: data.results?.improvements || []
            },
            lessonsLearned: data.lessonsLearned || [],
            technologies: data.technologies || [],
            timeline: data.timeline,
            challenges: data.challenges || [],
            beforeAfter: data.beforeAfter || undefined,
        } as CaseStudy;
    });

    return studies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    // Check if file exists to save perf
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return undefined;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
        slug: data.slug,
        projectSlug: data.projectSlug,
        title: data.title,
        problem: data.problem,
        solution: data.solution,
        results: {
            metrics: data.results?.metrics || [],
            impact: data.results?.impact || '',
            improvements: data.results?.improvements || []
        },
        lessonsLearned: data.lessonsLearned || [],
        technologies: data.technologies || [],
        timeline: data.timeline,
        challenges: data.challenges || [],
        beforeAfter: data.beforeAfter || undefined
    } as CaseStudy;
}

export function getCaseStudyByProject(projectSlug: string): CaseStudy | undefined {
    const studies = getAllCaseStudies();
    return studies.find(s => s.projectSlug === projectSlug);
}
