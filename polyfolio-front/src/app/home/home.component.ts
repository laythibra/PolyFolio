import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { HeaderComponent } from '../header/header.component';
//import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'polyfolio-front';
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; //

  constructor(private router: Router) {}

  /*goToLogin() {
    // Naviguer vers la page de connexion avec le paramètre
    this.router.navigate(['/login']);
    console.log("test")
  }*/
}
