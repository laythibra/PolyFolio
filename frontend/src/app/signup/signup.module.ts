import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    SignupComponent,
    FormsModule,
    ReactiveFormsModule,
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