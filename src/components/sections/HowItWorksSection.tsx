"use client";

import React from "react";
import { motion } from "motion/react";
import { Target, PenTool, Share2 } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Target,
    title: "Capture",
    description: "Press Ctrl+Shift+Y for quick screenshot, or use Copy Capture mode to grab text from any webpage. Our two-point selection makes long content a breeze.",
  },
  {
    number: 2,
    icon: PenTool,
    title: "Edit",
    description: "Annotate with arrows, blur sensitive info, highlight key points, or convert text into a themed snapshot. Your editing toolkit is always one click away.",
  },
  {
    number: 3,
    icon: Share2,
    title: "Share",
    description: "Copy to clipboard, save as PNG/JPEG, or upload to cloud (coming soon). Your perfect screenshot is ready in seconds, not minutes.",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-cta text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            From Capture to Share in 3 Simple Steps
          </h2>
        </motion.div>

        {/* Desktop - Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-white/20">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="h-full bg-white/60"
              />
            </div>

            <div className="grid grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center mb-6">
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-primary font-bold flex items-center justify-center text-xl">
                        {step.number}
                      </div>
                      <step.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-white/90 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile - Vertical Timeline */}
        <div className="md:hidden space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6"
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-12 top-24 bottom-0 w-1 bg-white/20">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.3 }}
                    className="w-full bg-white/60"
                  />
                </div>
              )}

              <div className="relative z-10 flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-primary font-bold flex items-center justify-center">
                    {step.number}
                  </div>
                  <step.icon className="w-10 h-10" />
                </div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/90 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
