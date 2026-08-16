export interface CaseStudyData {
  id: string;
  slug: string;
  client: string; // Project Name
  category: string; // Industry
  status: "CLIENT PROJECT" | "INTERNAL SYSTEM" | "SAYAGAA PROTOTYPE" | "CONCEPT";
  systemBuilt: string;
  description: string; // Short Description
  problemHeadline: string;
  problem: string;
  context: string;
  researchTitle: string; // "03 / RESEARCH" or "03 / SYSTEM DESIGN ASSUMPTIONS"
  research: string;
  frictionNodes: string[];
  systemDesign: string[];
  components: { title: string; desc: string }[];
  beforeFlow: string[];
  afterFlow: string[];
  impactTitle: string; // "VERIFIED OUTCOMES" or "QUALITATIVE OUTCOMES"
  impact: string[];
  businessImpact: string[];
  techStack: string[];
  lessons: string;
  metaResolution: string;
  metaComponent: string;
  image: string;
  altText: string;
  previousProject: { slug: string; name: string };
  nextProject: { slug: string; name: string };
}

export const STUDIES_DB: Record<string, CaseStudyData> = {
  "outreach-engine": {
    id: "outreach-engine",
    slug: "outreach-engine",
    client: "OUTREACH ENGINE",
    category: "LOGISTICS",
    status: "SAYAGAA PROTOTYPE",
    systemBuilt: "Workflow Automation & Dispatch Sequencer",
    description: "Prototype demonstrating automated dispatch routing based on operator availability.",
    problemHeadline: "MANUAL DISPATCH DOESN'T SCALE WITH OPERATIONAL COMPLEXITY.",
    problem: "Manual dispatch coordination creates repeated operator handoffs, dispatch delays, and scheduling bottlenecks.",
    context: "This system handles regional driver dispatch operations. The business needs to route freight assignments quickly to available trucks while tracking manifests without manual delays.",
    researchTitle: "03 / SYSTEM DESIGN ASSUMPTIONS",
    research: "We analyzed logistics dispatch patterns: mapped route metadata points, dispatcher decision trees, WhatsApp coordinate tracking channels, and timing delays in manual data synchronization.",
    frictionNodes: ["INPUT", "MANUAL ENTRY", "SPREADSHEET", "OPERATOR", "EMAIL / WHATSAPP", "SECOND OPERATOR", "CRM", "NEXT ACTION"],
    systemDesign: ["INPUT", "DATA", "LOGIC", "AUTOMATION", "OPERATOR", "OUTPUT"],
    components: [
      { title: "01 DATA INGESTION", desc: "Automated load parsing webhooks." },
      { title: "02 PROCESSING LOGIC", desc: "Priority driver scoring algorithm." },
      { title: "03 DATABASE", desc: "Operational state database tracking availability." },
      { title: "04 AUTOMATION", desc: "Auto-dispatch notification engines." },
      { title: "05 OPERATOR INTERFACE", desc: "Centralized dispatch supervisor board." }
    ],
    beforeFlow: ["Broker File", "Manual Copy-Paste", "Spreadsheet Grid", "WhatsApp Message", "Operator Follow-up"],
    afterFlow: ["Webhook Import", "Parsing Logic", "Priority Driver Scoring", "Automated Route Dispatch", "State Update"],
    impactTitle: "QUALITATIVE OUTCOMES",
    impact: [
      "REDUCED MANUAL HANDOFFS",
      "CENTRALIZED OPERATIONAL STATE",
      "AUTOMATED REPEATED UPDATES"
    ],
    businessImpact: [
      "LESS MANUAL WORK",
      "FEWER HANDOFFS",
      "MORE CONTROL"
    ],
    techStack: ["NODE.JS", "POSTGRESQL", "REDIS", "RABBITMQ"],
    lessons: "The problem wasn't a lack of software; it was that dispatch state lived across too many disconnected documents and WhatsApp chats.",
    metaResolution: "1920x1080 PX",
    metaComponent: "REACT-FLOW // NODE-GRAPH",
    image: "/assets/outreach-engine.png",
    altText: "Outreach Engine campaign sequencer interface displaying multi-step automated dispatch node pathways.",
    previousProject: { slug: "knowledgeflow-ai", name: "KNOWLEDGEFLOW AI" },
    nextProject: { slug: "founder-inbox", name: "FOUNDER INBOX" }
  },
  "founder-inbox": {
    id: "founder-inbox",
    slug: "founder-inbox",
    client: "FOUNDER INBOX",
    category: "B2B SERVICES",
    status: "SAYAGAA PROTOTYPE",
    systemBuilt: "AI Email Agent & CRM Integration Hub",
    description: "Prototype demonstrating semantic email classification, qualification workflows, and CRM synchronization.",
    problemHeadline: "MANUAL EMAIL TRIAGE CLOGS EXECUTIVE WORKFLOWS.",
    problem: "Founders and executives spent hours daily reading through bulk inquiries, cold solicitations, and customer feedback to find high-value sales requests.",
    context: "A high-growth founder operations environment. The executive needs to respond quickly to hot sales leads while filtering out automated pitches and spam.",
    researchTitle: "03 / SYSTEM DESIGN ASSUMPTIONS",
    research: "We investigated email categorization nodes, classification latency, vector storage options, and Hubspot contact syncing protocols.",
    frictionNodes: ["INCOMING EMAIL", "MANUAL SCAN", "LEAD IDENTIFICATION", "COPY DETAILS", "OPEN CRM", "CREATE CONTACT", "ASSIGN REP", "FOLLOW UP"],
    systemDesign: ["INCOMING EMAIL", "API LISTEN", "SEMANTIC CLASSIFICATION", "CRM SYNC", "AUTO DRAFT", "REP NOTIFY"],
    components: [
      { title: "01 DATA INGESTION", desc: "Gmail/Outlook webhook listeners." },
      { title: "02 PROCESSING LOGIC", desc: "Semantic OpenAI classifier." },
      { title: "03 DATABASE", desc: "Redis triage queues." },
      { title: "04 AUTOMATION", desc: "Automated CRM lead creation." },
      { title: "05 OPERATOR INTERFACE", desc: "Founder triage panel." }
    ],
    beforeFlow: ["Inbound Email", "Manual Sorting", "Copying Contact details", "Hubspot Manual Entry"],
    afterFlow: ["Webhook Feed", "Semantic Parser", "Triage Tagging", "Auto CRM Sync", "Draft Ready"],
    impactTitle: "QUALITATIVE OUTCOMES",
    impact: [
      "ELIMINATED MANUAL TRIAGE",
      "ACCELERATED LEAD RESPONSE",
      "CENTRALIZED INBOUND FEED"
    ],
    businessImpact: [
      "LESS MANUAL WORK",
      "FASTER RESPONSE",
      "BETTER VISIBILITY"
    ],
    techStack: ["NEXT.JS", "OPENAI API", "REDIS", "GMAIL API"],
    lessons: "Automating categorization isn't about ignoring emails; it's about structuring inbound state before it hits the operator's screen.",
    metaResolution: "1440x900 PX",
    metaComponent: "OPENAI-API // TAILWIND-UI",
    image: "/assets/founder-inbox.png",
    altText: "Founder Inbox UI displaying semantic artificial intelligence triage summaries.",
    previousProject: { slug: "outreach-engine", name: "OUTREACH ENGINE" },
    nextProject: { slug: "sayagaa-pipeline", name: "SAYAGAA PIPELINE" }
  },
  "sayagaa-pipeline": {
    id: "sayagaa-pipeline",
    slug: "sayagaa-pipeline",
    client: "SAYAGAA PIPELINE",
    category: "SAAS OPERATIONS",
    status: "SAYAGAA PROTOTYPE",
    systemBuilt: "High-Volume Lead Pipeline",
    description: "Prototype demonstrating automated lead ingestion, processing, enrichment, and structured pipeline management.",
    problemHeadline: "MANUAL ROUTE ENRICHMENT LIMITS GROWTH.",
    problem: "Operators manually searched freight indexes and copied route updates to spreadsheet trackers, causing processing delays and high error rates.",
    context: "A high-volume logistics indexing environment. The operations team needs to scan multiple public indexes, reconcile route rates, and match jobs.",
    researchTitle: "03 / SYSTEM DESIGN ASSUMPTIONS",
    research: "We mapped indexing intervals, document scraping rules, database schemas, and queue throttling to avoid IP blocks.",
    frictionNodes: ["FREIGHT INDEX", "MANUAL SCAN", "ENTRY COPY", "SPREADSHEET ROW", "DESTINATION VERIFICATION", "COORDINATE UPDATE", "MANUAL SHIPMENT MATCH"],
    systemDesign: ["INDEX WATCHER", "DATA EXTRACT", "RABBITMQ QUEUE", "ROUTE PARSER", "MATCH ENGINE", "LIVE DASHBOARD"],
    components: [
      { title: "01 DATA INGESTION", desc: "Index scraping runners." },
      { title: "02 PROCESSING LOGIC", desc: "Scoped route matching engine." },
      { title: "03 DATABASE", desc: "MongoDB storage." },
      { title: "04 AUTOMATION", desc: "Automated route status updates." },
      { title: "05 OPERATOR INTERFACE", desc: "Central route tracking panel." }
    ],
    beforeFlow: ["Manual Portal Check", "Index Copy-Paste", "Route Reconciliation", "Manual Dispatch Match"],
    afterFlow: ["Automated Runner", "Scraping Queue", "Database Compile", "Auto Route Match", "Live Alert"],
    impactTitle: "QUALITATIVE OUTCOMES",
    impact: [
      "ELIMINATED MANUAL SCANS",
      "STRUCTURED ROUTE ARRAYS",
      "IMPROVED SCHEDULING SPEED"
    ],
    businessImpact: [
      "LESS MANUAL WORK",
      "FEWER HANDOFFS",
      "LOWER OVERHEAD"
    ],
    techStack: ["TYPESCRIPT", "MONGODB", "RABBITMQ"],
    lessons: "Scraping is secondary; the real value is compile logic that transforms unstructured lists into queryable operational records.",
    metaResolution: "1920x1200 PX",
    metaComponent: "SUPABASE-DB // API-SCRIPTS",
    image: "/assets/content-engine.png",
    altText: "Sayagaa Pipeline data compiler analytics displaying route scraping structures.",
    previousProject: { slug: "founder-inbox", name: "FOUNDER INBOX" },
    nextProject: { slug: "brand-auditor", name: "BRAND AUDITOR" }
  },
  "brand-auditor": {
    id: "brand-auditor",
    slug: "brand-auditor",
    client: "BRAND AUDITOR",
    category: "FINANCE & COMPLIANCE",
    status: "SAYAGAA PROTOTYPE",
    systemBuilt: "Regulatory Document Scan Compiler",
    description: "Prototype demonstrating automated document analysis and visual verification workflows for compliance-oriented operations.",
    problemHeadline: "MANUAL COMPLIANCE AUDITING DOES NOT SCALE.",
    problem: "Regulatory auditors manually reviewed finance layout sheets, checking logo alignment, legal copy, and colors, causing processing lag and audit oversights.",
    context: "A finance and compliance office environment. Analysts must verify layout specifications and branding assets against legal regulatory standards.",
    researchTitle: "03 / SYSTEM DESIGN ASSUMPTIONS",
    research: "We investigated Puppeteer capturing delays, pixel difference matrices, OpenCV contour checking, and automated PDF generating logic.",
    frictionNodes: ["DASHBOARD LOAD", "MANUAL CAPTURE", "LOGO CHECK", "COPY INSPECT", "COLOR VERIFY", "PDF COMPILER", "LEGAL SIGN OFF"],
    systemDesign: ["HEADLESS CHROMIUM", "SCREEN CAPTURE", "OPENCV ANALYSIS", "COMPLIANCE RATING", "PDF GENERATOR"],
    components: [
      { title: "01 DATA INGESTION", desc: "Headless Chromium capture runner." },
      { title: "02 PROCESSING LOGIC", desc: "OpenCV visual difference classifier." },
      { title: "03 DATABASE", desc: "S3 compliance report storage." },
      { title: "04 AUTOMATION", desc: "Compliance infraction alerts." },
      { title: "05 OPERATOR INTERFACE", desc: "Visual audit dashboard." }
    ],
    beforeFlow: ["Manual Page Load", "Manual Asset Check", "Manual Legal Review", "Word Doc Compiler"],
    afterFlow: ["Capture Trigger", "Headless Render", "Pixel Matrix Check", "PDF Report Generation", "Legal Review"],
    impactTitle: "QUALITATIVE OUTCOMES",
    impact: [
      "ELIMINATED VISUAL AUDIT OVERSIGHTS",
      "REDUCED REVIEW CYCLE TIMES",
      "CENTRAL COMPLIANCE DATABASE"
    ],
    businessImpact: [
      "LOWER OVERHEAD",
      "FASTER RESPONSE",
      "MORE CONTROL"
    ],
    techStack: ["CHROMIUM NODES", "OPENCV", "REACT.JS", "S3 STORAGE"],
    lessons: "Visual audits fail when humans are forced to spot 1px offsets; delegate the scan to a matrix buffer and let the human verify the exception.",
    metaResolution: "1280x800 PX",
    metaComponent: "VISION-AI // COMPILER-SUITE",
    image: "/assets/brand-auditor.png",
    altText: "Brand Auditor visual scanner displaying browser capture outputs.",
    previousProject: { slug: "sayagaa-pipeline", name: "SAYAGAA PIPELINE" },
    nextProject: { slug: "knowledgeflow-ai", name: "KNOWLEDGEFLOW AI" }
  },
  "knowledgeflow-ai": {
    id: "knowledgeflow-ai",
    slug: "knowledgeflow-ai",
    client: "KNOWLEDGEFLOW AI",
    category: "DOCUMENT INTELLIGENCE",
    status: "CLIENT PROJECT",
    systemBuilt: "Multi-Pane Document Scoper & RAG Search",
    description: "Production enterprise document intelligence platform integrating hybrid search (BM25 + pgvector RRF) and local annotation databases.",
    problemHeadline: "DOCUMENT SEARCH BOTTLENECKS STRANGLE COMPLIANCE WORK.",
    problem: "Compliance analysts spent weeks scanning hundreds of contracts, manuals, and compliance briefs, risking privacy leaks with commercial API endpoints.",
    context: "An enterprise intelligence and compliance office environment. Team members must review hundreds of corporate documents and log citations with strict privacy constraints.",
    researchTitle: "03 / RESEARCH",
    research: "We audited operational contract review lifecycles: analyzed analyst search patterns, pgvector indexing speeds, BM25 keyword matching, Celery parser latency, and local citation annotations storage schemas.",
    frictionNodes: ["CONTRACT FILE", "LOCAL STORAGE", "MANUAL SCAN", "KEYWORD SEARCH", "MANUAL SUMMARY", "WORK SHEET", "LEGAL BRIEF"],
    systemDesign: ["Celery Ingestion", "Text Extract", "Vector Indexing", "pgvector Hybrid Search", "Citation Mapping", "Multi-Pane Annotation Editor"],
    components: [
      { title: "01 DATA INGESTION", desc: "Headless Celery text parser pipeline." },
      { title: "02 PROCESSING LOGIC", desc: "Hybrid pgvector search engine with citation mapping." },
      { title: "03 DATABASE", desc: "PostgreSQL notes database with localized schemas." },
      { title: "04 AUTOMATION", desc: "Continuous metadata indexing runners." },
      { title: "05 OPERATOR INTERFACE", desc: "Zustand-based multi-pane annotation client workspace." }
    ],
    beforeFlow: ["Local Doc Search", "Manual scanning of PDF sheets", "Manual copy-paste notes", "Excel compilation"],
    afterFlow: ["Fast Ingest", "Hybrid Search Query", "Citation Highlight", "Annotations Database", "Live Workspace"],
    impactTitle: "VERIFIED OUTCOMES",
    impact: [
      "99.2% RETRIEVAL ACCURACY",
      "SUB-100MS COMPILATION SPEED",
      "100% OFFLINE DATA PRIVACY"
    ],
    businessImpact: [
      "LESS MANUAL WORK",
      "FEWER HANDOFFS",
      "BETTER VISIBILITY",
      "MORE CONTROL"
    ],
    techStack: ["NEXT.JS", "FASTAPI", "POSTGRESQL", "PGVECTOR", "REDIS", "CELERY"],
    lessons: "The bottleneck was not the AI model; it was the workspace flow. Analysts need structured annotations connected directly to document citations.",
    metaResolution: "1920x1080 PX",
    metaComponent: "FASTAPI // PGVECTOR-DB",
    image: "/assets/outreach-engine.png", // Reusing outreach asset as visual indicator
    altText: "KnowledgeFlow multi-pane enterprise document scoper interface.",
    previousProject: { slug: "brand-auditor", name: "BRAND AUDITOR" },
    nextProject: { slug: "outreach-engine", name: "OUTREACH ENGINE" }
  }
};
