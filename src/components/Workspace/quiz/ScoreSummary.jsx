import React from "react";
import Card from "../../ui/Card";
import CircularProgress from "./CircularProgress";
import { getGrade, getGradeStyles } from "../../../lib/quizUtils";

export default function ScoreSummary({ correct, incorrect, total, percentage }) {
    const grade = getGrade(percentage);

    return (
        <Card className="overflow-hidden p-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
                    <CircularProgress percentage={percentage} size={160} strokeWidth={14} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display text-3xl font-bold text-slate-900">{percentage}%</span>
                        <span className="text-xs text-slate-500">Score</span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col items-center gap-4 sm:items-start">
                    <div
                        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${getGradeStyles(
                            grade
                        )}`}
                    >
                        Grade: {grade}
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-center sm:text-left">
                        <div>
                            <p className="font-display text-2xl font-bold text-emerald-600">{correct}</p>
                            <p className="text-xs text-slate-500">Correct answers</p>
                        </div>
                        <div>
                            <p className="font-display text-2xl font-bold text-rose-500">{incorrect}</p>
                            <p className="text-xs text-slate-500">Incorrect answers</p>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500">
                        You answered <span className="font-semibold text-slate-800">{correct}</span> out of{" "}
                        <span className="font-semibold text-slate-800">{total}</span> questions correctly.
                    </p>
                </div>
            </div>
        </Card>
    );
}