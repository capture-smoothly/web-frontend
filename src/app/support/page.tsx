"use client";

import { SnapshotNavbar } from "@/components/sections/SnapshotNavbar";
import { SnapshotFooter } from "@/components/sections/SnapshotFooter";
import { Mail, MessageCircle, Book, HelpCircle } from "lucide-react";

export default function SupportPage() {
  return (
    <>
      <SnapshotNavbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-dark mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Support & Contact
            </h1>
            <p className="text-dark-lighter text-lg">
              We're here to help! Get in touch with our team.
            </p>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-semibold text-dark">Email Support</h2>
            </div>

            <p className="text-dark-lighter text-lg mb-6">
              Have a question, feedback, or need assistance? We'd love to hear from you!
            </p>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8">
              <p className="text-sm text-dark-lighter mb-2">Send us an email at:</p>
              <a
                href="mailto:support@ilovesnapshots.online"
                className="text-2xl md:text-3xl font-bold text-primary hover:text-secondary transition-colors break-all"
              >
                support@ilovesnapshots.online
              </a>
            </div>

            <div className="space-y-4 text-dark-lighter">
              <h3 className="text-xl font-semibold text-dark mb-3">Response Time</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Free Users:</strong> We typically respond within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Pro Users:</strong> Priority support with response within 12-24 hours</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Help Resources */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Book className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Documentation</h3>
              <p className="text-dark-lighter">
                Browse our guides and tutorials to get the most out of ILoveSnapshots.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">FAQ</h3>
              <p className="text-dark-lighter">
                Find quick answers to common questions about features and troubleshooting.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Community</h3>
              <p className="text-dark-lighter">
                Join our Discord community to connect with other users and share tips.
              </p>
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 mt-8">
            <h2 className="text-3xl font-semibold text-dark mb-6">Common Issues</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-dark mb-2">Extension not working?</h3>
                <p className="text-dark-lighter">
                  Try refreshing the page, clearing your browser cache, or reinstalling the extension.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dark mb-2">Login issues?</h3>
                <p className="text-dark-lighter">
                  Make sure you're using the correct email address. Use the "Forgot Password" feature if needed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dark mb-2">Screenshots not saving?</h3>
                <p className="text-dark-lighter">
                  Check your internet connection and ensure you're logged in to your account.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dark mb-2">Still need help?</h3>
                <p className="text-dark-lighter">
                  Email us at <a href="mailto:support@ilovesnapshots.online" className="text-primary hover:text-secondary font-semibold">support@ilovesnapshots.online</a> with details about your issue, including:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-dark-lighter">
                  <li>Your browser version</li>
                  <li>Steps to reproduce the issue</li>
                  <li>Any error messages you see</li>
                  <li>Screenshots if applicable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SnapshotFooter />
    </>
  );
}
