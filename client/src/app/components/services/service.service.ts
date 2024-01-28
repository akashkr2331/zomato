// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



import { Inject, Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
  providedIn: 'root'
}
)

export class ServiceService {

  private http=inject(HttpClient)

  constructor() { }
  
  addCategory(category:any) {
     return this.http.post("http://localhost:4000/addCategory",category)
    
  }

  getposts(){
    return this.http.get("http://localhost:4000/data");
  }

  addRestaurant(formdata:FormData){
    
    return this.http.post("http://localhost:4000/restaurant",formdata);
  }

  onLogin(obj: any) : Observable<any> {
    return this.http.post("http://localhost:4000/restaurant/login",obj );
   }

   getProfile(id: String) : Observable<any> {
    return this.http.get(`http://localhost:4000/restaurant/profile/${id}`);
   }
  
   additems(formdata:FormData){
    return this.http.post("http://localhost:4000/restaurant/additems",formdata);
   }

   getitems(id:string){
    return this.http.get(`http://localhost:4000/restaurant/getitems/${id}`);
   }


   getPastOrders(id:string){
    return this.http.get(`http://localhost:4000/restaurant/pastOrders/${id}`);
  }

  getCurrOrders(id:string){
    return this.http.get(`http://localhost:4000/restaurant/currOrders/${id}`);
  }

  cancelOrders(id:string){
    return this.http.get(`http://localhost:4000/restaurant/cancelOrder/${id}`);
  }

  acceptOrders(id:string){
    return this.http.get(`http://localhost:4000/restaurant/acceptOrder/${id}`);
  }

  deleteItem(id:string){
    return this.http.delete(`http://localhost:4000/restaurant/deleteItem/${id}`);
  }
   
}
