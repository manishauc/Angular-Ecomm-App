import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
   
  };
  constructor(private router: Router, private productService: ProductService) {
  }
  ngOnInit() {
    this.loadDetails();
  }

  loadDetails() {
    this.productService.currentCart().subscribe((result) => {
      if (result) {
        this.cartData = result;
        let price: number = 0;
        result.forEach((item) => {

          if (item.quantity) {
            price = price + (item.price * +item.quantity);

          }
        });
        this.priceSummary.price = price;
        this.priceSummary.discount = price / 10;
        this.priceSummary.tax = price / 10;
        this.priceSummary.delivery = 100;
        this.priceSummary.total = price + (price / 10) + 100 - (price / 10);

        if (!this.cartData?.length) {
          this.router.navigate(['/']);
        }
      }
    })

    
  }



  removeToCart(cartId: number | undefined) {
    cartId && this.productService.removeToCart(cartId).subscribe((result) => {
      if (result) {
        this.loadDetails();
      }
    })
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
