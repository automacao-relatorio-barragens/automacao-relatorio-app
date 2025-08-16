const test = require('node:test');
const assert = require('node:assert/strict');
const db = require('../../../lib/db');
const { syncPendingReports } = require('../syncService');

test('offline creation and later sync', async () => {
  await db.delete();
  await db.open();

  global.navigator = { onLine: false };
  await db.reports.put({ id: 'r1', title: 'draft' });
  const saved = await db.reports.get('r1');
  assert.equal(saved.title, 'draft');

  await db.outbox.add({ reportId: 'r1' });
  assert.equal(await db.outbox.count(), 1);

  await syncPendingReports();
  assert.equal(await db.outbox.count(), 1);

  global.navigator.onLine = true;
  await syncPendingReports();
  assert.equal(await db.outbox.count(), 0);
});
