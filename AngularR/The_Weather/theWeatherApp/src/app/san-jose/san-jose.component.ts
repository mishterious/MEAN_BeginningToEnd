import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-san-jose',
  templateUrl: './san-jose.component.html',
  styleUrls: ['./san-jose.component.css']
})
export class SanJoseComponent implements OnInit {
  display : any;

  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit() {
    this.getWeatherFromService()

  }

  getWeatherFromService(){
    let observable = this._httpService.getWeather('san jose')
    observable.subscribe(data => 
      {
        console.log(data)
        this.display = data;
      }
    )
  }
}