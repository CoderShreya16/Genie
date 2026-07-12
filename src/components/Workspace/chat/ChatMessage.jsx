import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../../../lib/utils";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function ChatMessage({ role, content }) {
    const isUser = role === "user";

    return (
        <div
            className={cn(
                "flex items-end gap-2.5",
                isUser ? "flex-row-reverse" : "flex-row"
            )}
        >
            <div
                className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    isUser
                        ? "bg-slate-200 text-slate-600"
                        : "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                )}
            >
                {isUser ? "You" : <Sparkles size={14} />}
            </div>

            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%]",
                    isUser
                        ? "rounded-br-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm"
                )}
            >
                <div className="overflow-x-auto">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        className="genie-markdown"
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}