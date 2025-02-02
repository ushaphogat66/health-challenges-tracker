import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  showMenu = false;

  constructor(private navbarService: NavbarService) {}

  toggleMobileMenu() {
    this.showMenu = !this.showMenu;
    this.navbarService.setMenuState(this.showMenu);
  }
}
