import { Component, OnInit } from '@angular/core';
import { productI } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProduct: undefined | productI[];
  trendyProducts: undefined | productI[];
  constructor(private product: ProductService) {

  }

  ngOnInit(): void{
    this.product.popularProducts().subscribe((data) => {
      this.popularProduct = data;
    })
    this.product.trendyProducts().subscribe((data) => {
      this.trendyProducts = data;
    })
  }
}
