"use client";

import { useState, useEffect } from "react";
import { Download, Plus, Trash2, X, Check } from "lucide-react";
import { IncomeSource, ExpenseItem, LoanEntry } from "@/types/budget";
import { IncomeScheduler } from "@/components/budget/IncomeScheduler";
import { BudgetInput } from "@/components/budget/BudgetInput";
import { AnalysisPanel } from "@/components/budget/AnalysisPanel";
import { DailyTracker } from "@/components/budget/DailyTracker";
import { DebtManager } from "@/components/budget/DebtManager";

const DEFAULT_EXPENSES: ExpenseItem[] = [
    { id: "1", name: "Rent & Grocery", amount: 0, category: "Rent", isFixed: true },
    { id: "2", name: "Food Order", amount: 0, category: "Food Order", isFixed: false },
    { id: "3", name: "Personal Care", amount: 0, category: "Personal", isFixed: false },
    { id: "4", name: "Regular (Fares/Tea)", amount: 0, category: "Regular", isFixed: false },
    { id: "5", name: "Restaurants/Other", amount: 0, category: "Restaurants", isFixed: false },
];

export default function BudgetPage() {
    const [incomes, setIncomes] = useState<IncomeSource[]>([
        { id: "1", name: "Office Salary", amount: 0, expectedDateRange: { start: 5, end: 7 }, isRecurring: true, repeats: 'monthly' },
        { id: "2", name: "Fahad Payment 1", amount: 0, expectedDateRange: { start: 20, end: 22 }, isRecurring: true, repeats: 'monthly' },
        { id: "3", name: "Fahad Payment 2", amount: 0, expectedDateRange: { start: 23, end: 25 }, isRecurring: true, repeats: 'monthly' },
    ]);

    const [expenses, setExpenses] = useState<ExpenseItem[]>(DEFAULT_EXPENSES);
    const [loans, setLoans] = useState<LoanEntry[]>([]);
    const [investmentTarget, setInvestmentTarget] = useState<number>(0);
    const [currentBalance, setCurrentBalance] = useState<number | undefined>(undefined);
    const [lastBalanceUpdate, setLastBalanceUpdate] = useState<Date | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem("budget_data");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                setIncomes(parsed.incomes && parsed.incomes.length > 0 ? parsed.incomes : incomes);
                setExpenses(parsed.expenses || DEFAULT_EXPENSES);
                setInvestmentTarget(parsed.investmentTarget || 0);
                if (parsed.currentBalance !== undefined) setCurrentBalance(parsed.currentBalance);
                if (parsed.lastBalanceUpdate) setLastBalanceUpdate(new Date(parsed.lastBalanceUpdate));
            } catch (e) {
                console.error("Failed to load budget data", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Auto-Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            const data = { incomes, expenses, investmentTarget, currentBalance, lastBalanceUpdate, loans };
            localStorage.setItem("budget_data", JSON.stringify(data));
        }
    }, [incomes, expenses, investmentTarget, currentBalance, lastBalanceUpdate, loans, isLoaded]);

    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const [newExpense, setNewExpense] = useState<Partial<ExpenseItem>>({
        name: "",
        amount: 0,
        category: "Other",
        isFixed: false
    });

    const updateExpense = (id: string, amount: number) => {
        setExpenses(prev => prev.map(exp => exp.id === id ? { ...exp, amount } : exp));
    };

    const handleAddExpense = () => {
        if (!newExpense.name) return;
        const item: ExpenseItem = {
            id: crypto.randomUUID(),
            name: newExpense.name,
            amount: newExpense.amount || 0,
            category: (newExpense.category as any) || "Other",
            isFixed: newExpense.isFixed || false
        };
        setExpenses([...expenses, item]);
        setNewExpense({ name: "", amount: 0, category: "Other", isFixed: false, isReimbursable: false });
        setIsAddingExpense(false);
    };

    const handleDeleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const handleBalanceUpdate = (amount: number) => {
        setCurrentBalance(amount);
        setLastBalanceUpdate(new Date());
    };

    // Phase 6: Debt Ledger Handlers
    const handleAddLoan = (loan: LoanEntry) => {
        setLoans(prev => [...prev, loan]);
    };

    const handleSettleLoan = (id: string) => {
        setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'settled' } : l));
        // Optional: If settled, does it affect balance? 
        // For now, keep it manual update via DailyTracker.
    };

    const handleDeleteLoan = (id: string) => {
        setLoans(prev => prev.filter(l => l.id !== id));
    };

    const handleDownload = () => {
        const data = JSON.stringify({ incomes, expenses, investmentTarget, currentBalance, loans }, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `budget-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (!isLoaded) return <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-gray-400 font-serif italic animate-pulse">Initializing Vault...</div>;

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-24 md:pb-32">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
                <div className="container max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center text-white shadow-lg shadow-black/20">
                            <span className="font-serif italic font-bold text-lg md:text-xl">W</span>
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">Wealth Optimizer</h1>
                            <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden sm:block">Personal Finance Command</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                if (confirm("Are you sure? This will wipe all data and reset to defaults.")) {
                                    localStorage.removeItem("budget_data");
                                    window.location.reload();
                                }
                            }}
                            className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white border border-gray-200 hover:border-red-200 hover:bg-red-50 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Reset</span>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="group flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white border border-gray-200 hover:border-black transition-colors text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black shadow-sm"
                        >
                            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                            <span>Backup</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
                {/* 1. Analysis Panel (The Brain) */}
                <AnalysisPanel
                    incomes={incomes}
                    expenses={expenses}
                    currentBalance={currentBalance}
                    investmentTarget={investmentTarget}
                    lastBalanceUpdate={lastBalanceUpdate}
                    loans={loans}
                />

                {/* Phase 6: Debt Manager (The Ledger of Truth) */}
                <div className="mb-12">
                    <DebtManager
                        loans={loans}
                        onAddLoan={handleAddLoan}
                        onSettleLoan={handleSettleLoan}
                        onDeleteLoan={handleDeleteLoan}
                    />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-12">
                    {/* Left Column: Cash Flow & Check-in (7/12) */}
                    <div className="xl:col-span-7 space-y-6 md:space-y-8">
                        {/* Daily Check-in */}
                        <DailyTracker
                            currentBalance={currentBalance || 0}
                            lastUpdated={lastBalanceUpdate}
                            onUpdate={handleBalanceUpdate}
                        />

                        {/* Income Schedule */}
                        <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <IncomeScheduler incomes={incomes} setIncomes={setIncomes} />
                        </section>
                    </div>

                    {/* Right Column: Expenses & Goals (5/12) */}
                    <div className="xl:col-span-5 space-y-6 md:space-y-8">
                        {/* Investment Target */}
                        <section className="bg-gradient-to-br from-indigo-50/50 to-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-indigo-100/50 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-lg">🎯</span>
                                    Investment Goal
                                </h3>
                                <BudgetInput
                                    label="Monthly Target"
                                    prefix="৳"
                                    value={investmentTarget}
                                    onChange={setInvestmentTarget}
                                    placeholder="e.g. 20000"
                                    className="bg-white shadow-sm"
                                />
                                <div className="mt-6 flex gap-4 text-sm text-gray-500 bg-white/60 p-4 md:p-5 rounded-2xl border border-indigo-50/50 backdrop-blur-sm">
                                    <div className="min-w-[4px] bg-indigo-500 rounded-full"></div>
                                    <p className="leading-relaxed text-xs">
                                        This is your <strong>North Star</strong>. The calculator will optimize your daily limit to ensuring you hit this target first.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Expenses */}
                        <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-lg">💸</span>
                                    Monthly Expenses
                                </h3>
                                <button
                                    onClick={() => setIsAddingExpense(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/20"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Add Expense</span>
                                </button>
                            </div>

                            {/* User Guide for Expenses */}
                            <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 flex gap-3">
                                <span className="text-xl">💡</span>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-blue-900 uppercase tracking-wide">Expense Guide</p>
                                    <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                                        <li><strong>Fixed:</strong> Must-haves (Rent, Wifi). Deducted immediately.</li>
                                        <li><strong>Variable:</strong> Daily spending (Food, Fun). Affects Daily Limit.</li>
                                        <li><strong>Reimbursable:</strong> Office expenses. Reduces Cash but adds to "Owed to You".</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                {expenses.map((expense) => (
                                    <div key={expense.id} className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-all border border-transparent hover:border-gray-100 bg-gray-50/30 sm:bg-transparent relative">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <label className="text-base font-bold text-gray-900 truncate">{expense.name}</label>
                                                {expense.isFixed && (
                                                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 font-bold uppercase tracking-wider">Fixed</span>
                                                )}
                                                {expense.isReimbursable && (
                                                    <span className="text-[10px] bg-indigo-100 px-2 py-0.5 rounded-full text-indigo-600 font-bold uppercase tracking-wider">Reimbursable</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-400 capitalize">{expense.category}</p>
                                        </div>
                                        <div className="flex items-center gap-3 w-full sm:w-auto">
                                            <div className="w-full sm:w-40">
                                                <BudgetInput
                                                    label="Amount"
                                                    value={expense.amount}
                                                    onChange={(val) => updateExpense(expense.id, val)}
                                                    className="bg-white"
                                                />
                                            </div>
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Add Expense Form */}
                                {isAddingExpense && (
                                    <div className="p-4 rounded-2xl bg-white border-2 border-dashed border-gray-200 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-bold text-gray-900">New Expense</h4>
                                            <button onClick={() => setIsAddingExpense(false)} className="text-gray-400 hover:text-black">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="space-y-4">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Expense Name (e.g. Netflix)"
                                                value={newExpense.name}
                                                onChange={e => setNewExpense({ ...newExpense, name: e.target.value })}
                                                className="w-full bg-gray-50 p-3 rounded-lg text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-black/5 placeholder-gray-400"
                                            />
                                            <div className="flex gap-2">
                                                <select
                                                    value={newExpense.category}
                                                    onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                                                    className="flex-1 bg-gray-50 p-3 rounded-lg text-xs font-bold text-gray-900 outline-none"
                                                >
                                                    <option value="Rent">Rent</option>
                                                    <option value="Food Order">Food Order</option>
                                                    <option value="Personal">Personal</option>
                                                    <option value="Regular">Regular</option>
                                                    <option value="Restaurants">Restaurants</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <button
                                                    onClick={() => setNewExpense({ ...newExpense, isFixed: !newExpense.isFixed })}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${newExpense.isFixed ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500'}`}
                                                >
                                                    {newExpense.isFixed ? 'FIXED' : 'VAR'}
                                                </button>
                                                <button
                                                    onClick={() => setNewExpense({ ...newExpense, isReimbursable: !newExpense.isReimbursable })}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${newExpense.isReimbursable ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-200 text-gray-500'}`}
                                                    title="I will act as a bank (reimbursed later)"
                                                >
                                                    {newExpense.isReimbursable ? 'REIMB' : 'OWN'}
                                                </button>
                                            </div>
                                            <BudgetInput
                                                label="Amount"
                                                value={newExpense.amount || 0}
                                                onChange={val => setNewExpense({ ...newExpense, amount: val })}
                                                className="bg-gray-50"
                                            />
                                            <button
                                                onClick={handleAddExpense}
                                                disabled={!newExpense.name}
                                                className="w-full py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Check className="w-4 h-4" /> Add Item
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100/50 flex justify-between items-center">
                                <span className="font-bold text-gray-500 text-sm uppercase tracking-widest">Total Outflow</span>
                                <span className="font-serif font-bold text-red-600 text-xl md:text-2xl">
                                    ৳{expenses.reduce((a, b) => a + b.amount, 0).toLocaleString()}
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
