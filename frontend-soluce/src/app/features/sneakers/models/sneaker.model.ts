export interface Sneaker {
  id: number;
  name: string;
  price: number;
  finalPrice: number;
  releaseDate: string;
  colors: string;
  deliveryTime: number;
  deliveryPrice: number;
  reduction: number;
  images: string[];
  available: boolean;
  sizes: number[];
}

export interface SneakerListResponse {
  data: Sneaker[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SneakerFilters {
  page?: number;
  limit?: number;
  search?: string;
  colors?: string;
  sortBy?: 'price' | 'name' | 'release_date';
  sortOrder?: 'asc' | 'desc';
}