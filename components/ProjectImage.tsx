import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

type ProjectType = {
  image: string
  github?: string
  live?: string
  title?: string
  description?: string
  tech?: string[]
}

export default function ProjectImage({ project }: { project: ProjectType }) {
  return (
    <div className="flex-1 relative group">
      <Image
        src={project.image}
        alt={`${project.title ?? 'Project'} screenshot`}
        width={800}
        height={500}
        className="w-full rounded-2xl object-cover"
      />

      <div
        className="flex items-center justify-center gap-4 rounded-2xl
        absolute inset-0 bg-gray-900/90 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-orange-400 text-gray-900 rounded-full 
          hover:bg-orange-300 transition-colors duration-300"
          aria-label={`View ${project.title ?? 'project'} on GitHub`}
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-orange-400 text-gray-900 rounded-full 
          hover:bg-orange-300 transition-colors duration-300"
          aria-label={`View ${project.title ?? 'project'} live demo`}
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}

export function MobileImage({ project }: { project: ProjectType }) {
  return (
    <div className="relative group bg-gray-100 rounded-3xl p-6">
      <Image
        src={project.image}
        alt={`${project.title ?? 'Project'} mobile screenshot`}
        width={600}
        height={400}
        className="w-full rounded-2xl object-cover"
      />

      <div
        className="flex flex-col items-center justify-center gap-4
        absolute inset-0 bg-gray-900/90 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300"
      >
        <div className="flex gap-2 flex-wrap mt-4">
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

        <p className="text-gray-400 mt-6 leading-relaxed mx-10 text-center">
          {project.description}
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-orange-400 text-gray-900 rounded-full 
            hover:bg-orange-300 transition-colors duration-300"
            aria-label={`View ${project.title ?? 'project'} on GitHub`}
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-orange-400 text-gray-900 rounded-full 
            hover:bg-orange-300 transition-colors duration-300"
            aria-label={`View ${project.title ?? 'project'} live demo`}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}