import type { Metadata } from "next";
import Hero from "@/components/Hero";

const title = "Terms and Conditions";
const description = "The rules and guidelines for using PIQEL.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function TermsPage() {
  return (
    <>
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 max-w-prose">
        <p className="mb-4">
          By accessing or using PIQEL, you agree to be bound by these Terms and Conditions. If you
          do not agree, please do not use the site.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Site</h2>
        <p className="mb-4">
          You agree to use PIQEL only for lawful purposes and in accordance with these terms. You
          must not misuse the site or attempt to access it in an unauthorized manner.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Intellectual Property</h2>
        <p className="mb-4">
          All content, trademarks, and data on PIQEL are the property of their respective owners.
          You may not copy, reproduce, or distribute any content without permission.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
        <p className="mb-4">
          PIQEL is provided "as is" without warranties of any kind. We are not liable for any
          damages or losses resulting from your use of the site.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms and Conditions at any time. Continued use of the site means you
          accept any changes.
        </p>
      </div>
    </>
  );
}
