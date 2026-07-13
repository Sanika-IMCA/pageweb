import type { Metadata } from "next";
import ScopingContent from "./ScopingContent";

export const metadata: Metadata = {
  title: "Get Scoped | Page Studios — Business Systems & AI Engineering",
  description: "Initiate operational discovery scoping. Define your workflow friction, targets, and systems requirements.",
};

export default function ScopingPage() {
  return <ScopingContent />;
}
