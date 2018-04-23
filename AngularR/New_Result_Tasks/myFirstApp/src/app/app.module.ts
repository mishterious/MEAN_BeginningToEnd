import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // <-- routing 
import { AlphaComponent } from './alpha/alpha.component';
import { BetaComponent } from './beta/beta.component';
import { GammaComponent } from './gamma/gamma.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,// <-- register FormsModule with our app.
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
