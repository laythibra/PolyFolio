import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'polyfolio-front';
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; //
}
