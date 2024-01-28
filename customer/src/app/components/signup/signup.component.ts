import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'; 
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private router: Router){
    
  }

  http=inject(HttpClient)
  private service=inject(ServiceService);

  username:String="";
  password:String="";
  email:String=""

  onSubmit(){

    const userData={
      username:this.username,
      password:this.password,
      email:this.email
    }

      this.service.signup(userData).subscribe((res:any)=>{
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
