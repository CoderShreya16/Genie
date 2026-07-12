import React from "react";
import { LayoutGrid, MessageCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const TABS = [
    { id: "workspace", label: "Workspace", icon: LayoutGrid },
    { id: "chat", label: "Chat", icon: MessageCircle },
];

export default function WorkspaceTabs({ activeTab, onChange }) {
    return (
        <div className="inline-flex gap-1 rounded-2xl border border-slate-100 bg-white p-1.5">
            {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={cn(
                            "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25"
                                : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-700"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}