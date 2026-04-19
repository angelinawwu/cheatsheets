"use client";

import { useEffect, useRef } from "react";
import type { Cheatsheet } from "@/app/page";

interface LeftSidebarProps {
  cheatsheets: Cheatsheet[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function LeftSidebar({ cheatsheets, selectedIndex, onSelect }: LeftSidebarProps) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedIndex]);

  return (
    <div className="h-full w-[320px] bg-[#191919] border-r border-white/30 shadow-[0px_12px_20px_0px_rgba(0,5,151,0.05)] flex flex-col gap-3 px-4 py-6 overflow-hidden z-10">
      <div className="border-b border-white/30 pb-3 shrink-0">
        <h1
          className="text-[28px] leading-[32px] tracking-[0.84px] uppercase text-white"
          style={{ fontFamily: "var(--font-bulb)" }}
        >
          Angie&apos;s Cheatsheet Compendium
        </h1>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto">
        {cheatsheets.map((sheet, index) => {
          const isSelected = selectedIndex === index;
          return (
            <button
              key={sheet.id}
              ref={isSelected ? selectedRef : null}
              onClick={() => onSelect(index)}
              className={`px-3 flex items-center text-left text-base tracking-[0.32px] leading-[40px] whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-[#333] text-white"
                  : "text-white/75 hover:bg-white/5"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {sheet.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
