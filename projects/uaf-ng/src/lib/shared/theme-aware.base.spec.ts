import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ThemeAwareBase } from './theme-aware.base';
import { ThemeService } from '../services/theme.service';

// Create a mock ThemeService
const mockThemeService = {
  isDarkMode: jasmine.createSpy('isDarkMode').and.returnValue(false),
  getThemeIcon: jasmine.createSpy('getThemeIcon').and.returnValue('pi pi-moon'),
  toggleTheme: jasmine.createSpy('toggleTheme'),
  darkMode$: of(false)
};

// Create a test component that extends ThemeAwareBase
@Component({
  selector: 'app-test',
  template: '<div>Test Component</div>'
})
class TestComponent extends ThemeAwareBase {
  constructor(themeService: ThemeService) {
    super(themeService);
  }

  // Override usesThemeIcon to test both cases
  protected override usesThemeIcon(): boolean {
    return true;
  }
}

describe('ThemeAwareBase', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme properties from ThemeService', () => {
    expect(mockThemeService.isDarkMode).toHaveBeenCalled();
    expect(mockThemeSeryarnvice.getThemeIcon).toHaveBeenCalled();
    expect(component.isDarkMode).toBeFalse();
    expect(component.themeIcon).toBe('pi pi-moon');
  });

  it('should call ThemeService.toggleTheme when toggleTheme is called', () => {
    component.toggleTheme();
    expect(mockThemeService.toggleTheme).toHaveBeenCalled();
  });

  it('should clean up subscription on destroy', () => {
    const subscriptionSpy = spyOn(component['themeSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(subscriptionSpy).toHaveBeenCalled();
    expect(component['themeSubscription']).toBeNull();
  });
});
