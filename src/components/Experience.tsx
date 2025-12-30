"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, ExternalLink } from "lucide-react";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="py-32 bg-background/85 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Building products, leading teams, and driving innovation across multiple ventures.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line - Vertical line on the left */}
          <div className="absolute left-6 md:left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-12 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 hidden md:block" />

                {/* Content Card */}
                <div className="ml-0 md:ml-24">
                  <div className="p-6 md:p-8 rounded-xl bg-secondary/30 border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all group">
                    {/* Header Section */}
                    <div className="mb-6">
                      {/* Role and Company Row */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 text-lg text-primary mb-3">
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:underline font-medium"
                              >
                                {exp.company}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            ) : (
                              <span className="font-medium">{exp.company}</span>
                            )}
                          </div>
                        </div>
                        {exp.type === "founder" && (
                          <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium self-start">
                            Founder
                          </span>
                        )}
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-foreground/70 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <span className="capitalize">{exp.type.replace("-", " ")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/80 leading-relaxed mb-6 text-base">
                      {exp.description}
                    </p>

                    {/* Achievements Section */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-base font-semibold text-foreground mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="text-sm text-foreground/70 flex items-start gap-3">
                              <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Section */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/10 dark:border-white/5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 text-xs rounded-lg bg-foreground/5 dark:bg-white/5 text-foreground/80 dark:text-gray-300 border border-foreground/10 dark:border-white/10 hover:border-primary/30 hover:text-primary transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
