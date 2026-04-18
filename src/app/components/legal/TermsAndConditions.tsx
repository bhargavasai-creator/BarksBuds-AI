import React, { useState } from 'react';
import { FileText, AlertTriangle, Globe, Shield, Check } from 'lucide-react';

const COUNTRY_RULES = {
  US: 'United States: Subject to federal laws including COPPA, CAN-SPAM Act, and state laws such as CCPA (California).',
  UK: 'United Kingdom: Governed by UK GDPR, Data Protection Act 2018, and Consumer Rights Act 2015.',
  EU: 'European Union: Compliant with GDPR, ePrivacy Directive, and Consumer Rights Directive.',
  CA: 'Canada: Subject to PIPEDA, CASL (anti-spam), and provincial privacy laws.',
  AU: 'Australia: Governed by Privacy Act 1988, Australian Consumer Law, and Spam Act 2003.',
  IN: 'India: Subject to Information Technology Act 2000, Personal Data Protection Bill.',
  BR: 'Brazil: Governed by LGPD (Lei Geral de Proteção de Dados).',
  JP: 'Japan: Subject to Act on the Protection of Personal Information (APPI).',
  CN: 'China: Governed by Personal Information Protection Law (PIPL) and Cybersecurity Law.',
  // Add more countries as needed...
};

