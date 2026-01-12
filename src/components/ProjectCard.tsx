"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Database, Layers, Zap, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ImageHover3D } from "./ImageHover3D";
import { hoverScale } from "@/lib/animations";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const metrics = [
        project.metrics?.components && { icon: Code, label: "Components", value: `${project.metrics.components}+` },
        project.metrics?.apiEndpoints && { icon: Layers, label: "APIs", value: `${project.metrics.apiEndpoints}+` },
        project.metrics?.databaseTables && { icon: Database, label: "Tables", value: `${project.metrics.databaseTables}+` },
        project.performance?.lighthouse && { icon: Zap, label: "Lighthouse", value: `${project.performance.lighthouse}/100` },
    ].filter(Boolean) as Array<{ icon: typeof Code; label: string; value: string }>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={hoverScale}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative rounded-xl bg-secondary/30 border border-foreground/10 overflow-hidden hover:border-primary/50 transition-all max-w-full box-border"
        >
            {/* Project Image/Screenshot with 3D Hover */}
            {(project.image || (project.screenshots && project.screenshots.length > 0)) && (
                <div className="relative h-48 w-full overflow-hidden">
                    <ImageHover3D
                        src={project.image || project.screenshots?.[0] || ""}
                        alt={`${project.title} - Strategic Web Application developed by Rizwanul Islam (Afraim)`}
                        width={800}
                        height={400}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
                </div>
            )}

            <div className="p-4 sm:p-5 md:p-6 lg:p-8 overflow-hidden">
                <div className="mb-4">
                    <div className="flex items-start justify-between gap-3 md:gap-4">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>
                        {project.status === "production" && (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Live
                            </span>
                        )}
                    </div>
                    <div className="text-sm text-foreground/50 mt-1">{project.year}</div>
                </div>

                <p className="text-foreground/70 mb-4 line-clamp-3 break-words">
                    {project.description}
                </p>

                {/* Metrics */}
                {metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {metrics.map((metric, idx) => {
                            const Icon = metric.icon;
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-foreground/5 border border-foreground/10"
                                >
                                    <Icon className="w-4 h-4 text-primary" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-foreground/50">{metric.label}</div>
                                        <div className="text-sm font-semibold text-foreground">{metric.value}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Tech Stack Preview */}
                {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 text-xs font-medium rounded bg-foreground/5 text-foreground/80 border border-foreground/10"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.techStack.length > 4 && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-foreground/5 text-foreground/60 border border-foreground/10">
                                +{project.techStack.length - 4} more
                            </span>
                        )}
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 text-foreground/80 border border-foreground/10"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Expandable Details */}
                {project.longDescription && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors mb-4"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-4 h-4" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4" />
                                Learn More
                            </>
                        )}
                    </button>
                )}

                {isExpanded && project.longDescription && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 text-sm text-foreground/70 space-y-2"
                    >
                        <p>{project.longDescription}</p>
                        {project.challenges && project.challenges.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-foreground font-semibold mb-2">Key Challenges:</h4>
                                <ul className="list-disc list-inside space-y-1 text-foreground/70">
                                    {project.challenges.map((challenge, idx) => (
                                        <li key={idx}>{challenge}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Action Links */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Visit Project <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                        </a>
                    )}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center text-sm font-medium text-foreground/70 hover:text-primary transition-colors sm:ml-auto"
                    >
                        View Details →
                    </Link>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
        </motion.div>
    );
}
