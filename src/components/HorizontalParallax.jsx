import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'

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
        const delta = Math.max(0, trackWidth - viewportW)
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
    { title: 'Agriport', image: 'products/Agriport.png', desc: 'Identify and map geographic areas of agricultural land. Provides detailed data, boundary mapping, and analytics to support farmers in making informed decisions about crop management.' },
    { title: 'Aqualens', image: 'products/Aqua.png', desc: 'An intelligent, IoT-enabled solution that allows users to monitor, control and optimize their water treatment and distribution process in real time. Ensuring efficient plant operations and sustainable resource…' },
    { title: 'Civic Pulse', image: 'products/Civic.png', desc: 'A platform to identify public issues and help communities develop solutions. Connects citizens and local authorities to collaborate on concerns, ensuring transparency and accountability.' },
    { title: 'Cloud Doctor', image: 'products/Cloud.png', desc: 'Optimise AWS services with real-time insights and automated recommendations. Manage resources, control costs, and improve performance across multiple AWS accounts efficiently.' },
    { title: 'CVM Beach Productions', image: 'products/cvm.png', desc: 'A comprehensive travel and accommodation management platform. Search, book, and manage itineraries near shopping areas with real-time updates and personalised recommendations.' },
    { title: 'Perfect Rubber Industry', image: 'products/Rubber.png', desc: 'A digital hub for sourcing high-quality rubber compounds and products. Provides detailed specifications and quality assurance data to help manufacturers and buyers make informed decisions.' },

    { title: 'Spark', image: 'products/Spark.png', desc: 'Unified task tracking and assignment platform.Allows teams to see all tasks, assign responsibilities, and monitor progress in real time to ensure projects stay on schedule.' },

    { title: 'St.Pete Conf', image: 'products/St.png', desc: 'A central platform for managing room and accommodation reservations for conferences. Allows organisers and attendees to check availability and manage bookings with real-time notifications.' },
  ], [])

  return (
    <section id="horizontal" ref={sectionRef} className="relative h-[220vh] bg-black ">
      <div className="sticky top-0 h-screen overflow-hidden bg-black border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto pt-24 sm:pt-28">
        
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Products we've built & shipped
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            A snapshot of the ideas we've turned into real products — from
            wearables to agriculture platforms and creator tools.
          </p>

          {/* Filters */}
          <div className="flex justify-center gap-2 mt-2 mb-4">
            <span className="px-4 py-1 text-xs rounded-full bg-yellow-400 text-black">
              All
            </span>
            <span className="px-4 py-1 text-xs rounded-full border border-white/10 text-gray-300">
              Client launches
            </span>
            <span className="px-4 py-1 text-xs rounded-full border border-white/10 text-gray-300">
              Buildbot products
            </span>
          </div>
        </div>
        <Parallax translateX={["0px", (inView ? endX : "0px")]} startScroll={startScroll} endScroll={endScroll} className="h-full">
          <div ref={trackRef} className="h-auto flex items-center gap-6 px-8" style={{ width: '160vw' }}>
{/* <h1 className='text-6xl font-extrabold'>

        Featured
Products
</h1> */}
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
  return (
    <div className="group shrink-0 w-[30vw] max-w-[480px] h-[65vh] rounded-2xl border border-white/20 bg-black p-6 relative overflow-hidden transition-all duration-500">
      
      {/* Dark gray backdrop that appears on hover */}
      <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
      
      {/* Main content - fades out completely on hover */}
      <div className="h-full flex flex-col justify-between relative z-20 transition-all duration-500 group-hover:opacity-0">
        <div>
          <div className="relative w-full h-40 mb-4 overflow-hidden rounded-xl bg-white/5 border border-white/10">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">{product.title}</h3>
          {/* <p className="text-gray-300 text-xs md:text-sm line-clamp-4">
            {product.desc}
          </p> */}
        </div>
        <div className="text-gray-400 text-sm">
          Panel {index + 1} • Built by Buildbot
        </div>
      </div>

      {/* Full description overlay on hover */}
      <div className="absolute inset-0 p-8 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30 pointer-events-none">
        <h3 className="text-2xl font-bold mb-4 text-white">{product.title}</h3>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">
          {product.desc}
        </p>
       
      </div>
    </div>
  )
}