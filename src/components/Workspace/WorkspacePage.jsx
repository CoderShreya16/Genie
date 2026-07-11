import React, { useState, useEffect } from "react";
import Sidebar from "../../components/workspace/Sidebar";
import WorkspaceTopbar from "../../components/workspace/WorkspaceTopbar";
import WorkspaceHeader from "../../components/workspace/WorkspaceHeader";
import UploadSection from "../../components/workspace/UploadSection";
import AiActions from "../../components/workspace/AiActions";
import OutputPanel from "../../components/workspace/OutputPanel";
import QuizFlow from "../../components/workspace/quiz/QuizFlow";
import RecentActivity from "../../components/workspace/RecentActivity";
import GlobalStyles from "../../styles/GlobalStyles";
import { PLACEHOLDER_OUTPUTS } from "../../data/workspaceActions";
import { summarizeNotes } from "../../services/summarizeApi";
import { generateQuiz } from "../../services/quizApi";

export default function WorkspacePage() {
    const [selectedAction, setSelectedAction] = useState(null);
    const [notesText, setNotesText] = useState("");
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [outputText, setOutputText] = useState("");
    const [quizData, setQuizData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        document.title = "AI Workspace — Genie";
    }, []);

    const handleGenerate = async () => {
        if (!selectedAction || isGenerating) return;

        setIsGenerating(true);
        setOutputText("");
        setQuizData(null);
        setErrorMessage("");

        if (!notesText.trim() && (selectedAction === "summarize" || selectedAction === "quiz")) {
            setErrorMessage("Please paste some notes before generating.");
            setIsGenerating(false);
            return;
        }

        try {
            if (selectedAction === "summarize") {
                const summary = await summarizeNotes(notesText.trim());
                setOutputText(summary);
            } else if (selectedAction === "quiz") {
                const quiz = await generateQuiz(notesText.trim());
                setQuizData(quiz);
            } else {
                // Cheat Notes / Verify Notes don't have backend routes yet —
                // fall back to placeholder text.
                await new Promise((resolve) => setTimeout(resolve, 1200));
                setOutputText(PLACEHOLDER_OUTPUTS[selectedAction]);
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
    };

    return (
        <div className="min-h-screen bg-white font-body antialiased">
            <GlobalStyles />

            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar />

                <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <WorkspaceTopbar />

                    <div className="mx-auto flex max-w-5xl flex-col gap-6 pt-6">
                        <WorkspaceHeader />

                        <UploadSection
                            notesText={notesText}
                            onNotesChange={setNotesText}
                            uploadedFileName={uploadedFileName}
                            onFileSelect={setUploadedFileName}
                        />

                        <AiActions
                            selectedAction={selectedAction}
                            onSelectAction={setSelectedAction}
                            onGenerate={handleGenerate}
                            isGenerating={isGenerating}
                        />

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
                            <OutputPanel outputText={outputText} />
                        )}

                        <RecentActivity />
                    </div>
                </main>
            </div>
        </div>
    );
}