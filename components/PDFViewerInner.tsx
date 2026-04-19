"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { PDFViewerProps } from "@/components/types";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewerInner({ file, pageNumber, onNumPages }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 660, height: 858 });

  useEffect(() => {
    function updateSize() {
      const el = containerRef.current?.parentElement?.parentElement;
      if (!el) return;
      
      const availableHeight = el.clientHeight;
      const availableWidth = el.clientWidth;
      
      const pdfAspectRatio = 8.5 / 11;
      
      const widthBasedOnHeight = availableHeight * pdfAspectRatio;
      const heightBasedOnWidth = availableWidth / pdfAspectRatio;
      
      let finalWidth: number;
      let finalHeight: number;
      
      if (widthBasedOnHeight <= availableWidth) {
        finalHeight = availableHeight;
        finalWidth = widthBasedOnHeight;
      } else {
        finalWidth = availableWidth;
        finalHeight = heightBasedOnWidth;
      }
      
      setDimensions({ width: finalWidth, height: finalHeight });
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
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
          </div>
        }
      >
          <div key={`${file}-${pageNumber}`} style={{ filter: "grayscale(1)" }}>
            <Page
              pageNumber={pageNumber}
              height={dimensions.height}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
      </Document>
    </div>
  );
}
