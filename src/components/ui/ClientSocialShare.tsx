"use client";

import dynamic from "next/dynamic";

const SocialShare = dynamic(() => import("@smitch/fluid/lib/socialshare/SocialShare"), {
  ssr: false,
});

export default function ClientSocialShare({ name }: { name: string }) {
  return (
    <div className="flex justify-between items-center my-8">
      <SocialShare
        text={name}
        buttons={["X", "Facebook", "LinkedIn", "Slack", "WhatsApp", "Email"]}
        btnShape="circle"
        size="lg"
        gap="md"
        layout="horizontal"
        className="mx-auto"
      />
    </div>
  );
}
