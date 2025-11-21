"use client";

import { SnapshotNavbar } from "@/components/sections/SnapshotNavbar";
import { SnapshotFooter } from "@/components/sections/SnapshotFooter";

export default function TermsPage() {
  return (
    <>
      <SnapshotNavbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-5xl font-bold text-dark mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-dark-lighter text-lg mb-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-dark-lighter leading-relaxed">
            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using ILoveSnapshots ("the Service"), you agree to be bound by these Terms of Service.
                If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Description of Service</h2>
              <p>
                ILoveSnapshots is a Chrome extension that provides screenshot capture, text-to-image conversion,
                and content capture tools. The Service requires account creation and includes both free and premium tiers.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Account Registration</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must create an account to use ILoveSnapshots</li>
                <li>You must be at least 13 years old to create an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Acceptable Use</h2>
              <p className="mb-3">You agree NOT to use ILoveSnapshots to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights of others</li>
                <li>Capture or share content you don't have permission to use</li>
                <li>Harass, abuse, or harm others</li>
                <li>Distribute malware or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Resell or redistribute the Service without authorization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Subscription and Payments</h2>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Free Tier</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Limited to 10 text-to-image snapshots per month</li>
                <li>Includes watermark on generated images</li>
                <li>Access to basic features only</li>
                <li>We reserve the right to modify free tier limits</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Pro Subscription</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Billed monthly ($9.99/month) or annually ($79/year)</li>
                <li>Automatically renews unless cancelled</li>
                <li>You can cancel anytime from your account settings</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds for partial months or unused features</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Lifetime Access</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>One-time payment of $149 (limited to first 200 customers)</li>
                <li>Lifetime access to Pro features</li>
                <li>Non-refundable after 14 days</li>
                <li>Subject to continued operation of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Refund Policy</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Monthly subscriptions: No refunds, but you can cancel anytime</li>
                <li>Annual subscriptions: 14-day money-back guarantee</li>
                <li>Lifetime access: 14-day money-back guarantee</li>
                <li>Refunds are processed to the original payment method within 5-10 business days</li>
                <li>We reserve the right to refuse refunds for suspected abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Content Ownership</h2>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Your Content</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>You retain ownership of all screenshots and content you create</li>
                <li>You are responsible for ensuring you have rights to capture and use content</li>
                <li>We don't claim ownership of your content</li>
                <li>You grant us a license to store and process your content to provide the Service</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Our Content</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>ILoveSnapshots, including software, design, and features, is our property</li>
                <li>You may not copy, modify, or distribute our software</li>
                <li>Premium themes and templates are licensed, not sold</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Service Availability</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>We strive for 99.9% uptime but don't guarantee uninterrupted service</li>
                <li>We may perform maintenance that temporarily affects availability</li>
                <li>We're not liable for service interruptions</li>
                <li>We reserve the right to modify or discontinue features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Account Termination</h2>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">By You</h3>
              <p>You may delete your account at any time from account settings. This will permanently delete all your data.</p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">By Us</h3>
              <p className="mb-2">We may suspend or terminate your account if:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You violate these Terms of Service</li>
                <li>You engage in fraudulent or illegal activity</li>
                <li>Your account remains inactive for over 2 years</li>
                <li>Required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Limitation of Liability</h2>
              <p className="mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ILOVESNAPSHOTS SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Loss of data, profits, or business opportunities</li>
                <li>Indirect, incidental, or consequential damages</li>
                <li>Content captured or created using the Service</li>
                <li>Third-party actions or content</li>
              </ul>
              <p className="mt-3">
                Our total liability shall not exceed the amount you paid us in the past 12 months, or $100, whichever is less.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                We don't warrant that the Service will be error-free, secure, or meet your requirements.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Indemnification</h2>
              <p>
                You agree to indemnify and hold ILoveSnapshots harmless from any claims, damages, or expenses
                arising from your use of the Service, violation of these terms, or infringement of any rights.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Changes to Terms</h2>
              <p>
                We may update these Terms of Service at any time. We'll notify you of significant changes via
                email or through the Service. Continued use after changes constitutes acceptance of new terms.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of the United States, without regard to conflict of law provisions.
                Any disputes shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full effect.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Contact Us</h2>
              <p className="mb-2">If you have questions about these Terms of Service:</p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> support@ilovesnapshots.online</li>
                <li><strong>Website:</strong> https://www.ilovesnapshots.online</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Entire Agreement</h2>
              <p>
                These Terms of Service, together with our Privacy Policy and Cookie Policy, constitute the entire
                agreement between you and ILoveSnapshots regarding the Service.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} ILoveSnapshots. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <SnapshotFooter />
    </>
  );
}
