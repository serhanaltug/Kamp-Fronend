import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car, CarDetail } from 'src/app/models/car';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car:Car;
  cars:CarDetail[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];

  selectedBrand:number = 0;
  selectedColor:number = 0;

  dataLoaded = false;
  filterText = "";

  constructor(private carService:CarService, private brandService:BrandService, private colorService:ColorService, private activatedRoute:ActivatedRoute)   { }

  ngOnInit(): void {

    this.getBrands();
    this.getColors();

    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCar(params["carId"])
      }
      else{
        this.getCars();
      }
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  filterCars(brandId:number, colorId:number){
    this.carService.getCarsFiltered(brandId, colorId).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCars() {
    this.carService.getCarsWithDetail().subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCar(carId:number){
    this.carService.getCar(carId).subscribe(response => {
      this.car = response.data;
      this.dataLoaded = true;
    })
  }

}
