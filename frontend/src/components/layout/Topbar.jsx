import { Search, Sun, Moon, Menu } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { NotificationsPopover } from "./NotificationsPopover";

export function Topbar({ onOpenPalette, onOpenMobileMenu }) {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);

  return (
    <header className="flex items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
      <div className="flex items-center gap-3">
        <IconButton
          onClick={onOpenMobileMenu}
          title="Open menu"
          className="md:hidden mt-1 shrink-0"
        >
          <Menu size={20} />
        </IconButton>
        <div>
          <h1 className="hidden md:block font-display text-[clamp(24px,3vw,38px)] font-semibold leading-tight text-[var(--ink)]">
            Hello, {firstName}.
          </h1>
          <p className="hidden md:block text-xs sm:text-sm text-[var(--ink-muted)] mt-0.5 sm:mt-1">
            Sharpen your resume with calm, focused AI insights.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0 mt-1 md:mt-0">
        <button
          type="button"
          onClick={onOpenPalette}
          className="hidden lg:flex items-center gap-3 h-11 w-[360px] rounded-full bg-[var(--surface)] border border-[var(--border)] pl-5 pr-1.5 shadow-card transition-shadow hover:shadow-hover text-left"
        >
          <Search size={16} className="text-[var(--ink-muted)] shrink-0" />
          <span className="flex-1 text-sm text-[var(--ink-muted)] truncate">
            Search resumes, keywords, rewrites...
          </span>
          <kbd className="inline-flex items-center gap-0.5 text-[10px] px-2 h-7 rounded-full bg-[var(--surface-2)] text-[var(--ink-muted)] border border-[var(--border)] font-semibold">
            {isMac ? "⌘" : "Ctrl"} K
          </kbd>
        </button>

        <IconButton
          onClick={onOpenPalette}
          title="Search"
          className="lg:hidden"
        >
          <Search size={18} />
        </IconButton>

        <IconButton onClick={toggle} title="Toggle theme">
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </IconButton>
        <NotificationsPopover />
      </div>
    </header>
  );
}
