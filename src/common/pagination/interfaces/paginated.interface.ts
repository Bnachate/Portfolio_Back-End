export interface Paginated<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    // itemCount: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    previous: string;
    next: string;
  };
}
