import React from "react";
import { Search, Bell } from "lucide-react";

export default function WorkspaceTopbar() {
    return (
        <div className="sticky top-0 z-30 -mx-5 mb-2 flex items-center justify-between gap-4 border-b border-slate-100 bg-white/70 px-5 py-3.5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
            {/* Search */}
            <div className="relative w-full max-w-xs">
                <Search
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                    type="text"
                    placeholder="Search your notes, quizzes, cheat sheets…"
                    className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                />
            </div>

            {/* Notifications */}
            <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
            >
                <Bell size={19} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600" />
            </button>
        </div>
    );
}