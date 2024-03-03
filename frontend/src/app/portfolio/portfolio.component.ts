import { Component } from '@angular/core';
import { HeaderModule } from '../header/header.module';
import { RouterOutlet, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [HeaderModule, RouterOutlet, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  affichageProfil: boolean = true;

  id: number = 0;
  fileToUpload: File | null = null;

  fb: FormBuilder = new FormBuilder();

  portfolioForm = new FormGroup({

    titre: new FormControl(''),
    contenu: new FormControl(''),
    public: new FormControl(true),
    formations: this.fb.array([]),
    experiences: this.fb.array([]),
    projets: this.fb.array([]),
    langues: this.fb.array([]),

  });

  // Formations

  formations(): FormArray {
    return this.portfolioForm.get("formations") as FormArray
  }

  newFormation(): FormGroup {
    return this.fb.group(
      { nom: '', }
    )
  }

  addFormation() {
    this.formations().push(this.newFormation());
  }

  removeFormation(i: number) {
    this.formations().removeAt(i);
  }

  // Experiences

  experiences(): FormArray {
    return this.portfolioForm.get("experiences") as FormArray
  }

  newExperience(): FormGroup {
    return this.fb.group(
      { nom: '', }
    )
  }

  addExperience() {
    this.experiences().push(this.newExperience());
  }

  removeExperience(i: number) {
    this.experiences().removeAt(i);
  }

  // Projets

  projets(): FormArray {
    return this.portfolioForm.get("projets") as FormArray
  }

  newProjet(): FormGroup {
    return this.fb.group(
      { nom: '', }
    )
  }

  addProjet() {
    this.projets().push(this.newProjet());
  }

  removeProjet(i: number) {
    this.projets().removeAt(i);
  }

  // Langues

  langues(): FormArray {
    return this.portfolioForm.get("langues") as FormArray
  }

  newLangue(): FormGroup {
    return this.fb.group(
      { nom: '', }
    )
  }

  addLangue() {
    this.langues().push(this.newLangue());
  }

  removeLangue(i: number) {
    this.langues().removeAt(i);
  }



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
        // on récupère data.formations sous la forme "nom1;nom2" et on le transforme en [{nom: "nom1"}, {nom: "nom2"}]
        let formations = data.formation.split(';');
        let formationsArray = [];
        for (let formation of formations) {
          formationsArray.push({ nom: formation });
          this.formations().push(this.newFormation());
        }

        this.formations().setValue(formationsArray);

        let experiences = data.experience.split(';');
        let experiencesArray = [];
        for (let experience of experiences) {
          experiencesArray.push({ nom: experience });
          this.experiences().push(this.newExperience());
        }

        this.experiences().setValue(experiencesArray);

        // write the same code for projet and langue
        let projets = data.projet.split(';');
        let projetsArray = [];
        for (let projet of projets) {
          projetsArray.push({ nom: projet });
          this.projets().push(this.newProjet());
        }

        this.projets().setValue(projetsArray);

        let langues = data.langue.split(';');
        let languesArray = [];
        for (let langue of langues) {
          languesArray.push({ nom: langue });
          this.langues().push(this.newLangue());
        }

        this.langues().setValue(languesArray);
        console.log(data);
        this.portfolioForm.setValue({
          titre: data.titre,
          contenu: data.contenu,
          public: data.public,
          formations: this.formations().value,
          experiences: this.experiences().value,
          projets: this.projets().value,
          langues: this.langues().value
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  portfolio() {
    // écris une requete post vers localhost:3000/portfolio avec les attributs dans le body : titre, contenu

    // formations est de la forme [{nom: "nom1"}, {nom: "nom2"}], il faut le transformer en "nom1;nom2"
    let formationsString = "";
    if (this.portfolioForm.value.formations != null)
      for (let formation of this.portfolioForm.value.formations as Array<any>) {
        formationsString += formation.nom + ";";
      }

    formationsString = formationsString.slice(0, -1);

    // experiences, projets et langues sont de la même forme que formations
    let experiencesString = "";
    if (this.portfolioForm.value.experiences != null)
      for (let experience of this.portfolioForm.value.experiences as Array<any>) {
        experiencesString += experience.nom + ";";
      }

    experiencesString = experiencesString.slice(0, -1);

    let projetsString = "";
    if (this.portfolioForm.value.projets != null)
      for (let projet of this.portfolioForm.value.projets as Array<any>) {
        projetsString += projet.nom + ";";
      }

    projetsString = projetsString.slice(0, -1);

    let languesString = "";
    if (this.portfolioForm.value.langues != null)
      for (let langue of this.portfolioForm.value.langues as Array<any>) {
        languesString += langue.nom + ";";
      }

    languesString = languesString.slice(0, -1);


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
        formation: formationsString,
        experience: experiencesString,
        projet: projetsString,
        langue: languesString

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
        // this.router.navigate(['/']);        
        alert("Données enregistrées !");
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
    formData.append('id', this.id.toString());

    fetch('http://localhost:3000/upload', {
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
        alert("Portfolio créé !");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}