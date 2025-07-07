import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  public darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor() {
    // Initialize theme from localStorage
    this.initializeTheme();
  }

  /**
   * Initialize the theme based on localStorage's value
   */
  private initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark';
    this.darkModeSubject.next(isDarkMode);
    this.applyTheme(isDarkMode);
  }

  /**
   * Get the current dark mode state
   */
  public isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  /**
   * Toggle between dark and light themes
   */
  public toggleTheme(): void {
    const newDarkModeValue = !this.darkModeSubject.value;
    this.darkModeSubject.next(newDarkModeValue);
    this.applyTheme(newDarkModeValue);
    this.saveThemePreference(newDarkModeValue);
  }

  /**
   * Set the theme to a specific mode
   * @param isDarkMode Whether to enable dark mode
   */
  public setTheme(isDarkMode: boolean): void {
    if (this.darkModeSubject.value !== isDarkMode) {
      this.darkModeSubject.next(isDarkMode);
      this.applyTheme(isDarkMode);
      this.saveThemePreference(isDarkMode);
    }
  }

  /**
   * Apply the theme to the DOM
   * @param isDarkMode Whether to apply dark mode
   */
  private applyTheme(isDarkMode: boolean): void {
    // Apply to document.documentElement (used by NavbarComponent and LoginComponent)
    document.documentElement.classList.toggle('dark', isDarkMode);

    // Also apply to document.body for backward compatibility (used by SettingsComponent)
    document.body.classList.toggle('dark', isDarkMode);
  }

  /**
   * Save the theme preference to localStorage
   * @param isDarkMode Whether dark mode is enabled
   */
  private saveThemePreference(isDarkMode: boolean): void {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  /**
   * Get the appropriate theme icon based on the current theme
   * @returns The PrimeNG icon class name
   */
  public getThemeIcon(): string {
    return this.darkModeSubject.value ? 'pi pi-sun' : 'pi pi-moon';
  }
}
