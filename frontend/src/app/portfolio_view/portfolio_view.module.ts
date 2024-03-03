import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioViewComponent } from './portfolio_view.component';
import { PortfolioViewRoutingModule } from './portfolio_view-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PortfolioViewRoutingModule,
    PortfolioViewComponent
  ],
  exports: [
    PortfolioViewComponent
  ],
  declarations: [
    
  ],
  providers: [
  ],
})
export class PorfolioViewModule { }