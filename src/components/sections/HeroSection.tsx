"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Sparkles, Zap, Edit3, ChevronDown, Play } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { useAuth } from "@/contexts/AuthContext";

const stats = [
  { label: "Pre-Launch", value: "NEW" },
  { label: "Launching This Week", value: "SOON" },
  { label: "14-Day Free Trial", value: "FREE" },
];

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-hero pt-20 overflow-hidden">
      {/* Background decoration - Colorful blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-coral to-peach opacity-30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal to-secondary opacity-30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-accent to-peach-light opacity-20 rounded-full blur-2xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 leading-tight"
          >
            Turn Text Into{" "}
            <span className="bg-gradient-to-r from-coral via-peach to-accent bg-clip-text text-transparent">
              Beautiful Images
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-teal via-secondary to-mint bg-clip-text text-transparent">
              Capture Perfect Screenshots
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-dark-lighter mb-8 leading-relaxed"
          >
            Convert any webpage text into stunning social media graphics with 35+ themes. Plus full-page screenshots and professional annotation tools—all in one extension.
          </motion.p>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-coral/10 to-peach/10 border-coral/30 text-coral-dark backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              35+ Premium Themes
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-teal/10 to-secondary/10 border-teal/30 text-teal-dark backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              Smart Text Selection
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-accent/10 to-peach/10 border-accent/30 text-accent-dark backdrop-blur-sm">
              <Edit3 className="w-4 h-4" />
              8+ Annotation Tools
            </Badge>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="text-lg px-10 py-5"
              onClick={() => router.push(user ? "/dashboard" : "/auth/login")}
            >
              {user ? "Go to Dashboard" : "Start 14-Day Free Trial"}
            </Button>
            <a
              href="https://www.youtube.com/@IloveSnapshots"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-5"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-coral/20 shadow-glass"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent mb-1">{stat.value}</p>
                <p className="text-sm text-dark-lighter">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Visual Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-colorful p-8 border-2 border-gradient-to-r from-coral/30 via-teal/30 to-accent/30">
              <div className="aspect-video bg-gradient-to-br from-coral/20 via-teal/20 to-accent/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-peach/30 via-transparent to-mint/30" />
                <div className="text-center relative z-10">
                  <Camera className="w-16 h-16 text-coral mx-auto mb-4" />
                  <p className="text-dark-lighter font-semibold">Extension Demo Preview</p>
                  <p className="text-sm text-dark-lighter mt-2">
                    Before/After: Messy text → <span className="text-teal font-semibold">Beautiful themed snapshot</span>
                  </p>
                </div>
              </div>

              {/* Floating UI elements mockup */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-colorful p-4 border-2 border-coral/30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-coral to-peach shadow-md" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-dark">Coral Sunset</p>
                    <p className="text-xs text-teal">Applied ✓</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-colorful p-3 border-2 border-teal/30"
              >
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-coral to-peach" />
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal to-secondary" />
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-accent to-peach" />
                </div>
                <p className="text-xs text-dark-lighter mt-1 font-medium">Annotation Tools</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-dark-lighter">
            <p className="text-sm">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Camera = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);
