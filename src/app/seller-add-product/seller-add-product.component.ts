import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { productI } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent implements OnInit {
  public addproductmsg: string | undefined;
  @ViewChild('addProduct', { static: false })
    addProduct!: NgForm;
  constructor(private productService: ProductService) {

  }
  ngOnInit() {

  }

  submitProduct(data: productI) {
    console.log(data);
    this.productService.addSellerPorduct(data).subscribe((result) => {
      if (result) {
        this.addproductmsg = 'Product added successfully';
        this.addProduct.resetForm();
      }

      setTimeout(() => (this.addproductmsg = undefined), 3000);
    });
  }
}
