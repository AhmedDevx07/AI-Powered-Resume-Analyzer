import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutGrid,
  FileText,
  BarChart3,
  History,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import AILogo from "./AILogo";
import { IconButton } from "../ui/IconButton";

const NAV = [
  { to: "/dashboard", icon: LayoutGrid, label: "Dashboard" },
  { to: "/resumes", icon: FileText, label: "Resumes" },
  { to: "/insights", icon: BarChart3, label: "Insights" },
  { to: "/history", icon: History, label: "History" },
];

const ROW_BASE =
  "relative flex items-center h-11 w-11 md:group-hover/sidebar:w-[200px] w-full rounded-2xl overflow-hidden " +
  "transition-[width,background-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";

const LABEL_BASE =
  "text-sm font-medium whitespace-nowrap pr-4 md:opacity-0 md:-translate-x-1 opacity-100 translate-x-0 " +
  "transition-[opacity,transform] duration-200 ease-out " +
  "md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:translate-x-0 md:group-hover/sidebar:delay-100";

function NavItem({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink to={to} title={label} className="block w-full" onClick={onClick}>
      {({ isActive }) => (
        <div
          className={cn(
            ROW_BASE,
            isActive
              ? "bg-[var(--ink)] text-[var(--bg)] shadow-card"
              : "text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]",
          )}
        >
          <span className="h-11 w-11 flex items-center justify-center shrink-0">
            <Icon size={18} strokeWidth={2} />
          </span>
          <span className={LABEL_BASE}>{label}</span>
        </div>
      )}
    </NavLink>
  );
}

function ActionRow({ icon: Icon, label, onClick, to, onNavClick }) {
  const inner = (isActive) => (
    <div
      className={cn(
        ROW_BASE,
        isActive
          ? "bg-[var(--ink)] text-[var(--bg)] shadow-card"
          : "text-[var(--ink-muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
      )}
    >
      <span className="h-11 w-11 flex items-center justify-center shrink-0">
        <Icon size={18} />
      </span>
      <span className={LABEL_BASE}>{label}</span>
    </div>
  );

  if (to) {
    return (
      <NavLink to={to} title={label} className="block w-full" onClick={onNavClick}>
        {({ isActive }) => inner(isActive)}
      </NavLink>
    );
  }

  return (
    <button onClick={onClick} title={label} className="block w-full">
      {inner(false)}
    </button>
  );
}

function SidebarContent({ user, logout, onCloseMobile }) {
  const displayName = user?.name || "Account";
  const displayEmail = user?.email || "";

  return (
    <>
      <div className="flex flex-col items-center md:items-start gap-6 w-full px-4 md:px-0">
        <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0">
          <div
            className={cn(
              "flex items-center h-14 w-full md:w-14 md:group-hover/sidebar:w-[200px]",
              "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            )}
          >
            <div className="h-12 w-12 flex items-center justify-center shrink-0">
              <AILogo />
            </div>
            <span
              className={cn(
                "ml-2 font-display text-base font-semibold text-[var(--ink)] whitespace-nowrap",
                "md:opacity-0 md:-translate-x-1 opacity-100 translate-x-0",
                "transition-[opacity,transform] duration-200 ease-out",
                "md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:translate-x-0 md:group-hover/sidebar:delay-100",
              )}
            >
              Roaster
            </span>
          </div>
          {onCloseMobile && (
            <IconButton className="md:hidden" onClick={onCloseMobile}>
              <X size={20} />
            </IconButton>
          )}
        </div>

        <nav className="flex flex-col items-center md:items-start gap-1.5 w-full">
          {NAV.map((item) => (
            <NavItem key={item.to} {...item} onClick={onCloseMobile} />
          ))}
        </nav>
      </div>

      <div className="flex flex-col items-center md:items-start gap-2 w-full px-4 md:px-0 mb-4 md:mb-0">
        <ActionRow icon={Settings} label="Settings" to="/settings" onNavClick={onCloseMobile} />
        <ActionRow icon={LogOut} label="Log out" onClick={() => { logout(); onCloseMobile?.(); }} />

        <div
          className={cn(
            "flex items-center h-12 mt-1 w-full md:w-10 md:group-hover/sidebar:w-[200px] overflow-hidden",
            "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          )}
        >
          <div className="h-10 w-10 rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] font-semibold flex items-center justify-center text-sm ring-2 ring-[var(--surface)] shrink-0">
            {user?.name?.[0]?.toUpperCase() || "R"}
          </div>
          <div
            className={cn(
              "ml-3 min-w-0 flex-1",
              "md:opacity-0 md:-translate-x-1 opacity-100 translate-x-0",
              "transition-[opacity,transform] duration-200 ease-out",
              "md:group-hover/sidebar:opacity-100 md:group-hover/sidebar:translate-x-0 md:group-hover/sidebar:delay-100",
            )}
          >
            <div className="text-sm font-semibold text-[var(--ink)] truncate">
              {displayName}
            </div>
            {displayEmail && (
              <div className="text-[11px] text-[var(--ink-muted)] truncate">
                {displayEmail}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { user, logout } = useAuth();

  // Prevent scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "group/sidebar hidden md:flex shrink-0 h-[calc(100vh-32px)] sticky top-4 ml-4",
          "flex-col items-center justify-between py-5 rounded-3xl",
          "bg-[var(--surface)] border border-[var(--border)] shadow-card overflow-hidden",
          "w-[88px] hover:w-[248px]",
          "transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-30",
        )}
      >
        <SidebarContent user={user} logout={logout} />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-[var(--ink)]/30 backdrop-blur-sm md:hidden"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[var(--surface)] border-r border-[var(--border)] shadow-xl flex flex-col justify-between py-6 md:hidden"
            >
              <SidebarContent user={user} logout={logout} onCloseMobile={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
