import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddRestaurantComponent } from './components/restaurant/add-restaurant/add-restaurant.component';
import { LoginComponent } from './components/restaurant/login/login.component';
import { ItemsComponent } from './components/restaurant/items/items.component';
import { PastOrdersComponent } from './components/orders/past-orders/past-orders.component';
import { CurrOrdersComponent } from './components/orders/curr-orders/curr-orders.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'signup', component: AddRestaurantComponent },
  { path: 'login', component: LoginComponent },
  { path: 'items/:id', component: ItemsComponent },
  { path: 'pastOrders', component: PastOrdersComponent },
  { path: 'currOrders', component: CurrOrdersComponent }, 
];
