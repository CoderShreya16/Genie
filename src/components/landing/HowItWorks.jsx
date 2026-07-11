import React from "react";
import Eyebrow from "../ui/Eyebrow";
import { STEPS } from "../../data/steps";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative bg-gradient-to-b from-white to-indigo-50/40 py-24 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <Eyebrow>How it works</Eyebrow>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Three steps between you and a finished study set
                    </h2>
                </div>

                <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
                    <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent sm:block" />

                    {STEPS.map((step, i) => (
                        <div key={step.title} className="relative flex flex-col items-center text-center">
                            <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-100/60">
                                <step.icon className="text-indigo-600" size={26} />
                                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 font-mono text-[11px] font-semibold text-white">
                                    {i + 1}
                                </span>
                            </div>
                            <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">{step.title}</h3>
                            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}