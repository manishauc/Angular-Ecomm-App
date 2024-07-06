import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productI } from '../../data-types';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrl: './seller-edit-product.component.css'
})
export class SellerEditProductComponent implements OnInit{
  productData: undefined | productI;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {

  }
  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((data: productI) => {
      console.warn(data);
      if (data) {
        this.productData = data;
      }
      
    })
  }

  updateProduct(data: productI) {
    this.productService.editSellerPorduct(data).subscribe((result: productI) => {
      console.log(result);
      if (result) {
        this.productMessage = "Product Updated successfully";
      }

      setTimeout(() => {
        this.productMessage = undefined;
        this.router.navigate(['seller-home']);
      }, 3000);
    });
  }



}
