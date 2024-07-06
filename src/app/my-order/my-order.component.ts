import { Component, OnInit } from '@angular/core';
import { order } from '../../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit {

  orderData: order[] | undefined;
  constructor(private productService: ProductService) { }
  ngOnInit() {

    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.productService.cancelOrder(orderId).subscribe((result) => {
      if (result) {
        this.getOrderList();
      }
    })
  }

  getOrderList() {
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }
  
}
