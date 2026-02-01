export interface Sneaker {
  id: number;
  name: string;
  price: number;
  release_date: string;
  colors: string;
  delivery_time: number;
  delivery_price: number;
  reduction: number;
  img_1: string;
  img_2: string;
  img_3: string;
  available: boolean;
  sizes: string;
}

export interface SneakersData {
  sneakers: Sneaker[];
}
