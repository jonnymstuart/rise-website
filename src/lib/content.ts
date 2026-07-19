/**
 * Centralised copy for the Rise website.
 * Lifted from the Figma source ("Rise — Website v2.0") so the components
 * stay presentational and the words live in one place.
 */

export const site = {
  name: "Rise",
  tagline: "Make it unreal",
  domain: "userise.co",
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Outcomes", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

/** Interactive topo landing screen (preview at /landing). */
export const landing = {
  headline: {
    line1: "We create the future",
    line2Pre: "with our ",
    accent: "partners",
    line2Post: " —",
  },
  sub: "Through AI, design, GEO and development.",
  meta: "38.7223° N, 9.1393° W — Lisboa",
  scrollHint: "Scroll",
  cta: { label: "Start a project", href: "/contact" },
};

export const hero = {
  lead: "Make it",
  leadAccent: "unreal",
  intro:
    "The AI era made everything louder. We bring the clarity — and the craft — to rise you above the noise.",
  sub: "We’re a team of technical and design specialists HQ’d in sunny Lisbon.",
  trusted: "Trusted by founders, agencies and scaleups — worldwide",
};

/* Wordmarks rendered as styled text (real brand SVGs aren't bundled). */
export const clientLogos: string[] = [
  "H&M HOME",
  "Polkadot",
  "Kolo",
  "Ecosia",
  "GiantOS",
  "Onlyone",
  "Logga",
];

export const statement = {
  eyebrow: "Above the noise",
  title: "Clearer thinking, sharper execution, real impact.",
};

export const stats: { value: string; label: string }[] = [
  { value: "12+", label: "Years of combined product craft" },
  { value: "40+", label: "Products shipped for founders & scaleups" },
  { value: "23%", label: "Average lift in activation we’ve delivered" },
  { value: "6", label: "Timezones our remote team spans" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Quality. What Rise does is raise the bar around design — taking our brand to the next level.",
    name: "Croy Bosch",
    role: "CPO, GiantOS",
  },
  {
    quote:
      "Rise was able to actually listen to our company story, draw accurate parallels, and extract the messaging we needed to get across through our design choices. There was real nuance in the approach.",
    name: "Denis",
    role: "CTO & Founder",
  },
  {
    quote:
      "They move like an in-house team but think like founders. Momentum from week one, and it never dropped.",
    name: "Maria Santos",
    role: "Head of Product",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  blurb: string;
};

export const team: TeamMember[] = [
  {
    name: "Jonny Stuart",
    role: "CEO & Founder",
    blurb: "Sets the direction and keeps every engagement honest.",
  },
  {
    name: "Croy Bosch",
    role: "CPO & Founder",
    blurb: "Turns fuzzy ideas into products people actually want.",
  },
  {
    name: "Denis",
    role: "CTO & Founder",
    blurb: "Architects systems built to scale from day one.",
  },
  {
    name: "Mara Lopes",
    role: "Head of Design",
    blurb: "Obsesses over the details that make work feel unreal.",
  },
];

export type ServiceColumn = { title: string; body: string };
export type Service = {
  id: string;
  title: string;
  columns: ServiceColumn[];
  tools: { label: string; items: string }[];
  cta: { label: string; href: string };
};

const momentum =
  "Momentum starts with clarity. Before we lift a finger, we align on goals, scope, and measurable success metrics — so every sprint moves in the right direction.";

export const services: Service[] = [
  {
    id: "intelligence",
    title: "Intelligence",
    columns: [
      { title: "Discovery & Strategy", body: momentum },
      {
        title: "AI & Agents",
        body: "We design and ship LLM-powered products — assistants, agents and automations — that feel native to your workflow, not bolted on.",
      },
      {
        title: "Data & Insight",
        body: "We turn scattered signals into dashboards and decisions, so you always know what’s working and what to do next.",
      },
      {
        title: "Research & Validation",
        body: "We pressure-test ideas with real users early, validating direction before the build burns budget.",
      },
    ],
    tools: [
      {
        label: "AI / ML Stack",
        items: "OpenAI API, LangChain, Pinecone, Vercel AI SDK, Hugging Face",
      },
      {
        label: "Data & Automation",
        items: "Airtable, Notion, Retool, Zapier, Make, Softr",
      },
    ],
    cta: { label: "See Intelligence Projects", href: "/work" },
  },
  {
    id: "build",
    title: "Build",
    columns: [
      {
        title: "Product Engineering",
        body: momentum,
      },
      {
        title: "Web & Front-End Experiences",
        body: "Fast, accessible, beautiful interfaces — built with modern frameworks and an eye for motion and detail.",
      },
      {
        title: "No-Code / Low-Code Delivery",
        body: "Whether it’s hooking up your lovable prototype or testing ideas with off-the-shelf solutions before going all-in — we’ve got you. We help you validate, iterate, and scale with confidence.",
      },
      {
        title: "Backend Engineering",
        body: "We build the systems that power your product — fast, secure, and scalable. From API architecture to database design, our foundations are built to handle growth.",
      },
    ],
    tools: [
      {
        label: "Front-End & Frameworks",
        items: "Next.js, React, TypeScript, Vue, Tailwind, Framer Motion",
      },
      {
        label: "Back-End & APIs",
        items:
          "Node.js, Python (FastAPI, Flask), PostgreSQL, Firebase, Supabase, REST, GraphQL",
      },
      {
        label: "Hosting & DevOps",
        items: "Vercel, AWS, Render, Cloudflare, Netlify, Docker, GitHub Actions",
      },
    ],
    cta: { label: "See Development Projects", href: "/work" },
  },
  {
    id: "growth",
    title: "Growth",
    columns: [
      {
        title: "Brand & Identity",
        body: "We craft brand systems that hold up everywhere — from a pitch deck to a product UI — and feel unmistakably yours.",
      },
      {
        title: "Conversion & CRO",
        body: "We find the friction in your funnel and design it out, turning more of your traffic into activated, paying users.",
      },
      {
        title: "Lifecycle & Retention",
        body: "Onboarding, email and in-product nudges that bring people back and grow lifetime value.",
      },
      {
        title: "Content & Campaigns",
        body: "Story-led content and launch campaigns that earn attention and compound over time.",
      },
    ],
    tools: [
      {
        label: "CMS & Platforms",
        items:
          "Webflow, Sanity, Strapi, Framer, WordPress (Headless), Contentful",
      },
      { label: "Analytics", items: "GA4, PostHog, Mixpanel, Hotjar" },
    ],
    cta: { label: "See Growth Projects", href: "/work" },
  },
  {
    id: "seo-geo",
    title: "SEO / GEO",
    columns: [
      {
        title: "Technical SEO",
        body: "Core Web Vitals, crawlability and clean architecture — the unglamorous work that compounds into rankings.",
      },
      {
        title: "Generative Engine Optimisation",
        body: "We make your brand the answer AI engines cite — structured content, entities and authority built for the LLM era.",
      },
      {
        title: "Content Strategy",
        body: "Topic clusters and search-intent mapping that capture demand at every stage of the journey.",
      },
      {
        title: "Reporting",
        body: "Transparent dashboards tying organic visibility to pipeline, not vanity metrics.",
      },
    ],
    tools: [
      {
        label: "SEO / GEO",
        items: "Ahrefs, Semrush, Screaming Frog, Schema.org, Search Console",
      },
    ],
    cta: { label: "See Growth Projects", href: "/work" },
  },
];

export const sectionTitles = {
  testimonials: "Don’t take our word for it.",
  services: "OK, but what do you actually do?",
  clients: "With future-focused humans",
  team: "The humans behind it",
  sectors: "Sectors we work with",
};

export const subscription = {
  title: ["Your AI-fueled design,", "development & growth", "subscription."],
  columns: [
    {
      heading: "Services",
      items: ["Design", "Development", "AI & Agents", "Growth & GEO"],
    },
    {
      heading: "Partners",
      items: ["Scaleups", "Marketing teams", "Agencies", "Founders"],
    },
    {
      heading: "Deliverables",
      items: ["Mobile apps", "Websites", "MVPs", "Platforms"],
    },
    {
      heading: "Sectors",
      items: [
        "Crypto & Blockchain",
        "Venture Capital",
        "Offline + Social Tech",
        "Human-first tech",
      ],
    },
  ],
};

export type Timezone = { city: string; tz: string };

export const timezones: Timezone[] = [
  { city: "San Francisco", tz: "America/Los_Angeles" },
  { city: "Austin", tz: "America/Chicago" },
  { city: "New York City", tz: "America/New_York" },
  { city: "Florida", tz: "America/New_York" },
  { city: "Boston", tz: "America/New_York" },
  { city: "Seattle", tz: "America/Los_Angeles" },
];

export const contact = {
  title: ["Get started,", "right away."],
  blocks: [
    {
      label: "New engagements",
      value: "jonny@userise.co",
      href: "mailto:jonny@userise.co",
    },
    {
      label: "Direct line (Call or WhatsApp)",
      value: "+351 915 289 872",
      href: "tel:+351915289872",
    },
    {
      label: "HQ",
      value: "Timeout Market, Mercado de Ribeira,\nAv. 24 de Julho 1º andar,\n1200-479 Lisboa, Portugal",
    },
    {
      label: "General enquiries",
      value: "hello@userise.co",
      href: "mailto:hello@userise.co",
    },
  ],
  newsletter: {
    title: "Stay connected",
    placeholder: "Enter your email",
    note: "We won’t share your details and will only send occasional, high value emails. You are agreeing to our terms.",
  },
};

export const social = [
  { label: "X", href: "https://x.com" },
  { label: "Linkedin", href: "https://linkedin.com" },
];

export const footer = {
  copyright: "Copyright 2026 Rise Technologies",
  terms: "Terms",
  remote: "Our remote team works on your timezone",
};

/* -------------------------------------------------------------------- *
 * Case studies (Outcomes)
 * -------------------------------------------------------------------- */
export type CaseStudy = {
  slug: string;
  client: string;
  tag: string;
  title: string;
  stat: { value: string; label: string };
  summary: string;
  sectors: string[];
  blocks: { label: string; body: string }[];
  accent: "violet" | "magenta" | "ocean";
};

const loremBody =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export const caseStudies: CaseStudy[] = [
  {
    slug: "swiss-vc-launch",
    client: "Polkadot",
    tag: "Website",
    title: "We enabled the Swiss VC firm to launch, fast.",
    stat: { value: "23%", label: "Improved onboarding process for a fintech startup" },
    summary:
      "A complete brand, site and onboarding system delivered in six weeks — ready for the firm’s first close.",
    sectors: ["Venture Capital", "FinTech"],
    accent: "violet",
    blocks: [
      { label: "Design system", body: loremBody },
      { label: "Development", body: loremBody },
      { label: "Delivery", body: loremBody },
      {
        label: "Outcome",
        body: "A 23% improvement in onboarding completion and a launch that landed on time, on brand and on budget.",
      },
    ],
  },
  {
    slug: "giantos-platform",
    client: "GiantOS",
    tag: "Platform",
    title: "Raising the bar around design for a B2B platform.",
    stat: { value: "2.4×", label: "Faster time-to-value for new GiantOS customers" },
    summary:
      "We rebuilt the GiantOS product surface — a design system, front-end and AI-assisted workflows that scale.",
    sectors: ["B2B SaaS", "AI & Agents"],
    accent: "magenta",
    blocks: [
      { label: "Design system", body: loremBody },
      { label: "Development", body: loremBody },
      { label: "Delivery", body: loremBody },
      {
        label: "Outcome",
        body: "Customers reached value 2.4× faster, and the team shipped with a shared, durable design language.",
      },
    ],
  },
  {
    slug: "ecosia-growth",
    client: "Ecosia",
    tag: "Growth & GEO",
    title: "Compounding organic growth for a planet-first brand.",
    stat: { value: "+58%", label: "Growth in qualified organic sessions in two quarters" },
    summary:
      "A technical SEO overhaul and generative-engine optimisation programme that made the brand the answer AI cites.",
    sectors: ["Human-first tech", "Growth"],
    accent: "ocean",
    blocks: [
      { label: "Strategy", body: loremBody },
      { label: "Development", body: loremBody },
      { label: "Delivery", body: loremBody },
      {
        label: "Outcome",
        body: "A 58% lift in qualified organic traffic and a measurable rise in AI-engine citations.",
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
