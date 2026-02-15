"use client";

import Link from "next/link";
import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section = ({ title, children }: SectionProps) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-white mb-4 border-b-2 border-purple-500/30 pb-2">
      {title}
    </h2>
    <div className="space-y-4 text-gray-300 leading-relaxed">
      {children}
    </div>
  </div>
);

const TermsAndConditions = () => {
  return (
    <div className="bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Last Updated: August 26, 2025
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            {`Welcome to Line-A-Link. These terms and conditions outline the rules and regulations for the use of Line-A-Link's services. By accessing and using our application, you accept and agree to be bound by the terms and provisions of this agreement.`}
          </p>

          <Section title="1. The Service">
            <p>
              {`Line-A-Link provides a platform to connect individuals ("Users") for the purpose of sharing commutes and journeys ("Links"). Our service includes route matching, profile creation, in-app chat functionalities, and AI-powered conversational aids ("AI Icebreakers"). We are a neutral facilitator and are not a party to any agreement between Users.`}
            </p>
          </Section>

          <Section title="2. User Accounts and Conduct">
            <p>
              {`To use Line-A-Link, you must register for an account and provide accurate and complete information. You are solely responsible for the activity that occurs on your account and for keeping your password secure.`}
            </p>
            <p>
              {`You agree not to use the service for any unlawful purpose or to engage in any form of harassment, discrimination, or harmful behavior towards other Users. Your safety is your personal responsibility; we encourage you to exercise caution and good judgment when arranging Links with others.`}
            </p>
          </Section>

          <Section title="3. AI Icebreakers">
            <p>
              {`Our AI Icebreakers feature is designed to facilitate comfortable initial interactions. These suggestions are generated automatically. Line-A-Link is not responsible for the content of these suggestions or any conversations that arise from them. Users are encouraged to use this feature responsibly and respectfully.`}
            </p>
          </Section>

          <Section title="4. Privacy">
            <p>
              {`Our privacy is of paramount importance to us. Our `}
              <Link
                href="/privacy"
                className="text-purple-400 hover:underline"
              >
                Privacy Policy
              </Link>
              {`, which is incorporated into these Terms by reference, explains how we collect, use, and protect your personal information. Please review it carefully.`}
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>
              {`Line-A-Link is provided on an "as is" and "as available" basis. We do not guarantee the safety, legality, or quality of the Links arranged through our platform. To the fullest extent permitted by law, Line-A-Link shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of the service or your interactions with other Users.`}
            </p>
          </Section>

          <Section title="6. Termination">
            <p>
              {`We may terminate or suspend your account at our sole discretion, without prior notice or liability, for any reason, including a breach of these Terms. Upon termination, your right to use the Service will immediately cease.`}
            </p>
          </Section>

          <Section title="7. Changes to Terms">
            <p>
              {`We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms and Conditions on this page. You are advised to review this page periodically for any changes.`}
            </p>
          </Section>

          <Section title="8. Contact Us">
            <p>
              {`If you have any inquiries regarding these Terms and Conditions, please do not hesitate to contact us at `}
              <a
                href="mailto:aruldeshwal1@gmail.com"
                className="text-purple-400 hover:underline"
              >
                support@linealink.com
              </a>
              {`.`}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
