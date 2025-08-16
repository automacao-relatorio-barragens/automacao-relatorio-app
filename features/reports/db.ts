import Dexie, { Table } from 'dexie';
import type { ReportForm } from './schema';

export interface ReportRecord extends ReportForm {
  id?: number;
}

class ReportsDB extends Dexie {
  reports!: Table<ReportRecord, number>;
  constructor() {
    super('ReportsDB');
    this.version(1).stores({
      reports: '++id'
    });
  }
}

export const db = new ReportsDB();
