export interface Book {
  status?: string;
  id: string;
  name: string;
  active: boolean;
  edition?: string;
  exemplary?: number;
  origin?: string;
  year?: number;
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
