import type { Metadata } from "next";
import Hero from "@/components/Hero";

const title = "Disclaimer";
const description = "Important information about the use of PIQEL and its content.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function DisclaimerPage() {
  return (
    <>
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 max-w-prose">
        <p className="mb-4">
          The information provided on PIQEL is for general informational purposes only. All
          information on the site is provided in good faith; however, we make no representation or
          warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
          reliability, availability, or completeness of any information on the site.
        </p>
        <p className="mb-4">
          Under no circumstance shall we have any liability to you for any loss or damage of any
          kind incurred as a result of the use of the site or reliance on any information provided
          on the site. Your use of the site and your reliance on any information on the site is
          solely at your own risk.
        </p>
        <p className="mb-4">
          PIQEL does not provide financial, investment, or trading advice. The content on this site
          is not intended to be a substitute for professional financial advice. Always seek the
          advice of a qualified financial advisor or other qualified professional with any questions
          you may have regarding investments or financial decisions.
        </p>
        <p>
          By using PIQEL, you acknowledge that you have read this disclaimer and agree to its terms.
        </p>
      </div>
    </>
  );
}
