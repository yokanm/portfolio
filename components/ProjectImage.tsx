"use client"

import { useState } from "react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  category: string | string[]
  description: string
  image: string
  github: string
  live: string
  tech: string[]
}

interface ProjectImageProps {
  project: Project
}

// Desktop version with hover
export default function ProjectImage({ project }: ProjectImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative flex-shrink-0 w-[500px] h-[350px] rounded-2xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-black/80 flex items-center justify-center gap-6
          transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border-2 border-orange-400 text-orange-400 
            rounded-lg font-semibold hover:bg-orange-400 hover:text-black 
            transition-all duration-300"
        >
          GitHub
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-orange-400 text-black rounded-lg 
            font-semibold hover:bg-orange-500 transition-all duration-300"
        >
          Live Demo
        </a>
      </div>
    </div>
  )
}

// Mobile/Tablet version with visible buttons
export function MobileImage({ project }: ProjectImageProps) {
  return (
    <div className="space-y-4">
      {/* Image */}
      <div className="relative w-full h-[250px] rounded-2xl overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.tech.map((techItem, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 rounded-full border border-orange-400/50
              text-orange-400 text-xs"
          >
            {techItem}
          </span>
        ))}
      </div>

      {/* Action Buttons - Always visible on mobile */}
      <div className="flex gap-3 pt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-4 border-2 border-orange-400 text-orange-400 
            text-center rounded-lg font-semibold active:bg-orange-400 
            active:text-black transition-all duration-200"
        >
          GitHub →
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2 px-4 items-center bg-orange-400 text-black text-center 
            rounded-lg font-semibold active:bg-orange-500 
            transition-all duration-200"
        >
          Live Demo →
        </a>
      </div>
    </div>
  )
}