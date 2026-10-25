import { StaticImageData } from 'next/image';
import frontpage from './frontpage.png';
import banner from './banner.png';
import chase from './chase.webp';

export interface AboutMe {
  name: string;
  title: string;
  institution: string;
  description: string;
  backgroundDescription?: string;
  researchDescription?: string;
  researchImage?: StaticImageData;
  researchConclusion?: string;
  email: string;
  imageUrl?: string | StaticImageData;
  bannerImage?: string | StaticImageData;
  blogUrl?: string;
  cvUrl?: string;
  labUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string; // Gets placed in the left sidebar
  secretDescription?: string; // Gets placed in the bottom
  pronunciation?: string;
  altName?: string;
  institutionUrl?: string;
}

export const aboutMe: AboutMe = {
  name: "Loic Lorente Lemoine",
  pronunciation: "/lɔɪk lɔːˈrɛn.teɪ ləˈmwɑːn/",
  title: "PhD CompSci",
  institution: "Cardiff University",
  // Note that links work in the description
  description: `<p>Hello there, I'm Loic <span class="text-sm text-muted">(l-oi-ck)</span>. I am a <strong>PhD student</strong> in the School of Computer Science and Informatics at <strong>Cardiff University</strong> + <a href="https://www.agilecps.org/" target="_blank" rel="noopener noreferrer"><strong>AGILE Lab</strong></a>, under the supervision of Dr Nick Pham. <button type="button" class="nav-glow-trigger" data-nav-glow="">Traverse</button> this website to find out more about my background and my work.</p>`,
  backgroundDescription: `<ul style="margin:12px 0;padding-left:1.25rem;list-style-type:'– '">
    <li style="margin:0 0 8px">I completed a <strong>BSc in Computer Science</strong> at Cardiff University in 2024, graduating with <strong>First Class Honours</strong>. My dissertation received the <strong>Best Undergraduate Dissertation award</strong> in CompSci.</li>
    <li style="margin:0 0 8px">I did an <strong>MPhil</strong> with Dr Amir Javed, researching <strong>machine-learning methods for intrusion detection in vehicles</strong>. I passed my Viva with <strong>no corrections</strong>.</li>
    <li style="color:rgb(var(--accent))">I am now pursuing a <strong>PhD</strong> under the supervision of Dr Nick Pham.</li>
  </ul>
  `,
  researchDescription: `<p>My PhD aims to address <strong>stress monitoring</strong> with <strong>biosensing wearables</strong> of various modalities, such as EEG.</p>`,
  researchImage: chase,
  researchConclusion: "Even though there is a focus on <strong>stress and seizures</strong>, the systems and methodologies presented in my work can be considered universal to <strong>other biosignal systems</strong>. I hope that the research can contribute towards healthcare that improves <strong>quality of life</strong>.",
  email: "lorentelemoinel@cardiff.ac.uk",
  imageUrl: frontpage,
  bannerImage: banner,
  // googleScholarUrl: "https://scholar.google.com/citations?user=bWtMl_MAAAAJ",
  labUrl: "https://www.agilecps.org/",
  githubUsername: "loic-lemon",
  linkedinUsername: "lemoineloic",
  // twitterUsername: "janesmith",
  // blogUrl: "https://fountain.lorentel.com",
  cvUrl: "https://lorentel.com",
  institutionUrl: "https://www.cardiff.ac.uk/",
  // altName: "",
  // secretDescription: "",
};
