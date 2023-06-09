import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { CategoryDashboardComponent } from './components/category-dashboard/category-dashboard.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    UserDashboardComponent,
    ProductDashboardComponent,
    CategoryDashboardComponent,
    HomeDashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class DashboardModule {}
