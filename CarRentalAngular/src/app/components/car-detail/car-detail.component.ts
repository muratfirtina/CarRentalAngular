import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car-image';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService]
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetailDto[] = [];
  currentCar: CarDetailDto ;
  carImages: CarImage[] = [];
  carImage: CarImage ;
  imageUrl: string = 'http://localhost:5096/images/';
  filterText = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetailsById(params['id']);
        this.getCarImagesByCarId(params['id']);
      }
    });

    /* this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
        this.carService.getCarDetailsById(id).subscribe((response) => {
          this.currentCar = response.data;
          
        });
      
    }); */
  }
  getCarDetailsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.currentCar = response.data;
    });
  }
  getCarImagesByCarId(carId: number) {
    this.imageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
  getImagePath(carImage: CarImage):string {
    let url: string ="http://localhost:5096/images/" + carImage.imagePath;
    return url;
  }

  getImagesClass(carImage:CarImage){
    if (this.carImages[0] == carImage) {
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }
}