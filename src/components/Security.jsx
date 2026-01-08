import { MotionReveal as Reveal } from '@/components/aceternity/motion-reveal'
import { ShieldCheck, Award, Cloud, Sparkles } from 'lucide-react'

export default function Security() {
  const pills = [
    {
      label: 'ISO 9001 & ISO 27001 certified delivery',
      icon: ShieldCheck,
    },
    {
      label: 'Quality-first product engineering practice',
      icon: Award,
    },
    {
      label: 'Secure AWS & Google Cloud operations',
      icon: Cloud,
    },
  ]

  const stats = [
    { label: 'Experience', value: '10+ yrs' },
    { label: 'Products operated', value: '50+ live' },
    { label: 'Uptime targets', value: '99.9% SLA' },
  ]

  const logos = [
    'NORTEK',
    'FUSO',
    'JANSSEN',
    'COMVIVA',
    'MEDTRONIC',
    'INFOSYS',
    'SIEMENS',
  ]

  return (
    <section
      id="security"
      className="relative overflow-hidden bg-gradient-to-b from-[#000814] via-[#001d3d] to-[#000814] px-6 py-32"
    >
      {/* Animated gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-500/10 animate-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/5 via-transparent to-transparent" />
      
      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* ISO Logo */}
        <Reveal y={4} as="div" className="flex justify-center ">
          <img 
            src="/iso.png" 
            alt="ISO Certification" 
            className="h-44 w-auto object-contain"
          />
        </Reveal>

        {/* Eyebrow with icon */}
        <Reveal
          y={6}
          as="div"
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <p className="text-[11px] tracking-[0.3em] text-yellow-400 font-semibold uppercase">
            ISO-Certified Partner
          </p>
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </Reveal>

        {/* Heading with gradient */}
        <Reveal
          y={8}
          as="h2"
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-white leading-tight"
        >
          ISO-certified. Secure. Ready for mission-critical products.
        </Reveal>

        {/* Subheading */}
        <Reveal
          delay={80}
          y={10}
          as="p"
          className="mt-6 mx-auto max-w-3xl text-base md:text-lg text-gray-300 leading-relaxed"
        >
          Buildbot operates as an <span className="text-yellow-400 font-semibold">ISO 9001 & ISO 27001 certified</span> product studio —
          combining disciplined engineering, reliable operations, and secure cloud
          practices so global teams can confidently build, operate, and transfer
          products with us.
        </Reveal>

        {/* Pills */}
        

        {/* Stats */}
        

        {/* Logos */}
       

        {/* CTA Button */}
       
      </div>
    </section>
  )
}
