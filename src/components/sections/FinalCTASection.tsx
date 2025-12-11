"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Chrome, Monitor, Shield, Zap, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const trustBadges = [
  // { icon: Shield, label: "7-Day Free Trial" },
  // { icon: Zap, label: "No Credit Card Needed" },
  { icon: Chrome, label: "Works Everywhere" },
  { icon: Monitor, label: "Extension + Web Editor" },
];

export const FinalCTASection: React.FC = () => {
  const router = useRouter();
  const [userPlanType, setUserPlanType] = useState<string | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  // Check user's subscription status on mount
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoadingSubscription(false);
          return;
        }

        // Get user's active subscription
        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", "active")
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (subscription) {
          setUserPlanType(subscription.plan_type);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    checkSubscription();
  }, []);

  const isProPlan = userPlanType === "monthly" || userPlanType === "yearly";

  return (
    <section className="py-20 md:py-32 bg-gradient-cta text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Make Your Screenshots Stand Out?
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-white/90 mb-10"
        >
          Join thousands of creators, developers, and professionals who use ILoveSnapshots every day. Start with the free plan and upgrade when you&apos;re ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="https://chromewebstore.google.com/detail/mnaeoccblgmbchggojbhijgeidlnnpmm?utm_source=item-share-cb"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-5">
              <Chrome className="w-5 h-5 mr-2" />
              Add to Chrome - Free
            </Button>
          </a>
          {isProPlan ? (
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-10 py-5"
              onClick={() => router.push("/editor")}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Use Pro Features
            </Button>
          ) : (
            <a href="#pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-10 py-5">
                View All Plans
              </Button>
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-8"
        >
          {trustBadges.map((badge, index) => (
            <Badge
              key={index}
              variant="default"
              className="bg-white/10 border-white/20 text-white backdrop-blur-sm"
            >
              <badge.icon className="w-4 h-4" />
              {badge.label}
            </Badge>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
