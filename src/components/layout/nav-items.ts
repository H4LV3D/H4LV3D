export const navItems = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/notes", key: "notes" },
  { href: "/contact", key: "contact" },
] as const;

export const allPages = [{ href: "/", key: "home" }, ...navItems] as const;
