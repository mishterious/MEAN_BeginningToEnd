import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-dallas',
  templateUrl: './dallas.component.html',
  styleUrls: ['./dallas.component.css']
})
export class DallasComponent implements OnInit {
  display : any;

  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit() {
    this.getWeatherFromService()

  }

  getWeatherFromService(){
    let observable = this._httpService.getWeather('dallas')
    observable.subscribe(data => 
      {
        console.log(data)
        this.display = data;
      }
    )
  }
}
