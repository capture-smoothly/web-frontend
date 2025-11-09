"use client";

import React from "react";
import { motion } from "motion/react";
import { Tabs } from "../ui/Tabs";

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
              "Smart compression & optimization",
              "High-DPI/Retina display support",
              "Auto-pauses videos during capture",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 aspect-square flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-dark-lighter">Screenshot Tools Interface</p>
          </div>
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
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 aspect-square flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-dark-lighter">Text Selection Interface</p>
          </div>
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
              "35+ premium themes across 5 categories",
              "Live preview grid",
              "Customizable card width (600-1400px)",
              "Adjustable padding (40-200px)",
              "Window chrome toggle (Light/Dark)",
              "Transparent backgrounds option",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["Aurora", "Crimson", "Tropical", "Ocean"].map((theme, i) => (
            <div key={i} className="bg-gradient-to-br from-primary to-secondary rounded-lg p-6 aspect-square flex items-end">
              <span className="text-white font-semibold text-sm">{theme}</span>
            </div>
          ))}
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
              "Drawing: Rectangle, Circle, Arrow, Lines, Freehand",
              "Annotation: Highlight, Blur/Pixelate",
              "Color picker with history",
              "Line weight & opacity controls",
              "Crop tools (freeform & border)",
              "Pan & zoom with smooth animations",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-accent text-xl">✓</span>
                <span className="text-dark-lighter">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 aspect-square flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-dark-lighter">Editing Toolbar</p>
          </div>
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
