"use client";

import React from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  rating: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  delay?: number;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  quote,
  author,
  role,
  avatar,
  delay = 0,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={clsx(
        "bg-white rounded-2xl p-6 shadow-card border border-gray-100",
        "hover:shadow-card-hover transition-shadow duration-300",
        className
      )}
    >
      {/* Author Info at Top */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-dark">{author}</p>
          <p className="text-sm text-dark-lighter">{role}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Review Quote */}
      <p className="text-dark-lighter leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </p>
    </motion.div>
  );
};
