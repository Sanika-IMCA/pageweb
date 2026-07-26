import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About | Sayagaa Studios — Operations Research & Systems Engineering",
  description: "About Sanika and our operational research philosophy.",
};

export default function AboutPage() {
  return <AboutContent />;
}
