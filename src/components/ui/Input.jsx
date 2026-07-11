import React from "react";
import { cn } from "../../lib/utils";

/**
 * Generic text input styled to match the app's card/button language
 * (rounded-2xl, indigo focus ring). Supports an optional trailing element
 * (e.g. a show/hide password toggle) via `rightElement`.
 */
export default function Input({
    label,
    id,
    type = "text",
    className = "",
    rightElement = null,
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    className={cn(
                        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200",
                        "focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100",
                        rightElement ? "pr-11" : "",
                        className
                    )}
                    {...props}
                />
                {rightElement && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">{rightElement}</div>
                )}
            </div>
        </div>
    );
}