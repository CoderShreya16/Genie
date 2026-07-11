import React, { useState } from "react";
import {
    Sparkles,
    LayoutGrid,
    History,
    User,
    Settings,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
    { label: "AI Workspace", icon: LayoutGrid, active: true },
    { label: "History", icon: History, active: false },
    { label: "Profile", icon: User, active: false },
    { label: "Settings", icon: Settings, active: false },
];

function SidebarContent() {
    return (
    <div className="flex h-full flex-col">
      <a href="/workspace" className="flex items-center gap-2 px-2 font-display text-xl font-bold text-slate-900">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30">
          <Sparkles size={18} />
        </span>
        Genie
      </a>

      <nav className="mt-10 flex flex-1 flex-col gap-1.5">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25"
                : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
            )}
          >
            <item.icon size={18} />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 font-display text-sm font-semibold text-white">
          AS
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">Asus Student</p>
          <p className="truncate text-xs text-slate-500">asus@genie.study</p>
        </div>
        <button
          type="button"
          aria-label="Log out"
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
        >
          <LogOut size={16} />
        </button>
      </div>
    </div >
  );
}

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-100 bg-white p-5 lg:flex">
                <SidebarContent />
            </aside>

            {/* Mobile top bar */}
            <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white/70 px-5 py-4 backdrop-blur-xl lg:hidden">
                <a href="/workspace" className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                        <Sparkles size={16} />
                    </span>
                    Genie
                </a>
                <button
                    className="rounded-lg p-2 text-slate-700"
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
                    <div className="absolute inset-y-0 left-0 w-72 animate-fade-up bg-white p-5 shadow-2xl">
                        <button
                            className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
}