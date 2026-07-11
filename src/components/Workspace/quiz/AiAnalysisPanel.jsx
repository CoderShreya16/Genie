import React, { useEffect, useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, BookOpen, MessageSquareText, Loader2 } from "lucide-react";
import Card from "../../ui/Card";
import { analyzeQuiz } from "../../../services/quizAnalysisApi";

function AnalysisSection({ icon: Icon, title, items, tone = "indigo" }) {
    const toneClasses = {
        indigo: "bg-indigo-50 text-indigo-600",
        emerald: "bg-emerald-50 text-emerald-600",
        rose: "bg-rose-50 text-rose-600",
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
                    <Icon size={14} />
                </div>
                <p className="text-sm font-semibold text-slate-800">{title}</p>
            </div>
            <ul className="mt-2 space-y-1.5 pl-9">
                {items.map((item, i) => (
                    <li key={i} className="list-disc text-sm leading-relaxed text-slate-600">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function AiAnalysisPanel({ results }) {
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function fetchAnalysis() {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const data = await analyzeQuiz(results);
                if (!cancelled) setAnalysis(data);
            } catch (error) {
                if (!cancelled) setErrorMessage(error.message || "Failed to generate AI analysis.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchAnalysis();
        return () => {
            cancelled = true;
        };
    }, [results]);

    return (
        <Card className="p-6">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    <Sparkles size={16} />
                </div>
                <h2 className="font-display text-lg font-semibold text-slate-900">AI Performance Analysis</h2>
            </div>

            {isLoading && (
                <div className="mt-6 flex flex-col items-center justify-center gap-2 py-8 text-center">
                    <Loader2 size={22} className="animate-spin text-indigo-500" />
                    <p className="text-sm text-slate-500">Genie is analyzing your performance…</p>
                </div>
            )}

            {!isLoading && errorMessage && (
                <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {errorMessage}
                </div>
            )}

            {!isLoading && analysis && (
                <div className="mt-5 flex flex-col gap-5">
                    <AnalysisSection icon={TrendingUp} title="Strengths" items={analysis.strengths} tone="emerald" />
                    <AnalysisSection icon={TrendingDown} title="Weak areas" items={analysis.weakAreas} tone="rose" />
                    <AnalysisSection
                        icon={BookOpen}
                        title="Recommended topics to revise"
                        items={analysis.recommendedTopics}
                        tone="indigo"
                    />

                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <MessageSquareText size={14} />
                            </div>
                            <p className="text-sm font-semibold text-slate-800">Overall feedback</p>
                        </div>
                        <p className="mt-2 pl-9 text-sm leading-relaxed text-slate-600">{analysis.overallFeedback}</p>
                    </div>
                </div>
            )}
        </Card>
    );
}