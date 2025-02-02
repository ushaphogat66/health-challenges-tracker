import { TestBed } from '@angular/core/testing';
import { NavbarService } from './navbar.service';

describe('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update menu state correctly', () => {
    service.setMenuState(true);
    expect(service.getMenuState()).toBeTrue();

    service.setMenuState(false);
    expect(service.getMenuState()).toBeFalse();
  });
});
