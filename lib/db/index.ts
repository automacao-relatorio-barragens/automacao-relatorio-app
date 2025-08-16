export interface Report {
  id: string;
  title?: string;
}

export interface Photo {
  id: string;
  reportId: string;
  uri: string;
}

export interface OutboxItem {
  id?: number;
  reportId: string;
}

class Table<T extends { id?: any }> {
  private data = new Map<any, T>();
  async get(id: any): Promise<T | undefined> {
    return this.data.get(id);
  }
  async put(value: T): Promise<any> {
    this.data.set(value.id, value);
    return value.id;
  }
  async add(value: T): Promise<any> {
    const key = value.id ?? this.data.size + 1;
    (value as any).id = key;
    this.data.set(key, value);
    return key;
  }
  async toArray(): Promise<T[]> {
    return Array.from(this.data.values());
  }
  async delete(id: any): Promise<void> {
    this.data.delete(id);
  }
  async count(): Promise<number> {
    return this.data.size;
  }
  async clear(): Promise<void> {
    this.data.clear();
  }
}

class AppDB {
  reports = new Table<Report>();
  photos = new Table<Photo>();
  outbox = new Table<OutboxItem>();
  /**
   * Simulated versioned schema for migrations
   */
  version = 1;
  async open(): Promise<void> {
    // no-op for in-memory store
  }
  async delete(): Promise<void> {
    await Promise.all([
      this.reports.clear(),
      this.photos.clear(),
      this.outbox.clear(),
    ]);
  }
}

const db = new AppDB();
export default db;
