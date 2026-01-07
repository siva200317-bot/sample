import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { Link } from 'react-router-dom'

export default function HorizontalParallax() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [endX, setEndX] = useState('0px')
  const [startScroll, setStartScroll] = useState(0)
  const [endScroll, setEndScroll] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    function compute() {
      const track = trackRef.current
      const section = sectionRef.current
      if (track) {
        const trackWidth = track.scrollWidth
        const viewportW = window.innerWidth
        // Add extra buffer to ensure last card is fully visible
        const delta = Math.max(0, trackWidth - viewportW +10)
        setEndX(`${-delta}px`)
      }
      if (section) {
        const rect = section.getBoundingClientRect()
        const pageY = window.pageYOffset || document.documentElement.scrollTop || 0
        const sectionTop = pageY + rect.top
        const height = section.offsetHeight
        const viewportH = window.innerHeight
        const start = Math.max(0, sectionTop)
        const end = start + Math.max(0, height - viewportH)
        setStartScroll(start)
        setEndScroll(end)
      }
    }
    compute()
    const onResize = () => compute()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)

    const section = sectionRef.current
    let io
    if (section && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        if (entries[0]) setInView(entries[0].isIntersecting)
      }, { threshold: 0.01 })
      io.observe(section)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      if (io) io.disconnect()
    }
  }, [])

  const products = useMemo(() => [
    { title: 'Agriport', image: 'products/agriport.png', desc: 'Identify and map geographic areas of agricultural land. Provides detailed data, boundary mapping, and analytics to support farmers in making informed decisions about crop management.', id: 'agriport' },
    { title: 'Aqualens', image: 'products/besmart.png', desc: 'An intelligent, IoT-enabled solution that allows users to monitor, control and optimize their water treatment and distribution process in real time. Ensuring efficient plant operations and sustainable resource…', id: 'aqua' },
    { title: 'Civic Pulse', image: 'products/plantninja.png', desc: 'A platform to identify public issues and help communities develop solutions. Connects citizens and local authorities to collaborate on concerns, ensuring transparency and accountability.', id: 'civic' },
    { title: 'Cloud Doctor', image: 'products/rest.png', desc: 'Optimise AWS services with real-time insights and automated recommendations. Manage resources, control costs, and improve performance across multiple AWS accounts efficiently.', id: 'cloud' },
    { title: 'CVM Beach Productions', image: 'products/seaog.png', desc: 'A comprehensive travel and accommodation management platform. Search, book, and manage itineraries near shopping areas with real-time updates and personalised recommendations.', id: 'cvm' },
    { title: 'Perfect Rubber Industry', image: 'products/stpete.png', desc: 'A digital hub for sourcing high-quality rubber compounds and products. Provides detailed specifications and quality assurance data to help manufacturers and buyers make informed decisions.', id: 'rubber' },

    { title: 'Spark', image: 'products/Spark.png', desc: 'Unified task tracking and assignment platform.Allows teams to see all tasks, assign responsibilities, and monitor progress in real time to ensure projects stay on schedule.', id: 'spark' },

    { title: 'St.Pete Conf', image: 'products/St.png', desc: 'A central platform for managing room and accommodation reservations for conferences. Allows organisers and attendees to check availability and manage bookings with real-time notifications.', id: 'st' },
  ], [])

  return (
    <section id="products" ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-black border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto pb-8">
        
          {/* <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Products we've built & shipped
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            A snapshot of the ideas we've turned into real products — from
            wearables to agriculture platforms and creator tools.
          </p> */}

          {/* Filters */}
          {/* <div className="flex justify-center gap-2 mt-2 mb-4">
            <span className="px-4 py-1 text-xs rounded-full bg-yellow-400 text-black">
              All
            </span>
            <span className="px-4 py-1 text-xs rounded-full border border-white/10 text-gray-300">
              Client launches
            </span>
            <span className="px-4 py-1 text-xs rounded-full border border-white/10 text-gray-300">
              Buildbot products
            </span>
          </div> */}
        </div>
        <Parallax translateX={["0px", (inView ? endX : "0px")]} startScroll={startScroll} endScroll={endScroll} className="h-auto">
          <div ref={trackRef} className="flex items-start gap-4 px-4 md:px-8 pr-[15vw] md:pr-[10vw]">
            {products.map((p, i) => (
              <Panel key={i} index={i} product={p} />
            ))}
          </div>
        </Parallax>
      </div>

   
    </section>
  )
}

function Panel({ index, product }) {
  // Define background colors that rotate through cards
  const bgColors = [
    'bg-gray-100',    // Cream/beige
    'bg-purple-300',  // Purple
    'bg-yellow-300',  // Yellow
    'bg-rose-200',    // Pink/rose
    'bg-blue-200',    // Light blue
    'bg-green-200',   // Light green
    'bg-orange-200',  // Light orange
    'bg-cyan-200'     // Light cyan
  ];
  
  const bgColor = bgColors[index % bgColors.length];
  
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className={`group shrink-0 w-[80vw] sm:w-[50vw] lg:w-[35vw] max-w-[500px] h-[85vh] rounded-3xl ${bgColor} p-8 relative overflow-hidden transition-all duration-500 cursor-pointer`}>
        
        {/* White overlay that appears on hover - covers entire card */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/90 transition-all duration-500 rounded-3xl pointer-events-none" />
        
        {/* Image container - floating mockup style with shadow */}
        <div className="relative w-full h-[65%] mb-6 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-95 z-10">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        {/* Text content at bottom */}
        <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
          <h3 className="text-4xl md:text-5xl font-bold text-black mb-3">
            {product.title}
          </h3>
          
          {/* Category tags - visible by default, fade out on hover */}
          <div className="text-black/60 text-sm transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:h-0 overflow-hidden">
            Product Design • Web Design
          </div>
          
          {/* Description and button - appears on hover below the title */}
          <div className="transition-all duration-300 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 group-hover:mt-2">
            <p className="text-black/80 text-base mb-4 leading-relaxed">
              {product.desc}
            </p>
            <div className="inline-flex items-center gap-2 text-black font-semibold hover:gap-3 transition-all bg-white px-4 py-2 rounded-lg shadow-sm">
              Explore
              <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}