export function TermsAndConditions() {
  const [userCountry, setUserCountry] = useState('US');
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-10 h-10" />
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        </div>
        <p className="text-sm opacity-90">
          Last Updated: January 7, 2025 | Effective Date: January 1, 2025
        </p>
        <p className="mt-2">
          By using Critter Affinity, you agree to these terms and conditions.
        </p>
      </div>

      {/* Country Selector */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-6 h-6 text-blue-500" />
          Select Your Country/Region
        </h2>
        <select
          value={userCountry}
          onChange={(e) => setUserCountry(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {Object.keys(COUNTRY_RULES).map((code) => (
            <option key={code} value={code}>
              {code} - {COUNTRY_RULES[code as keyof typeof COUNTRY_RULES].split(':')[0]}
            </option>
          ))}
        </select>
        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            {COUNTRY_RULES[userCountry as keyof typeof COUNTRY_RULES]}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-sm text-gray-700">
            By accessing or using Critter Affinity ("the Platform"), you agree to be bound by these Terms 
            and Conditions, our Privacy Policy, and all applicable laws and regulations. If you do not 
            agree, please do not use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility & Age Requirements</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Critter Affinity is available to users of all ages, including children. However:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Users under 13 must have verifiable parental/guardian consent</li>
              <li>• Users aged 13-17 may use the platform with parental awareness</li>
              <li>• All ages can create pet profiles and participate in animal-focused content</li>
              <li>• Human-only content is strictly prohibited (see Content Policy)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-500" />
            3. Content Policy & Moderation
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <h3 className="font-bold text-red-900 mb-2">MANDATORY CONTENT RULES:</h3>
              <ul className="space-y-2">
                <li>✅ <strong>ALLOWED:</strong> Content featuring animals, pets, nature, wildlife</li>
                <li>❌ <strong>PROHIBITED:</strong> Human-only photos/videos without animals or nature</li>
                <li>✅ <strong>ALLOWED:</strong> Humans WITH their pets in photos</li>
                <li>❌ <strong>PROHIBITED:</strong> Nudity, violence, hate speech, spam</li>
              </ul>
            </div>
            <p>
              All content is reviewed by AI moderation before publication. Violating content is 
              automatically rejected and stored for admin review. Repeated violations may result in 
              account suspension.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Accounts & Profiles</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• One user can create multiple profiles (pets, shop, delivery partner)</li>
            <li>• Pet profiles must contain accurate breed and age information</li>
            <li>• Shop/vendor profiles must provide valid business credentials</li>
            <li>• Delivery partner profiles require admin approval and ID verification</li>
            <li>• You are responsible for maintaining account security</li>
            <li>• Sharing accounts is prohibited</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Pet Dating Service</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              The pet dating feature connects compatible pets for breeding or playdate purposes:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Matches are limited to users within the same country</li>
              <li>• Users must verify pet ownership and vaccination records</li>
              <li>• Critter Affinity is not responsible for breeding outcomes</li>
              <li>• Users must comply with local breeding and animal welfare laws</li>
              <li>• Inappropriate use may result in immediate ban</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Marketplace & Transactions</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Farmers enjoy ZERO transaction fees (0%)</li>
            <li>• Other vendors pay standard marketplace fees</li>
            <li>• All transactions must comply with local commerce laws</li>
            <li>• Cryptocurrency payments are supported (BTC, ETH, USDT, etc.)</li>
            <li>• Critter Affinity is not responsible for product quality or delivery</li>
            <li>• Refunds are handled according to country-specific consumer protection laws</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Insurance Services</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              Pet insurance is calculated based on breed, age, health score, and lifespan:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Premiums are non-refundable once paid</li>
              <li>• Coverage begins 14 days after purchase (waiting period)</li>
              <li>• Pre-existing conditions may not be covered</li>
              <li>• Claims must be submitted within 90 days of treatment</li>
              <li>• Insurance is underwritten by licensed partners in each country</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Subscription & Payments</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• First prompt/interaction is FREE for all users</li>
            <li>• After free tier: $0.01 per word for AI features</li>
            <li>• Subscription plans: Basic ($9.99/mo), Premium ($24.99/mo), Pro ($49.99/mo)</li>
            <li>• Subscriptions auto-renew unless canceled 24 hours before renewal</li>
            <li>• Refunds according to country-specific consumer protection laws</li>
            <li>• Cryptocurrency payments are final and non-refundable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Wearable Device Integration</h2>
          <p className="text-sm text-gray-700">
            Integration with pet wearables (collars, chips, belts) is subject to:
          </p>
          <ul className="space-y-2 ml-4 text-sm text-gray-700">
            <li>• Device manufacturer terms and conditions</li>
            <li>• Data accuracy depends on device quality</li>
            <li>• Critter Affinity is not liable for device malfunctions</li>
            <li>• Health data is used for tracking and insurance calculations only</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Memorial Pages</h2>
          <p className="text-sm text-gray-700">
            Memorial pages for deceased pets are maintained indefinitely at no charge. You may request 
            removal at any time. These pages are public and may be viewed by other users.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Location-Based Services</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Location permission is mandatory for core features</li>
            <li>• Dating matches are restricted to same country for safety</li>
            <li>• News feeds show content based on your location after 1+ week in same area</li>
            <li>• Poop bin mapping relies on user-contributed data</li>
            <li>• You can contribute poop bin locations to help the community</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Intellectual Property</h2>
          <p className="text-sm text-gray-700">
            All content you post remains your property, but you grant Critter Affinity a worldwide, 
            non-exclusive, royalty-free license to use, display, and distribute your content on the 
            Platform. The Critter Affinity name, logo, and platform design are protected by copyright 
            and trademark laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Disclaimer of Warranties</h2>
          <p className="text-sm text-gray-700">
            CRITTER AFFINITY IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE 
            UNINTERRUPTED ACCESS, ACCURACY OF DATA, OR FITNESS FOR A PARTICULAR PURPOSE. USE AT YOUR OWN RISK.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Limitation of Liability</h2>
          <p className="text-sm text-gray-700">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CRITTER AFFINITY SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Governing Law & Dispute Resolution</h2>
          <p className="text-sm text-gray-700">
            These Terms are governed by the laws of your country of residence. Disputes will be resolved 
            through arbitration in accordance with local laws, except where prohibited by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Changes to Terms</h2>
          <p className="text-sm text-gray-700">
            We reserve the right to modify these Terms at any time. Changes will be posted with an updated 
            "Last Updated" date. Continued use constitutes acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contact Information</h2>
          <div className="p-4 bg-gray-50 rounded-lg text-sm">
            <p className="font-bold">Critter Affinity LLC</p>
            <p>Email: legal@critteraffinity.com</p>
            <p>Address: [Company Address]</p>
            <p>Phone: +1-800-CRITTER</p>
          </div>
        </section>

        {/* Acceptance Checkbox */}
        <div className="border-t-2 border-gray-200 pt-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to the Terms & Conditions, Privacy Policy, and understand that 
              these terms are governed by the laws of <strong>{userCountry}</strong>.
            </span>
          </label>
          {accepted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">
                Terms accepted. You can now use all features of Critter Affinity.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-4">
        <p>© 2025 Critter Affinity LLC. All Rights Reserved.</p>
        <p className="mt-1">Operating in 237 countries with full legal compliance</p>
        <p className="mt-1">Last updated: January 2025 - Present</p>
      </div>
    </div>
  );
}
