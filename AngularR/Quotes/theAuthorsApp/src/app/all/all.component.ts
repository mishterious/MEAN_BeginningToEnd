import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  authors : any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(){
    let observable = this._httpService.authors()
    observable.subscribe(data => 
      {
        this.authors = data;
      }
    )
  }

  deleteByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.deleteByID(_id);
    tempObservable.subscribe(data => {
      console.log(data+ "345678765432123456789765432");
    })
    this.getAuthors();
  }
}
