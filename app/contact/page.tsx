import Link from "next/link"
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Linkedin,
  X
} from "lucide-react"

export const metadata = {
  title: "Contact - Ayokanmi Ogunyebi",
  description: "Get in touch for project collaborations, freelance work, or consultations",
}

export default function Contact() {
  return (
    <section className="relative overflow-hidden">
      <div className="px-6 md:px-10 lg:px-24 py-24">

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
            href="/services"
            className="text-orange-300 hover:text-orange-500 transition-colors
            text-xs tracking-[0.3em]
            lg:rotate-180 lg:[writing-mode:vertical-rl]"
          >
            SERVICES
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
        <div className="mb-28 mx-4 md:mx-10">
          <h1
            className="font-grandslang text-[3.5rem] md:text-[6rem] xl:text-[10rem]
            leading-[0.9] tracking-tight text-orange-400"
          >
            Let&apos;s Talk
          </h1>

          <p className="mt-8 max-w-2xl text-orange-300/80 text-base md:text-lg">
            Whether you have a project idea, collaboration proposal, or just want
            to connect — my inbox is always open.
          </p>
        </div>

        {/* CONTACT GRID */}
        <div className="max-w-6xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {/* EMAIL */}
            <a
              href="mailto:ogunyebiayokanmi@gmail.com"
              className="group rounded-2xl border border-orange-400/20
              p-8 hover:border-orange-400/40 transition-all
              hover:-translate-y-1 bg-orange-400/5"
            >
              <Mail className="text-orange-400 mb-6" size={28} />
              <h3 className="text-orange-500 text-xs tracking-widest mb-2">
                EMAIL
              </h3>
              <p className="text-orange-300 text-lg group-hover:text-orange-400 transition-colors">
                ogunyebiayokanmi@gmail.com
              </p>
            </a>

            {/* PHONE */}
            <a
              href="tel:+2349169665879"
              className="group rounded-2xl border border-orange-400/20
              p-8 hover:border-orange-400/40 transition-all
              hover:-translate-y-1 bg-orange-400/5"
            >
              <Phone className="text-orange-400 mb-6" size={28} />
              <h3 className="text-orange-500 text-xs tracking-widest mb-2">
                PHONE
              </h3>
              <p className="text-orange-300 text-lg group-hover:text-orange-400 transition-colors">
                +234 (91) 6966-5879
              </p>
            </a>

            {/* WHATSAPP */}
            <a
              href="https://wa.me/2348136402611"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-orange-400/20
              p-8 hover:border-orange-400/40 transition-all
              hover:-translate-y-1 bg-orange-400/5"
            >
              <MessageCircle className="text-orange-400 mb-6" size={28} />
              <h3 className="text-orange-500 text-xs tracking-widest mb-2">
                WHATSAPP
              </h3>
              <p className="text-orange-300 text-lg group-hover:text-orange-400 transition-colors">
                +234 (81) 3640-2611
              </p>
            </a>

            {/* LOCATION */}
            <div
              className="rounded-2xl border border-orange-400/20
              p-8 bg-orange-400/5"
            >
              <MapPin className="text-orange-400 mb-6" size={28} />
              <h3 className="text-orange-500 text-xs tracking-widest mb-2">
                LOCATION
              </h3>
              <p className="text-orange-300 text-lg">
                Akure, Nigeria
              </p>
            </div>

            {/* LINKEDIN */}
            <a
              href="https://linkedin.com/in/ayokanmiogunyebi"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-orange-400/20
              p-8 hover:border-orange-400/40 transition-all
              hover:-translate-y-1 bg-orange-400/5"
            >
              <Linkedin className="text-orange-400 mb-6" size={28} />
              <h3 className="text-orange-500 text-xs tracking-widest mb-2">
                LINKEDIN
              </h3>
              <p className="text-orange-300 text-lg group-hover:text-orange-400 transition-colors">
                Connect professionally
              </p>
            </a>

            {/* X / TWITTER */}
            <a
              href="https://x.com/kayspice3"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-orange-400/20
              p-8 hover:border-orange-400/40 transition-all
              hover:-translate-y-1 bg-orange-400/5"
            >
              <X className="text-orange-400 mb-6" size={28} />
              <h3 className="text-orange-500 text-xs tracking-widest mb-2">
                X (TWITTER)
              </h3>
              <p className="text-orange-300 text-lg group-hover:text-orange-400 transition-colors">
                Follow & chat
              </p>
            </a>

          </div>
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