export interface NavLink {
  label: string;
  href: string;
  isAnchor: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", isAnchor: true },
  { label: "About", href: "#about", isAnchor: true },
  { label: "Experience", href: "#experience", isAnchor: true },
  { label: "Research", href: "/research", isAnchor: false },
  { label: "Skills", href: "#skills", isAnchor: true },
  { label: "Blog", href: "/blog", isAnchor: false },
  { label: "Contact", href: "#contact", isAnchor: true },
];
