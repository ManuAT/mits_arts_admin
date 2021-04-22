import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { ShopComponent } from './shop/shop.component';
import { DeleveryComponent } from './delevery/delevery.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      
     
      { path: 'login', component: LoginComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'delevery', component: DeleveryComponent },


    ]),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
