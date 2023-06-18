import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: any = null;

  constructor(private cartService: CartService) {
    this.getUserCart();
  }

  getUserCart() {
    this.cartService.getCart().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
