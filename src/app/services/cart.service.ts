import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartInterface, PaginationInterface } from '@/ts/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<PaginationInterface<CartInterface>> {
    return this.http.get<PaginationInterface<CartInterface>>(ApiRoutes.Cart);
  }

  add(productId: number) {
    const addCartUrl = `${ApiRoutes.Cart}/add`;

    return this.http.post<CartInterface>(addCartUrl, { productId });
  }

  update(id: number, payload: Partial<CartInterface>) {
    const updateCartUrl = `${ApiRoutes.Cart}/${id}`;

    return this.http.patch<CartInterface>(updateCartUrl, payload);
  }

  remove(id: number) {
    const addCartUrl = `${ApiRoutes.Cart}/${id}`;

    return this.http.delete<CartInterface>(addCartUrl);
  }

  increaseQuantity(cartId: number): Observable<CartInterface> {
    const increaseCartQuantityUrl = `${ApiRoutes.Cart}/${cartId}/increase-quantity`;

    return this.http.post<CartInterface>(increaseCartQuantityUrl, {});
  }

  reduceQuantity(cartId: number): Observable<CartInterface> {
    const reduceCartQuantityUrl = `${ApiRoutes.Cart}/${cartId}/reduce-quantity`;

    return this.http.post<CartInterface>(reduceCartQuantityUrl, {});
  }
}
