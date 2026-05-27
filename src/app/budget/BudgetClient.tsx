"use client";

import { useState, useEffect } from "react";
import { Plus, X, Check, Trash2, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { IncomeSource, ExpenseItem, LoanEntry } from "@/types/budget";
import { IncomeScheduler } from "@/components/budget/IncomeScheduler";
import { BudgetInput } from "@/components/budget/BudgetInput";
import { AnalysisPanel } from "@/components/budget/AnalysisPanel";
import { DailyTracker } from "@/components/budget/DailyTracker";
import { DebtManager } from "@/components/budget/DebtManager";

export default function BudgetPage() {
    const [incomes, setIncomes] = useState<IncomeSource[]>([]);
    const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
    const [loans, setLoans] = useState<LoanEntry[]>([]);
    const [investmentTarget, setInvestmentTarget] = useState<number>(0);
    const [currentBalance, setCurrentBalance] = useState<number | undefined>(undefined);
    const [lastBalanceUpdate, setLastBalanceUpdate] = useState<Date | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Cloud State
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [goals, setGoals] = useState<any[]>([]);

    // Load from Supabase
    useEffect(() => {
        const loadCloudData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;
                setUser(user);

                // 1. Profile
                const { data: profile } = await supabase.from('budget_profiles').select('*').eq('id', user.id).single();
                setProfile(profile);

                // 2. Incomes
                const { data: cloudIncomes } = await supabase.from('budget_incomes').select('*');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (cloudIncomes) setIncomes(cloudIncomes.map((i: any) => ({
                    id: i.id,
                    name: i.name,
                    amount: i.amount,
                    startDate: i.start_date,
                    repeats: i.repeats,
                    isRecurring: true,
                    expectedDateRange: { start: 1, end: 1 } // Fallback
                })));

                // 3. Expenses
                const { data: cloudExpenses } = await supabase.from('budget_expenses').select('*');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (cloudExpenses) setExpenses(cloudExpenses.map((e: any) => ({
                    id: e.id,
                    name: e.name,
                    amount: e.amount,
                    category: e.category,
                    isFixed: e.is_fixed
                })));

                // 4. Goals (Target)
                const { data: cloudGoals } = await supabase.from('budget_goals').select('*');
                if (cloudGoals) {
                    setGoals(cloudGoals);
                }

                setIsLoaded(true);

            } catch (e) {
                console.error("Sync Error:", e);
            }
        };

        loadCloudData();
    }, []);

    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const [newExpense, setNewExpense] = useState<Partial<ExpenseItem>>({
        name: "",
        amount: 0,
        category: "Other",
        isFixed: false
    });



    const handleAddExpense = async () => {
        if (!newExpense.name || !user) return;

        const newItem = {
            user_id: user.id,
            name: newExpense.name,
            amount: newExpense.amount || 0,
            category: newExpense.category || "Other",
            is_fixed: newExpense.isFixed || false
        };

        const { data: inserted } = await supabase.from('budget_expenses').insert(newItem).select().single();

        if (inserted) {
            setExpenses([...expenses, {
                id: inserted.id,
                name: inserted.name,
                amount: inserted.amount,
                category: inserted.category,
                isFixed: inserted.is_fixed
            }]);
            setNewExpense({ name: "", amount: 0, category: "Other", isFixed: false });
            setIsAddingExpense(false);
        }
    };

    const handleDeleteExpense = (id: string) => {
        setExpenses(prev => prev.filter(e => e.id !== id));
    };

    const handleBalanceUpdate = (amount: number) => {
        setCurrentBalance(amount);
        setLastBalanceUpdate(new Date());
    };

    const handleAddLoan = (loan: LoanEntry) => {
        setLoans(prev => [...prev, loan]);
    };

    const handleSettleLoan = (id: string) => {
        setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'settled' } : l));
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
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center text-white shadow-lg shadow-black/20 text-xs font-bold">
                            {profile?.full_name?.substring(0, 2).toUpperCase() || "WO"}
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                                {profile ? `${profile.full_name.split(' ')[0]}'s Wealth` : "Wealth Optimizer"}
                            </h1>
                            <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest hidden sm:block flex items-center gap-1">
                                {goals.length > 0 ? `Target: ${goals[0].name}` : "Financial Command"}
                            </p>
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
                    loans={loans}
                    goals={goals}
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
                        <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                            <DailyTracker
                                currentBalance={currentBalance || 0}
                                lastUpdated={lastBalanceUpdate}
                                onUpdate={handleBalanceUpdate}
                            />
                        </div>

                        {/* Income Schedule */}
                        <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">💰</span>
                                Income Streams
                            </h3>
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
                                    value={investmentTarget}
                                    onChange={setInvestmentTarget}
                                />
                            </div>
                        </section>

                        {/* Expenses List */}
                        <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-lg">💸</span>
                                    Expenses
                                </h3>
                                <button
                                    onClick={() => setIsAddingExpense(true)}
                                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-black/20"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {expenses.map(expense => (
                                    <div key={expense.id} className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-transparent hover:border-gray-200 hover:bg-white transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-lg shadow-sm">
                                                {expense.category === "Rent" ? "🏠" :
                                                    expense.category === "Food" ? "🍔" :
                                                        expense.category === "Transport" ? "🚗" : "🛍️"}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{expense.name}</div>
                                                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{expense.category}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="font-bold text-gray-900">৳{expense.amount.toLocaleString()}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                    {expense.isFixed ? "Fixed" : "Variable"}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteExpense(expense.id)}
                                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-full"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {expenses.length === 0 && (
                                    <div className="text-center py-12 text-gray-300 italic">
                                        No expenses recorded yet.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Add Expense Modal */}
            {isAddingExpense && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-md p-6 md:p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">New Expense</h3>
                            <button onClick={() => setIsAddingExpense(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="group relative bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:border-gray-300 focus-within:border-black focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.05)]">
                                <label className="absolute top-3 left-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                    Expense Name
                                </label>
                                <div className="px-4 pb-2.5 pt-7">
                                    <input
                                        type="text"
                                        value={newExpense.name || ""}
                                        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                                        placeholder="e.g., Grocery"
                                        className="w-full bg-transparent border-none outline-none p-0 text-xl font-semibold text-gray-900 placeholder:text-gray-200"
                                    />
                                </div>
                            </div>
                            <BudgetInput
                                label="Amount"
                                value={newExpense.amount || 0}
                                onChange={(val) => setNewExpense({ ...newExpense, amount: Number(val) })}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                {["Rent", "Food", "Transport", "Utilities", "Shopping", "Health", "Education", "Other"].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setNewExpense({ ...newExpense, category: cat as import("@/types/budget").ExpenseCategory })}
                                        className={`p-3 rounded-xl text-sm font-bold border transition-all ${newExpense.category === cat
                                            ? "bg-black text-white border-black shadow-lg"
                                            : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setNewExpense({ ...newExpense, isFixed: !newExpense.isFixed })}
                                className={`w-full p-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${newExpense.isFixed
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                    : "bg-white border-gray-100 text-gray-400 hover:border-gray-300"
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${newExpense.isFixed ? "bg-indigo-600 border-indigo-600" : "border-gray-300"
                                    }`}>
                                    {newExpense.isFixed && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className="font-bold text-sm">Fixed Monthly Expense</span>
                            </button>

                            <button
                                onClick={handleAddExpense}
                                disabled={!newExpense.name || !newExpense.amount}
                                className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
                            >
                                Add Expense
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


