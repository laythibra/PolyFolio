import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioComponent } from './portfolio.component';
import { PortfolioRoutingModule } from './portfolio-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    PortfolioComponent,
  ],
  exports: [
    PortfolioComponent
  ],
  declarations: [
  ],
  providers: [
  ],
})
export class PorfolioModule { }
