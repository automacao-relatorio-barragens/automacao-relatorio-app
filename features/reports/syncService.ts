import db from '../../lib/db';

async function fakeUpload(_reportId: string): Promise<void> {
  // stubbed network upload
  return Promise.resolve();
}

export async function syncPendingReports(): Promise<void> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return;
  }
  const items = await db.outbox.toArray();
  for (const item of items) {
    await fakeUpload(item.reportId);
    if (item.id !== undefined) {
      await db.outbox.delete(item.id);
    }
  }
}
