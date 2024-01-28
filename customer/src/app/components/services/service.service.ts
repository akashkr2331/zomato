import { Observable } from 'rxjs';



import { Inject, Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private http=inject(HttpClient)

  constructor() { }
  
  getRestaurants() {
     return this.http.get("http://localhost:4000/customer/getRestaurants")
    
  }

  getRestaurantDetails(id:String){
    return this.http.get(`http://localhost:4000/customer/restaurant/${id}`);
  }

  getCategories() {
    return this.http.get("http://localhost:4000/customer/getCategories")
 }

 getCategoryDetails(id:String){
   return this.http.get(`http://localhost:4000/customer/category/${id}`);
 }

 getItemDetail(id:String){
  return this.http.get(`http://localhost:4000/customer/item/${id}`);
}

takeOrder(obj: object) : Observable<any> {
  return this.http.post("http://localhost:4000/customer/order",obj );
 }

getPastOrders(id:string){
  return this.http.get(`http://localhost:4000/customer/history/${id}`);
}

getCurrOrders(id:string){
  return this.http.get(`http://localhost:4000/customer/current/${id}`);
}

deliverOrder(id:string){
  return this.http.get(`http://localhost:4000/customer/deliverOrder/${id}`);
}

cancelOrder(id:string){
  return this.http.get(`http://localhost:4000/customer/cancelOrder/${id}`);
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

   signup(obj:object){
    
    return this.http.post("http://localhost:4000/user/signup",obj);
  }

  login(obj: any) : Observable<any> {
    return this.http.post("http://localhost:4000/restaurant/login",obj );
   }

//    router.route('/signup').post(user.register);
// router.route('/login').post(user.login);
// router.route('/getemail/:id').get(user.getemail);

}
