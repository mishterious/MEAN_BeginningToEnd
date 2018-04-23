import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {
  display = []
  constructor(private _httpService: HttpService) {
    this.display = []
  }

  ngOnInit() {
    this.getWeatherFromService()
  }

  getWeatherFromService(){
    let observable = this._httpService.getWeather('Burbank')
    observable.subscribe(data => 
      {
        console.log(data)
        this.display = data;
      }
    )
  }

}
