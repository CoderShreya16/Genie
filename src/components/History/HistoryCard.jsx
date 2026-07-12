import React from "react";
import { FileText, HelpCircle, Zap, ShieldCheck, MessageCircle, ChevronRight } from "lucide-react";
import Card from "../ui/Card";
import { cn } from "../../lib/utils";

const OUTPUT_BADGES = [
    { key: "hasSummary", label: "Summary", icon: FileText, tone: "bg-indigo-50 text-indigo-600" },
    { key: "hasQuiz", label: "Quiz", icon: HelpCircle, tone: "bg-purple-50 text-purple-600" },
    { key: "hasCheatNotes", label: "Cheat Notes", icon: Zap, tone: "bg-amber-50 text-amber-600" },
    { key: "hasVerifyNotes", label: "Verify Notes", icon: ShieldCheck, tone: "bg-emerald-50 text-emerald-600" },
];

function formatDate(isoString) {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function HistoryCard({ workspace, onClick }) {
    const availableBadges = OUTPUT_BADGES.filter((badge) => workspace[badge.key]);

    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100"
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
                <FileText size={18} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate font-display text-sm font-semibold text-slate-900">{workspace.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">Created {formatDate(workspace.createdAt)}</p>

                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    {availableBadges.length === 0 && workspace.chatMessageCount === 0 ? (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                            No outputs yet
                        </span>
                    ) : (
                        <>
                            {availableBadges.map((badge) => (
                                <span
                                    key={badge.key}
                                    className={cn(
                                        "flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium",
                                        badge.tone
                                    )}
                                >
                                    <badge.icon size={11} />
                                    {badge.label}
                                </span>
                            ))}
                            {workspace.chatMessageCount > 0 && (
                                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                                    <MessageCircle size={11} />
                                    {workspace.chatMessageCount} messages
                                </span>
                            )}
                        </>
                    )}
                </div>
            </div>

            <ChevronRight size={18} className="shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500" />
        </button>
    );
}