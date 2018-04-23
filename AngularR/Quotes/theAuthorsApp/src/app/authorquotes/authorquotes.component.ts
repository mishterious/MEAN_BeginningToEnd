import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-authorquotes',
  templateUrl: './authorquotes.component.html',
  styleUrls: ['./authorquotes.component.css']
})
export class AuthorquotesComponent implements OnInit {
  _id: any;
  author: any;
  name: any;
  message: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this.author = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
    this.nameByID(this._id);
  }

  nameByID(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      this.author = data;
      console.log(data);
    })
  }

  upRank(quote){
    quote.rank++;
    console.log(quote.quote);
    this.message = { _id: this._id, quote_id: quote._id, quote: quote.quote, rank: quote.rank };
    console.log(this.message);

    let tempObservable = this._httpService.updateRank(this.message._id, this.message);
    tempObservable.subscribe(data => {
      this.author = data;
      console.log(this.author);
    })
    this.nameByID(this._id);
  }

  downRank(quote){
    quote.rank--;
    console.log(quote.quote);
    this.message = { _id: this._id, quote_id: quote._id, quote: quote.quote, rank: quote.rank };
    console.log(this.message);

    let tempObservable = this._httpService.updateRank(this.message._id, this.message);
    tempObservable.subscribe(data => {
      this.author = data;
      console.log(this.author);
    })
    this.nameByID(this._id);
  }

}
