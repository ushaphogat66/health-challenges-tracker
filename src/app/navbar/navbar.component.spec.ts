import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { NavbarService } from '../services/navbar.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarService: NavbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [NavbarService]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    navbarService = TestBed.inject(NavbarService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu visibility', () => {
    component.toggleMobileMenu();
    expect(component.showMenu).toBeTrue();
  });

  it('should call navbarService.setMenuState when toggling menu', () => {
    spyOn(navbarService, 'setMenuState');
    component.toggleMobileMenu();
    expect(navbarService.setMenuState).toHaveBeenCalledWith(true);
  });

  it('should change menu state when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.mobile-menu-button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.showMenu).toBeTrue();
  });
});
