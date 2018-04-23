import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  display : any;

  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit() {
    this.getWeatherFromService()

  }

  getWeatherFromService(){
    let observable = this._httpService.getWeather('chicago')
    observable.subscribe(data => 
      {
        console.log(data)
        this.display = data;
      }
    )
  }
}
