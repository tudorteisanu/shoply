import { MediaInterface } from '@/ts/interfaces/media';

export interface ProductInterface {
  id: number;
  imageUrl: string;
  name?: string;
  price: number;
  thumbs?: MediaInterface[];
}

export interface CartInterface {
  id: number;
  quantity: number;
  product: ProductInterface;
}
