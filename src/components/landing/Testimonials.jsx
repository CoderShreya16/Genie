import React from "react";
import { Quote, Star } from "lucide-react";
import Card from "../ui/Card";
import Eyebrow from "../ui/Eyebrow";
import { TESTIMONIALS } from "../../data/testimonials";

function TestimonialCard({ name, role, quote }) {
    return (
        <Card className="flex h-full flex-col p-6">
            <Quote className="text-indigo-200" size={28} />
            <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">"{quote}"</p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 font-display text-sm font-semibold text-white">
                    {name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default function Testimonials() {
    return (
        <section className="bg-white py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Eyebrow>Loved by students</Eyebrow>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Studying feels different with a head start
                    </h2>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {TESTIMONIALS.map((t) => (
                        <TestimonialCard key={t.name} {...t} />
                    ))}
                </div>
            </div>
        </section>
    );
}