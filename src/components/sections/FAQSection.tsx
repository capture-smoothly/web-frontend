"use client";

import React from "react";
import { motion } from "motion/react";
import { Accordion } from "../ui/Accordion";

const faqItems = [
  {
    question: "What's the difference between the extension and the web editor?",
    answer: "The Chrome extension is for capturing screenshots directly from any webpage - full-page captures, visible area, text-to-image, all with one click. The web editor is for deeper editing work - you can upload any image, use advanced annotation tools, apply themes, and do detailed touch-ups. Think of the extension as your capture tool and the web editor as your finishing studio.",
  },
  {
    question: "Do I need the extension to use the web editor?",
    answer: "Nope! They work independently. You can use the web editor with any image you upload - screenshots from your phone, images from your computer, whatever you need to edit. But they work great together too - capture with the extension, then open in the web editor for advanced edits.",
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan gives you:\n• Web editor access\n• Chrome extension access\n• Unlimited screenshots\n• 10 basic themes\n• Unlimited full page screenshots\n• Text-to-image converter (5 per day)\n• Exports with a small watermark\n\nIt's genuinely useful for regular usage. No credit card needed to start.",
  },
  {
    question: "What does Pro plan include?",
    answer: "Pro ($3/month or $24/year) includes everything in Free PLUS:\n• Annotations tools\n• Web editor full access\n• Highest quality export\n• Premium themes (120+)\n• Custom theme creation\n• Blur & pixelate tools\n• Cloud storage (coming soon)\n• Priority support (24 hours)\n• Request new features\n• Export to multiple formats (PDF, JPG) - coming soon\n• Early access to new tools - coming soon",
  },
  {
    question: "Can I try Pro before paying?",
    answer: "Absolutely. Pro comes with a 7-day free trial. Full access, no restrictions. Cancel before the trial ends and you won't be charged anything.",
  },
  {
    question: "How does the text-to-image feature work?",
    answer: "Select any text on a webpage, and we'll turn it into a beautiful graphic with your chosen theme. It's not a screenshot - we actually render the text with professional styling. Perfect for sharing quotes, code snippets, tweets, or any text content on social media.",
  },
  {
    question: "What about full-page screenshots? How long can they be?",
    answer: "Our full-page capture (available in both Free and Pro plans) handles pages up to 32,767 pixels tall - that's basically any webpage you'll encounter. The extension scrolls through the page automatically and stitches everything together. You'll see a progress indicator while it works. Takes a few seconds for really long pages.",
  },
  {
    question: "Is my data private?",
    answer: "Very. Screenshots are processed locally in your browser by default. We don't see them unless you explicitly use cloud features (Pro plan). Even then, your images are encrypted and only accessible by you. We don't train AI on your content or sell your data. Ever.",
  },
  {
    question: "What keyboard shortcuts are available?",
    answer: "All the main actions have shortcuts:\n• Visible Screenshot: Ctrl+Shift+Y\n• Full Page: Ctrl+Shift+U\n• Copy Capture: Alt+Shift+J\n• Copy Selection: Alt+Shift+K\n\nYou can customize these in the extension settings.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, no tricks here. Cancel from your account settings whenever you want. You'll keep access until the end of your billing period. No cancellation fees, no hoops to jump through.",
  },
  {
    question: "Do you offer refunds?",
    answer: "If you're not happy within the first 14 days, just email us and we'll refund you. No questions asked. We'd rather you try it risk-free than hesitate.",
  },
  {
    question: "Will you add more features?",
    answer: "We're actively building. Video/GIF recording, OCR text extraction, team sharing, and API access are all on the roadmap. Pro plan users can request features directly and get early access to new tools.",
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-dark-lighter">
            Everything you need to know before getting started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion items={faqItems} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-dark-lighter">
            Still have questions?{" "}
            <a
              href="mailto:support@ilovesnapshots.com"
              className="text-coral hover:underline font-medium"
            >
              Drop us an email
            </a>
            {" "}and we'll get back to you within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
