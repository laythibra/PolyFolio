import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [RouterOutlet, RouterModule, HeaderModule, ReactiveFormsModule],
  standalone: true,
})
export class LoginComponent {
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up";

  loginForm = new FormGroup({

    email: new FormControl(''),
    password: new FormControl(''),

  });

  login() {
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          alert('Mauvais identifiants');
          throw new Error('Mauvais identifiants');
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

