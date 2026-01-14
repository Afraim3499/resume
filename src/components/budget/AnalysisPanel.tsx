"use client";

import { TrendingUp, AlertTriangle, Calendar, Wallet, PieChart } from "lucide-react";
import { useMemo } from "react";
import { IncomeSource, ExpenseItem } from "@/types/budget";

interface AnalysisPanelProps {
    incomes: IncomeSource[];
    expenses: ExpenseItem[];
    investmentTarget: number;
    currentBalance?: number;
    lastBalanceUpdate?: Date | null;
}

export function AnalysisPanel({
    incomes,
    expenses,
    investmentTarget,
    currentBalance,
    lastBalanceUpdate
}: AnalysisPanelProps) {
    // 1. Calculate General Monthly Stats
    const totalIncome = useMemo(() => incomes.reduce((acc, curr) => acc + curr.amount, 0), [incomes]);
    const totalExpenses = useMemo(() => expenses.reduce((acc, curr) => acc + curr.amount, 0), [expenses]);

    const fixedExpenses = expenses.filter(e => e.isFixed).reduce((acc, curr) => acc + curr.amount, 0);
    const variableExpenses = expenses.filter(e => !e.isFixed).reduce((acc, curr) => acc + curr.amount, 0);

    const projectedSurplus = totalIncome - totalExpenses;
    const isInvestmentAtRisk = (projectedSurplus < investmentTarget);

    // 2. Logic for "Next Payday"
    const nextPaydayData = useMemo(() => {
        const today = new Date();
        const currentDay = today.getDate();

        // Sort incomes by start date
        const sortedIncomes = [...incomes].sort((a, b) => a.expectedDateRange.start - b.expectedDateRange.start);

        // Find next income this month
        let nextIncome = sortedIncomes.find(i => i.expectedDateRange.start > currentDay);
        let daysUntil = 0;

        if (nextIncome) {
            daysUntil = nextIncome.expectedDateRange.start - currentDay;
        } else {
            // Next month
            const firstNextMonth = sortedIncomes[0];
            if (firstNextMonth) {
                const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
                daysUntil = (daysInMonth - currentDay) + firstNextMonth.expectedDateRange.start;
                nextIncome = firstNextMonth;
            } else {
                daysUntil = 30; // Fallback
            }
        }
        return { daysUntil, nextSource: nextIncome };
    }, [incomes]);

    // 3. Smart Daily Limit Calculation
    const guidance = useMemo(() => {
        const days = Math.max(1, nextPaydayData.daysUntil);

        // Scenario A: User HAS provided a real-time balance
        if (currentBalance !== undefined) {
            const value = currentBalance / days;
            return {
                dailyLimit: Math.floor(value),
                source: "Real"
            };
        }

        // Scenario B: Theoretical
        const disposable = totalIncome - fixedExpenses - investmentTarget;
        const daily = (disposable - variableExpenses) / 30; // Rough monthly average
        return {
            dailyLimit: Math.floor(daily),
            source: "Estimated"
        };
    }, [currentBalance, nextPaydayData.daysUntil, totalIncome, fixedExpenses, investmentTarget, variableExpenses]);


    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* 1. Days Until Payday */}
                <div className="relative overflow-hidden p-6 md:p-6 rounded-2xl bg-black text-white shadow-lg group hover:-translate-y-1 transition-transform">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Calendar className="w-12 h-12 md:w-16 md:h-16 text-gray-500" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Next Influx In</p>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                            {nextPaydayData.daysUntil} <span className="text-sm md:text-base font-sans font-normal text-gray-400">Days</span>
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-medium truncate">
                            From: {nextPaydayData.nextSource?.name || "Next Cycle"}
                        </p>
                    </div>
                </div>

                {/* 2. Daily Safe Limit (The Hero Metric) */}
                <div className={`relative overflow-hidden p-6 rounded-2xl border shadow-lg group hover:-translate-y-1 transition-transform ${currentBalance !== undefined ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-white border-indigo-100'}`}>
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="w-12 h-12 md:w-16 md:h-16" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <p className={`text-[10px] font-bold uppercase tracking-widest ${currentBalance !== undefined ? 'text-indigo-200' : 'text-indigo-500'}`}>
                                Daily Safe Limit
                            </p>
                            {currentBalance !== undefined && (
                                <span className="px-2 py-0.5 rounded-full bg-indigo-500/50 text-[10px] font-bold text-white uppercase">Live</span>
                            )}
                        </div>
                        <h3 className={`text-2xl md:text-3xl font-serif font-bold ${currentBalance !== undefined ? 'text-white' : 'text-indigo-600'}`}>
                            ৳{guidance.dailyLimit.toLocaleString()}
                        </h3>
                        <p className={`text-xs mt-1 font-medium ${currentBalance !== undefined ? 'text-indigo-200' : 'text-gray-400'}`}>
                            Safe to spend today
                        </p>
                    </div>
                </div>

                {/* 3. Monthly Projection */}
                <div className="relative overflow-hidden p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group hover:-translate-y-1 transition-transform">
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Projected Surplus</p>
                        <h3 className={`text-2xl font-serif font-bold ${isInvestmentAtRisk ? 'text-orange-500' : 'text-emerald-600'}`}>
                            ৳{projectedSurplus.toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 font-medium">After all expenses</p>
                    </div>
                </div>

                {/* 4. Investment Status */}
                <div className="relative overflow-hidden p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group hover:-translate-y-1 transition-transform">
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Goal Status</p>
                        <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold font-serif ${isInvestmentAtRisk ? 'text-orange-500' : 'text-emerald-600'}`}>
                                {Math.min(100, Math.round(((projectedSurplus) / (investmentTarget || 1)) * 100))}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
                            <div className={`h-full rounded-full ${isInvestmentAtRisk ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(100, Math.max(0, ((projectedSurplus) / (investmentTarget || 1)) * 100))}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Smart Advice Section */}
            {currentBalance !== undefined && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">AI Guidance</h4>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                            You have <strong className="text-gray-900">৳{currentBalance.toLocaleString()}</strong> in hand with <strong className="text-gray-900">{nextPaydayData.daysUntil} days</strong> until your next paycheck from <span className="font-medium text-gray-800">{nextPaydayData.nextSource?.name}</span>.
                            Sticking to <strong className="text-indigo-600">৳{guidance.dailyLimit}/day</strong> ensures you won't run out of cash before then.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
