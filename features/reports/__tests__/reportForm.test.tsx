import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MultiStepReportForm } from '..';
import { db } from '../db';

describe('MultiStepReportForm', () => {
  beforeEach(async () => {
    await db.reports.clear();
  });

  it('shows conditional field when checkbox checked', async () => {
    render(<MultiStepReportForm />);
    expect(screen.queryByLabelText('Medida (m)')).toBeNull();
    fireEvent.click(screen.getByLabelText('Has free board'));
    expect(await screen.findByLabelText('Medida (m)')).toBeInTheDocument();
  });

  it('autosaves values to indexeddb', async () => {
    render(<MultiStepReportForm />);
    fireEvent.click(screen.getByLabelText('Has free board'));
    const input = await screen.findByLabelText('Medida (m)');
    fireEvent.change(input, { target: { value: '2' } });

    await waitFor(async () => {
      const rec = await db.reports.get(1);
      expect(rec?.bordaLivreOperacionalMedidaM).toBe(2);
    });
  });
});
