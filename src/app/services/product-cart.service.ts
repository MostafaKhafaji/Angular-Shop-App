import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCartService {
  // private product = new BehaviorSubject<any[]>([]);
  private product = new BehaviorSubject<any[]>([]);
  productVal = this.product.asObservable();

  constructor() {}

  addToCart(val: any): void {
    // this.product.next(this.product.getValue().concat([val]));
    this.product.next(val);

    console.log(val);
  }

  deleteFromCart(val: any): void {
    this.product.next(val);
    console.log(val);
  }
}
