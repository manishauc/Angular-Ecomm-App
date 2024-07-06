import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerEditProductComponent } from './seller-edit-product/seller-edit-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'seller-edit-product/:id',
    component: SellerEditProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'search/:query',
    component: SearchComponent,
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId'
  },
  {
    component: UserAuthComponent,
    path:'user-auth'
  }, {
    component: CartPageComponent,
    path:'cart-page'
  },
  {
    component: CheckoutComponent,
    path:'checkout'
  },
  {
    component: MyOrderComponent,
    path:'my-orders'
  }

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
