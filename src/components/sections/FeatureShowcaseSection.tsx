"use client";

import React from "react";
import { motion } from "motion/react";
import { Tabs } from "../ui/Tabs";
import Image from "next/image";

const showcaseTabs = [
  {
    id: "screenshot",
    label: "Screenshot Tools",
    content: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-dark mb-4">Professional Screenshot Capture</h3>
          <ul className="space-y-3">
            {[
              "Visible Area Screenshot (Ctrl+Shift+Y)",
              "Full Page Screenshot with progress (Ctrl+Shift+U)",
              "Progress tracker with \"mountain climbing\" visual",
              "Handles pages up to 32,767px height",
              "Auto PNG→JPEG conversion if >5MB",
              "Smart stitching algorithm for long pages",
              "Works on ALL websites",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/demo/Color_Theems.png"
            alt="Professional Screenshot Capture with Color Themes"
            width={800}
            height={600}
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    id: "text-capture",
    label: "Text Capture",
    content: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-dark mb-4">Smart Text Capture</h3>
          <ul className="space-y-3">
            {[
              "Copy Capture Mode (Alt+Shift+J) - auto-detects text",
              "Copy Selection Mode (Alt+Shift+K) - two-point selection",
              "Preserves HTML formatting & styles",
              "Smart content cleaning (removes clutter)",
              "Works on any webpage",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/demo/Convert_Docs.png"
            alt="Text Capture - Convert Boring Docs to Beautiful Presentable Docs"
            width={800}
            height={600}
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    id: "text-to-image",
    label: "Text-to-Image",
    content: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-dark mb-4">Beautiful Text Snapshots</h3>
          <ul className="space-y-3">
            {[
              "100+ premium themes across 5 categories",
              "Real-time preview with 5x7 theme grid",
              "Customizable card width (600-1400px)",
              "Window chrome toggle (macOS-style browser frame)",
              "Export as PNG/JPEG with smart compression",
              "Transparent backgrounds option",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/demo/Text_Editor.png"
            alt="Text-to-Image Editor"
            width={800}
            height={600}
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
  {
    id: "editing",
    label: "Editing Tools",
    content: (
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-dark mb-4">Professional Editing Suite</h3>
          <ul className="space-y-3">
            {[
              "Rectangle & Circle (filled/outline)",
              "Arrow with directional endpoints",
              "Straight lines & freehand drawing",
              "Highlight tool for emphasis",
              "Blur/Pixelate for redacting sensitive info",
              "Freeform & border crop tools",
              "Pan & zoom with mouse wheel",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/demo/Editor_Image.png"
            alt="Advanced Editing & Annotation Tools"
            width={800}
            height={600}
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    ),
  },
];

export const FeatureShowcaseSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Packed with Features You&apos;ll Actually Use
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs tabs={showcaseTabs} />
        </motion.div>
      </div>
    </section>
  );
};
