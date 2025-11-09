"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Chrome, Star, Users, Shield } from "lucide-react";

const trustBadges = [
  { icon: Chrome, label: "Featured Extension" },
  { icon: Users, label: "10,000+ Active Users" },
  { icon: Star, label: "4.9★ Rating" },
  { icon: Shield, label: "100% Secure" },
];

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-cta text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Transform Your Screenshot Game?
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-white/90 mb-10"
        >
          Join thousands of users who&apos;ve already upgraded their workflow. Start free, upgrade when you&apos;re ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-5">
            Start 14-Day Free Trial
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-10 py-5">
            See Pricing
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {trustBadges.map((badge, index) => (
            <Badge
              key={index}
              variant="default"
              className="bg-white/10 border-white/20 text-white backdrop-blur-sm"
            >
              <badge.icon className="w-4 h-4" />
              {badge.label}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
