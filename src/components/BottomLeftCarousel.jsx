import { useEffect, useMemo, useState } from "react";

/*
  Bottom-left automatic mini carousel showing only an image.
  - Cycles through items automatically (no arrows, no scroll buttons).
  - Clicking the image scrolls smoothly to the Products section (id="horizontal").
   { title: 'Agriport', image: 'products/Agriport.png', desc: 'IoT-driven agriculture analytics' },
    { title: 'Aqualens', image: 'products/Aqua.png', desc: 'Health insights from wearables' },
    { title: 'Civic Pulse', image: 'products/Civic.png', desc: 'Monetization and publishing tools' },
    { title: 'Cloud Doctor', image: 'products/Cloud.png', desc: 'Real-time ops and reporting' },
    { title: 'CVM Beach Productions', image: 'products/cvm.png', desc: 'Automations and copilots' },
    { title: 'Perfect Rubber Industry', image: 'products/Rubber.png', desc: 'Interactive analytics and BI' },

    { title: 'Spark', image: 'products/Spark.png', desc: 'Interactive analytics and BI' },

    { title: 'St.Pete Conf', image: 'products/St.png', desc: 'Interactive analytics and BI' },
  ], [])
*/
export default function BottomLeftCarousel({ intervalMs = 2500 }) {
  const items = useMemo(
    () => [
      { id: 1, title: "Showcase 1", image: "products/Agriport.png", href: "#horizontal" },
      { id: 2, title: "Showcase 2", image: "products/Aqua.png", href: "#horizontal" },
      { id: 3, title: "Showcase 3", image: "products/Civic.png", href: "#horizontal" },

      { id: 4, title: "Showcase 3", image: "products/Cloud.png", href: "#horizontal" },

      { id: 5, title: "Showcase 3", image: "products/cvm.png", href: "#horizontal" },

      { id: 6, title: "Showcase 3", image: "products/Rubber.png", href: "#horizontal" },

      { id: 7, title: "Showcase 3", image: "products/Spark.png", href: "#horizontal" },

      { id: 8, title: "Showcase 3", image: "products/St.png", href: "#horizontal" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, items.length]);

  // Hide carousel when HorizontalParallax section is in view
  useEffect(() => {
    const horizontalSection = document.getElementById("horizontal");
    if (!horizontalSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsHidden(entries[0].isIntersecting);
        }
      },
      { threshold: 0.1 } // Hide when 10% of the section is visible
    );

    observer.observe(horizontalSection);

    return () => observer.disconnect();
  }, []);

  const onClick = (e, href) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const node = document.getElementById(id);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = href;
      }
    }
  };

  const current = items[index];

  // Don't render if hidden
  if (isHidden) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3">
      <a
        href={current.href}
        onClick={(e) => onClick(e, current.href)}
        aria-label={`Open products section (currently: ${current.title})`}
        className="block h-32 w-48 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
       
      >
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          loading="lazy"
          className="h-full w-full object-cover transition-opacity duration-500"
        />
      </a>
      
      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
              idx === index
                ? "w-6 bg-yellow-400"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
