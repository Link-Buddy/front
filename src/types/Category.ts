export interface Category {
  id: number;
  categoryName: string;
  linkCount: number; // 해당 카테고리에 포함된 링크의 개수
  buddyId: number | null;
}

export interface LinkCategory {
  id: number;
  buddyId: number;
  categoryName: string;
  createdAt: Date;
  deleteTf: boolean;
  fileId: number | null;
  shareTypeCd: number;
  updatedAt: Date;
}
