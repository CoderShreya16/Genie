import React from "react";
import { cn } from "../../lib/utils";

export default function Card({ children, className = "", glass = false }) {
    return (
        <div
            className={cn(
                "rounded-3xl border",
                glass
                    ? "border-white/40 bg-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/50"
                    : "border-slate-100 bg-white shadow-sm",
                className
            )}
        >
            {children}
        </div>
    );
}