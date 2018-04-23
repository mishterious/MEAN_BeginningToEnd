import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
	}

	getWeather(city){
    console.log(city)
		return this._http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+',us&APPID=bc7734a7771eab55c72183bbb0898c9f');
	}
}
