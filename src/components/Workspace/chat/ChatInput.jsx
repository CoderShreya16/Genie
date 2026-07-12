import React from "react";
import { Send } from "lucide-react";
import { cn } from "../../../lib/utils";

export default function ChatInput({ value, onChange, onSend, disabled }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="flex items-end gap-2.5">
            <textarea
                rows={1}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Genie anything about your notes…"
                className="max-h-32 min-h-[46px] flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />
            <button
                type="button"
                onClick={onSend}
                disabled={disabled || !value.trim()}
                aria-label="Send message"
                className={cn(
                    "flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 transition-all duration-300",
                    "hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-50 disabled:pointer-events-none"
                )}
            >
                <Send size={17} />
            </button>
        </div>
    );
}