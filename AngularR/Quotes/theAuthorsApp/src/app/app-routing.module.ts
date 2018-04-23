import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { AuthorquotesComponent } from './authorquotes/authorquotes.component';
import { QuoteaddComponent } from './quoteadd/quoteadd.component';

const routes: Routes = [
  { path: 'add', component: AddComponent},
  { path: 'edit/:id/:name', component: EditComponent},
  { path: 'all', component: AllComponent },
  { path: 'authorquotes/:id/:name', component: AuthorquotesComponent },
  { path: 'quoteadd/:id/:name', component: QuoteaddComponent },
  { path: '**', component: AllComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
