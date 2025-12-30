"use client";

import { motion } from "framer-motion";
import { Users, TrendingUp, Award, Code } from "lucide-react";
import { socialProof } from "@/data/social";

const proofItems = [
  {
    icon: Users,
    value: socialProof.communitySize,
    label: socialProof.communityLabel,
    color: "text-blue-400",
  },
  {
    icon: Code,
    value: `${socialProof.projects}`,
    label: "Production Projects",
    color: "text-emerald-400",
  },
  {
    icon: TrendingUp,
    value: socialProof.experience,
    label: `${socialProof.experienceLabel} Experience`,
    color: "text-purple-400",
  },
  {
    icon: Award,
    value: "100%",
    label: "Client Satisfaction",
    color: "text-yellow-400",
  },
];

export function SocialProof() {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-gray-400">
            Building products that scale and communities that grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-background border border-white/5 hover:border-primary/50 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4 ${item.color.replace("text-", "group-hover:bg-")}`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

