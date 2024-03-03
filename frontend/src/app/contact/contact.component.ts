import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderModule,RouterOutlet],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; 
}
