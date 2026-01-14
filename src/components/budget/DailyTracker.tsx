"use client";

import { useState } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { BudgetInput } from "./BudgetInput";

interface DailyTrackerProps {
    currentBalance: number;
    lastUpdated: Date | null;
    onUpdate: (amount: number) => void;
}

export function DailyTracker({ currentBalance, lastUpdated, onUpdate }: DailyTrackerProps) {
    const [balance, setBalance] = useState(currentBalance);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = () => {
        setIsUpdating(true);
        // Simulate a small delay for "Processing" feel
        setTimeout(() => {
            onUpdate(balance);
            setIsUpdating(false);
        }, 600);
    };

    return (
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
                    <div>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                            Daily Wallet Check-in
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500">
                            Update your actual balance for precise guidance.
                        </p>
                    </div>
                    {lastUpdated && (
                        <div className="self-start text-[10px] bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Active today
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 md:gap-4">
                    <div className="flex-1">
                        <BudgetInput
                            label="Current Cash & Bank Balance"
                            value={balance}
                            onChange={setBalance}
                            className="w-full"
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="h-14 sm:h-[88px] w-full sm:w-20 bg-black text-white rounded-xl sm:rounded-2xl flex flex-row sm:flex-col items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-70 active:scale-95"
                    >
                        <RefreshCw className={`w-5 h-5 md:w-6 md:h-6 ${isUpdating ? 'animate-spin' : ''}`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                            {isUpdating ? "..." : "Sync"}
                        </span>
                    </button>
                </div>

                {lastUpdated && (
                    <p className="text-[10px] md:text-xs text-gray-300 mt-4 text-center font-medium">
                        Last synced: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                )}
            </div>
        </div>
    );
}
