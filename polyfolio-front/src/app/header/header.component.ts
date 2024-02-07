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
}
