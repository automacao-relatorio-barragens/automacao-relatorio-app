import { RiskOption, buildSummaryBlock } from './riskScore';

/**
 * Generates a simple string-based PDF representation including the summary
 * block with the aggregate risk score. In the real application this would
 * interface with a PDF library.
 */
export function generatePdf(selections: RiskOption[]): string {
  const summary = buildSummaryBlock(selections);
  // In a real implementation the summary would be added to the PDF document.
  return `PDF Report\n${summary}`;
}

/**
 * Creates a preview representation containing the same summary block that
 * will appear in the final PDF.
 */
export function generatePreview(selections: RiskOption[]): string {
  return buildSummaryBlock(selections);
}
