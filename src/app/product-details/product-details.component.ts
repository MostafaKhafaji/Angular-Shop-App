import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { ProductCartService } from '../services/product-cart.service';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {};
  cart: Array<any> = [];
  faBasketShopping = faBasketShopping;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: ProductCartService
  ) {}

  ngOnInit(): void {
    this.cartService.productVal.subscribe((val: any) => (this.cart = val));
    this.productService
      .getProductsDetails(this.route.snapshot.params['id'])
      .subscribe((data) => {
        this.product = data;
      });
  }
  handleAddToCart(product: any) {
    this.cart.push({ ...product, quantity: 1 });
    this.cart = this.cart.reduce((acc: any, e: any) => {
      const found = acc.find((x: any) => e.id === x.id);
      found ? (found.quantity += e.quantity) : acc.push(e);
      return acc;
    }, []);
    this.cartService.addToCart(this.cart);
  }
}
