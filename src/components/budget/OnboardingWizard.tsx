
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wallet, Rocket, Check, Building } from "lucide-react";
import { supabase } from "@/lib/supabase";

// STEPS
// 1. Profile: Name, Goal (Startup vs Saver)
// 2. Income: Main Source
// 3. Fixed Bills: Rent check
// 4. Goals: "What are we saving for?"

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form Data
    const [data, setData] = useState({
        full_name: "",
        financial_goal: "purchase", // 'startup', 'retirement', 'purchase'
        main_income: 0,
        main_income_name: "Salary",
        rent_amount: 0,
        target_name: "My First 10 Lakh",
        target_amount: 1000000
    });

    const updateData = (key: string, val: string | number) => setData(prev => ({ ...prev, [key]: val }));

    const handleNext = async () => {
        if (step < 4) {
            setStep(step + 1);
        } else {
            await finalizeOnboarding();
        }
    };

    const finalizeOnboarding = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            // 1. Profile
            await supabase.from('budget_profiles').upsert({
                id: user.id,
                full_name: data.full_name,
                financial_goal_primary: data.financial_goal,
                has_completed_onboarding: true
            });

            // 2. Income
            await supabase.from('budget_incomes').insert({
                user_id: user.id,
                name: data.main_income_name,
                amount: data.main_income,
                repeats: 'monthly',
                start_date: new Date().toISOString() // Anchor to today
            });

            // 3. Fixed Expense (Rent) - if > 0
            if (data.rent_amount > 0) {
                await supabase.from('budget_expenses').insert({
                    user_id: user.id,
                    name: "Monthly Rent",
                    amount: data.rent_amount,
                    category: "Rent",
                    is_fixed: true
                });
            }

            // 4. Goal
            await supabase.from('budget_goals').insert({
                user_id: user.id,
                name: data.target_name,
                target_amount: data.target_amount,
                current_amount: 0,
                priority: 'high'
            });

            onComplete();
        } catch (error) {
            console.error(error);
            alert("Error saving profile. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const variants = {
        enter: { x: 100, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-black' : 'bg-gray-200'}`} />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="1" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold font-serif text-gray-900">Who are you?</h2>
                            <p className="text-gray-500">Let&apos;s personalize your financial engine.</p>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                autoFocus
                                className="w-full text-2xl font-bold border-b-2 border-gray-200 focus:border-black outline-none py-2 bg-transparent text-gray-900 placeholder:text-gray-300"
                                value={data.full_name}
                                onChange={e => updateData('full_name', e.target.value)}
                            />

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <GoalCard selected={data.financial_goal === 'startup'} onClick={() => updateData('financial_goal', 'startup')} icon={Rocket} label="Founder" desc="Saving for a Startup." />
                                <GoalCard selected={data.financial_goal === 'purchase'} onClick={() => updateData('financial_goal', 'purchase')} icon={Wallet} label="Earner" desc="Saving for big purchases." />
                                <GoalCard selected={data.financial_goal === 'retirement'} onClick={() => updateData('financial_goal', 'retirement')} icon={Building} label="Investor" desc="Building long-term wealth." />
                                <GoalCard selected={data.financial_goal === 'debt_free'} onClick={() => updateData('financial_goal', 'debt_free')} icon={Check} label="Debt Free" desc="Paying off loans." />
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="2" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold font-serif text-gray-900">The Fuel ⛽</h2>
                            <p className="text-gray-500">What is your primary monthly income?</p>
                        </div>
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-serif text-gray-400">৳</span>
                                <input
                                    type="number"
                                    placeholder="50000"
                                    autoFocus
                                    className="w-full text-4xl font-bold border-b-2 border-gray-200 focus:border-black outline-none py-2 pl-8 bg-transparent text-gray-900 placeholder:text-gray-300"
                                    value={data.main_income || ''}
                                    onChange={e => updateData('main_income', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Source Name (e.g. Salary)"
                                className="w-full text-lg font-medium text-gray-500 border-none outline-none py-2 bg-transparent focus:text-black transition-colors"
                                value={data.main_income_name}
                                onChange={e => updateData('main_income_name', e.target.value)}
                            />
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="3" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold font-serif text-gray-900">The Burn 🔥</h2>
                            <p className="text-gray-500">What is your fixed monthly committment (Rent)?</p>
                        </div>
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-serif text-gray-400">৳</span>
                                <input
                                    type="number"
                                    placeholder="20000"
                                    autoFocus
                                    className="w-full text-4xl font-bold border-b-2 border-gray-200 focus:border-black outline-none py-2 pl-8 bg-transparent text-gray-900 placeholder:text-gray-300"
                                    value={data.rent_amount || ''}
                                    onChange={e => updateData('rent_amount', parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <p className="text-sm text-gray-400">If you live with parents, put 0.</p>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="4" variants={variants} initial="enter" animate="center" exit="exit" className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold font-serif text-gray-900">The Dream 🚀</h2>
                            <p className="text-gray-500">What is your first big financial target?</p>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Target Name (e.g. Wedding)"
                                autoFocus
                                className="w-full text-2xl font-bold border-b-2 border-gray-200 focus:border-black outline-none py-2 bg-transparent mb-4 text-gray-900 placeholder:text-gray-300"
                                value={data.target_name}
                                onChange={e => updateData('target_name', e.target.value)}
                            />

                            <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-serif text-gray-400">৳</span>
                                <input
                                    type="number"
                                    placeholder="1000000"
                                    className="w-full text-4xl font-bold border-b-2 border-gray-200 focus:border-black outline-none py-2 pl-8 bg-transparent text-gray-900 placeholder:text-gray-300"
                                    value={data.target_amount || ''}
                                    onChange={e => updateData('target_amount', parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={handleNext}
                disabled={loading}
                className="mt-12 w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
            >
                {loading ? "Setting up Engine..." : (step === 4 ? "Launch WealthOS" : "Continue")} <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}

interface GoalCardProps {
    selected: boolean;
    onClick: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    label: string;
    desc: string;
}

function GoalCard({ selected, onClick, icon: Icon, label, desc }: GoalCardProps) {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${selected ? 'border-black bg-black text-white shadow-lg' : 'border-gray-200 hover:border-gray-400 text-gray-500'}`}
        >
            <Icon className={`w-6 h-6 mb-2 ${selected ? 'text-white' : 'text-black'}`} />
            <h4 className={`font-bold text-sm ${selected ? 'text-white' : 'text-gray-900'}`}>{label}</h4>
            <p className={`text-[10px] leading-tight mt-1 ${selected ? 'text-gray-400' : 'text-gray-400'}`}>{desc}</p>
        </div>
    )
}
