export interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

const STORAGE_KEY = 'intern_rating_files';

export const saveFile = async (file: File): Promise<AttachedFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const attachedFile: AttachedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: e.target?.result as string,
        uploadedAt: new Date().toISOString(),
      };
      
      // Store file reference
      const files = getFiles();
      files.push(attachedFile);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
      
      resolve(attachedFile);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

export const getFiles = (): AttachedFile[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getFile = (id: string): AttachedFile | undefined => {
  const files = getFiles();
  return files.find(f => f.id === id);
};

export const deleteFile = (id: string): void => {
  const files = getFiles();
  const filtered = files.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};
