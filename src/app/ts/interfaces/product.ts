import { MediaInterface } from '@/ts/interfaces/media';

export interface ProductInterface {
  id: number;
  imageUrl: string;
  name?: string;
  price: number;
  thumbs?: MediaInterface[];
}
