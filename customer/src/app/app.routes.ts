import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HistoryComponent } from './components/orders/history/history.component';
import { CurrentComponent } from './components/orders/current/current.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemComponent } from './components/item/item.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'current', component: CurrentComponent }, 
  {path:'restaurants',component: RestaurantsComponent},
  {path:'restaurant/:id',component: RestaurantComponent},
  {path: 'categories', component: CategoriesComponent},
  {path:'category/:id',component:CategoryComponent},
  {path: 'item/:id', component: ItemComponent}
];
