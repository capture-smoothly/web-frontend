"use client";

import React from "react";
import { motion } from "motion/react";
import { TestimonialCard } from "../ui/TestimonialCard";

const testimonials = [
  {
    rating: 5,
    quote: "This extension is a game-changer! The text-to-image feature alone is worth it. I create social media content 10x faster now.",
    author: "Sarah M.",
    role: "Content Creator",
    avatar: "SM",
  },
  {
    rating: 5,
    quote: "Finally, a screenshot tool that actually understands how we work. The two-point selection is brilliant - no more lost selections!",
    author: "David K.",
    role: "Software Engineer",
    avatar: "DK",
  },
  {
    rating: 5,
    quote: "As a student, I'm always capturing notes and research. Snapshot makes my study materials look professional without any effort.",
    author: "Emily R.",
    role: "University Student",
    avatar: "ER",
  },
];

const stats = [
  { label: "Join 10,000+ happy users", value: "10,000+" },
  { label: "4.9★ average rating", value: "4.9★" },
  { label: "500+ 5-star reviews", value: "500+" },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Loved by Thousands of Users Worldwide
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={testimonial.rating}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 pt-8 border-t border-gray-200"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-dark-lighter">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
