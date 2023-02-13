import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/car-image';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = 'http://localhost:5096/api/';

  constructor(private httpClient:HttpClient) { }

  /* uploadImage(image:File){
    const formData = new FormData();
    formData.append('image',image);
    return this.httpClient.post(this.apiUrl + 'image',formData);
  } */

  getCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + 'carimages/getall');

  }
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    /* let newPath = this.apiUrl + 'carimages/getimagesbycarid?carid=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath); */
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + 'carimages/getimagesbycarid?id=' + carId);
  }
  postAddCarImage(carimage:CarImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'carimages/add', carimage) ;
  }
  postDeleteCarImage(carimage:CarImage):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'carimages/delete', carimage) ;
  }

}
