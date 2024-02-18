import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [HeaderModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  affichageProfil: boolean = true;

  id: number = 0;
  fileToUpload: File | null = null;

  portfolioForm = new FormGroup({

    titre: new FormControl(''),
    contenu: new FormControl(''),
    public: new FormControl('')

  });

  constructor(private route: ActivatedRoute, private router: Router) { }


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
        this.portfolioForm.setValue({
          titre: data.titre,
          contenu: data.contenu,
          public: data.public
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  portfolio() {
    // écris une requete post vers localhost:3000/portfolio avec les attributs dans le body : titre, contenu

    this.router.navigate(['/']);

    fetch('http://localhost:3000/portfolio/' + this.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        titre: this.portfolioForm.value.titre,
        contenu: this.portfolioForm.value.contenu,
        public: this.portfolioForm.value.public,

      }),
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleFileInput(target: any) {

    if (target != null && target.files != null)
      this.fileToUpload = target.files.item(0);
  }

  image() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload as Blob);
    fetch('http://localhost:3000/upload' + this.id , {
      method: 'POST',
      headers: {
        'Authorization': '' + localStorage.getItem('token'),
      },
      body: formData
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
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
