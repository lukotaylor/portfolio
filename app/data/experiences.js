import { rewardsManagement, recognitionRedesign, rewardsCatalog, smartInsights, touchscreen, performanceManagement } from "./caseStudies";

export const experiences = [
  {
    id: 1,
    company: "Paylocity",
    companyDescription: "HR/Payroll B2B Software",
    companyUrl: "https://www.paylocity.com/",
    logo: "/logos/paylocity.jpg",
    logoFallback: "PA",
    title: "Senior UX Designer",
    dateRange: "2021 – Present",
    location: "Remote",
    description:
      "I was promoted twice in 4.5 years. I led Recognition & Rewards from $0 to $21.9M ARR; it currently has the highest usability score in the suite. Right now, I'm leading design and strategy for the Performance product.",
    projects: [
      { id: "recognition-redesign", category: "Major redesign", tags: ["AI"], ...recognitionRedesign },
      { id: "rewards-management", category: "0→1", ...rewardsManagement },
      { id: "rewards-catalog", category: "Enhancement", ...rewardsCatalog },
      { id: "performance-management", category: "Product strategy", tags: ["AI"], ...performanceManagement },
    ],
  },
  {
    id: 2,
    company: "Sprinklr",
    companyDescription: "Social Media Management Platform",
    companyUrl: "https://www.sprinklr.com/",
    logo: "/logos/sprinklr.jpg",
    logoFallback: "SP",
    title: "Product Designer",
    dateRange: "2018 – 2021",
    location: "San Francisco, California",
    description:
      "I started as an intern and was offered a full-time role on day two. Over three years, I designed data visualization tools that help companies track and understand their brand health, across desktop and large-format touchscreens.",
    projects: [
      { id: "smart-insights", category: "Enhancement", ...smartInsights },
      { id: "touchscreen", category: "0→1", ...touchscreen },
    ],
  },
  {
    id: 3,
    company: "UCSB",
    companyDescription: "Public Research University",
    companyUrl: "https://www.sustainability.ucsb.edu/",
    logo: "/logos/ucsb.jpg",
    logoFallback: "UC",
    title: "UX Designer",
    dateRange: "2014 – 2018",
    location: "Santa Barbara, California",
    description:
      "I studied Psychology and Art & Technology, and spent a year studying abroad in Copenhagen, Denmark. I discovered an interest in digital design, learned the fundamentals, and landed my first internship within three months.",
    projects: [],
  },
];
