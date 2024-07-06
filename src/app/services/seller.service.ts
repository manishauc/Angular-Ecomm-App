import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { loginInt, productI, signupInt } from '../../data-types';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  public IsSellerLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoginError = new EventEmitter<boolean>(false);
  public isSignUpError = new EventEmitter<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signupInt) {
    let result = this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }).subscribe((result:any) => {      
        if (result) {
          this.IsSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        } else {
          this.isSignUpError.emit(true);
          }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.IsSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: loginInt) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result:any) => {
        if (result && result.body && result.body.length) {
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        } else {
          console.warn("login failed");
          this.isLoginError.emit(true);
        }
    });
  }


  
}
