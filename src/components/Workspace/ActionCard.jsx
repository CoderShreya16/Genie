import React from "react";
import { cn } from "../../lib/utils";

export default function ActionCard({ emoji, title, description, isSelected, onSelect }) {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "group relative overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                isSelected
                    ? "border-transparent bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30"
                    : "border-slate-100 bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
            )}
        >
            <div
                className={cn(
                    "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
                    isSelected ? "bg-white/20" : "bg-gradient-to-br from-indigo-100 to-purple-100"
                )}
            />
            <span className="relative text-2xl">{emoji}</span>
            <h3 className="relative mt-3 font-display text-base font-semibold">{title}</h3>
            <p className={cn("relative mt-1.5 text-sm leading-relaxed", isSelected ? "text-indigo-100" : "text-slate-600")}>
                {description}
            </p>
        </button>
    );
}