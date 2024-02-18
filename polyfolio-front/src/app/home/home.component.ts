import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'polyfolio-front';
  SeConnecter: string = "Login"; // Définir les valeurs des boutons
  Sinscrire: string = "Sign up"; //

  connecte = localStorage.getItem('token') !== null;
  portfolios: any = [];

  // au démarrage de la page, fetch localhost:3000/portfolio/user/<id> avec le token dans le header
  ngOnInit() {
    fetch('http://localhost:3000/portfolio/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error('Erreur');
        }
      })
      .then((data) => {
        console.log('Success:', data);
        this.portfolios = data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  nouveau() {
    fetch('http://localhost:3000/portfolio/creer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        'Authorization': '' + localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.href = '/portfolio?id=' + data.id;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  supprimerPortfolio(id: number) {
    fetch(`http://localhost:3000/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') || '',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Suppression réussie, mettre à jour la liste des portfolios
          this.portfolios = this.portfolios.filter((portfolio: any) => portfolio.id !== id);
        } else {
          throw new Error('Erreur lors de la suppression du portfolio');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
