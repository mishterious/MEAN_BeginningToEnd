import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
		this.weather();	
	}

  weather(){
		let tempObservable = this._http.get('/weather');
		tempObservable.subscribe(data => console.log("Got our tasks!", data));
	}

	getWeather(city){
		let tempObservable = this._http.get('http://api.openweathermap.org/data/2.5/weather?q='+ city+ ',us&APPID=bc7734a7771eab55c72183bbb0898c9f');

	}
}
