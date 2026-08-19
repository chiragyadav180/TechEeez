export type Service = {
  slug:
    | "ai-solutions"
    | "web-development"
    | "mobile-development"
    | "cloud-solutions"
    | "data-analytics"
    | "cybersecurity"
    | "system-integration";
  title: string;
  shortLabel: string;
  shortDescription: string;
  pitch: string;
  accent: string;
  capabilities: string[];
  approach: string[];
  benefits: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    shortLabel: "AI",
    shortDescription:
      "Intelligent automation, custom AI products, and machine learning that turn data into decisions.",
    pitch:
      "We design AI assistants, automation, and prediction systems that sit inside real workflows — so teams spend less time on repetitive work and more time on growth.",
    accent: "#c4b5fd",
    capabilities: [
      "Custom AI assistants and internal copilots",
      "Process automation with machine learning",
      "Document intelligence and computer vision",
    ],
    approach: [
      "Identify high-value tasks that AI can actually complete",
      "Train or integrate models around your business data",
      "Ship guarded, measurable workflows into production",
    ],
    benefits: [
      "Faster operational decisions",
      "Lower manual workload",
      "Products that feel intelligent, not bolted on",
    ],
    faq: [
      {
        question: "Do you build custom models or use existing AI platforms?",
        answer:
          "Both. We choose the path based on data quality, privacy needs, cost, and how tightly the AI must fit your product.",
      },
      {
        question: "Can AI be added to an existing website or internal tool?",
        answer:
          "Yes. Many projects start by embedding assistants, search, or automation into systems you already use.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortLabel: "Web",
    shortDescription:
      "Responsive design, modern frameworks and performance optimization.",
    pitch:
      "We build fast, conversion-ready websites and web apps — clean interfaces, scalable architecture, and performance that feels instant on every device.",
    accent: "#67e8f9",
    capabilities: [
      "Responsive interfaces across devices",
      "Modern frontend architectures",
      "Performance-focused delivery",
    ],
    approach: [
      "Map business requirements to scalable web experiences",
      "Build semantic, fast, and accessible UI systems",
      "Optimize user journeys for engagement and conversion",
    ],
    benefits: [
      "Faster user experiences",
      "Stronger conversion paths",
      "Future-ready architecture",
    ],
    faq: [
      {
        question: "Can you modernize an existing website?",
        answer:
          "Yes. Modernization can include redesign, performance tuning, and progressive migration to a newer stack.",
      },
      {
        question: "How do you ensure performance?",
        answer:
          "We focus on lightweight components, optimized assets, and technical best practices to keep pages fast.",
      },
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    shortLabel: "Mobile",
    shortDescription:
      "iOS and Android applications, cross-platform solutions and user-centric design.",
    pitch:
      "From native feel to cross-platform speed, we ship mobile apps people actually enjoy using — with clear journeys, stable releases, and room to grow.",
    accent: "#5eead4",
    capabilities: [
      "iOS and Android app delivery",
      "Cross-platform implementation",
      "User-centric mobile experiences",
    ],
    approach: [
      "Define app goals and user behavior patterns",
      "Design clear mobile-first interactions",
      "Ship maintainable app builds with iterative improvements",
    ],
    benefits: [
      "Higher customer reach",
      "Better user retention",
      "Consistent platform experience",
    ],
    faq: [
      {
        question: "Do you support both native and cross-platform projects?",
        answer:
          "Yes. The implementation path is selected based on timeline, feature needs, and long-term maintenance.",
      },
      {
        question: "Can you redesign an existing mobile app?",
        answer:
          "Yes. We can improve usability, visual quality, and app structure while keeping business goals central.",
      },
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    shortLabel: "Cloud",
    shortDescription:
      "AWS and Azure focused services, scalable architecture and DevOps integration.",
    pitch:
      "We design cloud architecture that scales with demand — reliable infrastructure, smoother releases, and systems that stay online as the business grows.",
    accent: "#7dd3fc",
    capabilities: [
      "AWS and Azure cloud consulting",
      "Scalable architecture design",
      "DevOps-aligned delivery workflows",
    ],
    approach: [
      "Assess current systems and growth requirements",
      "Design cloud architecture for reliability and scale",
      "Integrate release and operations practices",
    ],
    benefits: [
      "Improved scalability",
      "Operational resilience",
      "Better deployment consistency",
    ],
    faq: [
      {
        question: "Which cloud platforms do you support?",
        answer:
          "Current service coverage is focused on AWS and Azure, as listed in the company information.",
      },
      {
        question: "Do you provide DevOps integration?",
        answer:
          "Yes. Cloud solutions include DevOps integration to support smoother releases and operations.",
      },
    ],
  },
  {
    slug: "data-analytics",
    title: "Data Analytics",
    shortLabel: "Analytics",
    shortDescription:
      "Business intelligence, data visualization and predictive analytics.",
    pitch:
      "We turn scattered data into dashboards and forecasts your team can act on — clearer metrics, faster reporting, and insight before the next decision.",
    accent: "#86efac",
    capabilities: [
      "Business intelligence reporting",
      "Data visualization experiences",
      "Predictive analytics initiatives",
    ],
    approach: [
      "Align metrics with business decisions",
      "Build understandable reporting layers",
      "Create actionable analytics workflows",
    ],
    benefits: [
      "Better decision clarity",
      "Faster insights",
      "Stronger planning confidence",
    ],
    faq: [
      {
        question: "Can analytics work with our existing systems?",
        answer:
          "Yes. Analytics initiatives are usually integrated with existing operational and reporting workflows.",
      },
      {
        question: "What does predictive analytics help with?",
        answer:
          "Predictive analytics helps identify likely trends and opportunities for proactive decision-making.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortLabel: "Security",
    shortDescription:
      "Security audits, threat protection and compliance support.",
    pitch:
      "We harden products and infrastructure with practical security — audits, threat protection, and compliance support that reduce risk without slowing delivery.",
    accent: "#5eead4",
    capabilities: [
      "Security audit engagements",
      "Threat protection planning",
      "Compliance support readiness",
    ],
    approach: [
      "Identify core risk areas across systems",
      "Prioritize practical threat protection actions",
      "Support policy and compliance alignment",
    ],
    benefits: [
      "Reduced exposure to common threats",
      "Improved security posture",
      "Clearer compliance readiness",
    ],
    faq: [
      {
        question: "Can you audit existing applications?",
        answer:
          "Yes. Security audits can be performed on current systems to identify and prioritize risks.",
      },
      {
        question: "Do you help with compliance support?",
        answer:
          "Yes. Compliance support is part of the cybersecurity service coverage listed for Tech Eeez.",
      },
    ],
  },
  {
    slug: "system-integration",
    title: "System Integration",
    shortLabel: "Integration",
    shortDescription:
      "API development, legacy system modernization and workflow automation.",
    pitch:
      "We connect the tools your business already runs — APIs, legacy modernization, and automation that remove copy-paste work between systems.",
    accent: "#94a3b8",
    capabilities: [
      "API development and integration",
      "Legacy system modernization",
      "Workflow automation initiatives",
    ],
    approach: [
      "Map current systems and integration dependencies",
      "Define phased API and migration workflows",
      "Automate repetitive operational tasks",
    ],
    benefits: [
      "Connected workflows",
      "Improved operational speed",
      "Reduced process friction",
    ],
    faq: [
      {
        question: "Do you support legacy modernization projects?",
        answer:
          "Yes. Legacy modernization is a core part of the system integration offering.",
      },
      {
        question: "Can you build APIs between existing tools?",
        answer:
          "Yes. API development is included to connect business systems and streamline operations.",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);

export const serviceImagePath = (slug: Service["slug"]) =>
  `/services/${slug}.png`;
