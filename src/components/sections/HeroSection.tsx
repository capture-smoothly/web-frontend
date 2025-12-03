"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Sparkles,
  Zap,
  Edit3,
  ChevronDown,
  Chrome,
  Monitor,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const stats = [
  { label: "Active Users", value: "2K+" },
  { label: "Screenshots Taken", value: "50K+" },
  { label: "5-Star Reviews", value: "100+" },
];

// Video Player Component with Intersection Observer
const VideoPlayer: React.FC<{ videoUrl: string; title: string }> = ({
  videoUrl,
  title,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={videoRef}
      className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
    >
      {isVisible ? (
        <iframe
          src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl
            .split("/")
            .pop()}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-dark-lighter">Loading video...</span>
        </div>
      )}
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const router = useRouter();

  const handleExtensionClick = () => {
    window.open(
      "https://chromewebstore.google.com/detail/mnaeoccblgmbchggojbhijgeidlnnpmm?utm_source=item-share-cb",
      "_blank"
    );
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
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 leading-tight"
          >
            Screenshots That{" "}
            <span className="bg-gradient-to-r from-coral via-peach to-accent bg-clip-text text-transparent">
              Actually Looks Good
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-dark-lighter mb-8 leading-relaxed"
          >
            We have two tools, one is Browser Extension which lets you take
            Screenshot of full webpage, select texts and turn them into
            beautiful graphics &amp; Second is our Web Editor which lets you
            upload any image and convert it into beautiful images using our pro
            tools.
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
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-coral/10 to-peach/10 border-coral/30 text-coral-dark backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              100+ Premium Themes
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-teal/10 to-secondary/10 border-teal/30 text-teal-dark backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              Full-Page Capture
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-accent/10 to-peach/10 border-accent/30 text-accent-dark backdrop-blur-sm">
              <Edit3 className="w-4 h-4" />
              Pro Editing Tools
            </Badge>
          </motion.div> */}

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

          {/* Stats Bar */}
          {/* <motion.div
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
          </motion.div> */}

          {/* Demo Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-3xl md:text-4xl font-bold text-dark mb-6"
          >
            See the Web Editor in Action
          </motion.h2>

          {/* Additional Text Before Video */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-dark-lighter mb-8 leading-relaxed"
          >
            Convert boring images into professional beautiful HD quality images
            using our editor
          </motion.p>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 relative flex justify-center"
          >
            <VideoPlayer
              videoUrl="https://www.youtube.com/embed/Jw-rS00rhXI"
              title="Beautiful Screenshots Demo"
            />
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
            <p className="text-sm">Scroll to see extension in action</p>
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
