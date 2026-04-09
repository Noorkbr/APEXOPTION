export const APP_NAME = "APEX OPTIONS";
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000";

export const NAV_LINKS = [
  { label: "Trade", href: "/trade", icon: "TrendingUp" },
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Wallet", href: "/wallet", icon: "Wallet" },
  { label: "History", href: "/history", icon: "Clock" },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: "Overview", href: "/admin", icon: "BarChart3" },
  { label: "Users", href: "/admin/users", icon: "Users" },
  { label: "Finance", href: "/admin/finance", icon: "DollarSign" },
  { label: "Assets", href: "/admin/assets", icon: "Layers" },
  { label: "Risk", href: "/admin/risk", icon: "Shield" },
] as const;
