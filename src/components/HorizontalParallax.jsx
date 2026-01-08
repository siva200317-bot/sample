import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'
import { Link } from 'react-router-dom'
import { products as productsData } from '@/data/products'
import { ArrowBigRight } from 'lucide-react'

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

  const products = useMemo(() => productsData.map(p => ({
    title: p.title,
    image: p.image,
    tagline:p.tagline,
    desc: p.description,
    id: p.id
  })), [])

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

<p className="text-xs tracking-widest text-muted-foreground mb-3">
              OUR PRODUCTS 
            </p>  
           <p
                    y={8}
                    as="h2"
                    className="text-4xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-white leading-tight"
                  >
                    Products we've built & shipped
                  </p>
<p className="text-md   my-3">
A snapshot of the ideas we've turned into real products — from wearables to agriculture
platforms and creator tools.            </p>      
            
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
      <div className="group shrink-0 w-[80vw] sm:w-[50vw] lg:w-[35vw] max-w-[500px] h-[65vh] rounded-3xl relative overflow-hidden cursor-pointer">
        {/* Image container - full height */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
          
          {/* Default Title Overlay - visible by default, fades on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 transition-opacity duration-300 group-hover:opacity-0">
            <h3 className="text-xl md:text-xl font-bold text-white">
              {product.title}
            </h3>
            
            <p>{product.tagline}</p>
          </div>
          
          {/* Hover Overlay - Full content revealed on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75">
              <h3 className="text-1xl md:text-2xl font-bold text-white mb-3">
                {product.title}
              </h3>
            </div>
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-150">
              <p className="text-gray-300 mb-4 line-clamp-3 text-sm">
                {product.desc}
              </p>
            </div>
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-200">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold w-fit hover:bg-yellow-300">
                Explore
                <ArrowBigRight/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}