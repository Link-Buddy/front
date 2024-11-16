// src/utils/storage.ts
export const saveAccessKey = (accessKey: string): void => {
  localStorage.setItem('accessKey', accessKey);
};

export const getAccessKey = (): string | null => {
  return localStorage.getItem('accessKey');
};

export const removeAccessKey = (): void => {
  localStorage.removeItem('accessKey');
};
export const saveRefreshKey = (refreshKey: string): void => {
  localStorage.setItem('refreshKey', refreshKey);
};
