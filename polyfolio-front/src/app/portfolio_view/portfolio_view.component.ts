import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [HeaderModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './portfolio_view.component.html',
  styleUrl: './portfolio_view.component.css'
})
export class PortfolioViewComponent {
  affichageProfil: boolean = true;

  id: number = 0;
  fileToUpload: File | null = null;

  titre: String = ""
  contenu: String = ""
  formation: String = ""
  experience: String = ""
  langue: String = ""
  projet: String = ""



  constructor(private route: ActivatedRoute) { }


  ngOnInit() {

    //récupère l'id dans les paramètres de l'url
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    fetch('http://localhost:3000/portfolio/' + this.id, {
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
        this.titre = data.titre,
        this.contenu = data.contenu,
        this.formation = data.formation,
        this.projet = data.projet,
        this.langue = data.langue,
        this.experience = data.experience
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.href = '/';
      });
  }
    
}
