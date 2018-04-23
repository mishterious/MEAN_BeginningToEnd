import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { AuthorquotesComponent } from './authorquotes/authorquotes.component';
import { QuoteaddComponent } from './quoteadd/quoteadd.component'; // <-- routing 


@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    EditComponent,
    AllComponent,
    AuthorquotesComponent,
    QuoteaddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,// <-- register FormsModule with our app.
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
