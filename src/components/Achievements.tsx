"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Database, Layers, Users, TrendingUp, Zap } from "lucide-react";

interface Stat {
  icon: typeof Code;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: Code,
    label: "Components Built",
    value: 150,
    suffix: "+",
    color: "text-emerald-400",
  },
  {
    icon: Layers,
    label: "API Endpoints",
    value: 110,
    suffix: "+",
    color: "text-blue-400",
  },
  {
    icon: Database,
    label: "Database Tables",
    value: 30,
    suffix: "+",
    color: "text-purple-400",
  },
  {
    icon: Code,
    label: "Lines of Code",
    value: 10000,
    suffix: "+",
    color: "text-orange-400",
  },
  {
    icon: TrendingUp,
    label: "Production Ventures",
    value: 6,
    suffix: "",
    color: "text-pink-400",
  },
  {
    icon: Users,
    label: "Event Attendees",
    value: 25000,
    suffix: "+",
    color: "text-cyan-400",
  },
  {
    icon: Database,
    label: "Data Points Processed",
    value: 1000000,
    suffix: "+",
    color: "text-yellow-400",
  },
  {
    icon: Zap,
    label: "Lighthouse Score",
    value: 98,
    suffix: "/100",
    color: "text-green-400",
  },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className={color}>
      {formatNumber(count)}
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-32 bg-secondary/5 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            By The <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Quantifying impact through strategy, execution, and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-background border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all hover:bg-secondary/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-4 p-3 rounded-lg bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 ${stat.color.replace("text-", "group-hover:bg-")} group-hover:border-primary/30 transition-colors`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
                  </div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-background border border-foreground/10 dark:border-white/5 text-center">
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <div className="text-foreground/70">Type-Safe Development</div>
          </div>
          <div className="p-6 rounded-xl bg-background border border-foreground/10 dark:border-white/5 text-center">
            <div className="text-2xl font-bold text-primary mb-2">6</div>
            <div className="text-foreground/70">Production Ventures</div>
          </div>
          <div className="p-6 rounded-xl bg-background border border-foreground/10 dark:border-white/5 text-center">
            <div className="text-2xl font-bold text-primary mb-2">200+</div>
            <div className="text-foreground/70">Team Members Led</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

