import { Sneaker } from '../models/sneaker.model';

export interface SneakerResponseDto {
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

export interface PaginatedSneakersDto {
  data: SneakerResponseDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SneakerQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  colors?: string;
  sortBy?: 'price' | 'name' | 'release_date';
  sortOrder?: 'asc' | 'desc';
}

export function toSneakerResponseDto(sneaker: Sneaker): SneakerResponseDto {
  const images = [sneaker.img_1, sneaker.img_2, sneaker.img_3].filter(img => img !== '');
  const finalPrice = sneaker.reduction > 0
    ? Math.round(sneaker.price * (1 - sneaker.reduction / 100) * 100) / 100
    : sneaker.price;

  return {
    id: sneaker.id,
    name: sneaker.name,
    price: sneaker.price,
    finalPrice,
    releaseDate: sneaker.release_date,
    colors: sneaker.colors,
    deliveryTime: sneaker.delivery_time,
    deliveryPrice: sneaker.delivery_price,
    reduction: sneaker.reduction,
    images,
    available: sneaker.available,
    sizes: sneaker.sizes.split(';').map(s => parseFloat(s)),
  };
}
