import React from "react";
import { Sparkles, FileText } from "lucide-react";

const FOOTER_COLUMNS = [
    {
        title: "Product",
        links: ["Features", "How it works", "Pricing", "Changelog"],
    },
    {
        title: "Company",
        links: ["About", "Careers", "Blog", "Contact"],
    },
    {
        title: "Resources",
        links: ["Help center", "Study guides", "API docs", "Status"],
    },
    {
        title: "Legal",
        links: ["Privacy policy", "Terms of service", "Academic integrity"],
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-slate-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
                <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
                    <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                        <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold text-slate-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                                <Sparkles size={15} />
                            </span>
                            Genie
                        </a>
                        <p className="mt-4 max-w-[220px] text-sm leading-relaxed text-slate-500">
                            AI that turns your notes into study sessions you'll actually finish.
                        </p>
                    </div>

                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                {col.title}
                            </p>
                            <ul className="mt-4 space-y-2.5">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-slate-600 hover:text-indigo-600">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
                    <p className="text-xs text-slate-400">© {new Date().getFullYear()} Genie Labs, Inc. All rights reserved.</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <FileText size={13} />
                        Made for students who'd rather study than organize.
                    </div>
                </div>
            </div>
        </footer>
    );
}