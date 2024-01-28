import { Component , OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent {

  http=inject(HttpClient)
  private service=inject(ServiceService);

  restaurants:any;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.service.getRestaurants().subscribe((res:any)=>{
      this.restaurants =  res;
    })
  }

  onClick(id:String){
    this.router.navigate(['/restaurant',id]);
  }


}
