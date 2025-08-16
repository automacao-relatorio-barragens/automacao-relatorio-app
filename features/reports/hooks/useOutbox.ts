import { useEffect, useState } from 'react';
import db, { OutboxItem } from '../../../lib/db';

export function useOutbox() {
  const [pending, setPending] = useState<OutboxItem[]>([]);

  useEffect(() => {
    db.outbox.toArray().then(setPending);
  }, []);

  const queueExport = async (reportId: string) => {
    await db.outbox.add({ reportId });
    setPending(await db.outbox.toArray());
  };

  return { pending, queueExport };
}
