"use client";

import React from "react";
import { motion } from "motion/react";
import { Chrome } from "lucide-react";
import { Button } from "../ui/Button";

export const ExtensionPromotionSection: React.FC = () => {
  const handleExtensionClick = () => {
    window.open(
      "https://chromewebstore.google.com/detail/mnaeoccblgmbchggojbhijgeidlnnpmm?utm_source=item-share-cb",
      "_blank"
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-peach-lightest to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-coral/20 to-peach/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-20 w-64 h-64 bg-gradient-to-br from-teal/20 to-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-white to-peach-lightest backdrop-blur-sm rounded-3xl shadow-colorful p-8 md:p-12 border-2 border-coral/20"
        >
          <div className="text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-coral to-peach rounded-2xl shadow-lg mb-6"
            >
              <Chrome className="w-8 h-8 text-white" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-dark mb-4"
            >
              Take Screenshots Directly from Your Browser
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-dark-lighter mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              You can directly take the screenshots of website pages and edit
              them in the editor using our extension
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={handleExtensionClick}
                size="lg"
                className="bg-gradient-to-r from-coral via-peach to-accent hover:shadow-2xl hover:scale-105 transition-all duration-300 text-white font-semibold px-8 py-4 text-lg"
              >
                <Chrome className="w-5 h-5 mr-2" />
                Try Extension
              </Button>
            </motion.div>

            {/* Additional info */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-sm text-dark-lighter"
            >
              Free to install • Works on Chrome & Edge
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
