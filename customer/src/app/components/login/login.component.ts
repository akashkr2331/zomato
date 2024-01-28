import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'; 
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router){
    
  }

  http=inject(HttpClient)
  private service=inject(ServiceService);

  password:String="";
  email:String=""

  onSubmit(){

    const userData={
      password:this.password,
      email:this.email
    }

      this.service.login(userData).subscribe((res:any)=>{
        if(res) {
          console.log(res);
          if(localStorage.getItem('customer'))
          localStorage.removeItem('customer');
          localStorage.setItem('customer', res._id);
          const logged:any= localStorage.getItem('customer')
          // console.log(logged)
          let id:any;
          if(logged)
          id=res._id;
          this.router.navigate(['/home']);
          // console.log(logged);
        } else {
          alert(res.message);
        }
      });
}
}
