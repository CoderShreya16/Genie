import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import ActionCard from "./ActionCard";
import { WORKSPACE_ACTIONS } from "../../data/workspaceActions";
import { Sparkles, Loader2 } from "lucide-react";

export default function AiActions({ selectedAction, onSelectAction, onGenerate, isGenerating }) {
    return (
        <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">Choose an action</h2>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={onGenerate}
                    disabled={!selectedAction || isGenerating}
                >
                    {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                    {isGenerating ? "Generating…" : "Generate"}
                </Button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {WORKSPACE_ACTIONS.map((action) => (
                    <ActionCard
                        key={action.id}
                        emoji={action.emoji}
                        title={action.title}
                        description={action.description}
                        isSelected={selectedAction === action.id}
                        onSelect={() => onSelectAction(action.id)}
                    />
                ))}
            </div>
        </Card>
    );
}