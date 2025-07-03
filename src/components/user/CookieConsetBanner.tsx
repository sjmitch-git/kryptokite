"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      debug={true}
      location="bottom"
      buttonText="OK"
      cookieName="piqel_cookie_consent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={365}
    >
      This site uses cookies to store information on your computer. We use cookies to provide a
      better user experience. By using our site, you acknowledge that you have read and understand
      our{" "}
      <Link href="/privacy" style={{ color: "#fff", textDecoration: "underline" }}>
        Privacy Policy
      </Link>
    </CookieConsent>
  );
}
