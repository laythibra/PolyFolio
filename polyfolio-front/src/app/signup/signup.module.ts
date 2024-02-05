import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    SignupComponent
  ],
  exports: [
    SignupComponent
  ],
  declarations: [
    
  ],
  providers: [
  ],
})
export class SignupModule { }