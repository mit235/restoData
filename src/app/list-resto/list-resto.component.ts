import { Component } from '@angular/core';
import { RestoService } from '../resto.service';

@Component({
  selector: 'app-list-resto',
  templateUrl: './list-resto.component.html',
  styleUrls: ['./list-resto.component.css'],
})
export class ListRestoComponent {
  isControl: boolean = true;
  collection: any = [];
  constructor(private resto: RestoService) {}
  ngOnInit(): void {
    this.resto.getList().subscribe((result) => {
      // console.warn(result)
      this.collection = result;
    });
  }
  check() {
    // this.resto.isError.subscribe((results:boolean) => {
    //   this.isControl = !(results);
    // });
    this.resto.isControl.subscribe((rsl)=>{
      this.isControl=rsl;
    });
    console.log("button worked")
  }

  deleteResto(item: any) {
    this.resto.deleteResto(item).subscribe((result) => {
      console.warn('this data deleted', result);
    });
    this.collection.splice(item - 1, 1);
  }
}
