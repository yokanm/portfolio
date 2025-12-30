import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "About - Ayokanmi Ogunyebi",
  description: "Frontend developer focused on building thoughtful, accessible digital experiences",
}

export default function About() {
  return (
    <section className="relative about min-h-screen text-gray-200 select-none">
      <div className="px-8 lg:px-24 py-16">
        {/* SIDE NAV */}
        <div
          className="absolute top-6 left-6 flex lg:flex-col items-center 
          lg:fixed lg:top-1/2 lg:left-10 lg:-translate-y-1/2 gap-6 z-10">
          <Link
            href="/"
            className="text-orange-300 hover:text-orange-500 transition-colors duration-300
              text-xs tracking-[0.3em]
              lg:rotate-180 lg:[writing-mode:vertical-rl]">
            HOME
          </Link>

          <div className="hidden lg:block w-px h-28 bg-orange-400/70" />

          <Link
            href="/project"
            className="text-orange-300 hover:text-orange-500 transition-colors duration-300
            text-xs tracking-[0.3em]
            lg:rotate-180 lg:[writing-mode:vertical-rl]">
            PROJECT
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div
          className="hidden lg:block fixed left-10 bottom-8 text-xs
            rotate-180 [writing-mode:vertical-rl] text-orange-500">
          © 2025
        </div>

        {/* MAIN WRAP */}
        <div className="max-w-360 mx-auto">
          {/* HERO */}
          <div className="mb-20 md:mx-10">
            <h1
              className="font-grandslang text-[3.5rem] md:text-[6rem] xl:text-[10rem]
                leading-[0.9] tracking-tight text-orange-400
                animate-fade-up">
              About
            </h1>

            <h2
              className="mt-6 text-lg md:text-3xl font-light max-w-2xl
                animate-fade-up animation-delay-200 
                leading-relaxed">
              I&apos;m Ayokanmi. A frontend developer focused on building thoughtful,
              accessible digital experiences.
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start md:mx-10">
            {/* TEXT COLUMN */}
            <div className="space-y-8 text-sm md:text-base leading-relaxed opacity-90">
              <p className="animate-fade-up animation-delay-300">
                The intersection of structure and creativity has always drawn me
                in. I started my professional journey in Building Construction
                Technology, where precision, planning, and strong foundations
                mattered.
              </p>

              <p className="animate-fade-up animation-delay-400">
                Over time, that same mindset led me to frontend development. I
                now work primarily with{" "}
                <span className="text-orange-300">
                  React, TypeScript, and modern CSS
                </span>
                , translating complex ideas into clean, usable interfaces.
              </p>

              <p className="animate-fade-up animation-delay-500">
                I care deeply about accessibility, performance, and clarity.
                Good design, to me, is quiet — it works without asking for
                attention.
              </p>

              <div className="pt-4 border-l-4 border-orange-400 pl-4 bg-orange-400/5 p-4 rounded-r">
                <p className="text-orange-300 font-semibold mb-2">
                  🎓 Certified Developer
                </p>
                <p className="text-sm">
                  Scrimba Frontend Developer Career Path Graduate
                </p>
              </div>

              {/* EDITORIAL SKILLS */}
              <div className="pt-8 border-t border-gray-700 animate-fade-up animation-delay-600">
                <p className="text-xs tracking-widest text-gray-400 mb-4">
                  CURRENT FOCUS
                </p>
                <p className="leading-relaxed">
                  Frontend engineering with React & Next.js, design systems,
                  accessibility standards, and progressively expanding into
                  backend technologies.
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative lg:-translate-y-20 xl:-translate-y-28 animate-fade-up animation-delay-700">
              <Image
                src="/images/ay.png"
                alt="Ayokanmi Ogunyebi"
                width={384}
                height={512}
                className="w-64 md:w-80 xl:w-96 mx-auto border border-orange-400/30 object-cover"
                priority
              />
            </div>
          </div>

          {/* OFFSET EDITORIAL NOTE */}
          <div className="mb-4 lg:ml-[55%] max-w-xl animate-fade-up animation-delay-800">
            <p className="text-sm leading-relaxed opacity-80 xl:ml-28 xl:mr-4 xl:mb-40">
              Today, I&apos;m focused on building products that feel intentional —
              experiences grounded in solid foundations, just like the
              structures I once studied, but now expressed through code.
            </p>
          </div>

          {/* COPYRIGHT - Mobile/Tablet */}
          <div className="lg:hidden left-6 mt-16 text-center text-xs md:text-base text-orange-400 rotate-180 [writing-mode:vertical-rl]">
            © 2025
          </div>
        </div>
      </div>
    </section>
  )
}