import { Component } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
car1:any ={carId:1,brandId:1,colorId:1,modelYear:2010,dailyPrice:100,description:"Audi A3"};
car2:any ={carId:2,brandId:1,colorId:2,modelYear:2011,dailyPrice:200,description:"Audi A4"};
car3:any ={carId:3,brandId:1,colorId:3,modelYear:2012,dailyPrice:300,description:"Audi A5"};

cars=[this.car1,this.car2,this.car3];
}
