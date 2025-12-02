"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Cloud,
  Video,
  BarChart3,
  Link2,
  Users,
  Smartphone,
  Search,
  Bot,
  Image,
  Repeat,
  Chrome,
  CreditCard,
  Mail,
  Globe,
  FileText,
} from "lucide-react";

const roadmapPhases = [
  {
    phase: "Phase 1: Launch (December 2025) - Done!",
    features: [
      { icon: Chrome, label: "Chrome Store publication" },
      { icon: Mail, label: "Email support system" },
      { icon: Globe, label: "Landing page with documentation" },
    ],
  },
  {
    phase: "Phase 2: Q1 2026",
    features: [
      { icon: Cloud, label: "Cloud storage with shareable links" },
      { icon: Video, label: "Video & GIF screen recording" },
      { icon: BarChart3, label: "Personal analytics dashboard" },
    ],
  },
  {
    phase: "Phase 3: Q2 2026",
    features: [
      { icon: Link2, label: "Slack & Microsoft Teams integration" },
      { icon: Users, label: "Real-time team collaboration" },
      { icon: Smartphone, label: "Mobile companion app (iOS & Android)" },
    ],
  },
];

export const RoadmapSection: React.FC = () => {
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
            We&apos;re Just Getting Started
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-primary/20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full bg-gradient-primary"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  <div className="absolute -top-4 left-8 bg-gradient-primary text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                    {phase.phase}
                  </div>

                  <div className="mt-4 space-y-4">
                    {phase.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <feature.icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-dark-lighter pt-2">
                          {feature.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12 text-dark-lighter"
        >
          Have a feature request?{" "}
          <Link href="/support" className="text-primary font-semibold hover:underline">
            Let us know!
          </Link>
        </motion.p>
      </div>
    </section>
  );
};
