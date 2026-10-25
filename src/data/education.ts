export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisors?: { name: string; affiliation?: string }[];
  thesis?: string;
  thesisUrl?: string;
  details?: string[];
}

export const educationData: Education[] = [
  // If you don't want to show education, just make the array empty.
  {
    year: "2026 – Present",
    institution: "Cardiff University",
    degree: "PhD Computer Science",
    advisors: [
      { name: "Dr. Nick Pham", affiliation: "School of Computer Science" },
      { name: "Prof. Jonathan Bisson", affiliation: "School of Medicine" },
      { name: "Dr. Jonas Beuchert", affiliation: "School of Computer Science" },
      { name: "Mr Cuong Nguyen", affiliation: "Google Health London" },
    ],
    thesis: " Continuous stress monitoring with biosensing wearable"
  },
  {
    year: "2024 – 2026",
    institution: "Cardiff University",
    degree: "MPhil Computer Science",
    advisors: [
      { name: "Dr. Amir Javed", affiliation: "School of Computer Science" },
      { name: "Dr. Nick Pham", affiliation: "School of Computer Science" },
    ],
    details: ["Viva passed with no corrections"],
    thesis: "Machine Learning Intrusion Detection Sytems for Vehicular Networks"
  },
  {
    year: "2021 – 2024",
    institution: "Cardiff University",
    degree: "BSc Computer Science",
    details: ["First Class Honours", "Best Dissertation (93%)"],
    thesis: "TinyML for wearable seizure detection",
    // Optional links to thesis
    thesisUrl: "https://drive.google.com/file/d/1W1lrBvBA_GrSyujQJyJSLgKLstS-cuaG/view?usp=sharing"
  },
];
