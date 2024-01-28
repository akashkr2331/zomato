import { Component , OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  http=inject(HttpClient)
  private service=inject(ServiceService);

  categories:any;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.service.getCategories().subscribe((res:any)=>{
      this.categories =  res;
    })
  }

  onClick(id:String){
    this.router.navigate(['/category',id]);
  }
}
