"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, Chrome, Crown, Star, Gift, PartyPopper } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import clsx from "clsx";

type BillingPeriod = "monthly" | "yearly";

interface PricingPlan {
  name: string;
  icon: React.ReactNode;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  yearlyTotal: number;
  originalMonthlyPrice?: number;
  originalYearlyTotal?: number;
  features: { text: string; included: boolean; highlight?: boolean }[];
  cta: string;
  ctaVariant: "primary" | "secondary" | "outline";
  popular?: boolean;
  badge?: string;
  limitedOffer?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    icon: <Star className="w-6 h-6" />,
    description: "Perfect for trying things out",
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: 0,
    features: [
      { text: "Web editor access", included: true },
      { text: "Chrome extension access", included: true },
      { text: "Unlimited screenshots", included: true },
      { text: "10 basic themes", included: true },
      { text: "Watermark on exports", included: true },
      { text: "Unlimited full page screenshots", included: true },
      { text: "Text-to-image converter (5 per day)", included: true },
      { text: "Web editor access", included: true },
      { text: "Annotations tools", included: false },
      { text: "Highest quality export", included: false },
      { text: "Premium themes (120+)", included: false },
      { text: "Custom theme", included: false },
      { text: "Blur & pixelate tools", included: false },
      { text: "Cloud storage", included: false },
      { text: "Priority support", included: false },
      { text: "Request new features", included: false },
      { text: "Export to multiple formats (PDF, JPG)", included: false },
    ],
    cta: "Get Started Free",
    ctaVariant: "outline",
  },
  {
    name: "Pro",
    icon: <Crown className="w-6 h-6" />,
    description: "Full power for professionals",
    monthlyPrice: 2,
    yearlyPrice: 1,
    yearlyTotal: 12,
    originalMonthlyPrice: 3,
    originalYearlyTotal: 24,
    popular: true,
    limitedOffer: true,
    features: [
      { text: "Everything in Free, plus:", included: true, highlight: true },
      { text: "Annotations tools", included: true },
      { text: "Web editor full access", included: true },
      { text: "Highest quality export", included: true },
      { text: "Premium themes (120+)", included: true },
      { text: "Custom theme", included: true },
      { text: "Blur & pixelate tools", included: true },
      { text: "Cloud storage", included: true },
      { text: "Priority support (24 hours)", included: true },
      { text: "Request new features", included: true },
      { text: "Cloud storage (Coming soon)", included: true },
      { text: "Export to multiple formats (PDF, JPG) (Coming Soon)", included: true },
      { text: "Early access to new tools (Coming Soon)", included: true },
    ],
    cta: "Start 7-Day Free Trial",
    ctaVariant: "primary",
    badge: "Best Value",
  },
];

