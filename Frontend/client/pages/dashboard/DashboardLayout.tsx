import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  MapPin,
  ClipboardList
} from "lucide-react";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: "/admin", icon: BarChart3, label: "Overview" },
    { id: "/admin/packages", icon: Package, label: "Packages" },
    { id: "/admin/bookings", icon: ClipboardList, label: "Bookings" },
    { id: "/admin/planner", icon: MapPin, label: "Manual Trips" },
    { id: "/admin/messages", icon: MessageSquare, label: "Messages" },
    { id: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-card text-foreground border-r border-border transform transition-transform duration-300 z-40 md:relative md:translate-x-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2 text-2xl font-playfair font-bold">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              LA
            </div>
            <div>
              <span className="text-primary">LUX</span>
              <span className="text-secondary">Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.id;
            return (
              <Link
                key={item.id}
                to={item.id}
                onClick={() => setSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-foreground hover:bg-accent/10 p-2 rounded-lg"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-foreground capitalize">
              {menuItems.find((m) => m.id === location.pathname)?.label || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
