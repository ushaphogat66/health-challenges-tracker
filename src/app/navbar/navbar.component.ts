import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  showMenu = false;

  toggleMobileMenu() {
    this.showMenu = !this.showMenu;
    console.log('showMenu', this.showMenu);
  }
}
