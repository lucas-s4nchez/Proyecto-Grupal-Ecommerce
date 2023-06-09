import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentModule } from './payment/payment.module';
import { ComponentModule } from './components/components.module';

export function tokenGetter() {
  const token = localStorage.getItem('token');
  return token;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000'],
        disallowedRoutes: [
          'localhost:8000/api/v1/auth/login',
          'localhost:8000/api/v1/auth/register',
        ],
      },
    }),
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
