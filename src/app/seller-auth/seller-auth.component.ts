import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { loginInt, signupInt } from '../../data-types';
import { SellerService } from '../services/seller.service';



@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  constructor(private sellerService: SellerService, private router: Router) {
  }
  showLogin = false;
  authError:string = "";
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }
 
  signup(data: signupInt): void {
    this.sellerService.userSignUp(data);
    this.sellerService.isSignUpError.subscribe((error)=> {
      if (error) {
        this.authError = "";
      }
    });
  }

  login(data: loginInt): void {
    this.authError = '';
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((error) =>{
      if (error) {
        this.authError = "User email or passowrd is not correct";
      }
    });
  }

  OpenLogin() {
    this.showLogin = false;
  }

  OpenSignUp() {
    this.showLogin = true;
  }
}
