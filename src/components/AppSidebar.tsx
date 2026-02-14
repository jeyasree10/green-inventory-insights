import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  CircuitBoard,
  Factory,
  History,
  BarChart3,
  Brain,
  FileSpreadsheet,
  Leaf,
  X,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/components", label: "Components", icon: Package },
  { to: "/pcb", label: "PCB List", icon: CircuitBoard },
  { to: "/production", label: "Production", icon: Factory },
  { to: "/history", label: "Production History", icon: History },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/procurement", label: "Procurement Intel", icon: Brain },
  { to: "/export", label: "Export Reports", icon: FileSpreadsheet },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const AppSidebar = ({ open, onClose }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 lg:z-auto flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          open ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-0 lg:-translate-x-full"
        } overflow-hidden`}
      >
        <div className="flex h-14 items-center gap-3 px-5 border-b border-sidebar-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Leaf className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="font-semibold text-sm text-sidebar-accent-foreground whitespace-nowrap">
            EcoInventory
          </span>
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1.5 hover:bg-sidebar-accent transition-colors lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-auto py-3 px-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <p className="text-xs text-sidebar-foreground/60 whitespace-nowrap">Carbon This Month</p>
            <p className="text-lg font-bold text-sidebar-primary whitespace-nowrap">2,847 kg</p>
          </div>
        </div>
      </aside>
    </>
  );
};
