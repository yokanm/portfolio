import { useEffect } from 'react';
import { personalInfo } from '@/data/portfolio';

interface SeoTagProps {
  title: string;
  description: string;
  path?: string;
}

const BASE_URL = 'https://kanmiportfolio.netlify.app';

/**
 * Route-level SEO: sets a unique <title>, <meta name="description">,
 * canonical link, and OpenGraph/Twitter tags per route.
 */
export function SeoTag({ title, description, path = '/' }: SeoTagProps) {
  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${path}`;
    document.title = `${title} | ${personalInfo.firstName} ${personalInfo.lastName} — ${personalInfo.title}`;

    const setMeta = (selector: string, attribute: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, '');
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', document.title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'content', document.title);
    setMeta('meta[name="twitter:description"]', 'content', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
  }, [title, description, path]);

  return null;
}