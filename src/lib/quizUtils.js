export function getGrade(percentage) {
    if (percentage >= 90) return "A";
    if (percentage >= 75) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 40) return "D";
    return "F";
}

export function getGradeStyles(grade) {
    const map = {
        A: "text-emerald-600 bg-emerald-50 border-emerald-200",
        B: "text-indigo-600 bg-indigo-50 border-indigo-200",
        C: "text-amber-600 bg-amber-50 border-amber-200",
        D: "text-orange-600 bg-orange-50 border-orange-200",
        F: "text-rose-600 bg-rose-50 border-rose-200",
    };
    return map[grade] || map.F;
}

export function formatDuration(totalSeconds) {
    const safeSeconds = Number.isFinite(totalSeconds) ? Math.max(0, totalSeconds) : 0;
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
}