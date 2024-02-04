import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class HeaderComponent {
  @Input() loginButtonText: string ="";
  @Input() signUpButtonText: string="";
  loginParam: string = '';

  constructor(private router: Router) {}

  goToLogin() {
    // Naviguer vers la page de connexion avec le paramètre
    this.router.navigate(['/login']);
    console.log("test")
  }
}
