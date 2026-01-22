"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { certifications } from "@/data/certifications";

export function Certifications() {
  // Only show if there are certifications
  if (certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="py-32 bg-secondary/5 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Certifications & <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Professional certifications and credentials demonstrating expertise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-background border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/20 border border-primary/30">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-foreground mb-1">{cert.name}</div>
                  {cert.issuerUrl ? (
                    <a
                      href={cert.issuerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {cert.issuer}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="text-sm text-foreground/70">{cert.issuer}</p>
                  )}
                </div>
              </div>

              {cert.description && (
                <p className="text-sm text-foreground/70 mb-4">{cert.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </div>
                {cert.expiryDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  Verify Credential <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

