import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductCartService } from '../services/product-cart.service';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  cart: Array<any> = [];
  faBasketShopping = faBasketShopping;
  @Input() product: Product = {
    createdAt: '',
    name: '',
    image: '',
    rate: 0,
    count: 0,
    description: '',
    price: '',
    reviews: [],
    id: '',
  };
  constructor(private cartService: ProductCartService) {}

  ngOnInit(): void {
    this.cartService.productVal.subscribe((val: any) => (this.cart = val));
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
