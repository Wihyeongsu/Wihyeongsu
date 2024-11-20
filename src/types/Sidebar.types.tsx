// types/sidebar.ts

export type SubMenuItem = {
  id: string;
  label: string;
};

export type MenuItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  badgeColor?: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuItem[];
};

export type Theme = "light" | "dark";
