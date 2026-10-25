export interface Experience {
  date: string;
  title: string;
  company: string;
  description?: string;
  advisor?: string;
  manager?: string;
  companyUrl?: string;
  details?: string[];
}

export const experienceData: Experience[] = [
  {
    date: "2024 – 2026",
    title: "Research Assistant",
    company: "AGILE Lab",
    description:
      "",
    details: [
      "Contributed to two research projects within the AGILE Lab",
    ],
    companyUrl: "https://www.agilecps.org/",
  },
];
