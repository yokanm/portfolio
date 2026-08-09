import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/shared/Layout';

const HomePage = lazy(() => import('@/features/home/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('@/features/about/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import('@/features/projects/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import('@/features/projects/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));
const ExperiencePage = lazy(() => import('@/features/experience/ExperiencePage').then(m => ({ default: m.ExperiencePage })));
const SkillsPage = lazy(() => import('@/features/skills/SkillsPage').then(m => ({ default: m.SkillsPage })));
const ContactPage = lazy(() => import('@/features/contact/ContactPage').then(m => ({ default: m.ContactPage })));
const ResumePage = lazy(() => import('@/features/resume/ResumePage').then(m => ({ default: m.ResumePage })));
const NotFoundPage = lazy(() => import('@/features/home/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent animate-spin" />
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint">
          Loading...
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
          <Route path="projects" element={<Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense>} />
          <Route path="projects/:slug" element={<Suspense fallback={<PageLoader />}><ProjectDetailPage /></Suspense>} />
          <Route path="experience" element={<Suspense fallback={<PageLoader />}><ExperiencePage /></Suspense>} />
          <Route path="skills" element={<Suspense fallback={<PageLoader />}><SkillsPage /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
          <Route path="resume" element={<Suspense fallback={<PageLoader />}><ResumePage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}