import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const grandslang = localFont({
  src: [
    {
      path: "../public/fonts/GrandSlang-Roman.woff2",
      weight: "200 700",
      style: "normal",
    },
  ],
  variable: "--font-grandslang",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ayokanmi Ogunyebi - Frontend Developer",
  description: "Frontend Developer & React Specialist focused on accessible, performant digital experiences",
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Web Development"],
  authors: [{ name: "Ayokanmi Ogunyebi" }],
  openGraph: {
    title: "Ayokanmi Ogunyebi - Frontend Developer",
    description: "Frontend Developer & React Specialist",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${grandslang.variable}`}>
      <body className="bg-black text-gray-200 font-montserrat antialiased">
        {children}
      </body>
    </html>
  )
}