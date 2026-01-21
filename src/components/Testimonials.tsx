"use client";

import { motion } from "framer-motion";
import { Quote, Star, ExternalLink } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { format } from "date-fns";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

export function Testimonials() {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-32 md:py-40 bg-secondary/5 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            Testimonials
          </motion.span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl heading-text mb-6">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Testimonials from clients and colleagues I&apos;ve worked with.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              whileHover={hoverScale}
              className="relative p-6 rounded-xl bg-background border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all group"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              <p className="text-foreground/80 mb-6 leading-relaxed">&quot;{testimonial.content}&quot;</p>

              {testimonial.rating && (
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-foreground/70">
                    {testimonial.role}
                    {testimonial.company && (
                      <>
                        {" "}at{" "}
                        {testimonial.companyUrl ? (
                          <a
                            href={testimonial.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {testimonial.company}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          testimonial.company
                        )}
                      </>
                    )}
                  </div>
                  {testimonial.date && (
                    <div className="text-xs text-foreground/60 mt-1">
                      {format(new Date(testimonial.date), "MMMM yyyy")}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

