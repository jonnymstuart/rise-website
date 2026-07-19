"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { TopoField } from "./TopoField";
import { LandingIntro } from "./LandingIntro";
import type { landing as LandingContent } from "@/lib/content";

type Content = typeof LandingContent;

/** ms delays for the post-loader reveal choreography */
const STAGGER = {
  line1: 1550,
  line2: 1650,
  sub: 1850,
  meta: 1950,
  cta: 1950,
};

export function Landing({ content }: { content: Content }) {
  const revealRef = useRef(0);
  const [phase, setPhase] = useState<"intro" | "idle">("intro");
  const [skipped, setSkipped] = useState(false);

  const handleDone = useCallback((wasSkipped: boolean) => {
    setSkipped(wasSkipped);
    setPhase("idle");
  }, []);

  const delay = (ms: number) =>
    skipped ? { animationDelay: "0ms", animationDuration: "0.35s" } : { animationDelay: `${ms}ms` };

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[88px]">
      <TopoField revealRef={revealRef} />

      <Container className="relative z-10 pb-10 sm:pb-14">
        <h1 className="font-display font-normal tracking-[-0.03em] text-[clamp(3.2rem,10.5vw,9rem)] leading-[0.94] text-ink">
          <span className="block overflow-hidden">
            <span className="reveal-line block" style={delay(STAGGER.line1)}>
              {content.headline.line1}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="reveal-line block" style={delay(STAGGER.line2)}>
              {content.headline.line2Pre}
              <em className="font-accent italic">{content.headline.accent}</em>
              {content.headline.line2Post}
            </span>
          </span>
        </h1>

        <p
          className="reveal mt-6 max-w-2xl text-[clamp(1.05rem,2vw,1.5rem)] leading-snug text-ink/80"
          style={delay(STAGGER.sub)}
        >
          {content.sub}
        </p>

        <div
          className="reveal mt-9 flex flex-wrap items-center justify-between gap-6"
          style={delay(STAGGER.cta)}
        >
          <Link
            href={content.cta.href}
            className="inline-flex items-center rounded-[999px] bg-ink px-7 py-3.5 text-sm text-page transition-colors duration-300 hover:bg-magenta"
          >
            {content.cta.label}
          </Link>
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.14em] text-ink/50">
            <span>{content.meta}</span>
            <span className="hidden items-center gap-3 sm:flex">
              {content.scrollHint}
              <span className="relative block h-8 w-px overflow-hidden bg-ink/20">
                <span className="animate-drift absolute inset-x-0 top-0 h-3 bg-ink/60 [--drift-duration:2.2s]" />
              </span>
            </span>
          </div>
        </div>
      </Container>

      {phase === "intro" && (
        <LandingIntro revealRef={revealRef} onDone={handleDone} />
      )}
    </section>
  );
}
