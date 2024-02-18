import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortfolioViewComponent } from './portfolio_view.component';

const routes: Routes = [
  { path: '', component: PortfolioViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioViewRoutingModule { }