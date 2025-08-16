import { useEffect, useState } from 'react';
import db, { Report } from '../../../lib/db';

export function useReportDraft(id: string) {
  const [draft, setDraft] = useState<Report>({ id });

  // load existing draft
  useEffect(() => {
    let active = true;
    db.reports.get(id).then((saved) => {
      if (saved && active) {
        setDraft(saved);
      }
    });
    return () => {
      active = false;
    };
  }, [id]);

  // autosave on change
  useEffect(() => {
    db.reports.put(draft);
  }, [draft]);

  const updateDraft = (changes: Partial<Report>) => {
    setDraft((prev) => ({ ...prev, ...changes }));
  };

  return { draft, updateDraft };
}
