export const siteConfig = {
  name: "Tech Eeez",
  shortName: "TECH EEEZ",
  description:
    "Software solutions company focused on innovation and business growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "support@techeeez.com",
  phone: "+91 9619118917",
  address: {
    line1: "Shop No 4017, 2nd Floor Eaze Zone Mall,",
    line2: "Sunder Nagar, Malad West,",
    city: "Mumbai - 400064",
  },
  stats: [
    { label: "Projects Completed", value: 48 },
    { label: "Happy Clients", value: 13 },
    { label: "Years Experience", value: 5 },
  ],
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const chapters = [
  "Technology that moves business forward.",
  "From idea to scalable product.",
  "Engineering built around your business.",
  "Six capabilities. One technology partner.",
  "Built for performance. Designed for people.",
  "Let's build what's next.",
];
