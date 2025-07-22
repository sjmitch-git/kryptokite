"use client";

import { SocialShare } from "@/lib/fluid";

export default function ClientSocialShare({ text }: { text: string }) {
  return (
    <div className="flex justify-between items-center my-8">
      <SocialShare
        text={text}
        buttons={["X", "Facebook", "LinkedIn", "Bluesky", "WhatsApp", "Email"]}
        btnShape="circle"
        size="lg"
        gap="md"
        layout="horizontal"
        className="mx-auto"
      />
    </div>
  );
}
