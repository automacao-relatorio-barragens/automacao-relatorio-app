import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRiskScore,
  buildSummaryBlock,
  RiskOption,
} from '../riskScore';
import { generatePdf, generatePreview } from '../pdf';

test('calculates total for single option', () => {
  const result = calculateRiskScore(['medium']);
  assert.equal(result.total, 2);
  assert.deepEqual(result.breakdown, [{ option: 'medium', value: 2 }]);
});

test('calculates total for multiple options', () => {
  const result = calculateRiskScore(['low', 'high', 'medium']);
  assert.equal(result.total, 6); // 1 + 3 + 2
});

test('builds summary block with aggregate score', () => {
  const summary = buildSummaryBlock(['high', 'high']);
  assert.equal(summary, 'Aggregate risk score: 6');
});

test('handles empty selections with zero score', () => {
  const result = calculateRiskScore([] as RiskOption[]);
  assert.equal(result.total, 0);
  assert.deepEqual(result.breakdown, []);
});

test('generatePdf includes summary block', () => {
  const pdf = generatePdf(['low', 'medium']);
  assert.ok(pdf.includes('Aggregate risk score: 3'));
});

test('generatePreview mirrors PDF summary', () => {
  const preview = generatePreview(['high']);
  assert.equal(preview, 'Aggregate risk score: 3');
});
