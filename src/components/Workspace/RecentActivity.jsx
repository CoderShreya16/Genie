import React from "react";
import { ChevronRight } from "lucide-react";
import Card from "../ui/Card";
import { RECENT_ACTIVITY } from "../../data/recentActivity";

export default function RecentActivity() {
    return (
        <Card className="p-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">Recent activity</h2>

            <div className="mt-4 flex flex-col gap-2.5">
                {RECENT_ACTIVITY.map((item) => (
                    <a
                        key={item.id}
                        href="#"
                        className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 transition-colors hover:border-indigo-100 hover:bg-indigo-50/50"
                    >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
              <item.icon size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">{item.title}</p>
              <p className="truncate text-xs text-slate-500">{item.meta}</p>
            </div>
            <ChevronRight size={16} className="shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500" />
          </a>
        ))}
        </div>
    </Card >
  );
}