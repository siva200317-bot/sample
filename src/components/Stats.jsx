// src/components/Stats.jsx
import Reveal from './Reveal'

export default function Stats() {
  return (
    <section className="relative bg-black py-16 px-4 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-black to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 ">
        {/* LEFT CONTENT */}
        <div className="lg:w-7/12">
          {/* Mission badge */}
          <Reveal y={8} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 text-[10px] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            OUR MISSION
          </Reveal>

          {/* Heading */}
          <Reveal delay={80} y={10} as="h2" className="text-2xl md:text-3xl font-bold leading-snug text-white">
            We turn <span className="text-yellow-400">ambitious ideas</span>{" "}
            into investable, scalable products.
          </Reveal>

          {/* Description */}
          <Reveal delay={140} y={12} as="p" className="mt-3 text-sm text-gray-400 max-w-md">
            From zero to one and beyond, we partner with founders and product
            leaders to design, build, and operate digital products that feel
            premium on day one and compound value over time.
          </Reveal>

          {/* Feature list */}
          <div className="mt-4 space-y-2.5">
            <Reveal y={12} delay={180} className="flex items-start gap-3 p-4 rounded-full border border-white/10 bg-white/5">
              <span className="text-yellow-400">✦</span>
              <p className="text-sm text-gray-300">
                We help you shape, validate, and position your product before a
                single line of code.
              </p>
            </Reveal>

            <Reveal y={12} delay={250} className="flex items-start gap-3 p-4 rounded-full border border-white/10 bg-white/5">
              <span className="text-yellow-400">✦</span>
              <p className="text-sm text-gray-300">
                Dedicated AI & product squads that build and operate as if they
                own the roadmap.
              </p>
            </Reveal>

            <Reveal y={12} delay={320} className="flex items-start gap-3 p-4 rounded-full border border-white/10 bg-white/5">
              <span className="text-yellow-400">✦</span>
              <p className="text-sm text-gray-300">
                Clean handover and full ownership transfer when you're ready to
                scale in-house.
              </p>
            </Reveal>
          </div>

          {/* Outcome pill */}
          <Reveal y={12} delay={380} className="mt-5 inline-flex items-center gap-3 px-3.5 py-2.5 rounded-lg border border-teal-400/30 bg-teal-400/10">
            <span className="text-[10px] font-semibold text-teal-400 tracking-wide">
              OUTCOME FIRST
            </span>
            <p className="text-sm text-gray-300">
              We measure success in shipped products, active users, and
              follow-on funding — not story decks.
            </p>
          </Reveal>
        </div>

        {/* RIGHT STATS */}
        <div className="flex-1 flex flex-wrap justify-between gap-y-2 my-32">
          {[
            {
              value: "50+",
              title: "PRODUCTS SHIPPED",
              desc: "From SaaS to AI copilots, launched across 12+ markets.",
              highlight: true,
            },
            {
              value: "$2B+",
              title: "VALUE CREATED",
              desc: "Backed by top-tier funds and strategic investors.",
            },
            {
              value: "6–12 wk",
              title: "TO FIRST RELEASE",
              desc: "Opinionated delivery playbooks, no endless discovery.",
            },
            {
              value: "100%",
              title: "CODE OWNERSHIP",
              desc: "You own the IP, repo, infra, and the playbook we build.",
            },
          ].map((item, i) => (
            <Reveal
              key={i}
              y={16}
              delay={i * 80}
              className="w-1/2 h-28 px-1 mb-1 box-border"
            >
              <div className={`h-full rounded-md p-3 border ${
                item.highlight ? "border-yellow-400/40 bg-yellow-400/10" : "border-white/10 bg-white/5"
              }`}>
                <h3 className="text-lg font-bold text-white leading-none">{item.value}</h3>
                <p className="mt-0.5 text-[8px] tracking-wider text-gray-400">{item.title}</p>
                <p className="mt-0.5 text-[10px] text-gray-400">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
