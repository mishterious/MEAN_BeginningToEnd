import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mapp';
  working = "right now";
  tasks = [];
  oneTask = [];

  constructor(private _httpService: HttpService){
  }
  ngOnInit(){
    this.getTasks()
  }

  getTasks(){
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe(data => {
      console.log("Got our tasks!", data);
      this.tasks = data;
      console.log("awfewafwaffweaff ", this.tasks);
    });
  }

  taskByID(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      console.log("See this particular user", data );
      this.oneTask = data;
      console.log(this.oneTask);
    })
  }



}
