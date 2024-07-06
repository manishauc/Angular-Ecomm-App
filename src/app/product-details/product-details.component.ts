import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, productI } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  productDetails: undefined | productI;
  quantityVal: number = 1;
  removeCart = false;
  cartData: productI | undefined;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) { }

  //[START:: ONINIT]
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productDetails = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: productI) => productId === item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);

        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: productI) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }


    })
  }
  //[END:: ONINIT]

  //[START:: CHANGE QUANTITY OF PRODUCT]
  handleQuantity(val: string) {
    if (val === 'min' && this.quantityVal > 1) {
      this.quantityVal = this.quantityVal - 1;
    } else if (val === 'plus' && this.quantityVal<20) {
      this.quantityVal = this.quantityVal + 1;
    }
  }
  //[END:: CHANGE QUANTITY OF PRODUCT]


  //[START:: ADD PRODUCT TO CART]
  addToCart() {
    if (this.productDetails) {    
      this.productDetails.quantity = this.quantityVal;
      if (!localStorage.getItem('user')) {
        this.productService.localAddCart(this.productDetails);
        this.removeCart = true;
      } else {
        let userData = localStorage.getItem('user');
        let userId = userData && JSON.parse(userData).id;
        

        let cartData: cart = {
          ...this.productDetails,
          productId: this.productDetails.id,
          userId
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        })

      }
    }
  }
  //[END:: ADD PRODUCT TO CART]

  //[START:: REMOVE PRODUCT FROM CART]
  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
      this.removeCart = false;

    } else {
      console.warn("cartData"+this.cartData);
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result) => {
        
        if (result) {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
          this.removeCart = false;
        }
      })
     
    }

    
  }
  //[END:: REMOVE PRODUCT FROM CART]
}
