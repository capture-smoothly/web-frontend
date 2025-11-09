"use client";

import React from "react";
import { motion } from "motion/react";
import { PricingCard } from "../ui/PricingCard";

const pricingPlans = [
  {
    name: "Snapshot Pro",
    price: 5,
    subtitle: "Everything you need to capture & create",
    yearlyPrice: "14-day free trial • No credit card required",
    badge: "EARLY BIRD: First 200 users get $3/mo FOREVER",
    features: [
      "Unlimited captures",
      "All 35+ premium themes",
      "Text-to-image with all themes",
      "Revolutionary two-point selection",
      "Full-page & visible area screenshots",
      "Advanced annotation tools (8+ tools)",
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
  {
    name: "Enterprise",
    price: "Coming Soon",
    subtitle: "For teams & organizations",
    features: [
      "Everything in Pro, plus:",
      "Unlimited team members",
      "Shared theme library",
      "Team analytics dashboard",
      "Admin controls & SSO",
      "Dedicated support",
      "Custom branding",
      "SLA guarantee",
    ],
    comingSoon: [
      "Slack & Teams integration",
      "On-premise deployment",
      "Custom integrations",
      "Training & onboarding",
    ],
    cta: "Join Waitlist",
    ctaVariant: "secondary" as const,
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
