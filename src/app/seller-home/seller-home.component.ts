import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productI } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {
  productList: productI[] = [];
  constructor(private productService: ProductService, private router: Router) {

  }
  ngOnInit() {

    this.list();
  }

  deleteProduct(id: number) {
    if (confirm("Do you realy want to delete this record")) {
      this.productService.deleteProduct(id).subscribe((result) => {
        if (result) {
          this.list();
        }
      });
    }  
  }

  editProduct(id: number) {
     this.router.navigate([`seller-edit-product/${id}`]);
   }


  list(){
    this.productService.getProducts().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }
}
