import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HeaderModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; //

  profileForm = new FormGroup({

    email: new FormControl(''),
    prenom: new FormControl(''),
    nom: new FormControl(''),
    password: new FormControl(''),

  });

  signup() {
    console.log(this.profileForm.value.email);
    // écris une requete post vers localhost:3000/register avec les attributs dans le body : email, prenom, nom, password

    if (this.profileForm.value.email && this.profileForm.value.prenom && this.profileForm.value.nom && this.profileForm.value.password) {
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.profileForm.value.email,
        prenom: this.profileForm.value.prenom,
        nom: this.profileForm.value.nom,
        password: this.profileForm.value.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // si la requete est un succès, redirige vers la page de login
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
    else {
      // Afficher une alerte pour informer l'utilisateur de remplir tous les champs
      alert("Veuillez remplir tous les champs.");
  }


  }

}

