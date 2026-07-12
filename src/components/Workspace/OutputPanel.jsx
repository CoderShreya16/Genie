import React, { useState } from "react";
import { Copy, Download, Check, Sparkles } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import MarkdownRenderer from "../shared/MarkdownRenderer";

const PLACEHOLDER_TEXT = "Your AI-generated results will appear here.";

export default function OutputPanel({ outputText, renderMarkdown = false }) {
    const [copied, setCopied] = useState(false);
    const hasOutput = Boolean(outputText);

    const handleCopy = async () => {
        if (!hasOutput) return;
        try {
            await navigator.clipboard.writeText(outputText);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Clipboard API unavailable — fail silently, UI-only feature for now.
        }
    };

    const handleDownload = () => {
        // UI only for now — wire up a real file export once the backend exists.
        console.log("Download requested (UI only):", outputText);
    };

    return (
        <Card className="flex flex-col p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">Results</h2>
                <div className="flex gap-2.5">
                    <Button variant="outline" size="sm" onClick={handleCopy} disabled={!hasOutput}>
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                        {copied ? "Copied" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} disabled={!hasOutput}>
                        <Download size={15} />
                        Download
                    </Button>
                </div>
            </div>

            <div className="mt-5 min-h-[220px] flex-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                {hasOutput ? (
                    renderMarkdown ? (
                        <MarkdownRenderer content={outputText} />
                    ) : (
                        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{outputText}</p>
                    )
                ) : (
                    <div className="flex h-full min-h-[190px] flex-col items-center justify-center gap-3 text-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                            <Sparkles size={20} />
                        </div>
                        <p className="max-w-xs text-sm text-slate-500">{PLACEHOLDER_TEXT}</p>
                    </div>
                )}
            </div>
        </Card>
    );
}