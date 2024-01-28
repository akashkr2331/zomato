import { Component, OnInit, inject } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  http=inject(HttpClient)
  private service=inject(ServiceService);
  posts:any=[];

  ngOnInit(): void {
      this.getMethod();
  }

  public getMethod(){
    this.service.getposts().subscribe({
        next : (res:any)=>{
          // console.log(res)
          this.posts=res;
          console.log(this.posts)
        },
        error:(error)=>console.log('error fetching ',error)
      })
  }
  
}
