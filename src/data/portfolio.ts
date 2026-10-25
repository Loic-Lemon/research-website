import { StaticImageData } from 'next/image';
import seizure_prediction from './seizure_prediction.png';
import ids_car from './ids_car.png';
import ids_system from './ids_system.png';

export interface Portfolio {
  title: string;
  description: string;
  technologies?: string[];
  degree?: string;
  imageUrl?: string | StaticImageData;
  codeUrl?: string;
  showMeta?: boolean;
  slug: string;
  body?: string;
  infoList?: string[];
  gallery?: (string | StaticImageData)[];
  projectLink?: boolean;
}

export const portfolioData: Portfolio[] = [
  {
    title: "Stress w/ Wearables",
    description:
      "Exploring continuous stress quantification and monitoring on wearable devices.",
    technologies: ["Biosignals", "Wearables"],
    degree: "PhD",
    slug: "stress-wearables",
    body: "<p>Ongoing PhD research exploring continuous stress quantification and monitoring on wearable devices. This project investigates biosignal processing, feature extraction, and machine learning techniques for real-time stress detection in everyday settings.</p>",
    infoList: [
      "Ongoing PhD research",
    ],
    projectLink: false,
    showMeta: true,
  },
  {
    title: "Personalisable Seizure Prediction",
    description:
      'Initial work published to the <a href="/?section=publication">EIFCOM Workshop</a> @ ACM Mobisys 2026.',
    technologies: ["Biosignals", "Wearables", "Foundation Models"],
    degree: "PhD",
    slug: "personalised-seizure-prediction",
    body: "<p>This project explores personalised seizure prediction using foundation models and wearable biosignal data. Initial findings were presented at the EIFCOM Workshop co-located with ACM Mobisys 2026.</p>",
    imageUrl: seizure_prediction,
    gallery: [seizure_prediction],
    showMeta: true,
  },
  {
    title: "Adaptive edge machine learning for vehicular intrusion detection",
    description:
      "Exploring on-device adaptive anomaly detection for intrusion detection systems in vehicles.",
    technologies: ["Intrusion Detection Systems"],
    degree: "MPhil",
    slug: "vehicular-intrusion-detection",
    imageUrl: ids_car,
    body: "Exploring on-device adaptive anomaly detection for intrusion detection systems in vehicles.",
    gallery: [ids_car, ids_system],
    infoList: [
      "MPhil project, Viva passed with no corrections.",
      "Initial work presented at MobiUK 2025 in Edinburgh.",
    ],
    showMeta: true,
  },
  /*
  {
    title: "Seizure Detection with Tiny Machine Learning",
    description:
      "(Undergraduate Thesis) Investigating seizure detection with small-scale machine learning for wearable monitoring.",
    technologies: ["Biosignals", "Wearables"],
    slug: "seizure-detection-tiny-ml",
    projectLink: false,
    showMeta: true,
  },
  */
];
