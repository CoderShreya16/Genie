import React, { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Card from "../../ui/Card";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import ChatSuggestions from "./ChatSuggestions";
import ChatInput from "./ChatInput";
import { sendChatMessage } from "../../../services/chatApi";

export default function ChatPanel({ onExchangeComplete, initialMessages = [] }) {
    const [messages, setMessages] = useState(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const scrollAnchorRef = useRef(null);

    // If a different workspace's history arrives after mount (e.g. navigating
    // from one restored workspace straight to another), sync it in.
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isSending]);

    const handleSend = async () => {
        const trimmed = inputValue.trim();
        if (!trimmed || isSending) return;

        const conversationHistory = messages.map(({ role, content }) => ({ role, content }));
        const userMessage = { role: "user", content: trimmed };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setErrorMessage("");
        setIsSending(true);

        try {
            const reply = await sendChatMessage(trimmed, conversationHistory);
            const assistantMessage = { role: "assistant", content: reply };
            setMessages((prev) => [...prev, assistantMessage]);

            if (onExchangeComplete) {
                onExchangeComplete([userMessage, assistantMessage]);
            }
        } catch (error) {
            console.error("[ChatPanel] Chat request failed:", error);
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    const handleSuggestionSelect = (suggestion) => {
        setInputValue(suggestion);
    };

    return (
        <Card className="flex h-[600px] flex-col p-6">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    <Sparkles size={16} />
                </div>
                <h2 className="font-display text-lg font-semibold text-slate-900">Ask Genie</h2>
            </div>

            <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                {messages.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                            <Sparkles size={20} />
                        </div>
                        <p className="max-w-xs text-sm text-slate-500">
                            Ask me to explain a concept, quiz you, or help you plan your revision.
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <ChatMessage key={index} role={message.role} content={message.content} />
                    ))
                )}

                {isSending && <TypingIndicator />}
                <div ref={scrollAnchorRef} />
            </div>

            {errorMessage && (
                <div className="mt-3 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                    {errorMessage}
                </div>
            )}

            <div className="mt-4 flex flex-col gap-3">
                <ChatSuggestions onSelect={handleSuggestionSelect} disabled={isSending} />
                <ChatInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSend={handleSend}
                    disabled={isSending}
                />
            </div>
        </Card>
    );
}