"use client";

import dynamic from "next/dynamic";
import type { PDFViewerProps } from "@/components/types";

const PDFViewerInner = dynamic(() => import("@/components/PDFViewerInner"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-[#191919] h-full">
      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function PDFViewer(props: PDFViewerProps) {
  return (
    <div className="absolute left-[320px] right-[320px] top-8 bottom-20 flex items-center justify-center overflow-hidden">
      <div className="shadow-[0px_13px_22px_0px_rgba(0,5,151,0.05)] h-full">
        <PDFViewerInner {...props} />
      </div>
    </div>
  );
}
