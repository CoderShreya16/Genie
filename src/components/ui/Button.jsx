import React from "react";
import { cn } from "../../lib/utils";

/**
 * Lightweight, dependency-free Button primitive styled to match
 * shadcn/ui conventions (variant + size props, cn-style class merging).
 * Swap in `@/components/ui/button` from shadcn/ui if you have it installed —
 * the class names here were written to be drop-in compatible.
 */
export default function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    as: Tag = "button",
    ...props
}) {
    const base =
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary:
            "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5",
        outline:
            "border border-slate-200 text-slate-700 bg-white/60 hover:bg-white hover:border-slate-300",
        ghost: "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50",
        subtle: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    };

    const sizes = {
        sm: "text-sm px-4 py-2",
        md: "text-sm px-5 py-2.5",
        lg: "text-base px-7 py-3.5",
    };

    return (
        <Tag className={cn(base, variants[variant], sizes[size], className)} {...props}>
            {children}
        </Tag>
    );
}