export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    logId: string;
    success: boolean;
    responseCode: string;
    responseMessage: string;
    version: string;
    data: T;
}

export interface News {
    id: number;
    title: string;
    summary: string;
    content: string;
    imageUrl: string;
    author: string;
    category: string;
    isActive: boolean;
    isPublished: boolean;
    startDate: string;
    endDate: string;
    publishedAt: string;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    updatedBy: number;
    deletedAt: string;
    deletedBy: number;
}

export type NewsResponse = ApiResponse<{
    items: News[];
    pagination: Pagination;
}>;
export interface CarouselProps {
    items: News[];
}