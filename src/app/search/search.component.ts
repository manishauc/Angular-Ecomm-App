import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productI } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
  }

  searchResult: undefined | productI[];
  ngOnInit(): void{
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.productService.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    });
  }
}
