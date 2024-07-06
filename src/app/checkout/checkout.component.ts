import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, priceSummary } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit() {
    this.productService.currentCart().subscribe((result) => {
      if (result) {
        this.cartData = result;
        let price: number = 0;
        result.forEach((item) => {
          if (item.quantity) {
            price = price + (item.price * +item.quantity);
          }
        });
        this.totalPrice = price + (price / 10) + 100 - (price / 10);
      }
    })
  }


  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id);
        }, 700);
      })
      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "order has been Placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.route.navigate(['/my-orders']);
          }, 4000);
          
        }
        
      })
    }
  }
}
