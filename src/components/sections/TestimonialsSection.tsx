"use client";

import React from "react";
import { motion } from "motion/react";
import { TestimonialCard } from "../ui/TestimonialCard";

const testimonials = [
  // Row 1: Short Reviews (light and easy to read at the top)
  {
    rating: 5,
    quote: "Wonderful, very handy and user friendly product. Really liked the final Images.",
    author: "Penny Wang",
    role: "Verified User",
    avatar: "PW",
  },
  {
    rating: 5,
    quote: "Love how clean and simple your product is. Overall everything is good, really liked it.",
    author: "Scott Andrew",
    role: "Verified User",
    avatar: "SA2",
  },
  {
    rating: 5,
    quote: "Soo cool an very useful in my day to day life. Waiting for more cool features.",
    author: "Abhinash P",
    role: "Verified User",
    avatar: "AP",
  },
  // Row 2: Medium-Length Reviews
  {
    rating: 5,
    quote: "It takes screenshots in very high quality and makes the screenshot very beautiful for my newsletter. Highly Recommend!!",
    author: "Sanae Takaichi",
    role: "Verified User",
    avatar: "ST",
  },
  {
    rating: 5,
    quote: "Have only been using for a few minutes, it installed easily and seems to be working as described. Helping me capture a web design that we are taking down next week! Great Product",
    author: "Sam",
    role: "Verified User",
    avatar: "SA",
  },
  {
    rating: 5,
    quote: "Really handy extension — full-page screenshots work smoothly, and capturing styled text is super convenient. The built-in editor is nice for quick edits, and everything feels fast and lightweight. Nice job!",
    author: "Scott Edwards",
    role: "Verified User",
    avatar: "SE",
  },
  // Row 3: Very Long Reviews (detailed reviews at the bottom)
  {
    rating: 5,
    quote: "This is interestinggg!! nice product, i was looking for a tool which can convert my low quality ugly screenshots into high quality presentable images which i can add in my daily presentation. Best productivity tool i have found.",
    author: "Maryana Bjornboe",
    role: "Verified User",
    avatar: "MB",
  },
  {
    rating: 5,
    quote: "ILoveSnapshots is a surprisingly fast and reliable extension that makes full-page capturing incredibly simple. The interface is clean, and everything works smoothly without any hiccups. Even though it's new, it already feels well-optimized. A strong recommendation for anyone who needs a practical tool for high-quality snapshots.",
    author: "Hary",
    role: "Verified User",
    avatar: "HA",
  },
  {
    rating: 5,
    quote: "I really do like the website A LOT it looks really nice, works smooth, and the functionality is very nice. its pretty cool, there is something very similar to this which is what i used to create my demo image. But theirs is a software for that and it's final quality wasn't that good plus it used to look like AI generated, whereas your product made the process easier and better plus the quality is cherry on the top, its easier to use yours. Really loved it Cheers.",
    author: "Diane Hendricks",
    role: "Verified User",
    avatar: "DH",
  },
];

const stats = [
  { label: "Average Rating", value: "5.0★" },
  { label: "Active Users", value: "100+" },
  { label: "Screenshots Created", value: "1000+" },
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
            Loved by Users Worldwide
          </h2>
          <p className="text-xl text-dark-lighter max-w-2xl mx-auto">
            See what our community is saying about ILoveSnapshots
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
