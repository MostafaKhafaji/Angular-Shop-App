import { Component, OnInit } from '@angular/core';
import { ProductCartService } from '../services/product-cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = [];
  counter: any = 0;
  total: number = 0;
  constructor(private cartService: ProductCartService) {}

  ngOnInit(): void {
    this.cartService.productVal.subscribe((val) => {
      this.cart = val;
      this.getTotal();
    });
  }

  deleteProduct(id: number) {
    this.cart = this.cart.filter((e: any) => {
      return e.id !== id;
    });

    this.cartService.deleteFromCart(this.cart);
    this.total = 0;
    this.getTotal();
  }

  increaseQtty(id: number) {
    this.cart = this.cart.map((product: any) => {
      if (product.id == id) {
        this.total += +product.price;
        product.quantity++;
        this.total = 0;
        this.getTotal();
      }
      return product;
    });
  }

  decreaseQtty(id: number) {
    this.cart = this.cart.map((product: any) => {
      if (product.id == id) {
        if (product.quantity > 1) {
          product.quantity--;
          this.total = 0;
          this.getTotal();
        }
      }
      return product;
    });
  }

  getTotal() {
    for (let i = 0; i < this.cart.length; i++) {
      this.total += this.cart[i].price * this.cart[i].quantity;
    }
  }
}
