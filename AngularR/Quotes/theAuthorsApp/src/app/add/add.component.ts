import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  newname: any;
  author: {};
  _id: any;

  constructor(
    private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router
  ) {}

  ngOnInit() {
    this.author = { name: " " };
    this._route.params.subscribe((params: Params) => this._id = params['id']);
  }

  onSubmit() {
    console.log(this.author);
    let tempObservable = this._httpService.create(this.author)
    tempObservable.subscribe(data => {
      // console.log("See this particular user", data );
      this.newname = data;
      console.log("==========32454321345=======================" + data)
      console.log(this.newname);
    })
    this._router.navigate(['/all']);  
  }
}
