import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  providers: [CarService],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetailDto[];
  carDetailsById: CarDetailDto;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
        this.carService.getCarDetailsById(id).subscribe((response) => {
          this.carDetailsById = response.data;
        });
      
    });
  }

}