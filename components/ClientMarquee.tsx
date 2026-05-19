"use client";

// Real brand logos via Simple Icons CDN. Pre-coloured grey; CSS turns them white on hover.
// Slugs match simpleicons.org library.
const rowA = [
  "google", "microsoft", "amazon", "meta", "netflix", "spotify",
  "airbnb", "adobe", "intel", "samsung", "ibm", "oracle",
];
const rowB = [
  "salesforce", "uber", "stripe", "shopify", "slack", "github",
  "figma", "notion", "linkedin", "paypal", "dropbox", "mailchimp",
];

const greyHex = "9aa3ad"; // bright grey base color

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`marquee-track ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {repeated.map((slug, i) => (
          <div key={i} className="client-logo shrink-0 px-12 py-6 flex items-center justify-center">
            <img
              src={`https://cdn.simpleicons.org/${slug}/${greyHex}`}
              alt={slug}
              className="h-8 md:h-10 w-auto opacity-80 transition-all duration-300"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section className="bg-ink text-white py-20 lg:py-28">
      <div className="max-w-container mx-auto px-6 lg:px-10 mb-10">
        <div className="text-sm uppercase tracking-[0.25em] text-white/50 mb-3">Clients</div>
        <h2 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05]">Brands we’ve helped grow</h2>
      </div>
      <div className="space-y-4">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
