"use client";

import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Briefcase, Palette } from "lucide-react";
import { Button } from "../ui/Button";

const useCases = [
  {
    icon: GraduationCap,
    emoji: "📚",
    title: "For Students",
    quote: "Capture lecture slides, create stunning study guides, and cite sources with ease. The text-to-image feature makes my notes Instagram-worthy!",
    benefits: [
      "Quick lecture capture during presentations",
      "Beautiful study materials from any webpage",
      "Research paper citations made simple",
    ],
    cta: "Perfect for Academic Success",
  },
  {
    icon: Briefcase,
    emoji: "💼",
    title: "For Professionals",
    quote: "Document processes, annotate bug reports, and create presentations faster than ever. The blur tool is a lifesaver for sensitive data.",
    benefits: [
      "Step-by-step documentation with annotations",
      "Bug reports with visual evidence",
      "Client presentations with professional polish",
    ],
    cta: "Boost Your Productivity",
  },
  {
    icon: Palette,
    emoji: "✨",
    title: "For Content Creators",
    quote: "Turn quotes into viral social media posts in seconds. The 35 themes give me endless creative options without touching Photoshop.",
    benefits: [
      "Quote graphics for social media",
      "Testimonial screenshots with branding",
      "Tutorial content with annotations",
    ],
    cta: "Create Scroll-Stopping Content",
  },
];

export const UseCasesSection: React.FC = () => {
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
            Built for Everyone Who Works with Content
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="text-5xl mb-4">{useCase.emoji}</div>
              <h3 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
                <useCase.icon className="w-6 h-6 text-primary" />
                {useCase.title}
              </h3>

              <blockquote className="mb-6 italic text-dark-lighter leading-relaxed border-l-4 border-primary pl-4">
                &ldquo;{useCase.quote}&rdquo;
              </blockquote>

              <ul className="space-y-2 mb-6">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-dark-lighter">
                    <span className="text-accent mt-1">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full">
                {useCase.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
