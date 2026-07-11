import React from "react";

export default function WorkspaceHeader() {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Welcome back! 👋
                </h1>
                <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
                    Upload your notes and let Genie summarize, quiz, and verify them for you.
                </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 font-display text-sm font-semibold text-white shadow-md shadow-indigo-500/25">
                AS
            </div>
        </div>
    );
}