"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Menu, X, Download, ImageIcon, Chrome } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Features", href: "#features", isExternal: false },
  { label: "Pricing", href: "#pricing", isExternal: false },
  { label: "Docs", href: "https://www.youtube.com/@IloveSnapshots", isExternal: true },
  { label: "About", href: "#about", isExternal: false },
];

export const SnapshotNavbar: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // If we're not on the home page, navigate there first
    if (window.location.pathname !== '/') {
      router.push('/' + href);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-dark">ILoveSnapshots</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-lighter hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-dark-lighter hover:text-primary font-medium transition-colors"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-dark-lighter hover:text-primary font-medium transition-colors"
                >
                  Dashboard
                </button>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => router.push("/editor")}
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Open Editor
                </Button>
                <Button
                  size="md"
                  onClick={() => {
                    alert("Extension launching this week! In the meantime, try the Web Editor.");
                  }}
                  className="flex items-center gap-2"
                >
                  <Chrome className="w-4 h-4" />
                  Get Extension
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="text-dark-lighter hover:text-primary font-medium transition-colors"
                >
                  Sign In
                </button>
                <Button
                  size="md"
                  variant="secondary"
                  onClick={() => router.push("/editor")}
                  className="flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Open Editor
                </Button>
                <Button
                  size="md"
                  onClick={() => window.open("https://x.com/THEBOSS036", "_blank")}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install Extension
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left py-2 text-dark-lighter hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left py-2 text-dark-lighter hover:text-primary font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-dark-lighter hover:text-primary font-medium transition-colors"
                    >
                      Dashboard
                    </button>
                    <Button
                      size="md"
                      variant="secondary"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        router.push("/editor");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Open Editor
                    </Button>
                    <Button
                      size="md"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        alert("Extension launching this week! In the meantime, try the Web Editor.");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Chrome className="w-4 h-4" />
                      Get Extension
                    </Button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        router.push("/auth/login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-dark-lighter hover:text-primary font-medium transition-colors"
                    >
                      Sign In
                    </button>
                    <Button
                      size="md"
                      variant="secondary"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        router.push("/editor");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <ImageIcon className="w-4 h-4" />
                      Open Editor
                    </Button>
                    <Button
                      size="md"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        window.open("https://x.com/THEBOSS036", "_blank");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Install Extension
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
