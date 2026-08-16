import type { Metadata } from "next";
import ScopingContent from "./ScopingContent";

export const metadata: Metadata = {
  title: "Get Scoped | Sayagaa — AI Systems & Automation",
  description: "Initiate operational discovery scoping. Define your workflow friction, targets, and systems requirements.",
};

export default function ScopingPage() {
  return <ScopingContent />;
}
