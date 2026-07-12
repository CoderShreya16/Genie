import React from "react";
import { CHAT_SUGGESTIONS } from "../../../data/chatSuggestions";

export default function ChatSuggestions({ onSelect, disabled }) {
    return (
        <div className="flex flex-wrap gap-2">
            {CHAT_SUGGESTIONS.map((suggestion) => (
                <button
                    key={suggestion}
                    type="button"
                    disabled={disabled}
                    onClick={() => onSelect(suggestion)}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}