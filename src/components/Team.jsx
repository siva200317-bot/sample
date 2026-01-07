import { MotionReveal as Reveal } from '@/components/aceternity/motion-reveal'

export default function Team() {
  const team = [
  
   
    {
      name: "Yalamanchili Swarna Kumar Babu",
      role: "Co-Founder, Chairman & Managing Director",
      desc: "Leads distributed squads shipping secure, observable platforms for regulated teams.",
      image: "/2.png",
      linkedin: "https://www.linkedin.com/in/swarnakumarbabu-yalamanchili/", // Replace with actual URL
      twitter: "", // Optional: Add Twitter/X URL
    },
    {
      name: "Muhammed Rehana Begum",
      role: "Co-Founder, President and CTO",
      desc: "Crafts systematic design languages that keep multi-product portfolios coherent.",
      image: "/3.png",
      linkedin: "https://www.linkedin.com/in/rehana-begum-muhammed-905b284a/", // Replace with actual URL
      twitter: "", // Optional: Add Twitter/X URL
    },
    
     {
      name: "Konda Partha Saradhi",
      role: "Co-Founder, CEO & Head of R&D",
      desc: "Former head of product at multiple SaaS scale-ups, now shaping AI-first experiences.",
      image: "/1.png",
      linkedin: "https://www.linkedin.com/in/parthakonda/", // Replace with actual URL
      twitter: "", // Optional: Add Twitter/X URL
    },
      
  ];

  return (
    <section id="leadership" className="bg-black py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* Eyebrow */}
        <p className="text-xs tracking-[0.25em] text-gray-500 mb-6 uppercase">
          Our Leadership
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
          Founders behind every Build · Operate · Transfer
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-gray-400 leading-relaxed">
          A hands-on founding team guiding strategy, architecture, and delivery
          on every engagement — from first discovery call to long-term product operations.
        </p>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <Reveal
              key={i}
              y={20}
              delay={i * 120}
              className="group"
            >
              <div className="relative h-full rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 px-8 py-10 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">

                {/* Avatar */}
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-black border border-white/10">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/sample.jpg';
                        e.currentTarget.parentElement?.classList.add(
                          'ring-1',
                          'ring-yellow-400/40'
                        );
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-white text-center">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="mt-1 text-sm text-gray-400 text-center">
                  {member.role}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm text-gray-500 leading-relaxed text-center">
                  {member.desc}
                </p>

                {/* Social icons */}
                <div className="mt-6 flex justify-center gap-4">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-yellow-400/50 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all duration-300"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                  {/* {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-yellow-400/50 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all duration-300"
                      aria-label={`${member.name} Twitter`}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )} */}
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
