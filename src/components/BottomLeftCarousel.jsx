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
      { id: 1, title: "Showcase 1", image: "products/Agriport.png", href: "#products" },
      { id: 2, title: "Showcase 2", image: "products/Aqua.png", href: "#products" },
      { id: 3, title: "Showcase 3", image: "products/Civic.png", href: "#products" },

      { id: 4, title: "Showcase 3", image: "products/Cloud.png", href: "#products" },

      { id: 5, title: "Showcase 3", image: "products/cvm.png", href: "#products" },

      { id: 6, title: "Showcase 3", image: "products/Rubber.png", href: "#products" },

      { id: 7, title: "Showcase 3", image: "products/Spark.png", href: "#products" },

      { id: 8, title: "Showcase 3", image: "products/St.png", href: "#products" },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [position, setPosition] = useState({ x: 8, y: 16 }); // default: left-2 (8px), bottom-4 (16px)
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, items.length]);

  // Hide carousel when products section is in view
  useEffect(() => {
    const productsSection = document.getElementById("products");
    if (!productsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsHidden(entries[0].isIntersecting);
        }
      },
      { threshold: 0.1 } // Hide when 10% of the section is visible
    );

    observer.observe(productsSection);

    return () => observer.disconnect();
  }, []);

  const onClick = (e, href) => {
    // Prevent navigation if user was dragging
    if (hasMoved) {
      e.preventDefault();
      return;
    }
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

  const handleMouseDown = (e) => {
    // Prevent text selection while dragging
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - (window.innerHeight - position.y)
    });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - (window.innerHeight - position.y)
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setHasMoved(true);
    const newX = e.clientX - dragOffset.x;
    const newY = window.innerHeight - e.clientY + dragOffset.y;
    
    // Add boundaries to keep it on screen
    const maxX = window.innerWidth - 192; // 192px = w-48
    const maxY = window.innerHeight - 128; // 128px = h-32
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(16, Math.min(newY, maxY))
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    setHasMoved(true);
    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = window.innerHeight - touch.clientY + dragOffset.y;
    
    // Add boundaries to keep it on screen
    const maxX = window.innerWidth - 192;
    const maxY = window.innerHeight - 128;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(16, Math.min(newY, maxY))
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset hasMoved after a brief delay to allow click handler to check it
    setTimeout(() => setHasMoved(false), 100);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e) => handleMouseMove(e);
      const handleTMove = (e) => handleTouchMove(e);
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleTMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleTMove);
        document.removeEventListener('touchend', handleDragEnd);
      };
    }
  }, [isDragging, dragOffset, position]);

  const current = items[index];

  // Don't render if hidden
  if (isHidden) return null;

  return (
    <div 
      className="fixed z-50 flex flex-col gap-2 sm:gap-3 cursor-move select-none"
      style={{ 
        left: `${position.x}px`, 
        bottom: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.2s ease'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <a
        href={current.href}
        onClick={(e) => onClick(e, current.href)}
        aria-label={`Open products section (currently: ${current.title})`}
        className="block h-24 w-36 sm:h-32 sm:w-48 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        <img
          key={current.id}
          src={current.image}
          alt={current.title}
          loading="lazy"
          className="h-full w-full object-cover transition-opacity duration-500 pointer-events-none"
        />
      </a>
      
      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
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
