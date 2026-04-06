"use client";

import { useState, useCallback } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import PDFViewer from "@/components/PDFViewer";
import NavigationControls from "@/components/NavigationControls";

export interface Cheatsheet {
  id: string;
  name: string;
  file: string;
  timeline: string;
  efficacy: number;
  material: string;
}

const cheatsheets: Cheatsheet[] = [
  { id: "CS-GEOG-140-X", name: "CS-GEOG-140-X", file: "CS-GEOG-140-α.pdf", timeline: "1-A", efficacy: 8, material: "LTTR-1S2P" },
  { id: "CS-GEOG-140-Y", name: "CS-GEOG-140-Y", file: "CS-GEOG-140-β.pdf", timeline: "1-B", efficacy: 9, material: "LTTR-1S2P" },
  { id: "CS-MATH-32B-Y", name: "CS-MATH-32B-Y", file: "CS-MATH-32B-β.pdf", timeline: "1-B", efficacy: 10, material: "LTTR-1S2P" },
  { id: "CS-STATS-100A-X", name: "CS-STATS-100A-X", file: "CS-STATS-100A-α.pdf", timeline: "2-A", efficacy: 7, material: "LTTR-1S2P" },
  { id: "CS-STATS-100A-Y", name: "CS-STATS-100A-Y", file: "CS-STATS-100A-β.pdf", timeline: "2-B", efficacy: 8, material: "LTTR-1S2P" },
  { id: "CS-STATS-100B-X", name: "CS-STATS-100B-X", file: "CS-STATS-100B-α.pdf", timeline: "2-A", efficacy: 9, material: "LTTR-1S2P" },
  { id: "CS-STATS-100B-Y", name: "CS-STATS-100B-Y", file: "CS-STATS-100B-β.pdf", timeline: "2-B", efficacy: 7, material: "LTTR-1S2P" },
  { id: "CS-STATS-101A-X", name: "CS-STATS-101A-X", file: "CS-STATS-101A-α.pdf", timeline: "3-A", efficacy: 10, material: "LTTR-1S2P" },
  { id: "CS-STATS-101A-Y", name: "CS-STATS-101A-Y", file: "CS-STATS-101A-β.pdf", timeline: "3-B", efficacy: 8, material: "LTTR-1S2P" },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const selected = cheatsheets[selectedIndex];

  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setCurrentPage(1);
    setNumPages(0);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(numPages, p + 1));
  }, [numPages]);

  const handleNumPages = useCallback((n: number) => {
    setNumPages(n);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-[#111] overflow-hidden">
      <LeftSidebar
        cheatsheets={cheatsheets}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      />

      <PDFViewer
        file={`/assets/${selected.file}`}
        pageNumber={currentPage}
        onNumPages={handleNumPages}
      />

      <NavigationControls
        currentPage={currentPage}
        totalPages={numPages}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <RightSidebar cheatsheet={selected} />
    </div>
  );
}
