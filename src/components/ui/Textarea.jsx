import React from "react";
import { cn } from "../../lib/utils";

/**
 * Generic textarea matching Input's visual language (rounded-2xl,
 * indigo focus ring) so it drops in anywhere alongside Input.
 */
export default function Textarea({ label, id, className = "", rows = 6, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                rows={rows}
                className={cn(
                    "w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200",
                    "focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100",
                    className
                )}
                {...props}
            />
        </div>
    );
}