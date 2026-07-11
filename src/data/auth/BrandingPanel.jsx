import React from "react";
import { Sparkles, ClipboardCheck, Wand2 } from "lucide-react";
import Card from "../../components/ui/Card";

/**
 * Left-side branding panel shared by auth pages (Login, Register, etc).
 * Reuses the same gradient + glass + floating-card language as the
 * landing page's hero and CTA band, so auth pages feel like part of
 * the same product.
 */
export default function BrandingPanel() {
    return (
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
            <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" />
            <div
                className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob"
                style={{ animationDelay: "2s" }}
            />

            <a href="/" className="relative flex items-center gap-2 font-display text-xl font-bold text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                    <Sparkles size={18} />
                </span>
                Genie
            </a>

            <div className="relative animate-fade-up">
                <h2 className="max-w-sm font-display text-3xl font-bold leading-tight text-white">
                    Your notes, made intelligent.
                </h2>
                <p className="mt-4 max-w-sm text-indigo-100">
                    Summaries, quizzes, and exam-ready cheat sheets — conjured from whatever you're studying,
                    in seconds.
                </p>

                <div className="mt-8 flex items-center gap-6 text-sm text-indigo-100">
                    <div className="flex -space-x-2">
                        {["bg-indigo-300", "bg-purple-300", "bg-fuchsia-300", "bg-violet-300"].map((c, i) => (
                            <span key={i} className={`h-8 w-8 rounded-full border-2 border-white/40 ${c}`} />
                        ))}
                    </div>
                    <p>
                        <span className="font-semibold text-white">40,000+</span> students studying smarter
                    </p>
                </div>
            </div>

            <Card
                glass
                className="relative w-56 border-white/30 bg-white/10 p-3.5 backdrop-blur-xl animate-float-slow"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white">
                        <ClipboardCheck size={14} />
                    </div>
                    <p className="text-xs font-semibold text-white">Cheat sheet ready</p>
                </div>
            </Card>

            <Card
                glass
                className="absolute bottom-24 right-10 hidden w-44 border-white/30 bg-white/10 p-3.5 backdrop-blur-xl animate-float-slower xl:block"
            >
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white">
                        <Wand2 size={14} />
                    </div>
                    <p className="text-xs font-semibold text-white">Verified 98% accurate</p>
                </div>
            </Card>
        </div>
    );
}