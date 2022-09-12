export interface Publisher {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
}

export interface Results {
  items: Publisher[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export interface PublisherParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean
}
