"use client";

import React from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { Button } from "./Button";

export const FloatingInstallButton: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-4 right-4 z-50"
    >
      <Button
        size="lg"
        className="shadow-lg hover:shadow-xl flex items-center gap-2"
        onClick={() => window.open("https://x.com/THEBOSS036", "_blank")}
      >
        <Download className="w-5 h-5" />
        Install Extension
      </Button>
    </motion.div>
  );
};
