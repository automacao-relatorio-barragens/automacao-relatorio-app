export type RiskOption = 'low' | 'medium' | 'high';

// Numeric values associated with each risk option
export const RISK_OPTION_VALUES: Record<RiskOption, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export interface ScoreBreakdown {
  option: RiskOption;
  value: number;
}

export interface ScoreResult {
  total: number;
  breakdown: ScoreBreakdown[];
}

/**
 * Maps a list of selected risk options to their numeric values and returns
 * the aggregate score.
 */
export function calculateRiskScore(selections: RiskOption[]): ScoreResult {
  const breakdown = selections.map((option) => ({
    option,
    value: RISK_OPTION_VALUES[option] ?? 0,
  }));
  const total = breakdown.reduce((sum, item) => sum + item.value, 0);
  return { total, breakdown };
}

/**
 * Builds a summary block to be displayed in both preview and PDF output.
 */
export function buildSummaryBlock(selections: RiskOption[]): string {
  const { total } = calculateRiskScore(selections);
  return `Aggregate risk score: ${total}`;
}
