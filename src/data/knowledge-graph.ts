export interface KnowledgeNode {
    id: string; // The primary key (e.g., "venture-architecture")
    term: string; // The display term (e.g., "Venture Architecture")
    definition: string; // The 1-2 sentence definition (for hover cards)
    content: string; // Full markdown content for the Wiki page
    relatedTo: string[]; // IDs of related concepts
    contrastsWith?: string[]; // IDs of opposing concepts (e.g., "Manager Mode")
    category: "Philosophy" | "Technical" | "Strategy" | "System";
}

export const knowledgeGraph: KnowledgeNode[] = [
    {
        id: "venture-architecture",
        term: "Venture Architecture",
        definition: "The strategic discipline of building companies as modular, scalable software systems rather than ad-hoc organizations.",
        content: `
# Venture Architecture

**Venture Architecture** is the practice of applying systems engineering principles to business building. Unlike traditional entrepreneurship, which often relies on intuition and human-heavy processes, Venture Architecture treats a company as a codebase.

## Core Principles
1. **Modularity**: Every business function (Sales, Support, Product) is an independent module with defined APIs.
2. **Scalability**: Systems are designed for 100x scale from Day 1.
3. **Automation**: If a process happens twice, it is scripted.

## The Role of the Architect
The Venture Architect is not a CEO in the traditional sense. They are the "Systems Orchestrator", ensuring that the human and digital components of the venture interact seamlessly.
        `,
        relatedTo: ["founder-mode", "system-orchestration"],
        category: "Strategy"
    },
    {
        id: "founder-mode",
        term: "Founder Mode",
        definition: "A management style characterized by direct intervention, high-bandwidth communication, and the rejection of the 'manager-maker' binary.",
        content: `
# Founder Mode

Popularized by Paul Graham, **Founder Mode** is a distinct way of running a company that defies conventional MBA wisdom.

## Manager Mode vs. Founder Mode
*   **Manager Mode**: Hire good people and leave them alone. (Result: Signal loss, bureaucracy).
*   **Founder Mode**: maintain direct lines of communication to the details. (Result: High fidelity, speed).

As an Orchestrator, I operate exclusively in Founder Mode. I do not "delegate and forget"; I "architect and verify".
        `,
        relatedTo: ["venture-architecture"],
        contrastsWith: ["manager-mode"],
        category: "Philosophy"
    },
    {
        id: "system-orchestration",
        term: "System Orchestration",
        definition: "The act of coordinating complex, disparate agents (human or AI) to achieve a unified outcome without improved friction.",
        content: `
# System Orchestration

In the era of AI Agents, **System Orchestration** replaces traditional management. It is the ability to bind together:
*   LLM Agents (for cognitive tasks)
*   Deterministic Code (for reliable execution)
*   Human Operators (for judgment and creativity)

The goal is a "Self-Healing Organization" where the system detects and corrects its own inefficiencies.
        `,
        relatedTo: ["venture-architecture", "agentic-systems"],
        category: "System"
    },
    {
        id: "agentic-systems",
        term: "Agentic Systems",
        definition: "Software architectures where AI models are given autonomy to plan, execute, and verify tasks towards a high-level goal.",
        content: `
# Agentic Systems

**Agentic Systems** are the next evolution of software. Instead of defined "If/Then" logic, these systems operate on "Goal/Check" loops.

## Components of an Agentic System
1.  **The Planner**: Breaks down high-level goals.
2.  **The Executor**: Uses tools (APIs, Browsers) to act.
3.  **The Verifier**: Checks the output against success criteria.

I build Agentic Systems using Next.js and LangChain to automate complex workflows like Market Research (Yagacalls) and Customer Support (Gaari).
        `,
        relatedTo: ["system-orchestration", "rag-pipelines"],
        category: "Technical"
    }
];

export function getTerm(id: string) {
    return knowledgeGraph.find(node => node.id === id);
}

export function getAllTerms() {
    return knowledgeGraph;
}
