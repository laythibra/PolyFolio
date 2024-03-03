import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() loginButtonText: string ="";
  @Input() signUpButtonText: string="";
  @Input() showDropdown: boolean = false;

  // si le token est présent dans le local storage, alors showDropdown = true
  ngOnInit() {
    this.showDropdown = localStorage.getItem('token') !== null;
  }

  logout() {
    // supprime le token du local storage
    localStorage.removeItem('token');
    // redirige vers la page de login
    window.location.href = '/';
  }
}
