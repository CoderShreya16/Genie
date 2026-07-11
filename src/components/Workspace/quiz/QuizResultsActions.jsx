import React from "react";
import { RotateCcw, Sparkles, LayoutGrid } from "lucide-react";
import Button from "../../ui/Button";

export default function QuizResultsActions({ onRetake, onGenerateNew, onBackToWorkspace, isRegenerating }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" size="md" onClick={onBackToWorkspace}>
                <LayoutGrid size={16} />
                Back to Workspace
            </Button>
            <Button variant="subtle" size="md" onClick={onRetake}>
                <RotateCcw size={16} />
                Retake Quiz
            </Button>
            <Button variant="primary" size="md" onClick={onGenerateNew} disabled={isRegenerating}>
                <Sparkles size={16} />
                {isRegenerating ? "Generating…" : "Generate New Quiz"}
            </Button>
        </div>
    );
}