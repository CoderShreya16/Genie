import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/workspace/Sidebar";
import WorkspaceTopbar from "../../components/workspace/WorkspaceTopbar";
import WorkspaceHeader from "../../components/workspace/WorkspaceHeader";
import WorkspaceTabs from "../../components/workspace/WorkspaceTabs";
import UploadSection from "../../components/workspace/UploadSection";
import AiActions from "../../components/workspace/AiActions";
import OutputPanel from "../../components/workspace/OutputPanel";
import QuizFlow from "../../components/workspace/quiz/QuizFlow";
import RecentActivity from "../../components/workspace/RecentActivity";
import ChatPanel from "../../components/workspace/chat/ChatPanel";
import GlobalStyles from "../../styles/GlobalStyles";
import { summarizeNotes } from "../../services/summarizeApi";
import { generateQuiz } from "../../services/quizApi";
import { generateCheatNotes } from "../../services/cheatNotesApi";
import { verifyNotes } from "../../services/verifyApi";
import {
    createWorkspace,
    getWorkspace,
    saveSummary,
    saveQuiz,
    saveCheatNotes,
    saveVerifyNotes,
    appendChatMessages,
} from "../../services/workspaceApi";

const ACTION_ORDER = ["summarize", "quiz", "cheatsheet", "verify"];

