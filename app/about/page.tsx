import type { Metadata } from "next";

import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "About Us | Altitude Escapes",
  description:
    "Learn more about Altitude Escapes. Our story, mission, values, and passion for creating unforgettable Himalayan travel experiences.",
};

export default function AboutPage() {
  return (
    <UnderDevelopment
      title="About Altitude Escapes"
      description="We're crafting a beautiful story that reflects our passion for luxury Himalayan travel, authentic experiences, and exceptional hospitality. Our About page will be available very soon."
    />
  );
}