"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { Badge } from "./Badge";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  bullets?: string[];
  visual?: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  badge,
  bullets,
  visual,
  className,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={clsx(
        "bg-white rounded-2xl p-8 shadow-card transition-all duration-300",
        "border border-gray-100 hover:border-primary/30",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-dark">{title}</h3>
            {badge && <Badge variant="success">{badge}</Badge>}
          </div>
        </div>
      </div>

      <p className="text-dark-lighter mb-4 leading-relaxed">{description}</p>

      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 mb-4">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-sm text-dark-lighter flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {visual && <div className="mt-6">{visual}</div>}
    </motion.div>
  );
};
