import React from "react";
import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

/**
 * Custom checkbox that keeps the native input for accessibility/behavior
 * but renders an indigo-themed box on top, consistent with the rest of
 * the UI (rounded corners, indigo accent).
 */
export default function Checkbox({ id, checked, onChange, label, className = "" }) {
    return (
        <label htmlFor={id} className={cn("flex cursor-pointer items-center gap-2.5 select-none", className)}>
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="peer absolute h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition-colors checked:border-indigo-600 checked:bg-gradient-to-br checked:from-indigo-600 checked:to-purple-600"
                />
                <Check
                    size={13}
                    strokeWidth={3}
                    className="pointer-events-none relative text-white opacity-0 peer-checked:opacity-100"
                />
            </span>
            {label && <span className="text-sm text-slate-600">{label}</span>}
        </label>
    );
}