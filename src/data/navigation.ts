// ─────────────────────────────────────────────────────────────
// Single source of truth for all navigation items.
// Consumed by: Navbar (desktop + mobile), Footer.
// ─────────────────────────────────────────────────────────────

export interface NavItem {
  path: string;
  label: string;
  /** lucide-react icon name — resolved per-consumer to keep nav data icon-library-agnostic */
  iconName: string;
  /** Whether the link should only match the exact path (for / root) */
  end?: boolean;
}

export const primaryNavItems: NavItem[] = [
  { path: '/',           label: 'Home',       iconName: 'Home',     end: true },
  { path: '/about',      label: 'About',      iconName: 'User'      },
  { path: '/projects',   label: 'Projects',   iconName: 'Layers'    },
  { path: '/experience', label: 'Experience', iconName: 'Clock'     },
  { path: '/skills',     label: 'Skills',     iconName: 'Code2'     },
  { path: '/contact',    label: 'Contact',    iconName: 'Mail'      },
  { path: '/resume',     label: 'Resume',     iconName: 'FileText'  },
];

/** Subset shown in the footer — skip Resume to keep footer compact */
export const footerNavItems: NavItem[] = primaryNavItems.filter(
  (item) => !['/', '/resume'].includes(item.path),
);
