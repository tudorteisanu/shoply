export interface ProductInterface {
  id: number;
  imageUrl: string;
  name?: string;
  price?: string;
}

export interface CartInterface extends ProductInterface {
 quantity?: number;
}
