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
  },
  {path: 'portfolio',
    loadChildren: () => import('./portfolio/portfolio.module')
      .then(mod => mod.PorfolioModule)
  },
  {path: 'about',
    loadChildren: () => import('./about/about.module')
      .then(mod => mod.AboutModule)
  },
  {path: 'view',
    loadChildren: () => import('./portfolio_view/portfolio_view.module')
      .then(mod => mod.PorfolioViewModule)
  },
  {path: 'contact',
  loadChildren: () => import('./contact/contact.module')
    .then(mod => mod.ContactModule)
},

];
