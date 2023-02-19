import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: number=0;
  colors: Color[] = [];
  currentColor: number=0;
  cars: Car[] = [];
  carDetails: CarDetailDto[]=[];
  currentCar: CarDetailDto;
  carImages: CarImage[];
  carImage: CarImage;
  dataLoaded = false;
  title = 'Araba Listesi';
  imageUrl: string = 'http://localhost:5096/images/';
  filterText = '';
  
  

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService, 
    private brandService: BrandService, 
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    
    this.getCars();
  }

  
  getCars() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } 
      else {
        this.getCarDetails();
      }
    }
    );

    this.getBrands();
    this.getColors();
  }
  

  getCarsByBrand(brandId: number) { //seçilen markaya göre araçları getirir
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) { //seçilen renge göre araçları getirir
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
 
  getCarDetails() {//tüm araçların detaylarını getirir
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsById(id: number) { //seçilen aracın detaylarını getirir
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.currentCar = response.data;
      this.dataLoaded = true;
    });
  }
  
  setCurrentCar(car: CarDetailDto) { //seçilen aracı currentCar a atar
    this.currentCar = car;
  }
  getBrands() {//markaları getirir
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {//renkleri getirir
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  
  carsFilterByBrandAndColor(brandId: number, colorId: number) { //filtreleme işlemini yapar
    if(brandId == 0 && colorId != 0) //brandid 0 ise colorid ye göre filtreleme yapar
    {
      this.carService.getCarsByColor(colorId).subscribe(response => {
        if (response.data.length == 0) {
          this.toastrService.error("Araba mevcut değil.");
        }else{ this.carDetails = response.data;
        this.toastrService.success("Başarılı bir şekilde listelendi.")
        return;}
      })
    }
    else if(colorId == 0 && brandId != 0) //colorid 0 ise brandid ye göre filtreleme yapar
    {
      this.carService.getCarsByBrand(brandId).subscribe(response => {
        if (response.data.length == 0) {
          this.toastrService.error("Araba mevcut değil.");
        }else{ this.carDetails = response.data;
        this.toastrService.success("Başarılı bir şekilde listelendi.")
        return;}
      })
    }
    else if (brandId == 0 && colorId == 0) { //her ikisi de 0 ise tüm araçları listeler
      this.carService.getCarDetails().subscribe((response) => {
        this.carDetails = response.data
        this.dataLoaded = true;
        this.toastrService.success("Başarılı bir şekilde listelendi.")
        return;
      });
      
    }
    else{ //her ikisi de 0 değilse brandid ye göre vew colorid ye göre filtreleme yapar
    this.carService.getCarsByBrandAndColor(brandId, colorId).subscribe((response) => {
      if (response.data.length == 0) {
        this.toastrService.error("Araba mevcut değil.");
      }else{ this.carDetails = response.data;
      this.toastrService.success("Başarılı bir şekilde listelendi.")
      return;}
    });
    }

  }
  clearFilter() { //filtreleme işlemini temizler
    this.currentBrand = 0;
    this.currentColor = 0;
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }
}