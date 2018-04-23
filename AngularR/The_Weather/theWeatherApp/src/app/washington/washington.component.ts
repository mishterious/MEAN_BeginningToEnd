import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-washington',
  templateUrl: './washington.component.html',
  styleUrls: ['./washington.component.css']
})
export class WashingtonComponent implements OnInit {
  display : any;

  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit() {
    this.getWeatherFromService()

  }

  getWeatherFromService(){
    let observable = this._httpService.getWeather('washington')
    observable.subscribe(data => 
      {
        console.log(data)
        this.display = data;
      }
    )
  }
}
