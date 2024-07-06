import { Component, OnInit } from '@angular/core';
import { cart, productI, userLogin, userSignup } from '../../data-types';
import { ProductService } from '../services/product.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private userService: UsersService, private productService: ProductService) {

  }
  ngOnInit() {
    this.userService.userAuthReload();
  }
  signUp(data: userSignup) {
    this.userService.userSignUp(data);
  }

  login(data: userLogin) {
    if (data.email && data.password) {
      this.userService.userLogin(data);
      this.userService.invalidUserAuth.subscribe((result) => {
        console.warn(result);
        if (result) {
          this.authError = "Incorrect email or password";
        } else {
          this.localCartToRemote();
        }
      })
    }
  }
  openSignup() { 
    this.showLogin = !this.showLogin;
  }


  localCartToRemote() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: productI[] = JSON.parse(data);
      cartDataList.forEach((product: productI, index: number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            console.warn("data is stored in db");
          })
        }, 500);
        if (cartDataList.length === index+1) {
          localStorage.removeItem('localCart');
        }
        
      })
    }
    setTimeout(() => {
       this.productService.getCartList(userId);
    }, 2000);
    
  }
}