export const PricingSection: React.FC = () => {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly");
  const [showComingSoonNotice, setShowComingSoonNotice] = useState(false);

  const getPrice = (plan: PricingPlan) => {
    if (plan.monthlyPrice === 0) return "Free";
    return billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (plan: PricingPlan) => {
    if (plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const yearlyCost = plan.yearlyTotal;
    const savings = monthlyCost - yearlyCost;
    return savings;
  };

  const handlePlanClick = (planName: string) => {
    if (planName === "Free") {
      router.push("/auth/login");
    } else {
      setShowComingSoonNotice(true);
      setTimeout(() => setShowComingSoonNotice(false), 6000);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Coming Soon Notice */}
      <AnimatePresence>
        {showComingSoonNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full mx-4"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-teal/20 p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-coral/20 to-teal/20 flex items-center justify-center flex-shrink-0">
                <PartyPopper className="w-6 h-6 text-coral" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-dark flex items-center gap-2">
                  Paid Plans Coming in December!
                  <Gift className="w-4 h-4 text-teal" />
                </p>
                <p className="text-sm text-dark-lighter mt-1">
                  We&apos;re putting the finishing touches on our payment system. Until then, enjoy <span className="font-medium text-teal">every feature completely free</span> - no limits! Happy Thanksgiving!
                </p>
              </div>
              <button
                onClick={() => setShowComingSoonNotice(false)}
                className="text-dark-lighter hover:text-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Pick Your Plan
          </h2>
          <p className="text-xl text-dark-lighter max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Limited Offer Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="bg-gradient-to-r from-teal/10 via-coral/10 to-teal/10 border-2 border-teal/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PartyPopper className="w-5 h-5 text-coral" />
              <h3 className="text-lg md:text-xl font-bold text-dark">
                Launch Special: First 100 Users Only!
              </h3>
              <PartyPopper className="w-5 h-5 text-coral" />
            </div>
            <p className="text-dark-lighter text-sm md:text-base">
              Get <span className="font-bold text-teal">50% OFF</span> Pro plan forever - Lock in your discount now before we reach capacity!
            </p>
          </div>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-3 mb-16"
        >
          <div className="flex items-center gap-4">
            <span className={clsx(
              "text-sm font-medium transition-colors",
              billingPeriod === "monthly" ? "text-dark" : "text-dark-lighter"
            )}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              className={clsx(
                "relative w-14 h-7 rounded-full transition-colors duration-300",
                billingPeriod === "yearly" ? "bg-coral" : "bg-gray-300"
              )}
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={clsx(
                  "absolute top-1 w-5 h-5 bg-white rounded-full shadow-md",
                  billingPeriod === "yearly" ? "left-8" : "left-1"
                )}
              />
            </button>
            <span className={clsx(
              "text-sm font-medium transition-colors",
              billingPeriod === "yearly" ? "text-dark" : "text-dark-lighter"
            )}>
              Yearly
            </span>
          </div>
          {billingPeriod === "yearly" && (
            <Badge variant="warning" className="text-xs">
              Save 33%
            </Badge>
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={clsx(
                "relative bg-white rounded-2xl p-8 shadow-card transition-all duration-300 border-2",
                plan.popular
                  ? "border-coral bg-gradient-to-br from-white to-coral/5 scale-105 md:scale-110 z-10"
                  : "border-gray-200 hover:border-coral/30"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="warning" className="text-xs px-4 py-1.5 shadow-lg">
                    MOST POPULAR
                  </Badge>
                </div>
              )}

              {plan.limitedOffer && (
                <div className="absolute -top-4 right-4">
                  <Badge variant="success" className="text-xs px-3 py-1.5 shadow-lg animate-pulse">
                    🎉 FIRST 100 USERS
                  </Badge>
                </div>
              )}

              {plan.badge && !plan.popular && !plan.limitedOffer && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="info" className="text-xs px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6">
                <div className={clsx(
                  "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                  plan.popular ? "bg-coral/10 text-coral" : "bg-gray-100 text-gray-600"
                )}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-dark mb-1">{plan.name}</h3>
                <p className="text-sm text-dark-lighter">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                {plan.limitedOffer && typeof getPrice(plan) === "number" && (
                  <div className="mb-2">
                    <span className="text-2xl text-gray-400 line-through">
                      ${billingPeriod === "monthly" ? plan.originalMonthlyPrice : plan.originalYearlyTotal && billingPeriod === "yearly" ? Math.round(plan.originalYearlyTotal / 12) : getPrice(plan)}
                    </span>
                    <span className="text-dark-lighter text-sm ml-1">/month</span>
                  </div>
                )}
                <div className="flex items-end justify-center gap-1">
                  {typeof getPrice(plan) === "number" ? (
                    <>
                      <span className={clsx(
                        "text-5xl font-bold",
                        plan.limitedOffer ? "text-teal" : "text-dark"
                      )}>${getPrice(plan)}</span>
                      <span className="text-dark-lighter mb-2">/month</span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold text-dark">{getPrice(plan)}</span>
                  )}
                </div>
                {billingPeriod === "yearly" && plan.yearlyTotal > 0 && (
                  <>
                    {plan.limitedOffer && plan.originalYearlyTotal && (
                      <p className="text-sm text-gray-400 line-through mt-1">
                        Was ${plan.originalYearlyTotal}/year
                      </p>
                    )}
                    <p className={clsx(
                      "text-sm font-medium mt-2",
                      plan.limitedOffer ? "text-teal" : "text-teal"
                    )}>
                      ${plan.yearlyTotal}/year {plan.limitedOffer ? `(Save $${plan.originalYearlyTotal ? plan.originalYearlyTotal - plan.yearlyTotal : getSavings(plan)})` : `(Save $${getSavings(plan)})`}
                    </p>
                  </>
                )}
                {billingPeriod === "monthly" && plan.monthlyPrice > 0 && !plan.limitedOffer && (
                  <p className="text-xs text-dark-lighter mt-2">
                    or ${plan.yearlyTotal}/year if billed annually
                  </p>
                )}
                {billingPeriod === "monthly" && plan.limitedOffer && (
                  <p className="text-xs text-teal font-medium mt-2">
                    Only ${plan.yearlyTotal}/year if billed annually
                  </p>
                )}
              </div>

              {/* CTA */}
              <Button
                variant={plan.ctaVariant}
                className="w-full mb-6"
                onClick={() => handlePlanClick(plan.name)}
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className={clsx(
                        "w-5 h-5 flex-shrink-0 mt-0.5",
                        feature.highlight ? "text-coral" : "text-teal"
                      )} />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={clsx(
                      "text-sm",
                      feature.included ? "text-dark-lighter" : "text-gray-400",
                      feature.highlight && "font-medium text-dark"
                    )}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-dark-lighter">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal" />
              <span>7-day free trial on paid plans</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal" />
              <span>Cancel anytime, no questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-teal" />
              <span>Secure payment via Stripe</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Link */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-dark-lighter mt-8"
        >
          Got questions?{" "}
          <a href="#faq" className="text-coral hover:underline font-medium">
            Check out our FAQ
          </a>{" "}
          or{" "}
          <a href="mailto:support@ilovesnapshots.com" className="text-coral hover:underline font-medium">
            reach out to us
          </a>
        </motion.p>
      </div>
    </section>
  );
};
