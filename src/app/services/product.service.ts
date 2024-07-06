import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, productI } from '../../data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<productI[]|[]>();
  constructor(private http: HttpClient, private router: Router) { }

  addSellerPorduct(data: productI) {
    return this.http.post('http://localhost:3000/product',data);
  }

  getProducts() {
    return this.http.get<productI[]>('http://localhost:3000/product');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

  editSellerPorduct( data: productI) {
    return this.http.put<productI>(`http://localhost:3000/product/${data.id}`, data);
  }

  getProduct(id: string) {
    return this.http.get<productI>(`http://localhost:3000/product/${id}`);
  }

  popularProducts() {
    return this.http.get<productI[]>(`http://localhost:3000/product?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<productI[]>(`http://localhost:3000/product?_limit=8`);
  }

  searchProducts(query: string) { 
    return this.http.get<productI[]>(`http://localhost:3000/product?q=${query}`);
  }

  localAddCart(data: productI) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: productI[] = JSON.parse(cartData);
      items = items.filter((item: productI) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }


  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
     return this.http.get<productI[]>(`http://localhost:3000/cart?userId=${userId}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
    })
  }

  removeToCart(cartId: number) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId);
  }

  currentCart() {
    let userData = localStorage.getItem('user');
    let userId = userData && JSON.parse(userData).id;
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=${userId}`);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList() {
    return this.http.get<order[]>('http://localhost:3000/orders');
  }

  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }


  cancelOrder(orderId: number) {
    return this.http.delete('http://localhost:3000/orders/' + orderId);
  }
}
