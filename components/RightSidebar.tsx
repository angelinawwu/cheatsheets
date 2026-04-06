"use client";

import type { Cheatsheet } from "@/app/page";

interface RightSidebarProps {
  cheatsheet: Cheatsheet;
}

export default function RightSidebar({ cheatsheet }: RightSidebarProps) {
  const filled = cheatsheet.efficacy;
  const empty = 10 - filled;
  const efficacyBar = "■".repeat(filled) + "□".repeat(empty);

  return (
    <div className="absolute right-0 top-0 h-full w-[320px] bg-[#191919] border-l border-white/30 shadow-[0px_12px_20px_0px_rgba(0,5,151,0.05)] flex flex-col gap-3 px-3 py-6 overflow-hidden z-10">
        <div
          key={cheatsheet.id}
          className="flex flex-col gap-3"
        >
          <div className="border-b border-white/30 pb-3">
            <h2
              className="text-[28px] leading-[32px] tracking-[0.84px] text-white"
              style={{ fontFamily: "var(--font-bulb)" }}
            >
              {cheatsheet.name}
            </h2>
          </div>

          <div
            className="flex flex-col gap-3 text-base tracking-[0.32px] leading-6 text-white/75 whitespace-nowrap"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <div className="flex gap-3 items-center">
              <span>TIMELINE:</span>
              <span>{cheatsheet.timeline}</span>
            </div>

            <div className="flex gap-3 items-center">
              <span>EFFICACY:</span>
              <span>{efficacyBar}</span>
            </div>

            <div className="flex gap-3 items-center">
              <span>MATERIAL:</span>
              <span>{cheatsheet.material}</span>
            </div>

            <div className="flex flex-col">
              <span>CONTEXT:</span>
              <span>{cheatsheet.name}</span>
            </div>

            <div className="flex flex-col">
              <span>DESCRIPTION:</span>
              <span>{cheatsheet.name}</span>
            </div>
          </div>
        </div>
    </div>
  );
}
