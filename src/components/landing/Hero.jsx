import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Upload, ArrowRight, ScanLine, CheckCircle2, ClipboardCheck, Wand2 } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Eyebrow from "../ui/Eyebrow";
import { cn } from "../../lib/utils";

function DashboardPreview() {
    return (
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-purple-400/30 blur-3xl animate-blob" />
            <div
                className="absolute -bottom-14 -left-10 h-56 w-56 rounded-full bg-indigo-400/30 blur-3xl animate-blob"
                style={{ animationDelay: "2s" }}
            />

            <Card glass className="relative z-10 p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    </div>
                    <span className="font-mono text-[11px] tracking-wide text-slate-400">genie.study/dashboard</span>
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-2xl bg-indigo-50/70 p-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
                        <ScanLine size={16} />
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">Organic_Chemistry_Ch4.pdf</p>
                        <p className="text-xs text-slate-500">Processed in 8 seconds</p>
                    </div>
                    <CheckCircle2 className="ml-auto shrink-0 text-emerald-500" size={18} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-100 bg-white p-3.5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Summary</p>
                        <p className="mt-1 text-2xl font-bold font-display text-slate-900">12</p>
                        <p className="text-xs text-slate-500">key concepts</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-3.5">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Quiz score</p>
                        <p className="mt-1 text-2xl font-bold font-display text-indigo-600">92%</p>
                        <p className="text-xs text-slate-500">last attempt</p>
                    </div>
                </div>
            </Card>

            <Card
                glass
                className="absolute -left-6 top-8 hidden w-44 animate-float-slow p-3.5 sm:block lg:-left-10"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                        <ClipboardCheck size={14} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Cheat sheet ready</p>
                </div>
            </Card>

            <Card
                glass
                className="absolute -right-4 bottom-6 hidden w-40 animate-float-slower p-3.5 sm:block lg:-right-8"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                        <Wand2 size={14} />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">Verified 98% accurate</p>
                </div>
            </Card>
        </div>
    );
}

export default function Hero() {
    return (
        <section id="home" className="relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,#eef2ff_0%,rgba(255,255,255,0)_70%)]" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-32">
                <div className="animate-fade-up">
                    <Eyebrow>
                        <Sparkles size={12} /> Your notes, made intelligent
                    </Eyebrow>

                    <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Turn any lecture into a{" "}
                        <span className="shimmer-text">study session</span> in seconds
                    </h1>

                    <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-slate-600">
                        Genie reads your notes, slides, and textbooks, then conjures summaries, quizzes, and
                        exam-ready cheat sheets — so you spend your time learning, not organizing.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Button as={Link} to="/workspace" variant="primary" size="lg">
                            <Upload size={17} />
                            Upload Your Notes
                        </Button>
                        <Button variant="outline" size="lg" as="a" href="#how-it-works">
                            See how it works
                            <ArrowRight size={16} />
                        </Button>
                    </div>

                    <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex -space-x-2">
                            {["bg-indigo-400", "bg-purple-400", "bg-fuchsia-400", "bg-violet-400"].map((c, i) => (
                                <span key={i} className={cn("h-8 w-8 rounded-full border-2 border-white", c)} />
                            ))}
                        </div>
                        <p>
                            <span className="font-semibold text-slate-800">40,000+</span> students already studying smarter
                        </p>
                    </div>
                </div>

                <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
                    <DashboardPreview />
                </div>
            </div>
        </section>
    );
}