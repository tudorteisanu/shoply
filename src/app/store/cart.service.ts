import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { CartInterface, PaginationInterface } from '@/ts/interfaces';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: BehaviorSubject<CartInterface[]> = new BehaviorSubject<
    CartInterface[]
  >([]);
  discount: BehaviorSubject<number> = new BehaviorSubject<number>(5);

  constructor(private http: HttpClient) {
    this.fetchCart().subscribe();
  }

  get count(): Observable<number> {
    return this.items.pipe(map((items) => items.length));
  }

  get subtotal(): Observable<number> {
    return this.items.pipe(
      map((items) =>
        items.reduce((total, item) => {
          return total + item.quantity * item.product.price;
        }, 0)
      )
    );
  }

  get total(): Observable<number> {
    return this.subtotal.pipe(map((value) => value - this.discount.getValue()));
  }

  get showCartItems(): Observable<boolean> {
    return of(!!this.items.getValue().length);
  }

  fetchCart(): Observable<PaginationInterface<CartInterface>> {
    return this.http
      .get<PaginationInterface<CartInterface>>(ApiRoutes.Cart)
      .pipe(
        map((cart) => {
          this.items.next(cart.data.sort(this.sortById));
          return cart;
        })
      );
  }

  add(productId: number) {
    const addCartUrl = `${ApiRoutes.Cart}/add`;

    return this.http.post<CartInterface>(addCartUrl, { productId }).pipe(
      map((cart) => {
        this.update(cart);
        return cart;
      })
    );
  }

  updateItem(id: number, payload: Partial<CartInterface>) {
    const updateCartUrl = `${ApiRoutes.Cart}/${id}`;

    return this.http.patch<CartInterface>(updateCartUrl, payload).pipe(
      map((cart) => {
        this.update(cart);
        return cart;
      })
    );
  }

  remove(id: number) {
    const addCartUrl = `${ApiRoutes.Cart}/${id}`;

    return this.http.delete<CartInterface>(addCartUrl).pipe(
      map((cart) => {
        this.items.next(this.items.getValue().filter((item) => item.id !== id));
        return cart;
      })
    );
  }

  increaseQuantity(cartId: number): Observable<CartInterface> {
    const increaseCartQuantityUrl = `${ApiRoutes.Cart}/${cartId}/increase-quantity`;

    return this.http.post<CartInterface>(increaseCartQuantityUrl, {}).pipe(
      map((cart) => {
        this.update(cart);
        return cart;
      })
    );
  }

  reduceQuantity(cartId: number): Observable<CartInterface> {
    const reduceCartQuantityUrl = `${ApiRoutes.Cart}/${cartId}/reduce-quantity`;

    return this.http.post<CartInterface>(reduceCartQuantityUrl, {}).pipe(
      map((cart) => {
        this.update(cart);
        return cart;
      })
    );
  }

  update(cart: CartInterface): void {
    this.items.next(
      [
        ...this.items.getValue().filter((item) => item.id !== cart.id),
        cart,
      ].sort(this.sortById)
    );
  }

  sortById(prevItem: CartInterface, currentItem: CartInterface) {
    return prevItem.id - currentItem.id;
  }
}