export default function WorkspacePage() {
    const { id: routeWorkspaceId } = useParams();

    const [activeTab, setActiveTab] = useState("workspace");
    const [selectedAction, setSelectedAction] = useState(null);
    const [notesText, setNotesText] = useState("");
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [outputText, setOutputText] = useState("");
    const [quizData, setQuizData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [workspaceId, setWorkspaceId] = useState(null);
    const [restoredOutputs, setRestoredOutputs] = useState({});
    const [restoredChatMessages, setRestoredChatMessages] = useState([]);
    const [isRestoring, setIsRestoring] = useState(Boolean(routeWorkspaceId));

    useEffect(() => {
        document.title = "AI Workspace — Genie";
    }, []);

    // Restore a saved workspace when navigated here with an id (e.g. from
    // the History page). Populates notes, whichever AI output was saved
    // first in the card order, and prior chat history.
    useEffect(() => {
        if (!routeWorkspaceId) {
            setIsRestoring(false);
            return;
        }

        let cancelled = false;

        async function restoreWorkspace() {
            setIsRestoring(true);
            setErrorMessage("");
            try {
                const workspace = await getWorkspace(routeWorkspaceId);
                if (cancelled) return;

                setWorkspaceId(workspace._id);
                setNotesText(workspace.uploadedText || "");

                const outputs = {
                    summarize: workspace.summary || null,
                    quiz: Array.isArray(workspace.quiz) && workspace.quiz.length > 0 ? workspace.quiz : null,
                    cheatsheet: workspace.cheatNotes || null,
                    verify: workspace.verifyNotes || null,
                };
                setRestoredOutputs(outputs);

                const firstAvailable = ACTION_ORDER.find((action) => outputs[action]);
                if (firstAvailable) {
                    setSelectedAction(firstAvailable);
                    if (firstAvailable === "quiz") {
                        setQuizData(outputs.quiz);
                    } else {
                        setOutputText(outputs[firstAvailable]);
                    }
                }

                const chatMessages = (workspace.chatHistory || []).map((m) => ({
                    role: m.role,
                    content: m.content,
                }));
                setRestoredChatMessages(chatMessages);
            } catch (error) {
                if (!cancelled) {
                    console.error("[WorkspacePage] Failed to restore workspace:", error);
                    setErrorMessage(error.message || "Failed to load this workspace.");
                }
            } finally {
                if (!cancelled) setIsRestoring(false);
            }
        }

        restoreWorkspace();
        return () => {
            cancelled = true;
        };
    }, [routeWorkspaceId]);

    const ensureWorkspaceId = useCallback(async () => {
        if (workspaceId) return workspaceId;
        const workspace = await createWorkspace({ uploadedText: notesText.trim() });
        setWorkspaceId(workspace._id);
        return workspace._id;
    }, [workspaceId, notesText]);

    const handleSelectAction = (actionId) => {
        setSelectedAction(actionId);
        setErrorMessage("");

        // If this workspace already has a saved result for the action just
        // selected, show it immediately instead of requiring another Generate.
        if (actionId === "quiz" && restoredOutputs.quiz) {
            setQuizData(restoredOutputs.quiz);
            setOutputText("");
        } else if (actionId !== "quiz" && restoredOutputs[actionId]) {
            setOutputText(restoredOutputs[actionId]);
            setQuizData(null);
        } else {
            setOutputText("");
            setQuizData(null);
        }
    };

    const handleGenerate = async () => {
        if (!selectedAction || isGenerating) return;

        setIsGenerating(true);
        setOutputText("");
        setQuizData(null);
        setErrorMessage("");

        if (!notesText.trim()) {
            setErrorMessage("Please paste some notes before generating.");
            setIsGenerating(false);
            return;
        }

        try {
            if (selectedAction === "summarize") {
                const summary = await summarizeNotes(notesText.trim());
                setOutputText(summary);
                setRestoredOutputs((prev) => ({ ...prev, summarize: summary }));
                const id = await ensureWorkspaceId();
                saveSummary(id, summary).catch((e) =>
                    console.error("[Workspace] Failed to save summary:", e)
                );
            } else if (selectedAction === "quiz") {
                const quiz = await generateQuiz(notesText.trim());
                setQuizData(quiz);
                setRestoredOutputs((prev) => ({ ...prev, quiz }));
                const id = await ensureWorkspaceId();
                saveQuiz(id, quiz).catch((e) => console.error("[Workspace] Failed to save quiz:", e));
            } else if (selectedAction === "cheatsheet") {
                const cheatNotes = await generateCheatNotes(notesText.trim());
                setOutputText(cheatNotes);
                setRestoredOutputs((prev) => ({ ...prev, cheatsheet: cheatNotes }));
                const id = await ensureWorkspaceId();
                saveCheatNotes(id, cheatNotes).catch((e) =>
                    console.error("[Workspace] Failed to save cheat notes:", e)
                );
            } else if (selectedAction === "verify") {
                const report = await verifyNotes(notesText.trim());
                setOutputText(report);
                setRestoredOutputs((prev) => ({ ...prev, verify: report }));
                const id = await ensureWorkspaceId();
                saveVerifyNotes(id, report).catch((e) =>
                    console.error("[Workspace] Failed to save verify notes:", e)
                );
            }
        } catch (error) {
            console.error(`[WorkspacePage] ${selectedAction} request failed:`, error);
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleBackToWorkspace = () => {
        setQuizData(null);
        setSelectedAction(null);
        setOutputText("");
        setErrorMessage("");
    };

    const handleQuizRegenerated = (newQuiz) => {
        setQuizData(newQuiz);
        setRestoredOutputs((prev) => ({ ...prev, quiz: newQuiz }));
        if (workspaceId) {
            saveQuiz(workspaceId, newQuiz).catch((e) =>
                console.error("[Workspace] Failed to save regenerated quiz:", e)
            );
        }
    };

    const handleChatExchange = async (messages) => {
        try {
            const id = await ensureWorkspaceId();
            await appendChatMessages(id, messages);
        } catch (error) {
            console.error("[Workspace] Failed to save chat messages:", error);
        }
    };

    const rendersMarkdown = selectedAction === "cheatsheet" || selectedAction === "verify";

    return (
        <div className="min-h-screen bg-white font-body antialiased">
            <GlobalStyles />

            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar />

                <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <WorkspaceTopbar />

                    <div className="mx-auto flex max-w-5xl flex-col gap-6 pt-6">
                        <WorkspaceHeader />

                        <WorkspaceTabs activeTab={activeTab} onChange={setActiveTab} />

                        {activeTab === "workspace" ? (
                            <>
                                <UploadSection
                                    notesText={notesText}
                                    onNotesChange={setNotesText}
                                    uploadedFileName={uploadedFileName}
                                    onFileSelect={setUploadedFileName}
                                />

                                <AiActions
                                    selectedAction={selectedAction}
                                    onSelectAction={handleSelectAction}
                                    onGenerate={handleGenerate}
                                    isGenerating={isGenerating}
                                />

                                {isRestoring && (
                                    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-600">
                                        Restoring this workspace…
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                                        {errorMessage}
                                    </div>
                                )}

                                {quizData ? (
                                    <QuizFlow
                                        quiz={quizData}
                                        notes={notesText.trim()}
                                        onBackToWorkspace={handleBackToWorkspace}
                                        onQuizRegenerated={handleQuizRegenerated}
                                    />
                                ) : (
                                    <OutputPanel outputText={outputText} renderMarkdown={rendersMarkdown} />
                                )}

                                <RecentActivity />
                            </>
                        ) : (
                            <ChatPanel onExchangeComplete={handleChatExchange} initialMessages={restoredChatMessages} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}