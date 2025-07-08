import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SettingsComponent } from './settings.component';
import { ThemeService } from '../../services/theme.service';

// Create mock ThemeService
const mockThemeService = {
  isDarkMode: () => false,
  getThemeIcon: () => 'pi pi-moon',
  toggleTheme: () => {},
  setTheme: () => {},
  darkMode$: of(false)
};

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
