import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { productI, userLogin, userSignup } from '../../data-types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route: Router) { }

  //[START:: USER SIGNUP]
  userSignUp(user: userSignup) {
    return this.http.post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.route.navigate(['/']);
        }
    })
  }
  //[END:: USER SIGNUP]

  //[START:: USER LOGIN]
  userLogin(user: userLogin) {
    this.http.get<userSignup[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.route.navigate(['/']);
          console.warn(result.body);
          this.invalidUserAuth.emit(false);
        } else {
          this.invalidUserAuth.emit(true);
        }
        
    })
  }
   //[END:: USER LOGIN]

  //[START:: REDIRECT TO HOME PAGE IF USER IS LOGGED IN]
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/']);
    }
  }
  //[END:: REDIRECT TO HOME PAGE IF USER IS LOGGED IN]

  
}
