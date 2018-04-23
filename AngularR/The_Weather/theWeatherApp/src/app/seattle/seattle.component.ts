import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  display : any;

  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit() {
    this.getWeatherFromService()

  }

  getWeatherFromService(){
    let observable = this._httpService.getWeather('seattle')
    observable.subscribe(data => 
      {
        console.log(data)
        this.display = data;
      }
    )
  }
}
