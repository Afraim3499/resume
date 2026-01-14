import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BudgetInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    placeholder?: string;
    prefix?: string;
    className?: string;
}

export function BudgetInput({
    label,
    value,
    onChange,
    placeholder = "0",
    prefix = "৳",
    className = ""
}: BudgetInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            onClick={handleContainerClick}
            className={cn(
                "group relative bg-white border rounded-2xl transition-all duration-300 cursor-text",
                isFocused
                    ? "border-black shadow-[0_0_0_4px_rgba(0,0,0,0.05)] ring-0"
                    : "border-gray-200 hover:border-gray-300",
                className
            )}
        >
            <div className="absolute top-3 left-4 flex gap-2 pointer-events-none">
                <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors duration-300",
                    isFocused ? "text-black" : "text-gray-500"
                )}>
                    {label}
                </span>
            </div>

            <div className="flex items-baseline px-4 pb-2.5 pt-7">
                <span className={cn(
                    "text-xl font-medium font-serif mr-1 transition-colors duration-300",
                    isFocused ? "text-black" : "text-gray-400"
                )}>
                    {prefix}
                </span>
                <input
                    ref={inputRef}
                    type="number"
                    value={value === 0 ? "" : value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="w-full bg-transparent border-none outline-none p-0 text-xl font-semibold text-gray-900 placeholder:text-gray-200 font-mono"
                    step="100" // Helps with arrow keys for money
                />
            </div>

            {/* Subtle aesthetic accent line at bottom */}
            <div className={cn(
                "absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500",
                isFocused ? "bg-black opacity-100" : "bg-transparent opacity-0"
            )} />
        </div>
    );
}
