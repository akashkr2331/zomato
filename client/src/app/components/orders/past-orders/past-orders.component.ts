import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { HttpClient } from '@angular/common/http';
import { OrdersComponent } from '../orders.component';

@Component({
  selector: 'app-past-orders',
  standalone: true,
  imports: [CommonModule,OrdersComponent],
  templateUrl: './past-orders.component.html',
  styleUrl: './past-orders.component.scss'
})
export class PastOrdersComponent implements OnInit{
  http=inject(HttpClient)
  private service=inject(ServiceService);

  localItem:any;
  orders:any;

  ngOnInit(): void {
    this.localItem=localStorage.getItem("owner")|| '';
    this.service.getPastOrders(this.localItem).subscribe((res:any)=>{
      this.orders =  res;
      console.log(res);
    })
  }
}
