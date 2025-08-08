// Simple IndexedDB wrapper for local-only persistence
// Stores images (blobs) in objectStore 'photos'

const DB_NAME = 'rakhi_site';
const DB_VERSION = 1;
const STORE_PHOTOS = 'photos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
        db.createObjectStore(STORE_PHOTOS);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function setPhoto(index: number, file: File | Blob | null): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PHOTOS, 'readwrite');
    const store = tx.objectStore(STORE_PHOTOS);
    const key = `photo-${index}`;
    const req = file ? store.put(file, key) : store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getPhoto(index: number): Promise<Blob | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_PHOTOS, 'readonly');
    const store = tx.objectStore(STORE_PHOTOS);
    const req = store.get(`photo-${index}`);
    req.onsuccess = () => resolve((req.result as Blob) || null);
    req.onerror = () => reject(req.error);
  });
}

// Letter text is small, safe to keep in localStorage
const LETTER_KEY = 'rakhi_letter_text';
export function saveLetter(text: string) {
  localStorage.setItem(LETTER_KEY, text);
}
export function loadLetter(): string | null {
  return localStorage.getItem(LETTER_KEY);
}
