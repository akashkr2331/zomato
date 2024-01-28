import { Component, Input, OnInit, inject } from '@angular/core';
import { ServiceService} from "../../services/service.service";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  
  http=inject(HttpClient)
  private service=inject(ServiceService);
  data:any='';


  @Input() id:string;

  ngOnInit(): void {
    this.service.getProfile(this.id).subscribe((res:any)=>{
      this.data =  res;
      // console.log(this.data);
    })
    
  }
}
