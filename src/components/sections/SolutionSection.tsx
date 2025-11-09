"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, MousePointer2, Camera, Edit3 } from "lucide-react";
import { FeatureCard } from "../ui/FeatureCard";

const features = [
  {
    icon: Sparkles,
    title: "Text-to-Image Magic",
    badge: "Most Popular",
    description: "Convert any copied text into stunning visual snapshots",
    bullets: [
      "35+ premium gradient themes (Aurora, Crimson, Tropical, etc.)",
      "Customizable cards (width, padding, window chrome)",
      "Perfect for social media, presentations, and documentation",
      "4x scale rendering for ultra-crisp quality",
    ],
    visual: (
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Coral", from: "from-coral", to: "to-peach" },
          { name: "Teal", from: "from-teal", to: "to-secondary" },
          { name: "Sunset", from: "from-peach", to: "to-accent" },
          { name: "Ocean", from: "from-secondary", to: "to-teal-dark" },
          { name: "Mint", from: "from-mint", to: "to-teal" },
          { name: "Warm", from: "from-accent", to: "to-coral" },
        ].map((theme, i) => (
          <div
            key={i}
            className={`aspect-square rounded-xl bg-gradient-to-br ${theme.from} ${theme.to} p-3 flex items-end shadow-lg transform hover:scale-105 transition-transform`}
          >
            <span className="text-white text-xs font-bold drop-shadow-md">{theme.name}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: MousePointer2,
    title: "Revolutionary Two-Point Selection",
    badge: "Innovation",
    description: "Never lose your selection again while scrolling",
    bullets: [
      "Click start point → scroll naturally → click end point",
      "Works across multiple paragraphs and pages",
      "Visual brackets show your selection in real-time",
      "No more fighting with click-and-drag",
    ],
    visual: (
      <div className="bg-gradient-to-br from-teal/10 to-secondary/10 rounded-2xl p-4 border-2 border-teal/20">
        <div className="space-y-2">
          <div className="h-2 bg-teal/30 rounded-full w-full" />
          <div className="h-2 bg-teal/40 rounded-full w-5/6" />
          <div className="h-2 bg-gradient-to-r from-teal to-secondary rounded-full w-full border-2 border-teal shadow-md" />
          <div className="h-2 bg-gradient-to-r from-teal to-secondary rounded-full w-4/6 border-2 border-teal shadow-md" />
          <div className="h-2 bg-teal/40 rounded-full w-5/6" />
          <div className="h-2 bg-teal/30 rounded-full w-full" />
        </div>
        <p className="text-xs text-center bg-gradient-to-r from-teal to-secondary bg-clip-text text-transparent mt-3 font-bold">Selection in Progress ✨</p>
      </div>
    ),
  },
  {
    icon: Camera,
    title: "Professional Screenshot Capture",
    description: "Capture anything, anywhere, perfectly",
    bullets: [
      "Full-page screenshots with smart stitching",
      "Real-time progress tracking (0-100%)",
      "Visible area capture (instant, clean)",
      "Auto-compression keeps files under 8MB",
      "Handles pages up to 32,767px height",
    ],
    visual: (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div className="bg-gradient-primary h-3 rounded-full w-3/4" />
          </div>
          <p className="text-center text-sm font-semibold text-primary">Capturing... 75%</p>
          <div className="mt-4 text-center">
            <span className="text-4xl">🏔️</span>
            <p className="text-xs text-dark-lighter mt-2">Climbing the page...</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Edit3,
    title: "Advanced Editing & Annotation",
    description: "Professional results without professional tools",
    bullets: [
      "8+ annotation tools (arrows, shapes, blur, highlight)",
      "Full undo/redo system",
      "Crop, zoom, pan controls",
      "Color picker with opacity control",
      "Export as PNG or JPEG",
    ],
    visual: (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex gap-2 justify-center mb-3">
          {["🔴", "🔵", "🟢", "🟡", "🟣"].map((color, i) => (
            <div key={i} className="w-8 h-8 rounded-lg bg-white shadow flex items-center justify-center text-lg">
              {color}
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          {["↗️", "▭", "◯", "✏️", "🌈"].map((tool, i) => (
            <div key={i} className="w-8 h-8 rounded bg-white shadow flex items-center justify-center">
              {tool}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-dark-lighter mt-3">Annotation Toolbar</p>
      </div>
    ),
  },
];

export const SolutionSection: React.FC = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Everything You Need in One Powerful Extension
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
              bullets={feature.bullets}
              visual={feature.visual}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
