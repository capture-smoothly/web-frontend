"use client";

import React from "react";
import { motion } from "motion/react";
import { Accordion } from "../ui/Accordion";

const faqItems = [
  {
    question: "Is Snapshot really free?",
    answer: "Yes! Our free tier gives you:\n• 10 text-to-image snapshots per month (with watermark)\n• Unlimited visible area screenshots\n• 3 basic gradient themes\n• Basic annotation tools\n\nUpgrade to Pro ($9.99/month) for:\n• Unlimited text-to-images (no watermark)\n• All 35+ premium themes\n• Full-page screenshot capture\n• Advanced editing tools (blur, pixelate, advanced shapes)\n• Priority support",
  },
  {
    question: "How is the text-to-image feature different from screenshots?",
    answer: "Instead of taking a picture of text, we convert the actual text into a beautifully designed image with your choice of 35+ themes. It's like having a graphic designer in your browser!",
  },
  {
    question: "What is two-point selection and why do I need it?",
    answer: "Traditional text selection breaks when you scroll. With two-point selection, click where you want to start, scroll down as far as you need, then click where you want to end. Your selection stays perfect throughout.",
  },
  {
    question: "Does this work on any website?",
    answer: "Yes! Snapshot works on all websites, including social media, news sites, documentation, and web apps.",
  },
  {
    question: "What are the keyboard shortcuts?",
    answer: "Visible Screenshot: Ctrl+Shift+Y | Full Page: Ctrl+Shift+U | Copy Capture: Alt+Shift+J | Copy Selection: Alt+Shift+K",
  },
  {
    question: "Can I use this offline?",
    answer: "Yes! All core features work offline. Cloud features (coming soon) will require internet connection.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime from your account settings. No questions asked, no cancellation fees.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We don't upload your screenshots to our servers unless you explicitly use cloud storage features. Everything stays local in your browser.",
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
};
