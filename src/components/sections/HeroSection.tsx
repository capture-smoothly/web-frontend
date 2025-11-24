"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Zap,
  Edit3,
  ChevronDown,
  Chrome,
  Monitor,
  X,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import Image from "next/image";

const stats = [
  { label: "Active Users", value: "2K+" },
  { label: "Screenshots Taken", value: "50K+" },
  { label: "5-Star Reviews", value: "100+" },
];

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [showExtensionNotice, setShowExtensionNotice] = useState(false);

  const handleExtensionClick = () => {
    setShowExtensionNotice(true);
    setTimeout(() => setShowExtensionNotice(false), 5000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-hero pt-20 overflow-hidden"
    >
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
            Screenshots That{" "}
            <span className="bg-gradient-to-r from-coral via-peach to-accent bg-clip-text text-transparent">
              Actually Look Good
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-dark-lighter mb-8 leading-relaxed"
          >
            Capture any webpage, turn text into beautiful graphics, and edit
            everything with pro tools. Use our Chrome extension for quick
            captures, or the web editor for detailed work.
          </motion.p>

          {/* Platform Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4 mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full border border-gray-200 shadow-sm">
              <Chrome className="w-5 h-5 text-[#4285F4]" />
              <span className="text-sm font-medium text-dark">
                Chrome Extension
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full border border-gray-200 shadow-sm">
              <Monitor className="w-5 h-5 text-teal" />
              <span className="text-sm font-medium text-dark">Web Editor</span>
            </div>
          </motion.div>

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
              Full-Page Capture
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-accent/10 to-peach/10 border-accent/30 text-accent-dark backdrop-blur-sm">
              <Edit3 className="w-4 h-4" />
              Pro Editing Tools
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
              onClick={handleExtensionClick}
            >
              <Chrome className="w-5 h-5 mr-2" />
              Add to Chrome - It&apos;s Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-5"
              onClick={() => router.push("/editor")}
            >
              <Monitor className="w-5 h-5 mr-2" />
              Try Web Editor - Its Free!
            </Button>
          </motion.div>

          {/* Extension Coming Soon Notice */}
          <AnimatePresence>
            {showExtensionNotice && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-coral/20 p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <Chrome className="w-5 h-5 text-coral" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark">
                      Extension launching this week!
                    </p>
                    <p className="text-sm text-dark-lighter mt-1">
                      Our Chrome extension is currently under review. In the
                      meantime, try the Web Editor - it has all the same great
                      features!
                    </p>
                  </div>
                  <button
                    onClick={() => setShowExtensionNotice(false)}
                    className="text-dark-lighter hover:text-dark transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <p className="text-3xl font-bold bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-dark-lighter">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-colorful p-8 border-2 border-gradient-to-r from-coral/30 via-teal/30 to-accent/30">
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/demo/Beautiful_Screenshots.png"
                  alt="Beautiful Screenshots Demo"
                  width={1200}
                  height={675}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>

              {/* Floating UI elements mockup */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-colorful p-4 border-2 border-coral/30"
              >
                <div className="flex items-center gap-2">
                  <Chrome className="w-6 h-6 text-[#4285F4]" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-dark">Extension</p>
                    <p className="text-xs text-teal">Quick Capture</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-colorful p-3 border-2 border-teal/30"
              >
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-teal" />
                  <p className="text-xs text-dark-lighter font-medium">
                    Web Editor
                  </p>
                </div>
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
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
