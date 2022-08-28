export interface Publisher {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Results {
  items: Publisher[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}
