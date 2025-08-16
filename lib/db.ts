export interface ImageEntry {
  id: string;
  file: File;
  title: string;
  caption: string;
  tags: string;
}

export interface Draft {
  id: string;
  images: ImageEntry[];
}

const DB_NAME = 'reportDB';
const DB_VERSION = 1;
const STORE = 'drafts';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function saveDraft(draft: Draft): Promise<void> {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readwrite');
  tx.objectStore(STORE).put(draft);
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getDraft(id: string): Promise<Draft | undefined> {
  const db = await openDB();
  const tx = db.transaction(STORE, 'readonly');
  const request = tx.objectStore(STORE).get(id);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as Draft | undefined);
    request.onerror = () => reject(request.error);
  });
}
