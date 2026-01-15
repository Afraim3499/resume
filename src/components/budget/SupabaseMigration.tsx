
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Cloud, Check, Loader2, AlertTriangle } from "lucide-react";

export function SupabaseMigration() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [log, setLog] = useState("");

    const handleMigrate = async () => {
        setStatus('loading');
        setLog("Reading local data...");

        try {
            const raw = localStorage.getItem("budget_data");
            if (!raw) throw new Error("No local data found.");

            const data = JSON.parse(raw);
            const { incomes, expenses, loans, currentBalance, investmentTarget } = data;

            setLog("Connecting to Cloud...");

            // 1. Clear existing (Strategy: Wipe and Replace for Clean Sync)
            // Note: In a real app we might merge, but for migration simple is better.
            const { error: e1 } = await supabase.from('budget_incomes').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all 
            const { error: e2 } = await supabase.from('budget_expenses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            const { error: e3 } = await supabase.from('budget_loans').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            const { error: e4 } = await supabase.from('budget_config').delete().neq('id', '00000000-0000-0000-0000-000000000000');

            if (e1 || e2 || e3 || e4) console.warn("Cleanup warning:", e1, e2, e3, e4);

            setLog("Uploading Incomes...");
            if (incomes?.length) {
                const payload = incomes.map((i: any) => ({
                    name: i.name,
                    amount: i.amount,
                    start_date: i.startDate || null,
                    repeats: i.repeats || 'monthly'
                }));
                const { error } = await supabase.from('budget_incomes').insert(payload);
                if (error) throw error;
            }

            setLog("Uploading Expenses...");
            if (expenses?.length) {
                const payload = expenses.map((e: any) => ({
                    name: e.name,
                    amount: e.amount,
                    category: e.category,
                    is_fixed: e.isFixed || false,
                    is_reimbursable: e.isReimbursable || false,
                    frequency: e.frequency || 'monthly'
                }));
                const { error } = await supabase.from('budget_expenses').insert(payload);
                if (error) throw error;
            }

            setLog("Uploading Loans...");
            if (loans?.length) {
                const payload = loans.map((l: any) => ({
                    person_name: l.personName,
                    amount: l.amount,
                    type: l.type,
                    status: l.status,
                    due_date: l.dueDate ? new Date(l.dueDate).toISOString() : null
                }));
                const { error } = await supabase.from('budget_loans').insert(payload);
                if (error) throw error;
            }

            setLog("Saving Config...");
            const { error: cErr } = await supabase.from('budget_config').insert({
                current_balance: currentBalance || 0,
                target_investment: investmentTarget || 0,
                last_balance_update: new Date().toISOString()
            });
            if (cErr) throw cErr;

            setLog("Migration Complete!");
            setStatus('success');

        } catch (e: any) {
            console.error(e);
            setLog("Error: " + e.message);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                        <Check className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-emerald-900">Cloud Sync Active</h4>
                        <p className="text-xs text-emerald-700">Your data is safe in Supabase.</p>
                    </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Platinum Tier</span>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                    <Cloud className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">System Upgrade</span>
                </div>
                <h3 className="text-xl font-bold">Migration Required</h3>
                <p className="text-gray-400 text-sm max-w-md">
                    To enable Platinum features (Notifications, Auto-Backups), we need to move your data to the secure Cloud Database.
                </p>
                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold mt-2">
                        <AlertTriangle className="w-4 h-4" /> {log}
                    </div>
                )}
            </div>

            <button
                onClick={handleMigrate}
                disabled={status === 'loading'}
                className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all flex items-center gap-2 disabled:opacity-50"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" /> {log}
                    </>
                ) : (
                    <>
                        Start Migration <Cloud className="w-4 h-4" />
                    </>
                )}
            </button>
        </div>
    );
}
