import Link from "next/link"
import ProjectImage, { MobileImage } from "@/components/ProjectImage"

export const metadata = {
  title: "Projects - Ayokanmi Ogunyebi",
  description: "Portfolio of web development projects showcasing React, Next.js, and modern frontend technologies",
}

const projects = [
  {
    id: 1,
    title: "Vans Life",
    category: ["Branding, UI/UX Design"],
    description: "This is a travel van rental multipage web application where users can browse various types of vans, view details, and rent them for their adventures.",
    image: "/images/Vanlife.png",
    github: "https://github.com/yokanm/van-life",
    live: "https://verdant-malabi-1b8b1b.netlify.app/",
    tech: ["JavaScript", "React", "React-Router v6","Firebase"]
  },
  {
    id: 2,
    title: "React Dashboard",
    category: "Web Application",
    description: "A modern and responsive admin dashboard built using React and Material-UI (MUI), designed for visualizing key business metrics, managing transactions, and monitoring data trends. The dashboard is fully customizable, scalable, and features a set of interactive charts, data tables, and statistic cards.",
    image: "/images/AdminDashboard.png",
    github: "https://github.com/yokanm/React-Admin-DashBoard",
    live: "https://velvety-bonbon-3fb0ce.netlify.app/",
    tech: ["JavaScript", "React", "MUI"]
  },
  {
    id: 3,
    title: "Cyber Gadgets",
    category: "Ecommerce Platform",
    description: "A modern e-commerce platform for tech gadgets with advanced filtering, secure checkout, and an intuitive admin panel for inventory management.",
    image: "/images/cyber_gadget.png",
    github: "https://github.com/yokanm/Cyber-gadget",
    live: "https://cyber-gadget-v2.vercel.app/",
    tech: ["Typescript", "React", "Next.Js", "Tailwind", "Shadcn"]
  }
]

export default function Project() {
  return (
    <section className="relative">
      <div className="px-6 lg:px-24 py-16">

        {/* LEFT FIXED NAV */}
        <div
          className="absolute top-6 left-6 flex lg:flex-col items-center
          lg:fixed lg:top-1/2 lg:left-10 lg:-translate-y-1/2 gap-6 z-10"
        >
          <Link
            href="/"
            className="text-orange-300 hover:text-orange-500 transition
            text-xs tracking-[0.3em]
            lg:rotate-180 lg:[writing-mode:vertical-rl]"
          >
            HOME
          </Link>

          <div className="hidden lg:block w-px h-28 bg-orange-400/70" />

          <Link
            href="/services"
            className="text-orange-300 hover:text-orange-500 transition
            text-xs tracking-[0.3em]
            lg:rotate-180 lg:[writing-mode:vertical-rl]"
          >
            SERVICES
          </Link>
        </div>

        {/* COPYRIGHT DESKTOP */}
        <div
          className="hidden lg:block fixed left-10 bottom-8 text-xs
          rotate-180 [writing-mode:vertical-rl] text-orange-500"
        >
          © 2025
        </div>

        {/* PAGE TITLE */}
        <div className="max-w-360 mx-auto mb-24">
          <h1
            className="font-grandslang text-[3.5rem] md:text-[6rem] xl:text-[10rem]
            leading-[0.9] tracking-tight text-orange-400"
          >
            Projects
          </h1>
        </div>
        
        {/* DESKTOP VERSION */}
        <div className="hidden lg:block max-w-360 mx-auto space-y-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex gap-20 items-start bg-[#181818] rounded-3xl p-16"
            >
              {/* TEXT */}
              <div className="flex-1">
                <h2 className="font-grandslang text-[3rem] text-white mb-6">
                  {project.title}
                </h2>

                <p className="text-gray-400 max-w-xl mb-10 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 max-w-xl">
                  {(project.tech || []).map((techItem, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full border border-orange-400/50
                      text-orange-400 text-sm"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* IMAGE */}
              <ProjectImage project={project} />
            </div>
          ))}
        </div>

        {/* MOBILE / TABLET VERSION */}
        <div className="lg:hidden space-y-20">
          {projects.map((project) => ( 
            <div key={project.id}>
              <h2 className="text-4xl font-semibold mb-2">
                {project.title}
              </h2>

              <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
                {project.category}
              </p>

              <MobileImage project={project} />
            </div>
          ))}
        </div>

        <div className="relative max-w-360 mx-auto lg:mt-16 overflow-hidden">
          <div className="relative flex items-center justify-center min-h-[50vh]">
            {/* TEXT */}
            <h2
              className="text-white text-center uppercase text-4xl lg:text-7xl xl:text-8xl
                font-grandslang font-bold leading-[0.98]
                tracking-[-0.01em] max-w-150 lg:max-w-275 translate-y-4"
            >
              LET&apos;S CREATE
              <br />
              SOMETHING GREAT!
            </h2>

            {/* FLOATING CTA */}
            <Link
              href="/contact"
              className="hidden lg:flex flex-col items-center justify-center
                absolute top-[6%] lg:right-[2%] xl:right-[10%]
                w-44 h-44 xl:w-48 xl:h-48 rounded-full
                bg-orange-400 text-black text-lg
                uppercase font-semibold tracking-wide transition-all
                duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:scale-110 hover:-rotate-12
                shadow-[0_0_0_rgba(0,0,0,0)]
                hover:shadow-[0_0_50px_rgba(251,146,60,0.45)]
                z-10"
            >
              <span className="leading-none">CONTACT</span>
              <span className="mt-1 leading-none">US ↗</span>
            </Link>
            <p className="lg:hidden mt-6 text-xs uppercase tracking-widest text-orange-400">
              Contact us →
            </p>
          </div>
        </div>

        {/* COPYRIGHT MOBILE */}
        <div
          className="lg:hidden mt-20 text-xs text-orange-400
          rotate-180 [writing-mode:vertical-rl]"
        >
          © 2025
        </div>
      </div>
    </section>
  )
}