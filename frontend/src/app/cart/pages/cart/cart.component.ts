import { Component } from '@angular/core';
import { FormArrayName } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  isLoading = false;
  isChangeQuantity = false;
  isDeleting = false;
  isPaying = false;
  cart: any = null;
  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router
  ) {
    this.getCartData();
  }

  getCartData() {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cartService.setCart(data);
        this.cart = this.cartService.cart;
        this.isLoading = false;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  increaseQuantity(cartItemId: any, quantity: any) {
    this.isChangeQuantity = true;
    const updatedQuantity = quantity + 1;
    this.cartService
      .updateQuantityProduct(cartItemId, updatedQuantity)
      .subscribe({
        next: (data) => {
          this.getCartData();
          this.isChangeQuantity = false;
        },
        error: (errors) => {
          console.log(errors);
          this.isChangeQuantity = false;
        },
      });
  }

  decreaseQuantity(cartItemId: any, quantity: any) {
    if (quantity > 1) {
      this.isChangeQuantity = true;
      const updatedQuantity = quantity - 1;
      this.cartService
        .updateQuantityProduct(cartItemId, updatedQuantity)
        .subscribe({
          next: (data) => {
            this.getCartData();
            this.isChangeQuantity = false;
          },
          error: (errors) => {
            console.log(errors);
            this.isChangeQuantity = false;
          },
        });
    }
  }

  removeProductFromCart(cartItemId: any) {
    this.isDeleting = true;
    this.cartService.removeProductFromCart(cartItemId).subscribe({
      next: (data) => {
        this.getCartData();
        this.isDeleting = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isDeleting = false;
      },
    });
  }

  removeAllProductsFromCart() {
    this.isDeleting = true;
    this.cartService.removeAllProductsFromCart().subscribe({
      next: (data) => {
        this.getCartData();
        this.isDeleting = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isDeleting = false;
      },
    });
  }

  createOrder() {
    this.isPaying = true;
    this.orderService.createOrder({ cart_id: this.cart.id }).subscribe({
      next: (data) => {
        window.location.href = data.init_point;
        this.isPaying = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isPaying = false;
      },
    });
  }
}
