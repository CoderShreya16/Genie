import React from "react";
import { Sparkles } from "lucide-react";
import Card from "../ui/Card";
import Eyebrow from "../ui/Eyebrow";
import { cn } from "../../lib/utils";
import { FEATURES } from "../../data/features";

function FeatureCard({ icon: Icon, title, description, className = "" }) {
    return (
        <Card
            className={cn(
                "group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100",
                className
            )}
        >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
                <Icon size={20} />
            </div>
            <h3 className="relative mt-5 font-display text-lg font-semibold text-slate-900">{title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
        </Card>
    );
}

export default function Features() {
    return (
        <section id="features" className="relative bg-white py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Eyebrow>Features</Eyebrow>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Everything you need to study, minus the busywork
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Five tools that turn raw material into something you can actually revise from.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.slice(0, 3).map((f) => (
                        <FeatureCard key={f.title} {...f} />
                    ))}
                    {FEATURES.slice(3).map((f) => (
                        <FeatureCard key={f.title} {...f} className="sm:col-span-1 lg:col-span-1" />
                    ))}
                    <Card className="flex flex-col justify-center gap-3 bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white sm:col-span-2 lg:col-span-1">
                        <Sparkles size={22} />
                        <p className="font-display text-lg font-semibold">More tools, always brewing</p>
                        <p className="text-sm text-indigo-100">
                            Flashcard decks and voice-note transcription are next up in the lab.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}