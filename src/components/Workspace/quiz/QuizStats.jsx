import React from "react";
import { ListChecks, CheckCircle2, XCircle, MinusCircle, Clock } from "lucide-react";
import Card from "../../ui/Card";
import { formatDuration } from "../../../lib/quizUtils";

const STAT_CONFIG = [
    { key: "attempted", label: "Attempted", icon: ListChecks, color: "text-indigo-600 bg-indigo-50" },
    { key: "correct", label: "Correct", icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { key: "incorrect", label: "Incorrect", icon: XCircle, color: "text-rose-600 bg-rose-50" },
    { key: "skipped", label: "Skipped", icon: MinusCircle, color: "text-slate-500 bg-slate-100" },
];

export default function QuizStats({ attempted, correct, incorrect, skipped, timeTakenSeconds }) {
    const values = { attempted, correct, incorrect, skipped };

    return (
        <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Statistics</h2>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STAT_CONFIG.map((stat) => (
                    <div key={stat.key} className="rounded-2xl border border-slate-100 bg-white p-3.5">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
                            <stat.icon size={16} />
                        </div>
                        <p className="mt-2 font-display text-xl font-bold text-slate-900">{values[stat.key]}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5">
                <Clock size={16} className="text-slate-400" />
                <p className="text-sm text-slate-600">
                    Time taken: <span className="font-semibold text-slate-800">{formatDuration(timeTakenSeconds)}</span>
                </p>
            </div>
        </Card>
    );
}