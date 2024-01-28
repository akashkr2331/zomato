import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import { HttpClient } from '@angular/common/http';
import { OrdersComponent } from '../orders.component';

@Component({
  selector: 'app-curr-orders',
  standalone: true,
  imports: [CommonModule,OrdersComponent],
  templateUrl: './curr-orders.component.html',
  styleUrl: './curr-orders.component.scss'
})
export class CurrOrdersComponent implements OnInit{

  http=inject(HttpClient)
  private service=inject(ServiceService);

  localItem:any;
  orders:any;

  ngOnInit(): void {
    this.localItem=localStorage.getItem("owner")|| '';
    this.getOrder();
  }

  getOrder(){
    this.service.getCurrOrders(this.localItem).subscribe((res:any)=>{
      this.orders =  res;
      console.log(res);
    })
  }

  onCancel(id:any){
    this.service.cancelOrders(id).subscribe((res:any)=>{
      this.getOrder();
      console.log(res);
    })
  }

  onAccept(id:any){
    this.service.acceptOrders(id).subscribe((res:any)=>{
      this.getOrder();
      console.log(res);
    })
  }

}
