"use client";

import { useMemo } from "react";
import { IncomeSource } from "@/types/budget";
import { cn } from "@/lib/utils";

interface IncomeTimelineProps {
    incomes: IncomeSource[];
    className?: string;
}

export function IncomeTimeline({ incomes, className }: IncomeTimelineProps) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Map days to income sources
    const incomeMap = useMemo(() => {
        const map: Record<number, IncomeSource[]> = {};
        incomes.forEach(inc => {
            const start = inc.expectedDateRange.start;
            const end = inc.expectedDateRange.end || start;
            for (let d = start; d <= end; d++) {
                if (!map[d]) map[d] = [];
                map[d].push(inc);
            }
        });
        return map;
    }, [incomes]);

    return (
        <div className={cn("w-full overflow-x-auto pb-4", className)}>
            <div className="min-w-[600px] select-none">
                {/* Month Indicators */}
                <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
                    <span>Start</span>
                    <span>Mid-Month</span>
                    <span>End</span>
                </div>

                {/* Timeline Track */}
                <div className="relative h-12 bg-gray-50 rounded-full border border-gray-200 flex items-center px-1">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
                        {[1, 5, 10, 15, 20, 25, 30].map(d => (
                            <div key={d} className="h-full w-[1px] bg-gray-200/50" />
                        ))}
                    </div>

                    {days.map((day) => {
                        const hasIncome = incomeMap[day]?.length > 0;
                        const isStart = hasIncome && !incomeMap[day - 1]?.some(i => incomeMap[day].includes(i));
                        const isEnd = hasIncome && !incomeMap[day + 1]?.some(i => incomeMap[day].includes(i));

                        return (
                            <div
                                key={day}
                                className="flex-1 h-8 flex items-center justify-center relative group"
                            >
                                {/* Day Number (only show for some or on hover) */}
                                <span className={cn(
                                    "absolute -bottom-6 text-[10px] font-medium text-gray-300 transition-colors",
                                    (day === 1 || day % 5 === 0) ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                                    hasIncome && "text-black font-bold"
                                )}>
                                    {day}
                                </span>

                                {/* Income Pill */}
                                {hasIncome && (
                                    <div className={cn(
                                        "h-full w-full bg-black transition-all hover:bg-gray-800 relative z-10",
                                        isStart && "rounded-l-full ml-0.5",
                                        isEnd && "rounded-r-full mr-0.5",
                                        !isStart && !isEnd && "mx-[-1px] w-[calc(100%+2px)]"
                                    )}>
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 w-max">
                                            <div className="bg-black text-white text-xs py-1 px-2 rounded-lg shadow-xl">
                                                {incomeMap[day].map(i => <div key={i.id}>{i.name}</div>)}
                                            </div>
                                            {/* Arrow */}
                                            <div className="w-2 h-2 bg-black rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Empty Slot Hover Effect */}
                                {!hasIncome && (
                                    <div className="w-1 h-1 rounded-full bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
