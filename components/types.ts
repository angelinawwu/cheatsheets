export interface PDFViewerProps {
  file: string;
  pageNumber: number;
  onNumPages: (n: number) => void;
}
