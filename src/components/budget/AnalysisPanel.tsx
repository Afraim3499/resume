"use client";

import { TrendingUp, AlertTriangle, Calendar, Wallet, PieChart, Rocket, Coins, Eye, EyeOff } from "lucide-react";
import { useMemo, useState } from "react";
import { IncomeSource, ExpenseItem, LoanEntry } from "@/types/budget";

interface AnalysisPanelProps {
    incomes: IncomeSource[];
    expenses: ExpenseItem[];
    investmentTarget: number;
    currentBalance?: number;
    loans?: LoanEntry[];
    goals?: BudgetGoal[]; // Phase 10: Goal Tracking
}

interface BudgetGoal {
    name: string;
    target_amount: number;
}

export function AnalysisPanel({
    incomes,
    expenses,
    investmentTarget,
    currentBalance,
    loans,
    goals = []
}: AnalysisPanelProps) {
    // Phase 7: Reality Toggles
    const [showRealValue, setShowRealValue] = useState(false); // Inflation View
    const [showZakat, setShowZakat] = useState(false); // Liability View
    const [showInsights, setShowInsights] = useState(false); // Progressive Disclosure

    // 1. Calculate General Monthly Stats
    const totalIncome = useMemo(() => incomes.reduce((acc, curr) => acc + curr.amount, 0), [incomes]);

    // Helper: Normalize expenses to Monthly Check
    const getMonthlyAmount = (e: ExpenseItem) => e.frequency === 'yearly' ? e.amount / 12 : e.amount;

    // Phase 9: Relational Finance
    const reimbursableExpenses = expenses.filter(e => e.isReimbursable);
    const reimbursableTotal = useMemo(() => reimbursableExpenses.reduce((acc, curr) => acc + curr.amount, 0), [reimbursableExpenses]);

    const totalExpenses = useMemo(() => expenses.filter(e => !e.isReimbursable).reduce((acc, curr) => acc + getMonthlyAmount(curr), 0), [expenses]);
    const sinkingFundsTotal = useMemo(() => expenses.filter(e => e.frequency === 'yearly' && !e.isReimbursable).reduce((acc, curr) => acc + (curr.amount / 12), 0), [expenses]); // Reimbursable sinking fund? Unlikely but safe.

    const fixedExpenses = expenses.filter(e => e.isFixed && !e.isReimbursable).reduce((acc, curr) => acc + getMonthlyAmount(curr), 0);
    const variableExpenses = expenses.filter(e => !e.isFixed && !e.isReimbursable).reduce((acc, curr) => acc + getMonthlyAmount(curr), 0);

    // Financial Deepening: Safety Buffer (Float)
    // Rule: Keep 0% (User requested exact math)
    const SAFETY_BUFFER_PCT = 0;
    const safetyBuffer = totalIncome * SAFETY_BUFFER_PCT;

    const projectedSurplus = totalIncome - totalExpenses - safetyBuffer - investmentTarget;


    // Phase 6 & 9: Debt Ledger Logic
    // Receivable = Money owed TO me (Asset, but illiquid)
    // Payable = Money I OWE (Liability)
    const activeLoans = loans || [];
    const totalReceivables = activeLoans.filter(l => l.type === 'lent' && l.status === 'active').reduce((acc, curr) => acc + curr.amount, 0) + reimbursableTotal;
    const totalPayables = activeLoans.filter(l => l.type === 'borrowed' && l.status === 'active').reduce((acc, curr) => acc + curr.amount, 0);

    // 2. Logic for "Next Payday" (Robust Date Clamping)
    // 2. Logic for "Next Payday" (Robust Date Clamping & Full Calendar Support)
    const nextPaydayData = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate diff

        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const currentDay = today.getDate();

        // Helper: Get days diff
        const getDiffDays = (target: Date) => Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        // Mixed Strategy:
        // 1. If it has a specific `startDate` (One-time or Anchor), use that.
        // 2. If it is `monthly` recurring, map it to the next valid calendar instance.

        const upcomingEvents = incomes.map(inc => {
            let targetDate: Date;

            if (inc.startDate && inc.repeats === 'once') {
                targetDate = new Date(inc.startDate);
            } else {
                // It is monthly. calculating next occurrence.
                // If we have a startDate, use its "Day" as anchor (e.g. 5th).
                // Or use expectedDateRange.start (backward compat).
                let anchorDay = inc.expectedDateRange.start;
                if (inc.startDate) {
                    anchorDay = new Date(inc.startDate).getDate();
                }

                // Handle Variable Month Lengths (e.g. Feb 30th -> Feb 28th)
                const getClampedDate = (year: number, month: number, day: number) => {
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    return new Date(year, month, Math.min(day, daysInMonth));
                }

                // Try THIS month
                let candidate = getClampedDate(currentYear, currentMonth, anchorDay);

                // If today is PAST this candidate, move to NEXT month
                if (candidate < today || (candidate.getDate() === today.getDate() && candidate.getMonth() === today.getMonth())) { // simplified check
                    // Wait, basic check: if candidate < today, move next.
                    if (candidate.getTime() <= today.getTime() + 1000) { // adding buffer? No, simple compare.
                        candidate = getClampedDate(currentYear, currentMonth + 1, anchorDay);
                    }
                }

                // Logic Fix: If we are on the 5th, and payday is 5th, is it today or next month?
                // Let's say Next Influx In: 0 Days? Or is it here?
                // If it is here, the balance should reflect it. So we strictly look for FUTURE dates.
                if (candidate.getDate() === currentDay && candidate.getMonth() === currentMonth) {
                    // It is today! But user says "Next".
                    // Usually we treat "Today" as 0 days.
                } else if (candidate < today) {
                    candidate = getClampedDate(currentYear, currentMonth + 1, anchorDay);
                }
                targetDate = candidate;
            }

            return {
                source: inc,
                date: targetDate,
                daysUntil: getDiffDays(targetDate)
            };
        }).filter(e => e.daysUntil >= 0).sort((a, b) => a.daysUntil - b.daysUntil);

        const next = upcomingEvents[0];

        return {
            daysUntil: next ? next.daysUntil : 30,
            nextSource: next ? next.source : null
        };
    }, [incomes]);

    // 3. Smart Daily Limit Calculation (Corrected Logic)
    const guidance = useMemo(() => {
        const days = Math.max(1, nextPaydayData.daysUntil);

        // Calculate daily burn rate for variable expenses (Food, Transport, etc.)
        // This is crucial: We can't let the user spend their Grocery money on a Video Game just because they have cash in hand.
        const dailyVariableBurn = variableExpenses / 30;

        // Scenario A: User HAS provided a real-time balance
        if (currentBalance !== undefined) {

            // What's left is TRUE discretionary money (or "Safe to Spend" on extras)
            // If balance is high, this will be positive. If low, it might be negative (meaning they are eating into fixed bills).
            // We assume Fixed Expenses are already paid or sitting in account? 
            // Actually, strict "Envelope" method says: Balance - Fixed_Due_Before_Payday - Variable_Reserve = Safe.
            // But for MVP smoothness, let's assume "Current Balance" is "Discretionary + Variable Wallet".
            // We shouldn't subtract Fixed expenses here if the user's mental model of "Wallet" doesn't include Rent currency.
            // Usually "Wallet" = Spending money. 



            // If they have MORE than needed for basics, that surplus is divided by days.
            // But wait, the standard daily limit INCLUDES variable expenses (like lunch).
            // So we actually simply want: CurrentBalance / Days.
            // BUT... if they have expenses OTHER than daily variables (like a bill due tomorrow), that's the risk.

            // Let's refine the "Financial Specialist" nuances:
            // The Daily Limit provided by "Theoretical" (Scenario B) covers EVERYTHING variable (Lunch + Fun).
            // So if we just do `CurrentBalance / Days`, that ALSO covers Lunch + Fun.
            // The ERROR described in the plan was: "If I have 1000tk for 10 days, I have 100/day. If that 100 MUST cover 50tk lunch, I actually only have 50tk fun."
            // The UI just says "Daily Safe Limit". It doesn't say "Fun Limit".
            // So `CurrentBalance / Days` IS correct for "Total Daily Spending Power".
            // HOWEVER, the "Theoretical" calculation below calculates `(Disposable - Variable) / 30`. 
            // Wait, `(totalIncome - fixedExpenses - investmentTarget) - variableExpenses`. 
            // IF `variableExpenses` includes Lunch, then "Theoretical" is calculating pure "Fun Money".
            // IF "Live" calculates "Total Money" (Lunch + Fun), we have a UNIT MISMATCH.

            // CORRECTION:
            // Theoretical:
            // `disposable` = Inc - Fixed - Inv.
            // `daily` = (disposable - variable) / 30. -> This is PURE FUN money.

            // Live:
            // We need PURE FUN money too.
            // `CurrentBalance` usually includes Lunch money.
            // So `safeFunMoney` = `CurrentBalance` - `(DailyVariableNeeds * days)`.
            // `dailySafeFun` = `safeFunMoney / days`.
            // Simplifies to: `(CurrentBalance / days) - DailyVariableNeeds`.

            const rawDaily = currentBalance / days;
            // We subtract the average variable burn (e.g., needed for lunch) to show "True Excess"
            // But maybe users prefer "Total Daily Limit"? 
            // Let's stick to "Total Daily Limit" for simplicity but CHANGE Theoretical to match.

            // NEW STRATEGY: Both show "Total Daily Limit" (Lunch + Fun).
            // Theoretical: `(TotalIncome - Fixed - Target) / 30`. (Includes lunch money).
            return {
                dailyLimit: Math.floor(rawDaily),
                source: "Real",
                isTight: rawDaily < dailyVariableBurn // Flag if they can't even afford basics
            };
        }

        // Scenario B: Theoretical
        // Re-calibrating to include Variable components in the daily limit
        const disposableForMonth = totalIncome - fixedExpenses - investmentTarget;
        const dailyTotal = disposableForMonth / 30;

        return {
            dailyLimit: Math.floor(dailyTotal),
            source: "Estimated",
            isTight: false
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
                {/* 3. Monthly Projection */}
                <div className="relative overflow-hidden p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group hover:-translate-y-1 transition-transform">
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                            {projectedSurplus < 0 ? "Projected Deficit" : "Projected Surplus"}
                        </p>
                        <h3 className={`text-2xl font-serif font-bold ${projectedSurplus < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {projectedSurplus < 0 ? "-" : "+"}৳{Math.abs(projectedSurplus).toLocaleString()}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 font-medium">
                            {projectedSurplus < 0
                                ? "You are overspending."
                                : "Extra savings available."}
                        </p>
                    </div>
                </div>

                {/* 4. Investment Status */}
                <div className="relative overflow-hidden p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group hover:-translate-y-1 transition-transform">
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Goal Health</p>
                        <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold font-serif ${projectedSurplus < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                                {projectedSurplus < 0 ? "Danger" : "On Track"}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 font-medium">
                            {projectedSurplus < 0 ? "Burning savings." : "Investment secure."}
                        </p>
                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                            <div
                                className={`h-full rounded-full ${projectedSurplus < 0 ? 'bg-red-500 w-full animate-pulse' : 'bg-emerald-500'}`}
                                style={{ width: projectedSurplus < 0 ? '100%' : '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Phase 10: Progressive Disclosure Toggle */}
            <div className="flex justify-center pt-4 border-t border-gray-100/50">
                <button
                    onClick={() => setShowInsights(!showInsights)}
                    className="flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest text-gray-500 shadow-sm"
                >
                    {showInsights ? (
                        <>
                            <EyeOff className="w-3 h-3" /> Simplify View
                        </>
                    ) : (
                        <>
                            <Eye className="w-3 h-3" /> Show Wealth Insights
                        </>
                    )}
                </button>
            </div >

            {/* ADVANCED SECTION: Hidden by default for "Easy Journey" */}
            {
                showInsights && (
                    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-top-4 pt-4">

                        {/* Phase 6: The Ledger of Truth (Debt Manager) */}
                        {(totalReceivables > 0 || totalPayables > 0) && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="p-1.5 bg-emerald-100 rounded-md text-emerald-700">
                                            <Wallet className="w-4 h-4" />
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Receivables</span>
                                    </div>
                                    <div className="mt-auto">
                                        <h4 className="text-2xl font-bold text-gray-900">৳{totalReceivables.toLocaleString()}</h4>
                                        <p className="text-xs text-gray-500 mt-1">Owed by friends/family</p>
                                    </div>
                                </div>
                                <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex flex-col">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="p-1.5 bg-rose-100 rounded-md text-rose-700">
                                            <AlertTriangle className="w-4 h-4" />
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Payables</span>
                                    </div>
                                    <div className="mt-auto">
                                        <h4 className="text-2xl font-bold text-gray-900">৳{totalPayables.toLocaleString()}</h4>
                                        <p className="text-xs text-gray-500 mt-1">Debt to act on</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phase 8: Sovereign Metrics (Freedom Clock) */}
                        {(currentBalance || 0) > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Runway Calculator */}
                                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 relative overflow-hidden">
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">Survival Runway</h4>
                                            <div className="text-2xl font-serif font-bold text-indigo-900">
                                                {(() => {
                                                    const monthlyBurn = totalExpenses; // Fixed + Variable
                                                    const months = (currentBalance || 0) / (monthlyBurn || 1);
                                                    if (months < 1) return <span className="text-red-600">{Math.floor(months * 30)} Days</span>;
                                                    return <span>{Math.floor(months)} <span className="text-sm font-sans font-normal text-indigo-600">Mos</span> {Math.round((months % 1) * 30)} <span className="text-sm font-sans font-normal text-indigo-600">Days</span></span>;
                                                })()}
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-indigo-400 mt-2">If income stops today.</p>
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 text-indigo-100">
                                        <Calendar className="w-16 h-16" />
                                    </div>
                                </div>

                                {/* FIRE Countdown */}
                                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 relative overflow-hidden">
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">Freedom Date</h4>
                                            <div className="text-2xl font-serif font-bold text-emerald-900">
                                                {(() => {
                                                    const monthlyBurn = totalExpenses;
                                                    const fireNumber = monthlyBurn * 12 * 25; // 25x Rule
                                                    const currentNW = (currentBalance || 0) + totalReceivables - totalPayables;

                                                    const monthlySavings = Math.max(0, totalIncome - monthlyBurn);
                                                    const gap = Math.max(0, fireNumber - currentNW);

                                                    if (monthlySavings <= 0) return <span className="text-xs text-emerald-700">Infinite (Save more!)</span>;

                                                    const yearsToGo = gap / (monthlySavings * 12);
                                                    if (yearsToGo <= 0) return <span>Free!</span>;
                                                    return <span>{yearsToGo.toFixed(1)} <span className="text-sm font-sans font-normal text-emerald-600">Years</span></span>;
                                                })()}
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-emerald-500 mt-2">To reach ৳{(totalExpenses * 12 * 25).toLocaleString()}</p>
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 text-emerald-100">
                                        <PieChart className="w-16 h-16" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* GOAL TRACKER (North Star) */}
                        {goals && goals.length > 0 && (
                            <div className="bg-black text-white p-6 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Rocket className="w-4 h-4 text-gray-400" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">North Star</span>
                                        </div>
                                        <h3 className="text-2xl font-serif font-bold">{goals[0].name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Target</p>
                                        <p className="text-xl font-bold">৳{(goals[0].target_amount || 0).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar (Mocked for now based on Balance) */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium text-gray-400">
                                        <span>Current Status</span>
                                        <span>{Math.min(100, Math.round(((currentBalance || 0) / (goals[0].target_amount || 1)) * 100))}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white transition-all duration-1000"
                                            style={{ width: `${Math.min(100, ((currentBalance || 0) / (goals[0].target_amount || 1)) * 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2">
                                        *Progress is calculated based on your current Wallet Balance.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Smart Advice Section */}
                        {currentBalance !== undefined && (
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
                                <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
                                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">CFO Guidance</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                                        You have <strong className="text-gray-900">৳{currentBalance.toLocaleString()}</strong> liquid.
                                        We reserved <strong className="text-gray-900">৳{Math.round(safetyBuffer).toLocaleString()}</strong> as a Safety Anchor.
                                        Your true safe daily burn is <strong className="text-indigo-600">৳{guidance.dailyLimit}</strong>.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Phase 5 & 7: Wealth Reality & Net Worth */}
                        <div className="bg-black text-white p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Rocket className="w-24 h-24" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                <div className="p-4 bg-white/10 rounded-full">
                                    <Coins className="w-8 h-8 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-serif text-xl font-bold mb-2">Net Worth Reality</h4>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setShowRealValue(!showRealValue)}
                                                className={`p-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${showRealValue ? 'bg-yellow-400 text-black' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                                                title="Toggle Inflation Impact (Purchasing Power)"
                                            >
                                                {showRealValue ? 'Real (Adj)' : 'Nominal'}
                                            </button>
                                            <button
                                                onClick={() => setShowZakat(!showZakat)}
                                                className={`p-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${showZakat ? 'bg-emerald-400 text-black' : 'bg-white/10 text-gray-400 hover:text-white'}`}
                                                title="Show Zakat Liability"
                                            >
                                                Zakat
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-sm text-gray-300 mb-2">
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-wider opacity-70">Liquid Cash</span>
                                            <span className="text-white font-bold">{(currentBalance || 0).toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-wider opacity-70">Receivables</span>
                                            <span className="text-emerald-400 font-bold">+{totalReceivables.toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-wider opacity-70">Debt</span>
                                            <span className="text-rose-400 font-bold">-{totalPayables.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* THE BIG NUMBER */}
                                    <div>
                                        {(() => {
                                            const rawNetWorth = (currentBalance || 0) + totalReceivables - totalPayables;
                                            const zakatLiability = Math.max(0, rawNetWorth * 0.025);
                                            const inflationRate = 0.06; // 6% annual
                                            const realValue = rawNetWorth / (1 + inflationRate); // "Next Year's" purchasing power equivalent

                                            const displayValue = showRealValue ? realValue : rawNetWorth;
                                            const finalValue = showZakat ? displayValue - zakatLiability : displayValue;

                                            return (
                                                <>
                                                    <p className="text-3xl font-serif font-bold text-yellow-400 mt-2 flex items-center gap-2">
                                                        ৳{Math.round(finalValue).toLocaleString()}
                                                        {showZakat && <span className="text-sm text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">-৳{Math.round(zakatLiability).toLocaleString()} (2.5%)</span>}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2 font-medium">
                                                        {showRealValue
                                                            ? "⚠️ Value adjusted for 6% inflation (Purchasing Power)."
                                                            : "Nominal Value (Today's Taka)."}
                                                    </p>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 50/30/20 Strategy View */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100/50">
                            <StrategyCard
                                label="Needs (Fixed)"
                                amount={fixedExpenses + sinkingFundsTotal}
                                total={totalIncome}
                                targetPct={50}
                                color="text-gray-900"
                                bg="bg-gray-900"
                            />
                            <StrategyCard
                                label="Wants (Variable)"
                                amount={variableExpenses}
                                total={totalIncome}
                                targetPct={30}
                                color="text-emerald-600"
                                bg="bg-emerald-500"
                            />
                            <StrategyCard
                                label="Future (Saved)"
                                amount={investmentTarget + Math.max(0, projectedSurplus)}
                                total={totalIncome}
                                targetPct={20}
                                color="text-indigo-600"
                                bg="bg-indigo-500"
                            />
                        </div>
                    </div>
                )
            }
        </div >
    );
}

interface StrategyCardProps {
    label: string;
    amount: number;
    total: number;
    targetPct: number;
    color: string;
    bg: string;
}

function StrategyCard({ label, amount, total, targetPct, color, bg }: StrategyCardProps) {
    const pct = Math.round((amount / total) * 100) || 0;
    const isOver = pct > targetPct;

    return (
        <div className="p-4 bg-white border border-gray-100 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
                <span className={`text-xs font-bold ${isOver ? 'text-orange-500' : 'text-gray-300'}`}>Goal: {targetPct}%</span>
            </div>
            <h4 className={`text-xl font-serif font-bold ${color}`}>৳{amount.toLocaleString()}</h4>
            <div className="w-full bg-gray-50 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className={`h-full ${bg} transition-all duration-1000`} style={{ width: `${Math.min(100, pct)}%` }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2 font-medium">{pct}% of Income</p>
        </div>
    );
}
