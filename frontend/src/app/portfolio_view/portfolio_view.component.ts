import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [HeaderModule, RouterOutlet, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './portfolio_view.component.html',
  styleUrl: './portfolio_view.component.css'
})
export class PortfolioViewComponent {
  affichageProfil: boolean = true;

  id: number = 0;
  fileToUpload: File | null = null;

  titre: String = ""
  contenu: String = ""
  formations: String[] = []
  experiences: String[] = []
  projets: String[] = []
  langues: String[] = []
  url: String = "http://localhost:3000/static/"



  constructor(private route: ActivatedRoute) { }


  ngOnInit() {

    //récupère l'id dans les paramètres de l'url
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    // this.titre = "TITRE"
    // this.contenu = "Contenu du portfolio blabla lorem lipsum";


    // // génère du placeholder pour les formations, expériences, projets et langues
    // this.formations = ["Formation 1", "Formation 2", "Formation 3"];
    // this.experiences = ["Experience 1", "Experience 2", "Experience 3"];
    // this.projets = ["Projet 1", "Projet 2", "Projet 3"];
    // this.langues = ["Langue 1", "Langue 2", "Langue 3"];
    // this.url = "https://www.univ-angers.fr/skins/UnivAngers-v2/resources/img/logo-header-blanc-bleu.png"


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
        this.contenu = data.contenu
        this.url += data.image_nom

        //formations sont des strings séparées par des ;, on les transforme en tableau
        this.formations = data.formation.split(';');
        this.experiences = data.experience.split(';');
        this.projets = data.projet.split(';');
        this.langues = data.langue.split(';');
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.href = '/';
      });
  }
    
}
