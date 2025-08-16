import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportSchema, ReportForm } from './schema';
import OperationalSection from './components/OperationalSection';
import ObservationSection from './components/ObservationSection';
import { db } from './db';
import { useAutosave } from './hooks/useAutosave';

const steps = [
  { id: 0, label: 'Operacional' },
  { id: 1, label: 'Observações' },
];

export default function MultiStepReportForm() {
  const form = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: { hasBordaLivre: false, insetosAnimais: false },
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await db.reports.get(1);
      if (data) {
        form.reset(data);
      }
    };
    void load();
  }, [form]);

  useAutosave(form, 1);

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (data: ReportForm) => {
    console.log('submit', data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} aria-label="Report form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div aria-label="Progress">Step {step + 1} of {steps.length}</div>
      {step === 0 && <OperationalSection form={form} />}
      {step === 1 && <ObservationSection form={form} />}
      <div style={{ display: 'flex', gap: 8 }}>
        {step > 0 && (
          <button type="button" onClick={back} aria-label="Previous step">
            Back
          </button>
        )}
        {step < steps.length - 1 && (
          <button type="button" onClick={next} aria-label="Next step">
            Next
          </button>
        )}
        {step === steps.length - 1 && <button type="submit">Submit</button>}
      </div>
    </form>
  );
}
