class Table {
  constructor() {
    this.data = new Map();
  }
  async get(id) {
    return this.data.get(id);
  }
  async put(value) {
    this.data.set(value.id, value);
    return value.id;
  }
  async add(value) {
    const key = value.id ?? this.data.size + 1;
    value.id = key;
    this.data.set(key, value);
    return key;
  }
  async toArray() {
    return Array.from(this.data.values());
  }
  async delete(id) {
    this.data.delete(id);
  }
  async count() {
    return this.data.size;
  }
  async clear() {
    this.data.clear();
  }
}

class AppDB {
  constructor() {
    this.reports = new Table();
    this.photos = new Table();
    this.outbox = new Table();
    this.version = 1;
  }
  async open() {}
  async delete() {
    await Promise.all([
      this.reports.clear(),
      this.photos.clear(),
      this.outbox.clear(),
    ]);
  }
}

const db = new AppDB();
module.exports = db;
