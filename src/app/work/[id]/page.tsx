import type { Metadata } from "next";
import CaseStudyContent, { STUDIES_DB } from "./CaseStudyContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = STUDIES_DB[resolvedParams.id];

  if (!study) {
    return {
      title: "Case Study Not Found | Page Studios",
    };
  }

  return {
    title: `${study.client} Case Study | Page Studios`,
    description: `Read the ${study.client} case study details: ${study.description} Coded for operational rigor.`,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <CaseStudyContent id={resolvedParams.id} />;
}
