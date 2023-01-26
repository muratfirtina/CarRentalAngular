import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'http://localhost:5096/api/';

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandid?id=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolorid?id=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails():Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + "cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarById(id:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + "cars/getbyid?id=" + id;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  getCarDetailsById(id:number):Observable<SingleResponseModel<CarDetailDto>>{
    let newPath = this.apiUrl + "cars/getcardetailsbyid?id=" + id;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
  }
  getCarsByBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandandcolor?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
