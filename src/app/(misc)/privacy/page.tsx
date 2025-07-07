import type { Metadata } from "next";
import Hero from "@/components/Hero";

const title = "Privacy Policy";
const description = "Learn how we handle your data and privacy at PIQEL.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function PrivacyPage() {
  return (
    <>
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 max-w-prose">
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you use PIQEL.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Anonymous usage data, such as pages visited and actions taken on the site.</li>
          <li>Cookies and similar technologies for analytics and personalization.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and improve our services.</li>
          <li>To personalize your experience.</li>
          <li>To analyze usage and trends.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">We use cookies to enhance your experience.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
        <p className="mb-4">
          We may use third-party services (such as analytics providers) that collect, monitor, and
          analyze usage data.
        </p>
      </div>
    </>
  );
}
