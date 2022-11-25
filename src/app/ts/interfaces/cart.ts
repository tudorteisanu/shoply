import { ProductInterface } from '@/ts/interfaces/product';

export interface CartInterface {
  id: number;
  quantity: number;
  product: ProductInterface;
}
