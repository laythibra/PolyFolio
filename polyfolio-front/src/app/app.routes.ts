import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent
},
  {
        path: 'login',
        component: LoginComponent
    }
];
