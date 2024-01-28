import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService} from "../../services/service.service";
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  // @Output() setlogin: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router){
    
  }

  email:String;
  password:String;

  http=inject(HttpClient)
  private service=inject(ServiceService);

  ngOnInit(): void {
      if(localStorage.getItem('owner')!=null){
        this.router.navigate(['/']);
        // console.log(localStorage.getItem('owner'));
      }
  }

  login() {
    console.log(this.email,this.password)
    const login={
      email:this.email,
      password:this.password
    }
    this.service.onLogin(login).subscribe((res:any)=>{
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
    })
  }

}
