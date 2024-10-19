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

export interface UpdateLink {
    id: number;
    linkUrl: string;
    name: string;
    description: string;
    categoryId: number | null;
}

export interface SearchLink {
    buddyName: string | null;
    categoryName: string;
    shareTypeCd: number;
    linkDescription: string;
    linkName: string;
    linkUrl: string;
}
