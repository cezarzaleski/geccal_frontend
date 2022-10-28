export interface Author {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
}

export interface Results {
  items: Author[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export interface AuthorParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean
}
