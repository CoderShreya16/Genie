import React, { useRef, useState } from "react";
import { FileType, FileUp, ClipboardPaste, UploadCloud } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";

export default function UploadSection({ notesText, onNotesChange, uploadedFileName, onFileSelect }) {
    const [showPasteArea, setShowPasteArea] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const pdfInputRef = useRef(null);
    const docxInputRef = useRef(null);

    const handleFiles = (files) => {
        if (files && files.length > 0) {
            onFileSelect(files[0].name);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-slate-900">Upload your material</h2>

                <div className="flex flex-wrap gap-2.5">
                    <Button variant="outline" size="sm" onClick={() => pdfInputRef.current?.click()}>
                        <FileType size={16} />
                        Upload PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => docxInputRef.current?.click()}>
                        <FileUp size={16} />
                        Upload DOCX
                    </Button>
                    <Button variant="subtle" size="sm" onClick={() => setShowPasteArea((v) => !v)}>
                        <ClipboardPaste size={16} />
                        Paste Notes
                    </Button>
                </div>

                <input
                    ref={pdfInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
                <input
                    ref={docxInputRef}
                    type="file"
                    accept=".doc,.docx"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Drag & drop zone */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`mt-5 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors ${isDragging ? "border-indigo-400 bg-indigo-50/70" : "border-slate-200 bg-slate-50/60"
                    }`}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25">
                    <UploadCloud size={22} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-700">
                        Drag & drop a PDF or DOCX here, or use the buttons above
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Supports PDF and DOCX up to 20MB</p>
                </div>
                {uploadedFileName && (
                    <span className="mt-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                        {uploadedFileName} attached
                    </span>
                )}
            </div>

            {/* Paste notes area */}
            {showPasteArea && (
                <div className="mt-5 animate-fade-up">
                    <Textarea
                        id="paste-notes"
                        label="Paste your notes"
                        placeholder="Paste or type your notes here…"
                        value={notesText}
                        onChange={(e) => onNotesChange(e.target.value)}
                        rows={6}
                    />
                </div>
            )}
        </Card>
    );
}