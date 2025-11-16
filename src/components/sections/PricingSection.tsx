"use client";

import React from "react";
import { motion } from "motion/react";
import { PricingCard } from "../ui/PricingCard";

const pricingPlans = [
  {
    name: "Snapshot Free",
    price: 0,
    subtitle: "Get started with the basics",
    yearlyPrice: "Free forever",
    features: [
      "✓ 10 text-to-image snapshots per month",
      "✓ 3 basic themes",
      "✓ Unlimited visible area screenshots",
      "✓ Basic annotations",
      "✓ Watermark on text-to-images: \"Made with Snapshot\"",
    ],
    notIncluded: [
      "✗ Full-page screenshots (Premium only)",
      "✗ Advanced themes (Premium only)",
      "✗ Blur/pixelate tools (Premium only)",
    ],
    cta: "Start Free",
    ctaVariant: "secondary" as const,
  },
  {
    name: "Snapshot Pro",
    price: 9.99,
    subtitle: "Everything you need to capture & create",
    yearlyPrice: "$9.99/month or $79/year",
    badge: "First 100 users: $4.99/month FOREVER",
    lifetimeOffer: "Lifetime Access: $149 (First 200 customers only)",
    features: [
      "Unlimited text-to-images (no watermark)",
      "All 35+ premium themes",
      "Unlimited full-page screenshots",
      "Revolutionary two-point selection",
      "Advanced annotation tools (8+ tools)",
      "Blur/pixelate for redacting sensitive info",
      "Custom colors & shapes",
      "Export PNG & JPEG",
      "Full undo/redo history",
      "Priority support",
      "Keyboard shortcuts for everything",
    ],
    comingSoon: [
      "Cloud storage (5GB)",
      "Shareable links",
      "Video & GIF recording",
      "OCR & text extraction",
    ],
    cta: "Start 14-Day Free Trial",
    ctaVariant: "primary" as const,
    popular: true,
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Simple Pricing. Powerful Features.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              subtitle={plan.subtitle}
              yearlyPrice={plan.yearlyPrice}
              badge={plan.badge}
              features={plan.features}
              comingSoon={plan.comingSoon}
              cta={plan.cta}
              ctaVariant={plan.ctaVariant}
              popular={plan.popular}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-dark-lighter"
        >
          All plans include 14-day money-back guarantee
        </motion.p>
      </div>
    </section>
  );
};
