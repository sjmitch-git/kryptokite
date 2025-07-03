import React from "react";

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and
        protect your information when you use PIQEL.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Information you provide directly, such as your email address or preferences.</li>
        <li>Usage data, such as pages visited and actions taken on the site.</li>
        <li>Cookies and similar technologies for analytics and personalization.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and improve our services.</li>
        <li>To personalize your experience.</li>
        <li>To analyze usage and trends.</li>
        <li>To communicate with you if you have opted in.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your experience. You can manage your cookie preferences at any
        time.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services (such as analytics providers) that collect, monitor, and
        analyze usage data.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information. Contact us if you
        have any questions or requests regarding your data.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <a href="mailto:support@piqel.app" className="text-blue-600 underline">
          support@piqel.app
        </a>
        .
      </p>
    </main>
  );
}
