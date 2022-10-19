import { Component, OnInit } from '@angular/core';
import { ProductCartService } from '../services/product-cart.service';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: Array<any> = [];
  faBasketShopping = faBasketShopping;

  constructor(private productCart: ProductCartService) {}

  ngOnInit(): void {
    this.productCart.productVal.subscribe((val: any) => (this.cartItems = val));
  }
}
