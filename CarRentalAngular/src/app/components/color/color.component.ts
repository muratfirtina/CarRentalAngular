import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  filterColorText: string;
  colors:Color[] = [];
  currentColor:Color | undefined;
  dataLoaded = false;

  constructor(private colorService:ColorService, private brandService:BrandService) { }

  ngOnInit(): void {
    this.getColors();  
  }
  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
      this.dataLoaded = true;
    })
  }
  setCurrentColor(color:Color){
    this.currentColor = color;
  }
  getCurrentColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  setCurrentColorClear(){
    this.currentColor = undefined;
  }
}

