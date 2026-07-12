import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History as HistoryIcon, Sparkles, Loader2 } from "lucide-react";
import Sidebar from "../../components/workspace/Sidebar";
import WorkspaceTopbar from "../../components/workspace/WorkspaceTopbar";
import Card from "../../components/ui/Card";
import HistoryCard from "../../components/history/HistoryCard";
import GlobalStyles from "../../styles/GlobalStyles";
import { listWorkspaces } from "../../services/workspaceApi";

export default function HistoryPage() {
    const navigate = useNavigate();
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        document.title = "History — Genie";

        let cancelled = false;

        async function fetchWorkspaces() {
            setIsLoading(true);
            setErrorMessage("");
            try {
                const data = await listWorkspaces();
                if (!cancelled) setWorkspaces(data);
            } catch (error) {
                if (!cancelled) setErrorMessage(error.message || "Failed to load history.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchWorkspaces();
        return () => {
            cancelled = true;
        };
    }, []);

    const handleOpenWorkspace = (id) => {
        navigate(`/workspace/${id}`);
    };

    return (
        <div className="min-h-screen bg-white font-body antialiased">
            <GlobalStyles />

            <div className="flex min-h-screen flex-col lg:flex-row">
                <Sidebar />

                <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <WorkspaceTopbar />

                    <div className="mx-auto flex max-w-3xl flex-col gap-6 pt-6">
                        <div>
                            <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                History
                            </h1>
                            <p className="mt-1.5 text-sm text-slate-600 sm:text-base">
                                Every workspace you've generated results in, saved automatically.
                            </p>
                        </div>

                        <Card className="p-6">
                            {isLoading && (
                                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                                    <Loader2 size={22} className="animate-spin text-indigo-500" />
                                    <p className="text-sm text-slate-500">Loading your workspaces…</p>
                                </div>
                            )}

                            {!isLoading && errorMessage && (
                                <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                                    {errorMessage}
                                </div>
                            )}

                            {!isLoading && !errorMessage && workspaces.length === 0 && (
                                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                                        <HistoryIcon size={20} />
                                    </div>
                                    <p className="max-w-xs text-sm text-slate-500">
                                        Nothing here yet. Generate a summary, quiz, cheat sheet, or verification to see it appear
                                        here.
                                    </p>
                                </div>
                            )}

                            {!isLoading && !errorMessage && workspaces.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    {workspaces.map((workspace) => (
                                        <HistoryCard
                                            key={workspace._id}
                                            workspace={workspace}
                                            onClick={() => handleOpenWorkspace(workspace._id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </Card>

                        {!isLoading && !errorMessage && workspaces.length > 0 && (
                            <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                                <Sparkles size={12} />
                                Click any workspace to restore its notes, results, and chat history.
                            </p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}