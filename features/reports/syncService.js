const db = require('../../lib/db');

async function fakeUpload(_reportId) {
  return Promise.resolve();
}

async function syncPendingReports() {
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

module.exports = { syncPendingReports };
