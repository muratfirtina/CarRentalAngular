import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from 'src/app/models/carDetailDto';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  carDetails: CarDetailDto[] = [];
  filterText = '';
  
  constructor() {
    
    
  }
  ngOnInit(): void {

  }

  carSearch(carDetails: CarDetailDto[]) {
    this.carDetails = this.carDetails.filter((c: CarDetailDto) => c.carName.toLocaleLowerCase().indexOf(this.filterText.toLocaleLowerCase()) !== -1);
  }
}


