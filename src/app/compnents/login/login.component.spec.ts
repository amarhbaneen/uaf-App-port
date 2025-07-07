import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { ThemeService } from '../../services/theme.service';
import { MessageService } from 'primeng/api';
import { ConnectionService } from '../../services/connection.service';
import { Router } from '@angular/router';

// Create mock services
const mockThemeService = {
  isDarkMode: () => false,
  getThemeIcon: () => 'pi pi-moon',
  toggleTheme: () => {},
  darkMode$: of(false)
};

const mockConnectionService = {
  getConnections: () => [],
  configure: () => {},
  testConnection: () => of({})
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService },
        { provide: ConnectionService, useValue: mockConnectionService },
        { provide: Router, useValue: mockRouter },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
