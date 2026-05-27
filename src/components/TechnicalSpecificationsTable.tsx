import React from "react";

export interface SpecRow {
  parameter: string;
  value: string;
}

interface TechnicalSpecificationsTableProps {
  specs: SpecRow[];
  title?: string;
}

export function TechnicalSpecificationsTable({ specs, title }: TechnicalSpecificationsTableProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="w-full overflow-hidden border border-[#0F5132]/12 rounded-xl bg-[#FFFDF8] mt-8">
      <div className="bg-[#EAF7EF] px-6 py-3 border-b border-[#0F5132]/12">
        <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold">
          {title || "Technical Specifications & Architectural Parameters"}
        </h4>
      </div>
      <table className="w-full text-left border-collapse text-sm">
        <tbody>
          {specs.map((spec, idx) => (
            <tr
              key={idx}
              className="border-b border-[#0F5132]/6 last:border-0 hover:bg-[#EAF7EF]/20 transition-colors"
            >
              <td className="px-6 py-4 font-mono text-[11px] text-[#0F5132]/80 font-bold bg-[#F7F4EC]/40 w-1/3 border-r border-[#0F5132]/6">
                {spec.parameter}
              </td>
              <td className="px-6 py-4 text-[#171717]/90 font-medium text-xs md:text-sm">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
