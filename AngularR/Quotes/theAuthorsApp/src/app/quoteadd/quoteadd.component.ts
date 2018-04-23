import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quoteadd',
  templateUrl: './quoteadd.component.html',
  styleUrls: ['./quoteadd.component.css']
})

export class QuoteaddComponent implements OnInit {
  error: any;
  author: any;
  _id: any;
  quote: any;
  message: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}


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


  addQuote(_id) {
    this.message = { quote: this.author.quote, rank: 0 };
    console.log(this.message);
    let tempObservable = this._httpService.addQuote(this._id, this.message)
    tempObservable.subscribe(data => {
      // console.log("See this particular user", data );
      this.error = data;
      console.log("==========32454321345=======================" + data)
      console.log(this.error);
    })
    this._router.navigate(['/all']); 
  }
}
