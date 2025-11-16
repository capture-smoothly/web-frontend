"use client";

import React from "react";
import { motion } from "motion/react";
import { AlertCircle, ImageOff, Layers } from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "Lost Selections",
    description: "Ever tried selecting long text, only to lose your selection when you scroll? We've all been there.",
    iconColor: "text-coral",
    bgColor: "bg-gradient-to-br from-coral/10 to-peach/10",
    borderColor: "border-coral/30",
  },
  {
    icon: ImageOff,
    title: "Boring Text Posts",
    description: "Plain text screenshots look unprofessional on social media. You need styled, branded graphics that stand out in the feed.",
    iconColor: "text-peach-dark",
    bgColor: "bg-gradient-to-br from-peach/10 to-accent/10",
    borderColor: "border-peach/30",
  },
  {
    icon: Layers,
    title: "Cluttered Workflow",
    description: "Juggling 5 different tools just to capture, edit, and share a simple screenshot? There's a better way.",
    iconColor: "text-accent-dark",
    bgColor: "bg-gradient-to-br from-accent/10 to-mint/10",
    borderColor: "border-accent/30",
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Tired of These Screenshot Frustrations?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-colorful hover:shadow-card-hover transition-all duration-300 border-2 ${problem.borderColor}`}
            >
              <div className={`w-16 h-16 rounded-2xl ${problem.bgColor} flex items-center justify-center mb-6 shadow-lg`}>
                <problem.icon className={`w-8 h-8 ${problem.iconColor}`} />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">{problem.title}</h3>
              <p className="text-dark-lighter leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
