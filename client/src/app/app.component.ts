import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/restaurant/login/login.component';
import { ItemsComponent } from './components/restaurant/items/items.component';
import { RouterModule } from '@angular/router';
import { PastOrdersComponent } from './components/orders/past-orders/past-orders.component';
import { CurrOrdersComponent } from './components/orders/curr-orders/curr-orders.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HomeComponent, LoginComponent, ItemsComponent, CurrOrdersComponent,PastOrdersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'client';

  localItem:any;
  id:String;

  constructor(private router: Router){
    this.localItem=localStorage.getItem("owner")|| '';
    // console.log(this.localItem)
    if(this.localItem!=''){
      this.id=this.localItem._id
    }
  }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('owner');
    this.localItem=localStorage.getItem("owner")|| '';
    this.router.navigate(['']);
  }


  
}
