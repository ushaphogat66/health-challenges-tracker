import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isMenuOpen = false;

  setMenuState(state: boolean) {
    this.isMenuOpen = state;
  }

  getMenuState(): boolean {
    return this.isMenuOpen;
  }
}
