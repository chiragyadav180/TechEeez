export type Service = {
  slug:
    | "web-development"
    | "mobile-development"
    | "cloud-solutions"
    | "data-analytics"
    | "cybersecurity"
    | "system-integration";
  title: string;
  shortDescription: string;
  capabilities: string[];
  approach: string[];
  benefits: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortDescription:
      "Responsive design, modern frameworks and performance optimization.",
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
    shortDescription:
      "iOS and Android applications, cross-platform solutions and user-centric design.",
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
    shortDescription:
      "AWS and Azure focused services, scalable architecture and DevOps integration.",
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
    shortDescription:
      "Business intelligence, data visualization and predictive analytics.",
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
    shortDescription:
      "Security audits, threat protection and compliance support.",
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
    shortDescription:
      "API development, legacy system modernization and workflow automation.",
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
