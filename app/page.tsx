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
  context: string;
  description: string;
}

const cheatsheets: Cheatsheet[] = [
  { 
    id: "CS-GEOG-140-X", 
    name: "CS-GEOG-140-X", 
    file: "CS-GEOG-140-α.pdf", 
    timeline: "1-B", 
    efficacy: 8, 
    material: "LTTR-1S2P",
    context: "Document recovered from Timeline 1-B during Operation ████████. Subject matter pertains to spatial analysis methodologies and geographic information systems utilized in ███████ research protocols.",
    description: "Artifact CS-GEOG-140-X contains comprehensive notation regarding terrestrial coordinate systems, cartographic projection techniques, and [REDACTED] spatial data manipulation procedures. Material composition analysis indicates standard LTTR-1S2P substrate. Efficacy rating of 8/10 suggests moderate informational density with acceptable retention characteristics."
  },
  { 
    id: "CS-GEOG-140-Y", 
    name: "CS-GEOG-140-Y", 
    file: "CS-GEOG-140-β.pdf", 
    timeline: "1-B", 
    efficacy: 9, 
    material: "LTTR-1S2P",
    context: "Secondary geographic intelligence document extracted from Timeline 1-B. Represents an alternate iteration of CS-GEOG-140-X with notable divergences in ████████ and remote sensing applications.",
    description: "Document exhibits enhanced coverage of raster analysis, vector operations, and geostatistical methods compared to X-variant. Contains supplementary material on [DATA EXPUNGED] and spatial interpolation techniques. Elevated efficacy rating (9/10) indicates superior organizational structure and knowledge compression. Cross-timeline comparison reveals ██% content overlap with X-series."
  },
  { 
    id: "CS-MATH-32B-Y", 
    name: "CS-MATH-32B-Y", 
    file: "CS-MATH-32B-β.pdf", 
    timeline: "1-C", 
    efficacy: 10, 
    material: "LTTR-1S2P",
    context: "Highly classified mathematical reference material originating from Timeline 1-C. Subject focuses on multivariable calculus applications and ███████ dimensional analysis frameworks.",
    description: "Artifact demonstrates exceptional informational architecture covering vector calculus, partial differentiation, multiple integration, and [REDACTED] transformation theory. Maximum efficacy rating (10/10) achieved through optimal notation density and systematic theorem organization. Document contains █ pages of supplementary proofs and ████████ applications. Material shows no signs of temporal degradation."
  },
  { 
    id: "CS-STATS-100A-X", 
    name: "CS-STATS-100A-X", 
    file: "CS-STATS-100A-α.pdf", 
    timeline: "2-A", 
    efficacy: 4, 
    material: "LTTR-1S2P",
    context: "Statistical methodology compendium retrieved from Timeline 2-A. Pertains to foundational probability theory and inferential techniques employed in ████████ experimental protocols.",
    description: "Document CS-STATS-100A-X catalogs probability distributions, sampling methodologies, and hypothesis testing frameworks. Contains detailed exposition of [REDACTED] estimation procedures and confidence interval construction. Low efficacy rating (4/10) attributed to verbose explanatory sections and suboptimal information compression. Substrate analysis confirms standard LTTR-1S2P composition with ███ anomalies detected."
  },
  { 
    id: "CS-STATS-100A-Y", 
    name: "CS-STATS-100A-Y", 
    file: "CS-STATS-100A-β.pdf", 
    timeline: "2-A", 
    efficacy: 3, 
    material: "LTTR-1S2P",
    context: "Parallel statistical reference extracted from Timeline 2-A. Represents degraded iteration of foundational probability concepts with compromised ████████ integration.",
    description: "Y-variant exhibits severe degradation in informational architecture compared to X-series. While incorporating treatment of random variables, expectation theory, and [DATA EXPUNGED] convergence theorems, critical efficacy reduction to 3/10 indicates substantial organizational deficiencies and excessive redundancy. Document demonstrates ██% divergence from X-series, with inferior problem set curation and compromised ████████ applications. Material integrity questionable."
  },
  { 
    id: "CS-STATS-100B-X", 
    name: "CS-STATS-100B-X", 
    file: "CS-STATS-100B-α.pdf", 
    timeline: "2-B", 
    efficacy: 9, 
    material: "LTTR-1S2P",
    context: "Advanced statistical inference documentation from Timeline 2-B. Constitutes sequential material to CS-STATS-100A-X with focus on ████████ regression analysis and experimental design.",
    description: "Artifact contains comprehensive treatment of linear models, analysis of variance, and [REDACTED] multivariate techniques. High efficacy rating (9/10) achieved through systematic presentation of maximum likelihood estimation, Bayesian inference, and ████████ computational methods. Material demonstrates exceptional clarity in ███ sections pertaining to model diagnostics and assumption validation."
  },
  { 
    id: "CS-STATS-100B-Y", 
    name: "CS-STATS-100B-Y", 
    file: "CS-STATS-100B-β.pdf", 
    timeline: "2-B", 
    efficacy: 7, 
    material: "LTTR-1S2P",
    context: "Alternate timeline variant of advanced statistical methods documentation. Recovered from Timeline 2-B during ████████ retrieval operation. Shows significant methodological divergence from X-series.",
    description: "Document exhibits alternative pedagogical approach emphasizing [REDACTED] nonparametric methods and robust estimation techniques. Efficacy reduction to 7/10 attributed to ████████ organizational inconsistencies and incomplete coverage of ███ topics. Contains unique material on bootstrap procedures and ████████ resampling theory absent from X-series. Cross-reference with CS-STATS-100B-X recommended for comprehensive understanding."
  },
  { 
    id: "CS-STATS-101A-X", 
    name: "CS-STATS-101A-X", 
    file: "CS-STATS-101A-α.pdf", 
    timeline: "2-B", 
    efficacy: 10, 
    material: "LTTR-1S2P",
    context: "Highly sensitive statistical theory compendium from Timeline 2-B. Contains advanced material on ████████ stochastic processes and theoretical foundations of ███████ inference systems.",
    description: "Exceptional artifact demonstrating maximum efficacy (10/10) through masterful integration of measure-theoretic probability, asymptotic theory, and [DATA EXPUNGED] statistical decision frameworks. Document includes rigorous treatment of sufficient statistics, exponential families, and ████████ optimality criteria. Material quality suggests origin from ███████ academic institution. Contains █ appendices with supplementary ████████ derivations and proof techniques."
  },
  { 
    id: "CS-STATS-101A-Y", 
    name: "CS-STATS-101A-Y", 
    file: "CS-STATS-101A-β.pdf", 
    timeline: "2-B", 
    efficacy: 8, 
    material: "LTTR-1S2P",
    context: "Parallel advanced statistics documentation extracted from Timeline 2-B. Represents alternative theoretical framework with emphasis on ████████ computational approaches and modern inference paradigms.",
    description: "Y-variant incorporates contemporary perspectives on statistical learning, [REDACTED] regularization methods, and high-dimensional inference. Efficacy rating of 8/10 reflects trade-off between breadth of coverage and depth of theoretical rigor. Document contains unique sections on ████████ empirical processes and ███ concentration inequalities. Material demonstrates ██% overlap with X-series in core theoretical content while diverging significantly in ████████ applications and computational examples."
  },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
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
