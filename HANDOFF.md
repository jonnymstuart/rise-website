# Handoff: pixel-faithful clone of the Framer /contact page

## The task (user's words)
Rebuild this page EXACTLY as it is — "a test of how perfectly you can rebuild one web page":
https://witty-palette-157811--filtering-changes-p1bwr2bu5.framer.app/contact
Scope: desktop + mobile, typography, spacing, and ANIMATIONS — everything.

## Environment notes
- The previous session was firewalled; the user has since set network egress to
  "All domains", which applies to THIS new session — framer.app should be fetchable now.
  Verify with: curl -sL -o /tmp/p.html -w "%{http_code}" <URL>
- This repo's production branch is `anthropic/claude-code` — Vercel project `rise-website`
  (team useriseco) auto-deploys it to https://rise-website-nu.vercel.app

## Approach (already user-approved)
1. Fetch rendered HTML + linked CSS/JS from the page; Framer emits breakpoint variants
   (desktop/tablet/phone) — capture all.
2. Extract animation specs (appear effects, springs, durations, easing) from the Framer
   bundle / inline JSON.
3. Download all image/SVG/font assets (framerusercontent.com) into public/.
4. Implement as the Next.js route(s) in this repo (Tailwind v4 via @theme in
   src/app/globals.css). Real fonts are already in public/fonts/:
   - PPEiko-Regular.otf (display)
   - ABCDiatype-RegularItalic-Trial.otf (italic cut only — if the page's @font-face needs
     the upright Diatype or other cuts, download the exact .woff2 files the Framer page
     itself serves and use those)
   Load via next/font/local in src/app/layout.tsx (replace the Fraunces/Inter google fonts).
5. Verify: npm run build; npx next start + curl per route; then commit and push to
   `anthropic/claude-code`. Vercel deploys automatically; user confirms in browser.

## Repo state
- The currently deployed site (built earlier from Figma approximations) is what's live;
  the clone task replaces/adds the page per the user's direction.
- AGENTS.md warning applies: modified Next.js — read node_modules/next/dist/docs first.
