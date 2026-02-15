"use client";

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

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#0d0d0d] text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Last Updated: August 26, 2025
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-gray-300 mb-8">
            {`Line-A-Link ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application (the "Service"). Please read this policy carefully.`}
          </p>

          <Section title="1. Information We Collect">
            <p>
              {`We may collect information about you in a variety of ways. The information we may collect via the Service includes:`}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Personal Data:</strong>{" "}
                {`Personally identifiable information, such as your name, email address, and profile picture, that you voluntarily give to us when you register with the Service.`}
              </li>
              <li>
                <strong>Location Data:</strong>{" "}
                {`We collect precise location data from your device when the app is running in the foreground or background to enable our core feature of route matching. You may disable this at any time through your device's settings, but doing so may limit the functionality of the Service.`}
              </li>
              <li>
                <strong>Communications Data:</strong>{" "}
                {`When you communicate with other users via our in-app chat, we may process the content of those communications to ensure the safety and security of our platform.`}
              </li>
              <li>
                <strong>Usage Data:</strong>{" "}
                {`Information our servers automatically collect when you access the Service, such as your IP address, browser type, and the pages you have viewed.`}
              </li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>
              {`Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:`}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create and manage your account.</li>
              <li>Match your travel route with relevant commuters.</li>
              <li>Facilitate communication between users.</li>
              <li>Improve the efficiency and operation of the Service.</li>
              <li>Monitor and analyze usage and trends to improve your experience.</li>
              <li>Notify you of updates to the Service.</li>
            </ul>
          </Section>

          <Section title="3. Disclosure of Your Information">
            <p>
              {`We do not share your information with third parties except in the situations described below:`}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>With Other Users:</strong>{" "}
                {`To facilitate a Link, certain profile information and your general route will be shared with other users you match with. Your precise, real-time location is only shared when you explicitly agree to a Link.`}
              </li>
              <li>
                <strong>By Law or to Protect Rights:</strong>{" "}
                {`We may share your information if we believe it is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.`}
              </li>
            </ul>
          </Section>

          <Section title="4. Data Security">
            <p>
              {`We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.`}
            </p>
          </Section>

          <Section title="5. Your Rights and Choices">
            <p>
              {`You may at any time review or change the information in your account or terminate your account by accessing your account settings. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases.`}
            </p>
          </Section>

          <Section title="6. Contact Us">
            <p>
              {`If you have questions or comments about this Privacy Policy, please contact us at `}
              <a
                href="mailto:aruldeshwal1@gmail.com"
                className="text-purple-400 hover:underline"
              >
                privacy@linealink.com
              </a>
              {`.`}
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
