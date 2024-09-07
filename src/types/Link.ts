export interface Link {
  id: number;
  name: string;
  description: string;
  linkUrl: string;
  categoryId: number | null;
  deleteTf: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  favo?: boolean;
}

export interface CreateLink {
  linkUrl: string;
  name: string;
  description: string;
  categoryId: string;
}
