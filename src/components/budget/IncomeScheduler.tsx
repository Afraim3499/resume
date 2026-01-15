"use client";

import { useState } from "react";
import { Plus, Trash2, Calendar, Edit2, Check, X } from "lucide-react";
import { IncomeSource } from "@/types/budget";
import { BudgetInput } from "./BudgetInput";
import { DayPicker } from "./DayPicker";
import { IncomeTimeline } from "./IncomeTimeline";
import { cn } from "@/lib/utils";

interface IncomeSchedulerProps {
    incomes: IncomeSource[];
    setIncomes: (incomes: IncomeSource[]) => void;
}

export function IncomeScheduler({ incomes, setIncomes }: IncomeSchedulerProps) {
    // Edit Mode State: stores the ID of the item being edited
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newItem, setNewItem] = useState<IncomeSource | null>(null);

    const addIncome = () => {
        const newIncome: IncomeSource = {
            id: crypto.randomUUID(),
            name: "",
            amount: 0,
            expectedDateRange: { start: 1, end: 5 },
            isRecurring: true,
            repeats: 'monthly'
        };
        // Don't add to main list yet, put in "staging"
        setNewItem(newIncome);
        setEditingId(newIncome.id);
    };

    const saveIncome = (income: IncomeSource) => {
        if (!income.name.trim()) income.name = "Unnamed Source";

        if (newItem && newItem.id === income.id) {
            setIncomes([...incomes, income]);
            setNewItem(null);
        } else {
            setIncomes(incomes.map(i => i.id === income.id ? income : i));
        }
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setNewItem(null);
    };

    const updateStagedOrExisting = (id: string, updates: Partial<IncomeSource>) => {
        if (newItem && newItem.id === id) {
            setNewItem({ ...newItem, ...updates });
        } else {
            setIncomes(incomes.map(i => i.id === id ? { ...i, ...updates } : i));
        }
    };

    const removeIncome = (id: string) => {
        setIncomes(incomes.filter((inc) => inc.id !== id));
        if (editingId === id) setEditingId(null);
    };

    // Helper to get the object being edited (either from state or temp)
    const getEditingObject = (id: string) => {
        if (newItem && newItem.id === id) return newItem;
        return incomes.find(i => i.id === id);
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Income Sources</h3>
                    <p className="text-sm text-gray-500">Add your Salary, Freelance, or any inflows here. Toggle "One-time" for bonuses.</p>
                </div>
                <button
                    onClick={addIncome}
                    disabled={!!editingId} // Disable if already editing
                    className="group flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl sm:rounded-full hover:bg-gray-800 transition-all font-medium text-sm shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    Add Payday
                </button>
            </div>

            {/* 1. Timeline Visualization */}
            <div className="bg-white rounded-2xl p-2 border border-black/[0.03] shadow-sm overflow-hidden">
                <IncomeTimeline incomes={incomes} />
            </div>

            {/* 2. Compact List & Edit Forms */}
            <div className="space-y-3">
                {/* Render Existing Incomes */}
                {incomes.map((income) => {
                    const isEditing = editingId === income.id;
                    return isEditing
                        ? <IncomeEditor key={income.id} income={income} onSave={saveIncome} onCancel={cancelEdit} onUpdate={(u) => updateStagedOrExisting(income.id, u)} />
                        : <CompactIncomeRow key={income.id} income={income} onEdit={() => setEditingId(income.id)} onRemove={() => removeIncome(income.id)} />;
                })}

                {/* Render New Item Form if Active */}
                {newItem && (
                    <IncomeEditor
                        income={newItem}
                        onSave={saveIncome}
                        onCancel={cancelEdit}
                        onUpdate={(u) => updateStagedOrExisting(newItem.id, u)}
                    />
                )}

                {incomes.length === 0 && !newItem && (
                    <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
                        <p className="text-sm font-medium">No income sources yet.</p>
                        <p className="text-xs">Add your office salary or side hustles.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Sub-component: View Mode
function CompactIncomeRow({ income, onEdit, onRemove }: { income: IncomeSource, onEdit: () => void, onRemove: () => void }) {
    return (
        <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-black/5 hover:shadow-md transition-all cursor-pointer gap-4" onClick={onEdit}>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 font-bold text-xs ring-1 ring-black/5 shrink-0">
                    {income.amount > 0 ? "৳" : "?"}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 line-clamp-1">{income.name || "Unnamed Source"}</h4>
                    <p className="text-xs text-gray-500 font-medium">
                        Expected: <span className="text-gray-700">
                            {income.startDate
                                ? new Date(income.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: income.repeats === 'once' ? 'numeric' : undefined })
                                : getOrdinal(income.expectedDateRange.start)}
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pl-14 sm:pl-0">
                <span className="font-mono font-bold text-lg text-gray-900">৳{income.amount.toLocaleString()}</span>
                {/* Actions: Always visible on mobile, hover on desktop */}
                <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="p-2 bg-gray-50 sm:bg-transparent hover:bg-gray-100 rounded-full text-gray-600 sm:text-gray-400 hover:text-black">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-2 bg-gray-50 sm:bg-transparent hover:bg-red-50 rounded-full text-gray-600 sm:text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Sub-component: Edit Mode
function IncomeEditor({
    income,
    onSave,
    onCancel,
    onUpdate
}: {
    income: IncomeSource,
    onSave: (i: IncomeSource) => void,
    onCancel: () => void,
    onUpdate: (u: Partial<IncomeSource>) => void
}) {
    return (
        <div className="p-4 sm:p-6 bg-white border border-black/10 rounded-2xl shadow-lg ring-1 ring-black/5 relative animate-in fade-in zoom-in-95 duration-200">
            <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Editing {income.name || "New Source"}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Details */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="income-source-name" className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Source Name</label>
                        <input
                            id="income-source-name"
                            type="text"
                            autoFocus
                            value={income.name}
                            onChange={(e) => onUpdate({ name: e.target.value })}
                            placeholder="Checking Account..."
                            autoComplete="off"
                            className="w-full bg-gray-50 p-3 rounded-lg text-lg font-bold text-gray-900 placeholder:text-gray-300 border-none outline-none focus:ring-2 focus:ring-black/5 transition-all"
                        />
                    </div>

                    <div className="flex gap-2 p-1 bg-gray-50 rounded-lg w-fit">
                        <button
                            onClick={() => onUpdate({ repeats: 'monthly', isRecurring: true })}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                income.repeats === 'monthly' || income.isRecurring ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => onUpdate({ repeats: 'once', isRecurring: false })}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                income.repeats === 'once' && !income.isRecurring ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            One-Time
                        </button>
                    </div>

                    <BudgetInput
                        label="Expected Amount"
                        value={income.amount}
                        onChange={(val) => onUpdate({ amount: val })}
                        className="w-full"
                    />
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Expected Date</label>
                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-black/[0.02]">
                        <input
                            type="date"
                            value={income.startDate || (new Date().toISOString().split('T')[0])}
                            onChange={(e) => {
                                const dateVal = e.target.value;
                                const day = parseInt(dateVal.split('-')[2]);
                                onUpdate({
                                    startDate: dateVal,
                                    expectedDateRange: { start: day, end: day } // fallback sync
                                });
                            }}
                            className="bg-transparent text-2xl font-bold text-gray-900 w-full outline-none"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            {income.repeats === 'monthly' ? "Recurrs monthly on this day." : "One-time payout date."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                <button onClick={onCancel} className="w-full sm:w-auto px-5 py-3 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">
                    Cancel
                </button>
                <button onClick={() => onSave(income)} className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Save Changes
                </button>
            </div>
        </div>
    );
}

function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}
