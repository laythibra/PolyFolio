import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; //
}
