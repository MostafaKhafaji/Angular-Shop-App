import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from './../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data: any) => (this.products = data));
  }
}
