import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
},
    {path: 'login',
    loadChildren: () => import('./login/login.module')
      .then(mod => mod.LoginModule)
  },
  {path: 'signup',
    loadChildren: () => import('./signup/signup.module')
      .then(mod => mod.SignupModule)
  }
];
