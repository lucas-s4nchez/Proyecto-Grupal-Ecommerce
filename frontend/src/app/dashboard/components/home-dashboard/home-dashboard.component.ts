import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
})
export class HomeDashboardComponent {
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  orders: any = [];
  orderList: any = [];
  selectedOrder: any = null;
  user: any = null;
  selectedOrderId: number | null = null;
  page = 1;
  pageSize = 5;
  collectionSize = this.orders.length;
  paidOrders: any = [];
  deliveredOrders: any = [];
  products: any = [];
  formOrder = this.fb.group({
    status: ['', [Validators.required]],
    delivered: ['', [Validators.required]],
  });

  constructor(
    private orderService: OrdersService,
    private authService: AuthService,
    private productService: ProductsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.getOrdersData();
    this.getUserData();
    this.getProductsData();
  }

  get formOrderState() {
    return {
      status: this.formOrder.get('status') as FormControl,
      delivered: this.formOrder.get('delivered') as FormControl,
    };
  }

  getUserData() {
    this.user = this.authService.user;
  }

  getOrdersData() {
    this.isLoading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        // Ordenar el array de acuerdo al id más alto
        this.orders.sort((a: any, b: any) => b.id - a.id);
        this.collectionSize = this.orders.length;
        this.refreshOrderList();
        this.paidOrders = this.getPaidOrders();
        this.deliveredOrders = this.getDeliveredOrders();
        this.isLoading = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isLoading = false;
      },
    });
  }

  getProductsData() {
    this.productService.listProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  updateOrder() {
    const formData: any = this.formOrder.value;
    formData.delivered = formData.delivered === 'true'; // Convertir a booleano

    this.isSubmitting = true;
    const categoryId = this.selectedOrderId;
    this.orderService.updateOrder(categoryId, formData).subscribe({
      next: (data) => {
        this.closeModal();
        this.isSubmitting = false;
        this.toastr.success('Orden actualizada correctamente');
        this.getOrdersData();
      },
      error: (errors) => {
        this.isSubmitting = false;
        console.log(errors);
      },
    });
  }

  refreshOrderList() {
    this.orderList = this.orders
      .map((country: any, i: any) => ({
        id: i + 1,
        ...country,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getPaidOrders() {
    return this.orders.filter((order: any) => order.paid === true);
  }
  getDeliveredOrders() {
    return this.orders.filter((order: any) => order.delivered === true);
  }

  openEditModal(category: any, content: any) {
    this.selectedOrderId = category.id;
    this.formOrder.patchValue({
      status: category.status,
      delivered: category.delivered,
    });
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.resetFormOrder();
  }

  resetFormOrder() {
    this.formOrder.reset();
  }
}
