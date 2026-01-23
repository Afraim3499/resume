"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const LOG_MESSAGES = {
    hero: [
        "> INIT: SYSTEM_ORCHESTRATOR_V1...",
        "> DETECTING: VISIONARY_FOUNDER...",
        "> ACCESS: GRANTED."
    ],
    "signature-work": [
        "> LOADING_ASSET: GAARI_ARCHITECTURE...",
        "> STATUS: SCALING_TO_MILLIONS...",
        "> PROOF: VERIFIED."
    ],
    about: [
        "> ANALYZING: CORE_DNA...",
        "> ORIGIN: POULTRY_FARM_TO_TECH...",
        "> RESULT: RESILIENCE_OPTIMIZED."
    ],
    experience: [
        "> PARSING_HISTORY: 5_YEARS_DATA...",
        "> ROLE: VP_OPERATIONS [Quantanite]...",
        "> IMPACT: HIGH."
    ],
    contact: [
        "> PROTOCOL: HANDSHAKE_INIT...",
        "> READY_TO_ESTABLISH_CONNECTION...",
        "> WAITING_FOR_INPUT..."
    ],
    default: [
        "> SYSTEM: MONITORING...",
        "> SCROLLING..."
    ]
};

export function SystemLog() {
    const [currentSection, setCurrentSection] = useState<string>("hero");
    const [logs, setLogs] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = Object.keys(LOG_MESSAGES).filter(k => k !== 'default');
            let found = "default";

            // Simple viewport detection
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                        found = section;
                        break;
                    }
                }
            }
            if (found !== currentSection) {
                setCurrentSection(found);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentSection]);

    // Typewriter effect logic
    useEffect(() => {
        const messages = LOG_MESSAGES[currentSection as keyof typeof LOG_MESSAGES] || LOG_MESSAGES.default;
        let msgIndex = 0;
        let charIndex = 0;
        setLogs([]); // Clear logs on section change

        // Typing interval
        const typeInterval = setInterval(() => {
            if (msgIndex >= messages.length) {
                clearInterval(typeInterval);
                return;
            }

            const currentMsg = messages[msgIndex];

            setLogs(prev => {
                const newLogs = [...prev];
                if (newLogs[msgIndex] === undefined) newLogs[msgIndex] = "";

                // Add next char
                if (charIndex < currentMsg.length) {
                    newLogs[msgIndex] = currentMsg.substring(0, charIndex + 1);
                }
                return newLogs;
            });

            charIndex++;

            // End of line?
            if (charIndex > currentMsg.length) {
                charIndex = 0;
                msgIndex++;
            }

        }, 30); // Speed

        return () => clearInterval(typeInterval);
    }, [currentSection]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-auto'}`}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-black/90 text-green-500 border border-green-500/30 backdrop-blur-md rounded-lg p-3 shadow-lg flex items-start gap-3 w-full text-left font-mono text-xs overflow-hidden"
            >
                <Terminal className="w-4 h-4 mt-0.5 shrink-0 animate-pulse" />

                {isExpanded ? (
                    <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-center text-green-500/50 mb-2 pb-2 border-b border-green-500/20">
                            <span>SYSTEM_LOG</span>
                            <span>v1.0.4</span>
                        </div>
                        {logs.map((log, i) => (
                            <div key={i} className="opacity-90 min-h-[1.2em]">{log}</div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1">
                        <span className="opacity-90">{logs[logs.length - 1] || "> SYSTEM_READY"}</span>
                    </div>
                )}
            </button>
        </motion.div>
    );
}
