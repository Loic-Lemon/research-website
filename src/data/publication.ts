export interface Publication {
  year: string;
  conference: string;
  title: string;
  authors: string;
  paperUrl?: string;
  codeUrl?: string;
  bibtex?: string; // Complete BibTeX entry, copied directly without a network request.
  tldr?: string;
  imageUrl?: string;
  award?: string;
  pub_type?: string;
  full_conf?: string;
  showLinks?: boolean;
}

export const publicationData: Publication[] = [
  // If you don't want to show publications, just make the array empty.
  {
    year: "2026",
    conference: "MobiSys Workshop (EIFCOM)",
    full_conf: "International Workshop on Mobile Systems with Efficient Foundation Models",
    title: "PERSE: A PERsonalised SEizure prediction system based on large-scale EEG foundation models",
    authors: `<u>Loic Lemoine</u>, Kha Huynh, Jonas Beuchert, Deepu John, Omer Rana, Nhat Pham`,
    paperUrl: "https://doi.org/10.1145/3812836.3814759",
    showLinks: false,
    // codeUrl: "https://github.com/jsmith/scalable-causal-discovery",
    // Citation metadata: https://orca.cardiff.ac.uk/id/eprint/187634/
    bibtex: `@inproceedings{lorentelemoine2026perse,
  author = {Lorente Lemoine, Loic and Huynh, Kha and Beuchert, Jonas and John, Deepu and Rana, Omer and Pham, Nhat},
  title = {{PERSE: A PERsonalised SEizure prediction system based on large-scale EEG foundation models}},
  booktitle = {Proceedings of the 24th Annual International Conference on Mobile Systems, Applications and Services Workshops},
  year = {2026},
  pages = {81--86},
  publisher = {ACM},
  doi = {10.1145/3812836.3814759},
  url = {https://doi.org/10.1145/3812836.3814759}
}`,
    // tldr: "A look at continual learning on a Raspberry Pi for anomaly detection in electric vehicle charging infrastructure. Providing a comparison between a cloud-edge and edge-only approach where a model must learn a new attack.",
    // imageUrl:
    //   "https://images.unsplash.com/photo-1561622539-dffbfc2008fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // award: "🏆 Best Paper Award",
    // if you have an image in public/images, you can use it like this:
    // imageUrl: "/images/publication-image.jpg"
    pub_type: "Workshop Paper",
  },
  {
    year: "2025",
    conference: "MobiUK",
    full_conf: "UK Mobile, Wearable and Ubiquitous Systems Research Symposium",
    title: "Edge-Based Anomaly Detection in Electric Vehicle Charging Infrastructure with Continual Learning",
    authors: `<u>Loic Lemoine*</u>, Amanjot Kaur*, Nhat Pham, Omer Rana`,
    paperUrl: "https://orca.cardiff.ac.uk/id/eprint/179765/",
    showLinks: false,
    // codeUrl: "https://github.com/jsmith/scalable-causal-discovery",
    // Citation metadata: https://orca.cardiff.ac.uk/id/eprint/179765/
    bibtex: `@unpublished{lorentelemoine2025edge,
  author = {Lorente Lemoine, Loic and Kaur, Amanjot and Pham, Nhat and Rana, Omer},
  title = {{Edge-Based Anomaly Detection in Electric Vehicle Charging Infrastructure with Continual Learning}},
  year = {2025},
  note = {Extended abstract presented at MobiUK 2025, Edinburgh, Scotland, 7--8 July 2025},
  url = {https://orca.cardiff.ac.uk/id/eprint/179765/}
}`,
    // tldr: "A look at continual learning on a Raspberry Pi for anomaly detection in electric vehicle charging infrastructure. Providing a comparison between a cloud-edge and edge-only approach where a model must learn a new attack.",
    // imageUrl:
    //   "https://images.unsplash.com/photo-1561622539-dffbfc2008fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // award: "🏆 Best Paper Award",
    // if you have an image in public/images, you can use it like this:
    // imageUrl: "/images/publication-image.jpg"
    pub_type: "Extended Abstract",
  },
  {
    year: "2024",
    conference: "MobiCom Workshop (EIFCOM)",
    full_conf: "International Workshop on Mobile Computing with Efficient and Interactive Foundation Model",
    title: "Stress-GPT: Stress detection with an EEG-based foundation model",
    authors: `Catherine Lloyd*, <u>Loic Lorente Lemoine*</u>, Reiyan Al-Shaikh, Kim Tien Ly, Hakan Kayan, Charith Perera, Nhat Pham`,
    paperUrl: "https://dl.acm.org/doi/10.1145/3636534.3698121",
    showLinks: false,
    // codeUrl: "https://github.com/jsmith/scalable-causal-discovery",
    // Citation metadata: https://orca.cardiff.ac.uk/id/eprint/174888/
    bibtex: `@inproceedings{lloyd2024stressgpt,
  author = {Lloyd, Catherine and Lemoine, Loic Lorente and Al-Shaikh, Reiyan and Ly, Kim Tien and Kayan, Hakan and Perera, Charith and Pham, Nhat},
  title = {{Stress-GPT: Stress detection with an EEG-based foundation model}},
  booktitle = {Proceedings of the 30th Annual International Conference on Mobile Computing and Networking},
  year = {2024},
  pages = {2341--2346},
  publisher = {ACM},
  doi = {10.1145/3636534.3698121},
  url = {https://doi.org/10.1145/3636534.3698121}
}`,
    // tldr: "We fine-tune a large language model for stress detection and evaluate it on a 40-subject open stress dataset. This is followed by additional experiments comparing traditional machine learning methods, with key observations highlighted to guide future research directions.",
    // imageUrl:
    //   "https://images.unsplash.com/photo-1561622539-dffbfc2008fd?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // award: "🏆 Best Paper Award",
    // if you have an image in public/images, you can use it like this:
    // imageUrl: "/images/publication-image.jpg"
    pub_type: "Workshop Paper",
  },
  {
    year: "2024",
    conference: "MobiUK",
    full_conf: "UK Mobile, Wearable and Ubiquitous Systems Research Symposium",
    title: "Epileptic seizure detection with Tiny Machine Learning - a Preliminary Study",
    authors: `<u>Loic Lemoine</u>, Nhat Pham`,
    paperUrl: "https://mobiuk.org/2024/abstract/S4_P2_Lemoine_Seizure.pdf",
    showLinks: false,
    // Citation metadata: https://orca.cardiff.ac.uk/id/eprint/174851/
    bibtex: `@unpublished{lemoine2024seizure,
  author = {Lemoine, Loic and Pham, Nhat},
  title = {{Epileptic seizure detection with Tiny Machine Learning - a preliminary study}},
  year = {2024},
  note = {Extended abstract presented at MobiUK 2024, Southampton, United Kingdom, 8--9 July 2024},
  url = {https://orca.cardiff.ac.uk/id/eprint/174851/}
}`,
    // codeUrl: "https://fountain.lorentel.com/projects/Epileptic-Seizure-Detection-with-Tiny-Machine-Learning",
    // tldr: "CNN models are trained on melspectrogram EEG data to detect three different types of common epileptic seizures. These models are compressed and deployed onto an Arduino platform.",
    pub_type: "Extended Abstract",
  },
];
