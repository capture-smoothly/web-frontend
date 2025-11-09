"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface PricingCardProps {
  name: string;
  price: string | number;
  subtitle: string;
  yearlyPrice?: string;
  badge?: string;
  features: string[];
  comingSoon?: string[];
  cta: string;
  ctaVariant?: "primary" | "secondary" | "outline";
  popular?: boolean;
  delay?: number;
  onCtaClick?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  subtitle,
  yearlyPrice,
  badge,
  features,
  comingSoon,
  cta,
  ctaVariant = "primary",
  popular = false,
  delay = 0,
  onCtaClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={clsx(
        "relative bg-white rounded-2xl p-8 shadow-card transition-all duration-300",
        "border-2",
        popular
          ? "border-primary bg-gradient-to-br from-white to-primary/5"
          : "border-gray-200 hover:border-primary/30"
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge variant="success" className="text-xs px-4 py-1.5 shadow-lg">
            MOST POPULAR
          </Badge>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-dark mb-2">{name}</h3>
        <p className="text-dark-lighter text-sm mb-4">{subtitle}</p>

        <div className="mb-2">
          <span className="text-5xl font-bold text-dark">
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {typeof price === "number" && <span className="text-dark-lighter">/month</span>}
        </div>

        {yearlyPrice && (
          <p className="text-sm text-accent font-medium">{yearlyPrice}</p>
        )}

        {badge && (
          <div className="mt-3">
            <Badge variant="warning" className="text-xs">
              {badge}
            </Badge>
          </div>
        )}
      </div>

      <Button
        variant={ctaVariant}
        className="w-full mb-6"
        onClick={onCtaClick}
      >
        {cta}
      </Button>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-sm text-dark-lighter">{feature}</span>
          </div>
        ))}
      </div>

      {comingSoon && comingSoon.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-dark mb-3">Coming Soon:</p>
          <div className="space-y-2">
            {comingSoon.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-primary">🔜</span>
                <span className="text-sm text-dark-lighter">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
