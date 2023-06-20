import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  isLoading: boolean = false;
  orders: any;
  selectedOrder: any = null;
  user: any = null;
  constructor(
    private orderService: OrdersService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.getOrdersData();
    this.getUserData();
  }

  getUserData() {
    this.user = this.authService.user;
  }

  getOrdersData() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(this.orders);
        this.isLoading = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isLoading = false;
      },
    });
  }

  openModal(order: any, content: any) {
    this.selectedOrder = order;
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
