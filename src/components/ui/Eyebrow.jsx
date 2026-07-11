import React from "react";

export default function Eyebrow({ children }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 font-mono">
            {children}
        </span>
    );
}