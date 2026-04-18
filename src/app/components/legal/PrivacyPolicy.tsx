import React from 'react';
import { Shield, Lock, Eye, FileText, Globe } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-10 h-10" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-sm opacity-90">
          Last Updated: January 7, 2025 | Effective Date: January 1, 2025
        </p>
        <p className="mt-2">
          Critter Affinity LLC respects your privacy and is committed to protecting your personal data.
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-500" />
            1. Information We Collect
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-bold mb-2">1.1 Device Information</h3>
              <p className="text-sm">
                We collect device information including browser type, operating system, device identifiers, 
                and network information to provide you with optimal service and security.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">1.2 Location Data</h3>
              <p className="text-sm">
                With your explicit permission, we collect geolocation data to provide location-based features 
                such as finding nearby pet services, dating matches in your country, and poop bin mapping.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">1.3 Pet Health Data</h3>
              <p className="text-sm">
                Data from wearable devices (collars, chips, belts) including activity levels, heart rate, 
                and health metrics is collected to provide health tracking and insurance calculations.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">1.4 User-Generated Content</h3>
              <p className="text-sm">
                Posts, photos, videos, and comments you share on the platform. All content must include 
                animals, pets, or nature as per our content guidelines.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-500" />
            2. How We Use Your Information
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Provide and improve our services</li>
            <li>• Calculate personalized insurance premiums based on breed, age, and health</li>
            <li>• Match you with compatible pets for dating (within your country only)</li>
            <li>• Send reminders for pet care, feeding, and medication</li>
            <li>• Process payments (fiat and cryptocurrency)</li>
            <li>• Detect and prevent fraud and abuse</li>
            <li>• Comply with legal obligations in all 237 countries we operate</li>
            <li>• Provide customer support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-green-500" />
            3. Data Sharing & Third Parties
          </h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-sm">
              We do NOT sell your personal data. We may share data with:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Insurance partners for policy underwriting</li>
              <li>• Payment processors (Stripe, crypto wallets)</li>
              <li>• Cloud service providers (AWS, Google Cloud, Azure)</li>
              <li>• Analytics providers (Power BI for financial dashboards - admin only)</li>
              <li>• Law enforcement when required by law</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-orange-500" />
            4. International Data Transfers
          </h2>
          <p className="text-sm text-gray-700">
            Critter Affinity operates globally across 237 countries. Your data may be transferred to and 
            processed in countries outside your residence. We comply with GDPR (EU), CCPA (California), 
            PIPEDA (Canada), LGPD (Brazil), and all applicable data protection laws in each jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Age Restrictions</h2>
          <p className="text-sm text-gray-700">
            Critter Affinity is designed for all ages, including children under 13 (with parental consent). 
            We do NOT collect unnecessary data from children and comply with COPPA regulations. The platform 
            is pet-focused, not human-focused, making it safe for all ages.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Access:</strong> Request a copy of your data</li>
            <li>• <strong>Correction:</strong> Update incorrect information</li>
            <li>• <strong>Deletion:</strong> Request data deletion (subject to legal requirements)</li>
            <li>• <strong>Portability:</strong> Export your data in machine-readable format</li>
            <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            <li>• <strong>Withdraw Consent:</strong> Revoke permissions for location/microphone</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
          <p className="text-sm text-gray-700">
            We retain your data for as long as your account is active or as needed to provide services. 
            Deleted data is removed within 90 days unless required for legal compliance. Pet memorial pages 
            are retained indefinitely unless specifically requested for removal.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies & Tracking</h2>
          <p className="text-sm text-gray-700">
            We use cookies to remember your preferences, maintain your session, and analyze site usage. 
            You can disable cookies in your browser, but some features may not work properly. We request 
            cookie consent after you log in, not before.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Security Measures</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• End-to-end encryption for sensitive data</li>
            <li>• Regular security audits and penetration testing</li>
            <li>• Two-factor authentication (OTP)</li>
            <li>• Secure cloud infrastructure (AWS/Google Cloud/Azure)</li>
            <li>• Employee access controls and monitoring</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Updates to This Policy</h2>
          <p className="text-sm text-gray-700">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with 
            an updated "Last Updated" date. Continued use of Critter Affinity after changes constitutes 
            acceptance of the new policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
          <p className="text-sm text-gray-700">
            For privacy-related questions or to exercise your rights:
          </p>
          <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-bold">Critter Affinity LLC</p>
            <p>Email: privacy@critteraffinity.com</p>
            <p>Data Protection Officer: dpo@critteraffinity.com</p>
            <p>Phone: +1-800-CRITTER</p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>© 2025 Critter Affinity LLC. All Rights Reserved.</p>
        <p className="mt-1">Protecting your privacy since January 2025</p>
        <p className="mt-1">Available in 237 countries • 20+ languages • 100% pet-focused</p>
      </div>
    </div>
  );
}
