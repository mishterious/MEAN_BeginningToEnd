import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SanJoseComponent } from './san-jose/san-jose.component';
import { SeattleComponent } from './seattle/seattle.component';
import { BurbankComponent } from './burbank/burbank.component'; 
import { DallasComponent } from './dallas/dallas.component';
import { WashingtonComponent } from './washington/washington.component';
import { ChicagoComponent } from './chicago/chicago.component';

const routes: Routes = [
  { path: 'san-jose', component: SanJoseComponent},
  { path: 'seattle', component: SeattleComponent},
  { path: 'burbank', component: BurbankComponent},
  { path: 'chicago', component: ChicagoComponent},
  { path: 'dallas', component: DallasComponent},
  { path: 'washington', component: WashingtonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
