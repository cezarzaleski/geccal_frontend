export interface Book {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Results {
  items: Book[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export interface BooksParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean
}
