"use client";

import { SnapshotNavbar } from "@/components/sections/SnapshotNavbar";
import { SnapshotFooter } from "@/components/sections/SnapshotFooter";

export default function CookiePolicyPage() {
  return (
    <>
      <SnapshotNavbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <h1 className="text-5xl font-bold text-dark mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-dark-lighter text-lg mb-8">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-dark-lighter leading-relaxed">
            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                They help websites remember your preferences, keep you logged in, and improve your browsing experience.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">How We Use Cookies</h2>
              <p className="mb-3">
                ILoveSnapshots uses cookies and similar technologies to provide and improve our Service.
                We use cookies for the following purposes:
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Types of Cookies We Use</h2>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Essential Cookies (Always Active)</h3>
              <p className="mb-2">These cookies are necessary for the Service to function and cannot be disabled:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Authentication:</strong> Keep you logged in to your account</li>
                <li><strong>Security:</strong> Protect against fraud and unauthorized access</li>
                <li><strong>Session Management:</strong> Remember your actions during a browsing session</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Functional Cookies</h3>
              <p className="mb-2">These cookies enable enhanced functionality:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Preferences:</strong> Remember your theme choices and settings</li>
                <li><strong>Language:</strong> Store your language preference</li>
                <li><strong>Features:</strong> Remember which features you've enabled/disabled</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Analytics Cookies</h3>
              <p className="mb-2">These cookies help us understand how users interact with our Service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Usage Data:</strong> Which features are most popular</li>
                <li><strong>Performance:</strong> How fast pages load and where errors occur</li>
                <li><strong>User Flow:</strong> How users navigate through the Service</li>
              </ul>
              <p className="mt-2 text-sm italic">
                Analytics cookies don't collect personal information and help us improve the Service.
              </p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Marketing Cookies (If Applicable)</h3>
              <p className="mb-2">We may use marketing cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Show you relevant ads for ILoveSnapshots on other websites</li>
                <li>Measure the effectiveness of our marketing campaigns</li>
                <li>Prevent showing you the same ad repeatedly</li>
              </ul>
              <p className="mt-2 text-sm italic">
                You can opt out of marketing cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Browser Storage</h2>
              <p className="mb-3">
                In addition to cookies, we use browser storage technologies:
              </p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Local Storage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stores your authentication token</li>
                <li>Saves your user preferences</li>
                <li>Caches data for faster loading</li>
                <li>Temporarily stores screenshot data during processing</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Session Storage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stores temporary data for the current browsing session</li>
                <li>Cleared when you close the browser tab</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Third-Party Cookies</h2>
              <p className="mb-3">
                We may use third-party services that set their own cookies:
              </p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Supabase (Authentication)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Handles user authentication securely</li>
                <li>Stores encrypted session tokens</li>
                <li>Subject to Supabase's cookie policy</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Google Analytics (If Used)</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tracks anonymous usage statistics</li>
                <li>Helps us understand user behavior</li>
                <li>You can opt out via browser settings or Google's opt-out tool</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Payment Processors</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stripe or other payment providers may set cookies</li>
                <li>Used to process payments securely</li>
                <li>Subject to their respective privacy policies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Cookie Duration</h2>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Session Cookies</h3>
              <p>Temporary cookies that are deleted when you close your browser.</p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Persistent Cookies</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Authentication tokens:</strong> 7 days (you'll need to log in again after)</li>
                <li><strong>Preferences:</strong> 1 year (or until you clear them)</li>
                <li><strong>Analytics:</strong> 2 years (helps track long-term trends)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Managing Cookies</h2>
              <p className="mb-3">
                You have control over cookies. Here's how to manage them:
              </p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Browser Settings</h3>
              <p className="mb-2">You can control cookies through your browser settings:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
              </ul>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Clearing Cookies</h3>
              <p className="mb-2">To clear existing cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use your browser's "Clear browsing data" feature</li>
                <li>Select "Cookies and other site data"</li>
                <li>Choose your desired time range</li>
                <li>Click "Clear data"</li>
              </ul>
              <p className="mt-2 text-sm italic text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                ⚠️ <strong>Note:</strong> Clearing cookies will log you out of ILoveSnapshots and reset your preferences.
              </p>

              <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Blocking Cookies</h3>
              <p className="mb-2">You can block all or specific types of cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Most browsers allow you to block third-party cookies</li>
                <li>You can block all cookies, but this will prevent you from using ILoveSnapshots</li>
                <li>Some browsers offer "Do Not Track" features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Impact of Disabling Cookies</h2>
              <p className="mb-3">
                If you disable cookies, you may experience the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You won't be able to log in to your account</li>
                <li>Your preferences won't be saved</li>
                <li>Some features may not work properly</li>
                <li>You'll have a degraded user experience</li>
              </ul>
              <p className="mt-3">
                Essential cookies are required for ILoveSnapshots to function. You can disable analytics and
                marketing cookies without affecting core functionality.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Data Collected Through Cookies</h2>
              <p className="mb-3">
                Cookies may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your IP address (anonymized for analytics)</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
              <p className="mt-3">
                This data is used solely to improve the Service and is handled according to our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. When we do, we'll update the "Last Updated" date
                at the top of this page. Significant changes will be communicated via email or through a notice in the Service.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Contact Us</h2>
              <p className="mb-2">If you have questions about our use of cookies:</p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> support@ilovesnapshots.online</li>
                <li><strong>Website:</strong> https://www.ilovesnapshots.online</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-dark mb-4">Your Rights</h2>
              <p className="mb-3">
                Depending on your location, you may have rights regarding cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>EU/EEA Users (GDPR):</strong> Right to consent to non-essential cookies</li>
                <li><strong>California Users (CCPA):</strong> Right to opt out of sale of personal information</li>
                <li><strong>All Users:</strong> Right to manage cookie preferences through browser settings</li>
              </ul>
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
