import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService} from "../../services/service.service";
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {

  constructor(private router: Router){
    
  }

  http=inject(HttpClient)
  private service=inject(ServiceService);

  name:any;
  image:any;
  address: any;
  email:any;
  password:any;

  file: File | null = null;

  onChange(event:any) { 
    this.file = event.target.files[0];
    console.log(this.file);
} 
  
  onSubmit(){
    if (this.file) {

      const formData = new FormData();
      formData.append("my_file", this.file);
      formData.append("name",this.name);
      formData.append("address",this.address)
      formData.append("email",this.email)
      formData.append("password",this.password)
      console.log(formData)

      this.service.addRestaurant(formData).subscribe((res:any)=>{
        if(res) {
          console.log(res);
          if(localStorage.getItem('owner'))
          localStorage.removeItem('owner');
          localStorage.setItem('owner', res._id);
          const logged:any= localStorage.getItem('owner')
          // console.log(logged)
          let id:any;
          if(logged)
          id=res._id;
          this.router.navigate(['/items',logged]);
          // console.log(logged);
        } else {
          alert(res.message);
        }
      });
  }    
}
  }

