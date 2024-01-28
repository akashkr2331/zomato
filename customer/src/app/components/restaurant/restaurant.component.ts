import { Component ,OnInit, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../services/service.service';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [ItemsComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss'
})
export class RestaurantComponent implements OnInit{

  public id: string="";
  items:Array<object>=[];

  http=inject(HttpClient)
  private service=inject(ServiceService);

constructor(private route: ActivatedRoute) {}


ngOnInit() {
   this.id = this.id = this.route.snapshot.params['id']||"";
   this.service.getRestaurantDetails(this.id).subscribe((res:any)=>{
    this.items =  res;
  })
}

}

