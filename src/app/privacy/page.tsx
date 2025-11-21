"use client";

import { SnapshotNavbar } from "@/components/sections/SnapshotNavbar";
import { SnapshotFooter } from "@/components/sections/SnapshotFooter";

export default function PrivacyPage() {
  return (
    <>
      <SnapshotNavbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
        <h1 className="text-5xl font-bold text-dark mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="text-dark-lighter text-lg mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-8 text-dark-lighter leading-relaxed">
          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">What This Extension Does</h2>
            <p>
              ILoveSnapshots is a Chrome extension that helps you capture screenshots and styled text from webpages.
              You can take quick screenshots, full-page screenshots that automatically scroll and stitch together,
              or save text with its original formatting. All your captures are saved to your account.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Account Requirement</h2>
            <p>
              You must create an account and log in to use ILoveSnapshots. The extension does not work without authentication.
              This allows us to save your screenshots and text captures to your personal account so you can access them from any device.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">What Data We Collect</h2>

            <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Account Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email address:</strong> Required to create your account and log in</li>
              <li><strong>Full name:</strong> Optional, used for personalization</li>
              <li><strong>Password:</strong> Encrypted and securely stored by Supabase (our authentication provider)</li>
              <li><strong>Login tokens:</strong> Stored in your browser to keep you logged in</li>
            </ul>

            <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">Content You Create</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Screenshots:</strong> Images you capture from webpages</li>
              <li><strong>Text captures:</strong> Text you save with styling</li>
              <li><strong>Edits:</strong> Any changes you make to screenshots in the editor</li>
            </ul>

            <h3 className="text-2xl font-semibold text-dark mt-6 mb-3">User Preferences</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Theme selection:</strong> Which theme you prefer for text captures</li>
              <li><strong>Feature settings:</strong> Whether text capture mode is turned on or off</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email address:</strong> To identify your account, send you important updates, and allow you to reset your password</li>
              <li><strong>Login tokens:</strong> To recognize you when you use the extension so you don't have to log in every time</li>
              <li><strong>Screenshots and text:</strong> To save your captures to your account so you can access them later</li>
              <li><strong>Preferences:</strong> To remember your settings across sessions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">What We Don't Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We don't track which websites you visit</li>
              <li>We don't read your browsing history</li>
              <li>We don't capture screenshots or text without you clicking the capture button</li>
              <li>We don't share or sell your data to anyone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Browser Permissions We Request</h2>

            <div className="space-y-4">
              <div>
                <strong className="text-dark">activeTab:</strong> To take screenshots of the webpage you're currently viewing,
                only when you click the extension icon or use a keyboard shortcut.
              </div>

              <div>
                <strong className="text-dark">tabs:</strong> To open the editor in a new tab after you take a screenshot,
                and to turn text capture features on or off on the current tab.
              </div>

              <div>
                <strong className="text-dark">storage:</strong> To save your login token and preferences in your browser,
                and to temporarily store screenshot data while it's being processed.
              </div>

              <div>
                <strong className="text-dark">scripting:</strong> To capture full-page screenshots by automatically scrolling
                through long pages and stitching multiple screenshots together.
              </div>

              <div>
                <strong className="text-dark">ilovesnapshots.online:</strong> To receive your login token when you log in
                through our website.
              </div>

              <div>
                <strong className="text-dark">Content Script (all websites):</strong> To enable text capture features on any
                website you visit. This feature is turned off by default - you have to turn it on manually using the popup menu
                or keyboard shortcuts.
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">How We Store Your Data</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Authentication:</strong> Passwords and login tokens are encrypted and securely stored by Supabase</li>
              <li><strong>Screenshots and text:</strong> Stored on secure cloud servers</li>
              <li><strong>Temporary data:</strong> Screenshot data is briefly stored in your browser during processing, then automatically deleted after 5 minutes</li>
              <li><strong>Preferences:</strong> Stored in your browser's local storage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Third-Party Services</h2>
            <p className="mb-2">We use the following trusted services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase:</strong> For secure authentication and database storage</li>
              <li><strong>Google OAuth:</strong> If you choose to sign in with Google</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies. We only share the minimum information necessary
              for these services to work (like your email for authentication).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Your Rights and Choices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access your data:</strong> You can view all your saved screenshots and text captures in your dashboard</li>
              <li><strong>Delete your data:</strong> You can delete individual captures or your entire account at any time</li>
              <li><strong>Export your data:</strong> Download your screenshots at any time</li>
              <li><strong>Turn features on/off:</strong> Text capture features are opt-in and can be toggled at any time</li>
              <li><strong>Uninstall:</strong> Removing the extension deletes all locally stored data from your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Data Retention</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account data:</strong> Kept until you delete your account</li>
              <li><strong>Screenshots and text:</strong> Kept until you delete them</li>
              <li><strong>Temporary browser data:</strong> Automatically deleted after 5 minutes</li>
              <li><strong>Login tokens:</strong> Expire after 7 days (you'll need to log in again)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Security</h2>
            <p>
              We take security seriously. Your password is never stored in plain text - it's encrypted by Supabase.
              Login tokens are securely stored in your browser. All communication between the extension and our servers
              uses HTTPS encryption.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Children's Privacy</h2>
            <p>
              ILoveSnapshots is not intended for children under 13. We don't knowingly collect information from children.
              If you're a parent and believe your child has provided us with information, please contact us and we'll delete it.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. When we do, we'll update the "Last Updated" date at the top.
              If we make significant changes, we'll notify you by email or through a notice in the extension.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Contact Us</h2>
            <p className="mb-2">If you have questions about this privacy policy or your data:</p>
            <ul className="list-none space-y-2">
              <li><strong>Email:</strong> support@ilovesnapshots.online</li>
              <li><strong>Website:</strong> https://www.ilovesnapshots.online</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-dark mb-4">Legal Compliance</h2>
            <p>
              We comply with applicable data protection laws including GDPR (for European users) and CCPA (for California users).
              You have the right to request access to, correction of, or deletion of your personal data. Contact us to exercise these rights.
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
