import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let documentElementClassListSpy: jasmine.SpyObj<DOMTokenList>;
  let documentBodyClassListSpy: jasmine.SpyObj<DOMTokenList>;

  beforeEach(() => {
    // Create spies for localStorage and classList
    localStorageSpy = jasmine.createSpyObj('localStorage', ['getItem', 'setItem']);
    documentElementClassListSpy = jasmine.createSpyObj('documentElementClassList', ['toggle']);
    documentBodyClassListSpy = jasmine.createSpyObj('documentBodyClassList', ['toggle']);

    // Mock document.documentElement and document.body
    spyOnProperty(document, 'documentElement').and.returnValue({
      classList: documentElementClassListSpy
    });
    spyOnProperty(document, 'body').and.returnValue({
      classList: documentBodyClassListSpy
    });

    // Mock localStorage
    spyOn(window.localStorage, 'getItem').and.callFake(localStorageSpy.getItem);
    spyOn(window.localStorage, 'setItem').and.callFake(localStorageSpy.setItem);

    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize theme from localStorage', () => {
    // Arrange
    localStorageSpy.getItem.and.returnValue('dark');

    // Act
    service = TestBed.inject(ThemeService);

    // Assert
    expect(localStorageSpy.getItem).toHaveBeenCalledWith('theme');
    expect(service.isDarkMode()).toBeTrue();
    expect(documentElementClassListSpy.toggle).toHaveBeenCalledWith('dark', true);
    expect(documentBodyClassListSpy.toggle).toHaveBeenCalledWith('dark', true);
  });

  it('should toggle theme', () => {
    // Arrange
    const initialDarkMode = service.isDarkMode();

    // Act
    service.toggleTheme();

    // Assert
    expect(service.isDarkMode()).toBe(!initialDarkMode);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('theme', service.isDarkMode() ? 'dark' : 'light');
    expect(documentElementClassListSpy.toggle).toHaveBeenCalledWith('dark', service.isDarkMode());
    expect(documentBodyClassListSpy.toggle).toHaveBeenCalledWith('dark', service.isDarkMode());
  });

  it('should set theme', () => {
    // Act
    service.setTheme(true);

    // Assert
    expect(service.isDarkMode()).toBeTrue();
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(documentElementClassListSpy.toggle).toHaveBeenCalledWith('dark', true);
    expect(documentBodyClassListSpy.toggle).toHaveBeenCalledWith('dark', true);
  });

  it('should return correct theme icon', () => {
    // Arrange
    service.setTheme(true);

    // Act & Assert
    expect(service.getThemeIcon()).toBe('pi pi-sun');

    // Arrange
    service.setTheme(false);

    // Act & Assert
    expect(service.getThemeIcon()).toBe('pi pi-moon');
  });

  it('should notify subscribers when theme changes', (done) => {
    // Arrange
    const initialDarkMode = service.isDarkMode();

    // Act & Assert
    service.darkMode$.subscribe(isDarkMode => {
      expect(isDarkMode).toBe(!initialDarkMode);
      done();
    });

    service.toggleTheme();
  });
});
