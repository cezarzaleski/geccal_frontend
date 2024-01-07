export namespace Book {
  export type Entity = {
    id: string;
    name: string;
    active: boolean;
    edition: string;
    exemplary: number;
    origin: string;
    year: number;
    publisher: string;
    authors: string[];
    createdAt: string;
    status: string;
    deletedAt?: string;
  };
  export type New = {
    name: string;
    edition?: string;
    origin?: string;
    year?: number;
    publisher?: string;
    authors?: string[];
  };
}
