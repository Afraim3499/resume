"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface DayPickerProps {
    startDay: number;
    endDay: number | undefined;
    onChange: (start: number, end: number | undefined) => void;
    className?: string;
}

export function DayPicker({ startDay, endDay, onChange, className }: DayPickerProps) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleDayClick = (day: number) => {
        // Case 1: No dates set yet (init state usually has at least start)
        // Case 2: Only start is set
        // Case 3: Both are set (resetting logic)

        if (!endDay) {
            if (day === startDay) {
                // Deselect if clicking the same day? No, usually expect a range or single day.
                // Let's treat it as "setting the end day to the same day" (single day event)
                onChange(startDay, day);
            } else if (day < startDay) {
                // If clicked day is BEFORE start, swap them
                onChange(day, startDay);
            } else {
                // If clicked day is AFTER start, set it as end
                onChange(startDay, day);
            }
        } else {
            // Both are set.
            // If clicking inside the range, maybe edit? 
            // Standard UI: clicking when a range exists starts a NEW selection.
            onChange(day, undefined);
        }
    };

    return (
        <div className={cn("p-4 bg-white border border-gray-100 rounded-2xl shadow-sm", className)}>
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Pick Dates</span>
                <span className="text-xs font-medium text-black bg-gray-100 px-2 py-1 rounded-full">
                    {endDay
                        ? `${startDay} - ${endDay}${getOrdinal(endDay)}`
                        : `${startDay}${getOrdinal(startDay)} selected`
                    }
                </span>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    const isSelected = day === startDay || day === endDay;
                    const isRange = endDay && day > startDay && day < endDay;
                    const isStart = day === startDay;
                    const isEnd = day === endDay;
                    const isCurrentSelectionPhase = !endDay && day === startDay;

                    return (
                        <button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            aria-label={`Select Date ${day}`}
                            className={cn(
                                "h-8 w-8 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center relative",
                                isSelected
                                    ? "bg-black text-white shadow-md scale-105 z-10"
                                    : "bg-transparent text-gray-600 hover:bg-gray-100",
                                isRange && "bg-gray-100 text-black rounded-none mx-[-4px] w-[calc(100%+8px)] z-0",
                                // Connectors for visual range
                                isStart && endDay && "after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-[-4px] after:w-4 after:bg-gray-100 after:z-[-1] rounded-r-none",
                                isEnd && "before:content-[''] before:absolute before:top-0 before:bottom-0 before:left-[-4px] before:w-4 before:bg-gray-100 before:z-[-1] rounded-l-none",
                                // Special single day selection styling
                                isCurrentSelectionPhase && "ring-2 ring-gray-200 ring-offset-2"
                            )}
                        >
                            <span className="relative z-10">{day}</span>
                        </button>
                    );
                })}
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">
                Click a day to start. Click another to end range.
            </p>
        </div>
    );
}

function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}
