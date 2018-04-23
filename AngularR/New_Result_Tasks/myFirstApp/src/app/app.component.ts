import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = " ";
  description = " ";
  tasks = {};
  oneTask = {};
  newTask: any;

  constructor(private _httpService: HttpService){
  }

  ngOnInit(){
    this.getTasks()
    this.newTask = { title: "", description: "" }
  }

  getTasks(){
    let tempObservable = this._httpService.getTasks();
    tempObservable.subscribe(data => {
      // console.log("Got our tasks!", data);
      this.tasks = data;
      // console.log("awfewafwaffweaff ", this.tasks);
    });
  }


  taskByID(_id){
    console.log(_id);
    let tempObservable = this._httpService.by(_id);
    tempObservable.subscribe(data => {
      // console.log("See this particular user", data );
      this.oneTask = data;
      // console.log(this.oneTask);
    })
  }

  onSubmit() {
    let tempObservable = this._httpService.create(this.newTask)
    tempObservable.subscribe(data => {
      // console.log("See this particular user", data );
      this.oneTask = data;
      console.log("==========32454321345=======================" + data)
      console.log(this.oneTask);
    })

    this.newTask = { title: "", description: "" }
  }

  edit(_id) {
    console.log(_id);
    console.log(this.newTask)
    let tempObservable = this._httpService.edit(_id, this.newTask)
    tempObservable.subscribe(data => {
      // console.log("See this particular user", data );
      this.oneTask = data;
      // console.log(this.oneTask);
    })

    this.newTask = { title: "", description: "" }
  }


  deleteByID(_id){
    // console.log(_id);
    let tempObservable = this._httpService.deleteByID(_id);
    tempObservable.subscribe(data => {
      // console.log("We're deleting this one.", _id);
      // this.delete = data;
      console.log(data+ "345678765432123456789765432");
    })
  }

}
