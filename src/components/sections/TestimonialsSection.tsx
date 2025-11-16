"use client";

import React from "react";
import { motion } from "motion/react";
import { TestimonialCard } from "../ui/TestimonialCard";

const testimonials = [
  {
    rating: 5,
    quote: "I tested 10+ screenshot tools. This is the only one with text-to-image creation. Game changer for content creators.",
    author: "Alex",
    role: "Beta Tester",
    avatar: "AX",
  },
  {
    rating: 5,
    quote: "The two-point selection actually works. I can finally capture long articles without losing my place.",
    author: "Jordan",
    role: "QA Engineer (Beta)",
    avatar: "JD",
  },
  {
    rating: 5,
    quote: "35 themes is insane. I use a different one for each client project.",
    author: "Sam",
    role: "Designer (Beta Program)",
    avatar: "SM",
  },
];

const stats = [
  { label: "Be among the first users", value: "NEW" },
  { label: "Launching This Week", value: "SOON" },
  { label: "Early Bird Pricing", value: "SAVE" },
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
            What Beta Testers Say
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
