"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optional: Track successful payment
    console.log("Payment successful!");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal/10 to-coral/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-teal" />
        </motion.div>

        <h1 className="text-3xl font-bold text-dark mb-4">
          Payment Successful!
        </h1>

        <p className="text-dark-lighter mb-8">
          Thank you for upgrading to Pro! Your subscription is now active and
          you have access to all premium features.
        </p>

        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push("/editor")}
          >
            Start Creating
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>

        <p className="text-sm text-dark-lighter mt-6">
          You'll receive a confirmation email shortly with your receipt and
          subscription details.
        </p>
      </motion.div>
    </div>
  );
}
