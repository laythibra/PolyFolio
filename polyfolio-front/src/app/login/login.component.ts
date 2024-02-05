import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[RouterOutlet, RouterModule, HeaderModule], 
  standalone: true,
})
export class LoginComponent {
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; //
}

  