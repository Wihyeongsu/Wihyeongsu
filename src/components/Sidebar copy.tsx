// Sidebar.tsx
import { useState } from "react";
import "../assets/styles/Sidebar.css";

type MenuItem = {
  id: string;
  icon: string;
  label: string;
  badge?: {
    count: number;
    color?: string;
  };
  hasSubmenu?: boolean;
  submenu?: { id: string; label: string }[];
};

function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["income"]);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(true);

  const menuItems: MenuItem[] = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "audience", icon: "👥", label: "Audience", hasSubmenu: true },
    { id: "posts", icon: "📝", label: "Posts", badge: { count: 8 } },
    {
      id: "schedules",
      icon: "📅",
      label: "Schedules",
      badge: {
        count: 3,
        color: "#ff6b47",
      },
    },
    {
      id: "income",
      icon: "💰",
      label: "Income",
      hasSubmenu: true,
      submenu: [
        { id: "earnings", label: "Earnings" },
        { id: "refunds", label: "Refunds" },
        { id: "declines", label: "Declines" },
        { id: "payouts", label: "Payouts" },
      ],
    },
    { id: "promote", icon: "📢", label: "Promote", hasSubmenu: true },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId],
    );
  };

  return (
    <>
      <button
        className={`sidebar-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}>
        <span className="toggle-icon"></span>
      </button>

      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo" />

        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              className={`nav-item ${item.id === "dashboard" ? "active" : ""}`}
              onClick={() => item.hasSubmenu && toggleMenu(item.id)}>
              <i>{item.icon}</i>
              {isOpen && <span className="nav-label">{item.label}</span>}

              {item.badge && isOpen && (
                <span
                  className="badge"
                  style={
                    item.badge.color
                      ? {
                          background: `${item.badge.color}20`,
                          color: item.badge.color,
                        }
                      : undefined
                  }>
                  {item.badge.count}
                </span>
              )}

              {item.hasSubmenu && isOpen && (
                <i
                  style={{ marginLeft: "auto" }}
                  className={expandedMenus.includes(item.id) ? "rotated" : ""}>
                  ▼
                </i>
              )}
            </div>

            {item.submenu && expandedMenus.includes(item.id) && isOpen && (
              <div className="sub-menu">
                {item.submenu.map((subItem) => (
                  <div key={subItem.id} className="nav-item">
                    {subItem.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isOpen && (
          <>
            <div className="upload-box">
              <div className="upload-icon">+</div>
              <p>Upload new image</p>
              <p className="upload-subtitle">Drag and drop</p>
            </div>

            <div className="theme-toggle">
              <div
                className={`theme-option ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}>
                ☀️ Light
              </div>
              <div
                className={`theme-option ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}>
                🌙 Dark
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;
