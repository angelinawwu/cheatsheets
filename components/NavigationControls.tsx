"use client";

import { motion } from "framer-motion";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface NavigationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function NavigationControls({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: NavigationControlsProps) {
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="absolute left-[320px] right-[320px] bottom-6 flex items-center justify-center z-20">
      <div className="bg-[#191919] border border-white/30 shadow-[0px_12px_20px_0px_rgba(0,5,151,0.05)] flex gap-2.5 items-center px-3 py-2">
        <motion.button
          onClick={onPrev}
          disabled={!canPrev}
          className="w-6 h-6 flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-default"
          whileHover={canPrev ? { scale: 1.15 } : {}}
          whileTap={canPrev ? { scale: 0.9 } : {}}
          transition={{ type: "tween", duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform" }}
        >
          <CaretLeft size={20} weight="bold" className="text-white/75" />
        </motion.button>

        <span
          className="text-base tracking-[0.32px] leading-6 text-white/75 whitespace-nowrap tabular-nums"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {currentPage}/{totalPages}
        </span>

        <motion.button
          onClick={onNext}
          disabled={!canNext}
          className="w-6 h-6 flex items-center justify-center disabled:opacity-30 cursor-pointer disabled:cursor-default"
          whileHover={canNext ? { scale: 1.15 } : {}}
          whileTap={canNext ? { scale: 0.9 } : {}}
          transition={{ type: "tween", duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform" }}
        >
          <CaretRight size={20} weight="bold" className="text-white/75" />
        </motion.button>
      </div>
    </div>
  );
}
