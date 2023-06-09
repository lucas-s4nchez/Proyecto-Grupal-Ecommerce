import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { CategoryDashboardComponent } from './components/category-dashboard/category-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'users', component: UserDashboardComponent },
      { path: 'products', component: ProductDashboardComponent },
      { path: 'categories', component: CategoryDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
