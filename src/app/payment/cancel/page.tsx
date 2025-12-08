"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
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
          className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-gray-400" />
        </motion.div>

        <h1 className="text-3xl font-bold text-dark mb-4">
          Payment Cancelled
        </h1>

        <p className="text-dark-lighter mb-8">
          Your payment was cancelled. Don't worry, you haven't been charged
          anything. You can try again whenever you're ready.
        </p>

        <div className="space-y-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push("/#pricing")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Go to Homepage
          </Button>
        </div>

        <p className="text-sm text-dark-lighter mt-6">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@ilovesnapshots.com"
            className="text-coral hover:underline"
          >
            support@ilovesnapshots.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
