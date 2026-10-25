'use client';

import { useId } from "react";
import Image, { StaticImageData } from "next/image";
import { Maximize2, X } from "lucide-react";

export function ImagePreview({ image, title }: { image: string | StaticImageData; title: string }) {
  const previewId = useId();

  return (
    <>
      <button
        type="button"
        aria-label={`Enlarge image: ${title}`}
        aria-haspopup="dialog"
        popoverTarget={previewId}
        className="group relative aspect-[4/3] w-full shrink-0 self-start cursor-zoom-in overflow-hidden rounded-lg bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-52"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 208px"
          className="object-cover"
        />
        <span aria-hidden="true" className="absolute bottom-2 right-2 rounded-sm bg-background/90 p-1.5 text-muted transition-colors group-hover:text-foreground">
          <Maximize2 size={13} />
        </span>
      </button>

      <div
        id={previewId}
        popover="auto"
        role="dialog"
        aria-label={`${title} — image preview`}
        className="m-auto w-[min(36rem,calc(100vw-2rem))] overflow-visible rounded-md border border-border bg-background p-2 text-foreground shadow-lg"
        onToggle={(event) => {
          if (event.newState === "open") event.currentTarget.querySelector("button")?.focus({ preventScroll: true });
        }}
      >
        <button
          type="button"
          aria-label="Close image preview"
          popoverTarget={previewId}
          popoverTargetAction="hide"
          className="absolute -right-2 -top-11 flex h-11 w-11 items-center justify-center rounded-sm bg-background text-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <X size={18} />
        </button>
        <button
          type="button"
          aria-label={`Close enlarged image: ${title}`}
          popoverTarget={previewId}
          popoverTargetAction="hide"
          className="block w-full cursor-zoom-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Image
            src={image}
            alt={title}
            width={typeof image === "string" ? 1600 : image.width}
            height={typeof image === "string" ? 1200 : image.height}
            unoptimized
            className="mx-auto block max-h-[min(60dvh,28rem)] w-auto max-w-full object-contain"
          />
        </button>
      </div>
    </>
  );
}
