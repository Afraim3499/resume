"use client";

import { useState } from "react";
import { Plus, ArrowRight, ArrowLeft, CheckCircle2, Trash2 } from "lucide-react";
import { LoanEntry } from "@/types/budget";
import { BudgetInput } from "./BudgetInput";

interface DebtManagerProps {
    loans: LoanEntry[];
    onAddLoan: (loan: LoanEntry) => void;
    onSettleLoan: (id: string) => void;
    onDeleteLoan: (id: string) => void;
}

export function DebtManager({ loans, onAddLoan, onSettleLoan, onDeleteLoan }: DebtManagerProps) {
    const [mode, setMode] = useState<'view' | 'add'>('view');
    const [newLoan, setNewLoan] = useState<Partial<LoanEntry>>({
        type: 'lent',
        person: '',
        amount: 0,
        notes: ''
    });

    const handleAdd = () => {
        if (!newLoan.person || !newLoan.amount) return;

        onAddLoan({
            id: crypto.randomUUID(),
            type: newLoan.type as 'lent' | 'borrowed',
            person: newLoan.person,
            amount: newLoan.amount,
            date: new Date().toISOString(),
            status: 'active',
            notes: newLoan.notes
        });

        setNewLoan({ type: 'lent', person: '', amount: 0, notes: '' });
        setMode('view');
    };

    const activeLoans = loans.filter(l => l.status === 'active');
    const settledLoans = loans.filter(l => l.status === 'settled');

    return (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Debt & Loans</h2>
                    <p className="text-gray-500 text-sm">Track who owes you money (Receivables) and who you owe (Payables).</p>
                </div>
                {mode === 'view' && (
                    <button
                        onClick={() => setMode('add')}
                        className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Entry
                    </button>
                )}
            </div>

            {mode === 'add' ? (
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <button
                            onClick={() => setNewLoan(prev => ({ ...prev, type: 'lent' }))}
                            className={`p-3 rounded-xl border text-sm font-bold flex flex-col items-center gap-2 transition-all ${newLoan.type === 'lent' ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-white border-gray-200 text-gray-400'}`}
                        >
                            <ArrowRight className="w-5 h-5" />
                            I Lent Money
                        </button>
                        <button
                            onClick={() => setNewLoan(prev => ({ ...prev, type: 'borrowed' }))}
                            className={`p-3 rounded-xl border text-sm font-bold flex flex-col items-center gap-2 transition-all ${newLoan.type === 'borrowed' ? 'bg-rose-100 border-rose-500 text-rose-800' : 'bg-white border-gray-200 text-gray-400'}`}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            I Borrowed Money
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Person</label>
                            <input
                                type="text"
                                value={newLoan.person}
                                onChange={e => setNewLoan(prev => ({ ...prev, person: e.target.value }))}
                                placeholder="E.g. Fahad, Office..."
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-black text-gray-900"
                            />
                        </div>
                        <BudgetInput
                            label="Amount"
                            value={newLoan.amount || 0}
                            onChange={v => setNewLoan(prev => ({ ...prev, amount: v }))}
                            prefix="৳"
                        />
                        <div className="flex gap-3 pt-2">
                            <button onClick={handleAdd} className="flex-1 bg-black text-white py-3 rounded-xl font-bold">Save Entry</button>
                            <button onClick={() => setMode('view')} className="px-6 bg-gray-200 text-gray-600 rounded-xl font-bold">Cancel</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {activeLoans.length === 0 && (
                        <div className="text-center py-8 text-gray-400 text-sm">No active debts or receivables. Clean slate!</div>
                    )}
                    {activeLoans.map(loan => (
                        <div key={loan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 group">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${loan.type === 'lent' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                    {loan.type === 'lent' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{loan.person}</h4>
                                    <p className="text-xs text-gray-500">
                                        {loan.type === 'lent' ? 'Owes you' : 'You owe'}
                                        <span className={`ml-1 font-bold ${loan.type === 'lent' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            ৳{loan.amount.toLocaleString()}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onSettleLoan(loan.id)}
                                    title="Mark as Settled"
                                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => onDeleteLoan(loan.id)}
                                    title="Delete Entry"
                                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {settledLoans.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">History</h5>
                            {settledLoans.map(loan => (
                                <div key={loan.id} className="flex items-center justify-between py-2 px-2 text-sm opacity-60">
                                    <span className="line-through decoration-gray-400 decoration-2">{loan.person} ({loan.amount})</span>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Settled</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
