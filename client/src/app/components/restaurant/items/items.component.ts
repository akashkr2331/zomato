import { Component , OnInit, inject } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService} from "../../services/service.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ProfileComponent,FormsModule,CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit{

  id:string;
  name:string;
  image:any;
  categories:any;
  category:any;
  file:File;
  desc:any;
  price:any;
  
  http=inject(HttpClient)
  private service=inject(ServiceService);

  items:any;

  constructor(private route: ActivatedRoute) { }

  onChange(event:any) { 
    this.file = event.target.files[0];
    console.log(this.file);
} 

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.service.getposts().subscribe((res:any)=>{
      this.categories =  res;
      // console.log(this.categories);
    })
    this.getitems();
  }

  getitems(){
    this.service.getitems(this.id).subscribe((res:any)=>{
      this.items =  res;
      // console.log(this.items);
    })
  }

  onSubmit(){
    if (this.file) {
      console.log(this.name, this.category, this.desc, this.price)
      const formData = new FormData();
      formData.append("my_file", this.file);
      formData.append("name",this.name);
      formData.append("desc",this.desc);
      formData.append("category",this.category);
      formData.append("restaurant",this.id);
      formData.append("price",this.price);
      // console.log(formData)

      try{
        const upload$ = this.service.additems(formData);

        upload$.subscribe();
        if(upload$){
          this.name='';
          this.category='',
          this.desc='',
          this.price=''
          this.getitems();
        }
      }
      catch(err){
        console.log(err);
      }    
  }
  }

  onDelete(id:any){
    this.service.deleteItem(id).subscribe((res:any)=>{
      // console.log(res);
      this.getitems();
    })
  }


}
