"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const comparisonData = [
  { feature: "Text-to-Image with 35+ Themes", snapshot: true, awesome: false, snagit: false, gofull: false },
  { feature: "Two-Point Selection", snapshot: true, awesome: false, snagit: false, gofull: false },
  { feature: "Full-Page Capture", snapshot: true, awesome: true, snagit: true, gofull: true },
  { feature: "Advanced Annotation", snapshot: true, awesome: true, snagit: true, gofull: false },
  { feature: "Keyboard Shortcuts", snapshot: "Every Feature", awesome: "Limited", snagit: "Some", gofull: "Basic" },
  { feature: "14-Day Free Trial", snapshot: true, awesome: false, snagit: false, gofull: false },
  { feature: "Cloud Storage", snapshot: "Coming Soon", awesome: true, snagit: true, gofull: false },
  { feature: "Video Recording", snapshot: "Coming Soon", awesome: true, snagit: true, gofull: false },
  { feature: "Unlimited Captures", snapshot: true, awesome: "Limited", snagit: true, gofull: true },
];

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Why Choose Snapshot Over the Competition?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full bg-white rounded-2xl shadow-card overflow-hidden">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left font-semibold text-dark">Features</th>
                <th className="px-6 py-4 text-center font-bold text-white bg-gradient-primary">
                  Snapshot<br /><span className="text-sm font-normal">(You)</span>
                </th>
                <th className="px-6 py-4 text-center font-semibold text-dark bg-light">
                  Awesome<br />Screenshot
                </th>
                <th className="px-6 py-4 text-center font-semibold text-dark bg-light-gray">
                  Snagit
                </th>
                <th className="px-6 py-4 text-center font-semibold text-dark bg-light">
                  GoFullPage
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-dark">{row.feature}</td>
                  <td className="px-6 py-4 text-center bg-primary/5">
                    {renderCell(row.snapshot, true)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderCell(row.awesome)}
                  </td>
                  <td className="px-6 py-4 text-center bg-gray-50">
                    {renderCell(row.snagit)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {renderCell(row.gofull)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

function renderCell(value: string | boolean, isSnapshot = false) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`w-6 h-6 mx-auto ${isSnapshot ? "text-accent" : "text-green-500"}`} />
    ) : (
      <X className="w-6 h-6 text-gray-300 mx-auto" />
    );
  }
  return <span className={`text-sm ${isSnapshot ? "font-semibold text-primary" : "text-dark-lighter"}`}>{value}</span>;
}
