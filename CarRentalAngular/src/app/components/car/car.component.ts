import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetailDto[];
  carDetailsById: CarDetailDto;
  dataLoaded = false;
  title = 'Araba Listesi';
  

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId'] && params['colorId']) {
        this.getByFilterBrandAndColor(params['brandId'], params['colorId']);
      }
      else {
        this.getCars();
        
      }
      
    });
  }

  
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
 
  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsById(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.carDetailsById = response.data;
      this.dataLoaded = true;
    });
  }
  getByFilterBrandAndColor(brandId: number, colorId: number) {
    if(brandId == 0 && colorId == 0){
        this.carService.getCarDetails().subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
    })
    }else if(brandId == 0){
      this.carService.getCarsByColor(colorId).subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }else if(colorId == 0){
      this.carService.getCarsByBrand(brandId).subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }else{
      this.carService
      .getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
        this.dataLoaded = true;
      });
    }
  }

}
