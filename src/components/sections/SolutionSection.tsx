"use client";

import React from "react";
import { motion } from "motion/react";
import { Sparkles, MousePointer2, Camera, Edit3 } from "lucide-react";
import { FeatureCard } from "../ui/FeatureCard";
import Image from "next/image";

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
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/demo/Convert_Docs.png"
          alt="Convert Boring Docs to Beautiful Presentable Docs"
          width={800}
          height={600}
          className="w-full h-auto rounded-xl"
        />
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
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/demo/Text_Select.png"
          alt="Revolutionary Two-Point Selection"
          width={800}
          height={600}
          className="w-full h-auto rounded-xl"
        />
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
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/demo/One_Page.png"
          alt="Professional Screenshot Capture"
          width={800}
          height={600}
          className="w-full h-auto rounded-xl"
        />
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
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/demo/Editor_Image.png"
          alt="Advanced Editing & Annotation"
          width={800}
          height={600}
          className="w-full h-auto rounded-xl"
        />
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
