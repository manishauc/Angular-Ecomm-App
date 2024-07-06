import { NgSwitch } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productI } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  menuType: string = "default";
  sellerName: string = '';
  searchResult: undefined | productI[];
  userName: string = '';
  cartItems=0;
  constructor(private route: Router, private productService: ProductService) { }

  //[START:: ONINIT]
  ngOnInit(): void{

    //[START:: CHANGE HEADER AS PER LOGIN]
    this.route.events.subscribe((val:any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          
        } else if (localStorage.getItem('user')) {
         
          let userStorage = localStorage.getItem('user');
          let userData = userStorage && JSON.parse(userStorage);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);

        }else {
          this.menuType = "default";
        }
      }
    });
    //[END:: CHANGE HEADER AS PER LOGIN]

    //[START:: CART CHANGES]
     let cartData = localStorage.getItem('localCart');
    
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
    //[END:: CART CHANGES]
    

  }
  //[START:: ONINIT]

  //[START:: SEARCH PRODUCT]
  searchPorduct(query:KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        if (result.length > 3) {
          result.length = 3;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }
  //[END:: SEARCH PRODUCT]

  redirectToDetails(id:number) {
    this.route.navigate([`/details/${id}`]);
  }

  //[START:: SELLER LOGOUT]
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  //[END:: SELLER LOGOUT]

  //[START:: USER LOGOUT]
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
    this.productService.cartData.emit([]);
  }
  //[END:: USER LOGOUT]
}
