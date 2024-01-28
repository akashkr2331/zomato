import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HistoryComponent } from './components/orders/history/history.component';
import { CurrentComponent } from './components/orders/current/current.component';
import {Router} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HistoryComponent,LoginComponent,
    HomeComponent,RestaurantsComponent,CategoriesComponent,CurrentComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'customer';

  localItem:any;
  id:String="";

  constructor(private router: Router){
    this.localItem=localStorage.getItem("customer")|| '';
    // console.log(this.localItem)
    if(this.localItem!=''){
      this.id=this.localItem._id
    }
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('customer');
    this.localItem=localStorage.getItem("customer")|| '';
    this.router.navigate(['']);
  }

}
