export interface FaqItem {
  readonly q: string;
  readonly a: string;
  // When true, the item is also marked with data-todo="content" in the UI so
  // Benson can grep for unresolved copy before publish.
  readonly todo?: boolean;
  // When true, the item is dropped from both the rendered list and the
  // FAQPage JSON-LD. Used alongside `todo` to pull an unconfirmed answer
  // out of the public site + search index until Benson approves copy.
  readonly hidden?: boolean;
}

export const FRANCHISE_FAQS: readonly FaqItem[] = [
  {
    q: "Is it the Wingers brand?",
    a: "Our franchise brand is a sister concept from the same team. Full details are shared on the intro call.",
  },
  {
    q: "Is it halal?",
    a: "Yes \u2014 halal is core to how we cook.",
    todo: true,
    hidden: true,
  },
  {
    q: "Do I need F&B experience?",
    a: "Helpful, not required. Operator mindset matters most \u2014 hands-on, calm under pressure, aligned with the brand.",
  },
  {
    q: "Which areas are you looking at?",
    a: "UK-wide. We\u2019re open to the right operator and the right site.",
  },
  {
    q: "How long does the process take?",
    a: "It varies by site and operator. The intro call sets expectations and timeline.",
  },
  {
    q: "What happens after I enquire?",
    a: "You\u2019ll hear back from the team. If there\u2019s a fit, the next step is an intro call.",
  },
];

export function buildFranchiseFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FRANCHISE_FAQS.filter((f) => !f.hidden).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
