import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // fetch localhost:3000/protected, si response status 200 alors rien , sinon supprimer token de local storage
  ngOnInit() {
    fetch('http://localhost:3000/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        'Authorization': '' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          localStorage.removeItem('token');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }

}