export type PuzzleType = "cipher" | "recovery" | "flow" | "loop";

export type Project = {
  id: string;
  title: string;
  type: string;
  role: string;
  stack: string[];
  summary: string;
  revealCopy: string;
  links: {
    label: string;
    href: string;
  }[];
  puzzleType: PuzzleType;
};

export type EarlierSignal = {
  id: string;
  title: string;
  role: string;
  stack: string[];
  summary: string;
};

export const projects: Project[] = [
  {
    id: "shotz",
    title: "Shotz App",
    type: "Shipped iOS Product",
    role: "Founder / Builder",
    stack: ["SwiftUI", "Supabase/PostgreSQL", "Gemini API", "StoreKit"],
    summary:
      "Built and launched a subscription-based iOS app with secure authentication, cloud synchronization, subscription infrastructure, Gemini-powered chat functionality, and event-tracking/analytics workflows.",
    revealCopy:
      "Shotz is a shipped iOS product built with SwiftUI, Supabase/PostgreSQL, StoreKit, Gemini API, secure auth, cloud sync, subscriptions, AI chat, and event analytics.",
    links: [],
    puzzleType: "cipher",
  },
  {
    id: "happyapp",
    title: "HappyApp",
    type: "Full-Stack Data Product",
    role: "Full-Stack Developer",
    stack: ["FastAPI", "React", "TypeScript", "Python", "Supabase/PostgreSQL"],
    summary:
      "Built a full-stack mood prediction web app using Garmin health exports. Engineered daily and weekly behavioral features from HRV, sleep, stress, heart rate, and activity data. Designed ingestion pipelines and secure multi-user authentication.",
    revealCopy:
      "HappyApp transforms Garmin health exports into structured behavioral features and mood/recovery predictions using sleep, HRV, stress, heart rate, and activity patterns.",
    links: [],
    puzzleType: "recovery",
  },
  {
    id: "aristotle",
    title: "Aristotle Internship",
    type: "Analytics Pipeline",
    role: "Data Management Intern",
    stack: ["SQL", "Power Automate", "Excel", "Power BI"],
    summary:
      "Built an automated reporting pipeline that centralized dashboard usage analytics, automated daily ingestion/reporting workflows, and created KPI dashboards for leadership.",
    revealCopy:
      "At Aristotle, I built an automated reporting pipeline using SQL, Power Automate, Excel, and Power BI to centralize dashboard usage analytics and replace manual reporting workflows.",
    links: [],
    puzzleType: "flow",
  },
  {
    id: "shoptimus",
    title: "Shoptimus AI Internship",
    type: "Product Analytics",
    role: "Product Analytics Intern",
    stack: ["Databricks SQL", "Customer analytics tables", "Dashboards"],
    summary:
      "Analyzed grocery transaction and engagement events to identify drivers of retention, recurrence, basket size, and price sensitivity. Built reusable customer analytics tables and dashboards.",
    revealCopy:
      "At Shoptimus AI, I analyzed large-scale grocery transaction and engagement data to understand retention, recurrence, basket behavior, price sensitivity, and customer segments.",
    links: [],
    puzzleType: "loop",
  },
];

export const earlierSignals: EarlierSignal[] = [
  {
    id: "kb-home",
    title: "KB Home",
    role: "Data and Insights Intern",
    stack: ["SQL", "Power BI", "Marketing analytics", "Clickstream analytics"],
    summary:
      "Analyzed marketing and clickstream datasets to support advertising budget optimization and built dashboards tracking campaign performance, engagement trends, and allocation strategy.",
  },
  {
    id: "creditvidya",
    title: "CreditVidya",
    role: "Business Intelligence Intern",
    stack: ["Python", "SQL", "Transaction-derived customer behavior"],
    summary:
      "Analyzed transaction-derived customer behavior to support internal creditworthiness-related workflows.",
  },
];
