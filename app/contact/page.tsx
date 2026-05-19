import { DetailSection } from "@/components/PageShell";

export const metadata = {
  title: "Contact — Blyn",
  description: "Tell us about your project. We reply within one business day.",
};

const channels = [
  ["New business", "hello@blyn.studio", "Projects, RFPs and partnership conversations."],
  ["Press", "press@blyn.studio", "Speaking, interviews and editorial enquiries."],
  ["Careers", "people@blyn.studio", "Open applications and referrals."],
];

const offices = [
  ["London", "12 Curtain Road, EC2A 3LT", "Mon–Fri, 9am–6pm"],
  ["Bengaluru", "Indiranagar 100ft Road, 560038", "Mon–Fri, 10am–7pm"],
];

export default function ContactPage() {
  return (
    <div className="bg-ink text-white min-h-screen relative">
      {/* Looping background video hero */}
      <section className="relative h-[90vh] min-h-[640px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster=""
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/contact.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-ink" />
        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-10 h-full flex flex-col justify-end pb-20 lg:pb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-white/70 mb-6">Contact</div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.02] tracking-tight text-white max-w-5xl">
            Tell us about your project.
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed">
            The more specific you are about the problem, the more specific our
            first reply will be. We respond to every enquiry within one
            business day — usually with a real human and a real opinion.
          </p>
        </div>
      </section>
      <DetailSection eyebrow="Brief us">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Name</span>
            <input
              type="text"
              required
              className="bg-transparent border-b border-white/25 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </label>
          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Email</span>
            <input
              type="email"
              required
              className="bg-transparent border-b border-white/25 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Company</span>
            <input
              type="text"
              className="bg-transparent border-b border-white/25 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
            />
          </label>
          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Budget (USD)</span>
            <select
              className="bg-transparent border-b border-white/25 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors"
              defaultValue=""
            >
              <option value="" disabled className="bg-ink">Select a range</option>
              <option className="bg-ink">Under $50k</option>
              <option className="bg-ink">$50k – $150k</option>
              <option className="bg-ink">$150k – $500k</option>
              <option className="bg-ink">$500k+</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 md:col-span-1">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Timeline</span>
            <select
              className="bg-transparent border-b border-white/25 px-0 py-3 text-white focus:outline-none focus:border-white transition-colors"
              defaultValue=""
            >
              <option value="" disabled className="bg-ink">When do you need this?</option>
              <option className="bg-ink">ASAP</option>
              <option className="bg-ink">Next quarter</option>
              <option className="bg-ink">In the next 6 months</option>
              <option className="bg-ink">Just exploring</option>
            </select>
          </label>
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm uppercase tracking-[0.2em] text-white/50">Project brief</span>
            <textarea
              rows={6}
              placeholder="What problem are you trying to solve? What does success look like in 6 months?"
              className="bg-transparent border-b border-white/25 px-0 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
            />
          </label>
          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-7 py-3 text-base font-semibold hover:bg-white/90 transition-colors"
            >
              Send enquiry
            </button>
          </div>
        </form>
      </DetailSection>

      <DetailSection eyebrow="Direct lines" title="Or skip the form.">
        <div className="grid md:grid-cols-3 gap-8">
          {channels.map(([h, email, b]) => (
            <div key={email} className="border-t border-white/15 pt-6">
              <div className="text-xs uppercase tracking-[0.25em] text-white/50">{h}</div>
              <a
                href={`mailto:${email}`}
                className="mt-3 block font-display text-2xl font-bold underline underline-offset-4 decoration-white/30 hover:decoration-white"
              >
                {email}
              </a>
              <p className="mt-3 text-white/65 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </DetailSection>

      <DetailSection eyebrow="Studios" title="Where we are.">
        <div className="grid md:grid-cols-2 gap-10">
          {offices.map(([city, addr, hours]) => (
            <div key={city} className="border-t border-white/15 pt-6">
              <h3 className="font-display text-3xl font-bold">{city}</h3>
              <p className="mt-3 text-white/70">{addr}</p>
              <p className="mt-1 text-white/50 text-sm">{hours}</p>
            </div>
          ))}
        </div>
      </DetailSection>
    </div>
  );
}
