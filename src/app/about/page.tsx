import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About | Sayagaa — AI Systems & Automation",
  description: "About Sanika and our operational research philosophy.",
};

export default function AboutPage() {
  return <AboutContent />;
}
