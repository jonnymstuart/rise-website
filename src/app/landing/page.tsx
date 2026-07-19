import type { Metadata } from "next";
import { Landing } from "@/components/landing/Landing";
import { landing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Landing",
  description:
    "We create the future with our partners — through AI, design, GEO and development.",
};

export default function LandingPage() {
  return <Landing content={landing} />;
}
