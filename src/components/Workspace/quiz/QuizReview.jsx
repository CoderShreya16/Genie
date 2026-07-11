import React from "react";
import Card from "../../ui/Card";
import ReviewCard from "./ReviewCard";

export default function QuizReview({ results }) {
    return (
        <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Review answers</h2>
            <div className="mt-5 flex flex-col gap-4">
                {results.map((result, index) => (
                    <ReviewCard key={index} result={result} index={index} />
                ))}
            </div>
        </Card>
    );
}