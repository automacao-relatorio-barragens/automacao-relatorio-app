import { useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { db } from '../db';
import { ReportForm } from '../schema';

export function useAutosave(form: UseFormReturn<ReportForm>, id: number = 1) {
  const values = useWatch({ control: form.control });

  useEffect(() => {
    const save = async () => {
      await db.reports.put({ id, ...values });
    };
    void save();
  }, [values, id]);
}
