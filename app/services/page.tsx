import Link from "next/link"
import {
  Code,
  Layers,
  Share2,
  Smartphone,
  Figma,
  ArrowRight
} from "lucide-react"

export const metadata = {
  title: "Services - Ayokanmi Ogunyebi",
  description: "Frontend development services including React, Next.js, API integration, and responsive UI engineering",
}

const services = [
  {
    icon: Code,
    title: "Frontend Web Development",
    description:
      "Building responsive, modern websites with clean, semantic HTML, CSS, and JavaScript.",
    technologies: ["HTML5", "CSS3", "JavaScript", "React"]
  },
  {
    icon: Layers,
    title: "React / Next.js Applications",
    description:
      "Developing fast, scalable SPAs and full-stack applications with modern tooling.",
    technologies: ["React", "Next.js 15", "TypeScript"]
  },
  {
    icon: Share2,
    title: "API Integration",
    description:
      "Connecting frontend interfaces to secure backend services and third-party APIs.",
    technologies: ["REST APIs", "Supabase", "Fetch API"]
  },
  {
    icon: Smartphone,
    title: "Responsive UI Engineering",
    description:
      "Mobile-first, cross-browser layouts that feel native on every screen size.",
    technologies: ["Tailwind CSS", "CSS Grid", "Flexbox"]
  },
  {
    icon: Figma,
    title: "Figma to Code",
    description:
      "Translating UI/UX designs into pixel-perfect, maintainable production code.",
    technologies: ["Figma", "HTML/CSS", "React Components"]
  }
]

export default function Services() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="px-6 lg:px-24 py-24">

        {/* SIDE NAV */}
        <div
          className="absolute top-6 left-6 flex lg:flex-col items-center
          lg:fixed lg:top-1/2 lg:left-10 lg:-translate-y-1/2 gap-6 z-10"
        >
          <Link
            href="/"
            className="text-orange-300 hover:text-orange-500 transition-colors
            text-xs tracking-[0.3em]
            lg:rotate-180 lg:[writing-mode:vertical-rl]"
          >
            HOME
          </Link>

          <div className="hidden lg:block w-px h-28 bg-orange-400/50" />

          <Link
            href="/contact"
            className="text-orange-300 hover:text-orange-500 transition-colors
            text-xs tracking-[0.3em]
            lg:rotate-180 lg:[writing-mode:vertical-rl]"
          >
            CONTACT
          </Link>
        </div>

        {/* COPYRIGHT DESKTOP */}
        <div
          className="hidden lg:block fixed left-10 bottom-8 text-xs
          rotate-180 [writing-mode:vertical-rl] text-orange-500/70"
        >
          © 2025
        </div>

        {/* HEADER */}
        <div className="max-w-7xl mx-auto mb-24 md:mx-10">
          <h1
            className="font-grandslang text-[3.5rem] md:text-[6rem] xl:text-[10rem]
            leading-[0.9] tracking-tight text-orange-400"
          >
            Services
          </h1>
          <p className="mt-8 text-lg md:text-xl text-orange-300/80 max-w-2xl">
            Focused frontend services designed to deliver clean, scalable, and
            high-performing digital experiences.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-orange-400/20
                  bg-orange-400/5 p-8
                  transition-all duration-300
                  hover:border-orange-400/40
                  focus-ring hover-glow cursor-soft"
                  tabIndex={0}
                >
                  {/* ICON */}
                  <div className="mb-6">
                    <div
                      className="w-14 h-14 rounded-xl bg-orange-400/10
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:bg-orange-400/20"
                    >
                      <Icon
                        className="w-7 h-7 text-orange-400
                        transition-transform duration-300
                        group-hover:scale-110 group-hover:-rotate-3"
                      />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="text-xl font-semibold text-orange-300 mb-3">
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* TECHNOLOGIES */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full
                        bg-orange-400/10 text-orange-300
                        border border-orange-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* ACTION */}
                  <button
                    className="inline-flex items-center gap-2 text-orange-400 text-sm
                    transition-all duration-300
                    group-hover:gap-3 focus-ring"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-32 text-center px-4">
          <h2 className="font-grandslang text-3xl md:text-5xl lg:text-6xl text-orange-400 mb-8">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Let&apos;s collaborate to build fast, accessible, and visually refined
            digital products.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4
            bg-orange-400 text-gray-900 rounded-full font-semibold
            transition-all duration-300
            hover:bg-orange-300 hover:scale-105
            hover:shadow-lg hover:shadow-orange-400/30
            focus-ring"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* COPYRIGHT MOBILE */}
        <div className="lg:hidden mt-24 text-center text-xs text-orange-400
        rotate-180 [writing-mode:vertical-rl]">
          © 2025
        </div>
      </div>
    </section>
  )
}