import { StaticImageData } from "next/image";
import { AwardIcon } from "@/data/award";

export type ExtraImage = string | StaticImageData;

export type ExtraBlock =
  | { type: "bio"; html: string }
  | { type: "image"; src: ExtraImage; alt?: string; caption?: string }
  | { type: "gallery"; images: ExtraImage[]; caption?: string }
  | { type: "award"; year: string; title: string; institution: string; tldr?: string; icon?: AwardIcon };

export const extraBlocks: ExtraBlock[] = [
  {
    type: "bio",
    html: `<p style="margin:0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p style="margin:20px 0 0;text-align:center;letter-spacing:0.75em;opacity:0.35" aria-hidden="true">· · ·</p>`,
  },
];
