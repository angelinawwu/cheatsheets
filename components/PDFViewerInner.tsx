"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { PDFViewerProps } from "@/components/types";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewerInner({ file, pageNumber, onNumPages }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(660);

  useEffect(() => {
    function updateSize() {
      const el = containerRef.current?.parentElement?.parentElement;
      if (!el) return;
      setWidth(Math.min(el.clientWidth * 0.7, 660));
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    onNumPages(numPages);
  }

  return (
    <div ref={containerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div
            className="flex items-center justify-center bg-[#191919]"
            style={{ width, height: width * 1.3 }}
          >
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
          </div>
        }
      >
          <div key={`${file}-${pageNumber}`}>
            <Page
              pageNumber={pageNumber}
              width={width}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
      </Document>
    </div>
  );
}
