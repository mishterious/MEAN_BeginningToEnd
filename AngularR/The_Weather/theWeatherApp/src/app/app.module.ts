import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { SeattleComponent } from './seattle/seattle.component';
import { BurbankComponent } from './burbank/burbank.component';
import { DallasComponent } from './dallas/dallas.component';
import { WashingtonComponent } from './washington/washington.component';
import { ChicagoComponent } from './chicago/chicago.component';
import { SanJoseComponent } from './san-jose/san-jose.component';


@NgModule({
  declarations: [
    AppComponent,
    SeattleComponent,
    BurbankComponent,
    DallasComponent,
    WashingtonComponent,
    ChicagoComponent,
    SanJoseComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,// <-- register FormsModule with our app.
    AppRoutingModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
