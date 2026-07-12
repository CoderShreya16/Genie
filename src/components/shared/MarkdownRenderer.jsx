import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

/**
 * Reusable Markdown renderer for AI responses across the app —
 * Cheat Notes today, with Chat/Summary/Verify Notes intended to adopt
 * it next. Every element is styled to match Genie's existing design
 * language (indigo/purple accents, rounded corners, Space Grotesk
 * headings) rather than relying on a generic "prose" stylesheet.
 */
export default function MarkdownRenderer({ content, className = "" }) {
    return (
        <div className={`markdown-body text-sm leading-relaxed text-slate-700 ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="font-display mb-4 text-2xl font-bold tracking-tight text-slate-900">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="font-display mb-3 mt-6 flex items-center gap-2 text-lg font-semibold text-slate-900 first:mt-0">
                            <span className="h-4 w-1 rounded-full bg-gradient-to-b from-indigo-600 to-purple-600" />
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="font-display mb-2 mt-4 text-base font-semibold text-slate-800">{children}</h3>
                    ),
                    p: ({ children }) => <p className="mb-3 leading-relaxed last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                    em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
                    ul: ({ children }) => <ul className="mb-3 ml-1 flex flex-col gap-1.5">{children}</ul>,
                    ol: ({ children }) => (
                        <ol className="mb-3 ml-1 flex list-decimal flex-col gap-1.5 pl-4 marker:font-semibold marker:text-indigo-600">
                            {children}
                        </ol>
                    ),
                    li: ({ children, ordered }) =>
                        ordered ? (
                            <li className="pl-1 leading-relaxed">{children}</li>
                        ) : (
                            <li className="flex items-start gap-2 leading-relaxed">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600" />
                                <span>{children}</span>
                            </li>
                        ),
                    blockquote: ({ children }) => (
                        <blockquote className="mb-3 rounded-r-xl border-l-4 border-indigo-300 bg-indigo-50/60 px-4 py-2.5 italic text-slate-600">
                            {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <div className="mb-4 overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="w-full border-collapse text-left text-sm">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">{children}</thead>
                    ),
                    th: ({ children }) => (
                        <th className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="border-b border-slate-50 px-4 py-2.5 align-top text-slate-600">{children}</td>
                    ),
                    code: ({ inline, className: codeClassName, children }) =>
                        inline ? (
                            <code className="rounded-md bg-indigo-50 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-700">
                                {children}
                            </code>
                        ) : (
                            <code className={codeClassName}>{children}</code>
                        ),
                    pre: ({ children }) => (
                        <pre className="mb-3 overflow-x-auto rounded-2xl bg-slate-900 p-4 text-xs leading-relaxed">
                            {children}
                        </pre>
                    ),
                    hr: () => <hr className="my-5 border-slate-100" />,
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-2 hover:text-indigo-700"
                        >
                            {children}
                        </a>
                    ),
                }}
            >
                {content}
            </ReactMarkdown >
        </div >
    );
}