"use client"

import { Github, Linkedin, X, Menu, Download } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const navLinks = ["About", "Project", "Services", "Contact"]
  
  const technologies = [
    "React", "Next.js", "TypeScript", "Tailwind CSS", 
    "Firebase", "Supabase", "Claude AI", "Git",
    "JavaScript", "Node.js", "Redux", "Framer Motion"
  ]

  return (
    <div className="relative min-h-screen bg-black">
      {/* HEADER */}
      <header className="w-full border-b border-orange-400/30 relative z-50 bg-black">
        <nav className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-3 items-center">
          <Link
            href="/"
            className="justify-self-start xl:-ml-24 pl-2 text-xs uppercase tracking-[0.45em]
            text-orange-400 hover:text-orange-500 transition-colors font-grandslang"
            onClick={() => setIsOpen(false)}
          >
            KANMI
          </Link>
          <div />
          <ul className="hidden lg:flex justify-self-end gap-10 text-sm tracking-[0.3em]">
            {navLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="relative text-orange-300 hover:text-orange-500 transition-colors
                  after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0
                  after:bg-orange-500 after:transition-all after:duration-300
                  hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden justify-self-end p-2 text-orange-400 hover:text-orange-500 
            transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* MOBILE & TABLET SIDE MENU */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full bg-black z-40 
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        w-full md:w-1/2 border-r border-orange-400/30`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          <nav className="flex-1">
            <ul className="flex flex-col gap-8">
              {navLinks.map((item, index) => (
                <li
                  key={item}
                  className={`transform transition-all duration-300 delay-${index * 75}
                  ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-2xl md:text-3xl font-grandslang font-light text-orange-400 
                    hover:text-orange-500 transition-colors block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-orange-400/30 pt-8 mt-8">
            <p className="text-xs uppercase tracking-widest text-orange-500 mb-6">
              Connect
            </p>
            <div className="flex gap-6">
              {[
                { Icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/ayokanmiogunyebi" },
                { Icon: X, label: "X", link: "https://x.com/kayspice3" },
                { Icon: Github, label: "GitHub", link: "https://github.com/yokanm" },
              ].map(({ Icon, label, link }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group focus:outline-none focus:ring-2 focus:ring-orange-400 rounded p-2"
                >
                  <Icon className="w-6 h-6 text-orange-400 group-hover:text-orange-500 transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
          <div className="text-xs text-orange-400 mt-8">
            © 2025 Kanmi
          </div>
        </div>
      </aside>

      {/* DESKTOP SOCIALS */}
      <div className="hidden lg:flex flex-col fixed left-8 top-1/2 -translate-y-1/2 items-center gap-6 z-20">
        {[
          { Icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/ayokanmiogunyebi" },
          { Icon: X, label: "X", link: "https://x.com/kayspice3" },
          { Icon: Github, label: "GitHub", link: "https://github.com/yokanm" },
        ].map(({ Icon, label, link }) => (
          <a
            key={label}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
          >
            <Icon className="w-5 h-5 text-orange-400 group-hover:text-orange-500 transition-colors duration-300" />
          </a>
        ))}
        <span className="w-px h-24 bg-orange-400/70 mt-2" />
      </div>

      {/* DESKTOP COPYRIGHT */}
      <div className="hidden lg:block fixed left-10 bottom-8 z-20 text-xs tracking-widest text-orange-500">
        <span className="[writing-mode:vertical-rl] rotate-180">
          © 2025
        </span>
      </div>

      {/* TECHNOLOGY CAROUSEL */}
      <section className="relative py-8 bg-black border-b border-orange-400/30 overflow-hidden">
        <div className="flex items-center gap-8 animate-scroll-left whitespace-nowrap">
          {[...technologies, ...technologies, ...technologies].map((tech, index) => (
            <span
              key={index}
              className="text-xl md:text-2xl font-light text-orange-400/80 inline-block"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-black"
      >
        {/* Mouse tracking gradient */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 146, 60, 0.25), rgba(249, 115, 22, 0.12) 40%, transparent 70%)`
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-fade-in animation-delay-300" />
        <div className="absolute top-40 right-1/3 w-1 h-16 bg-orange-400/70 rotate-45 opacity-40 animate-fade-in animation-delay-400" />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-20 bg-orange-400/70 -rotate-12 opacity-40 animate-fade-in animation-delay-500" />
        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-fade-in animation-delay-600" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-orange-500 rounded-full opacity-50 animate-fade-in animation-delay-700" />

        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Name with accent */}
          <div className="mb-6 flex items-center justify-center gap-3 animate-slide-right">
            <span className="w-12 h-px bg-orange-400/70" />
            <h2 className="text-sm md:text-base uppercase tracking-[0.3em] text-orange-500 font-light">
              Ogunyebi Ayokanmi
            </h2>
            <span className="w-12 h-px bg-orange-400/70" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-grandslang leading-tight mb-8 text-white animate-fade-up animation-delay-100">
            <span className="block mb-2">
              Frontend Developer
            </span>
            <span className="block mb-2">
              & <span className="text-orange-400">React Specialist</span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4 px-4 animate-fade-up animation-delay-200">
            Hire me for <span className="text-orange-400 font-medium">accessible</span>, <span className="text-orange-400 font-medium">performant</span> and <span className="text-orange-400 font-medium">pixel-perfect</span> digital experiences for your website.
          </p>

          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-400/10 border border-orange-400/30 text-orange-300 text-sm mb-12 animate-fade-up animation-delay-300">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">Available for freelance work and collaboration</span>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mb-8 animate-fade-up animation-delay-400">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center p-2">
                <div className="w-1 h-2 bg-orange-400 rounded-full animate-scroll" />
              </div>
              <span className="text-xs uppercase tracking-wider text-gray-500">Scroll</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center animate-fade-up animation-delay-500">
            <a
              href="/Ayokanmi_Ogunyebi_Resume.pdf"
              download
              className="group inline-flex items-center gap-3 px-8 py-4 bg-orange-400 hover:bg-orange-500 
              text-black font-semibold rounded-full transition-all duration-300 
              hover:shadow-lg hover:shadow-orange-400/50 hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #fb923c 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </section>
    </div>
  )
}