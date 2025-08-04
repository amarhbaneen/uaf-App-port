import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Service responsible for managing the application's theme
 *
 * This service provides functionality to:
 * - Toggle between light and dark themes
 * - Set a specific theme
 * - Get the current theme state
 * - Get the appropriate theme icon
 * - Subscribe to theme changes
 *
 * The theme state is persisted in localStorage and applied to the DOM.
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // BehaviorSubject to track and broadcast the dark mode state
  private darkModeSubject = new BehaviorSubject<boolean>(false);

  // Public Observable that components can subscribe to for theme changes
  public darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  constructor() {
    // Initialize theme from localStorage when service is created
    this.initializeTheme();
  }

  /**
   * Initialize the theme based on localStorage's value
   *
   * This method is called during service initialization to:
   * 1. Retrieve the saved theme from localStorage
   * 2. Set the initial dark mode state
   * 3. Apply the theme to the DOM
   */
  private initializeTheme(): void {
    // Get the saved theme from localStorage (defaults to light if not set)
    const savedTheme = localStorage.getItem('theme');

    // Convert the saved theme to a boolean (true if 'dark', false otherwise)
    const isDarkMode = savedTheme === 'dark';

    // Update the BehaviorSubject with the initial value
    this.darkModeSubject.next(isDarkMode);

    // Apply the theme to the DOM
    this.applyTheme(isDarkMode);
  }

  /**
   * Get the current dark mode state
   *
   * @returns {boolean} True if dark mode is enabled, false otherwise
   */
  public isDarkMode(): boolean {
    // Return the current value of the BehaviorSubject
    return this.darkModeSubject.value;
  }

  /**
   * Toggle between dark and light themes
   *
   * This method:
   * 1. Inverts the current theme state
   * 2. Updates the BehaviorSubject
   * 3. Applies the new theme to the DOM
   * 4. Saves the preference to localStorage
   */
  public toggleTheme(): void {
    // Invert the current dark mode value
    const newDarkModeValue = !this.darkModeSubject.value;

    // Update the BehaviorSubject (this will notify all subscribers)
    this.darkModeSubject.next(newDarkModeValue);

    // Apply the new theme to the DOM
    this.applyTheme(newDarkModeValue);

    // Save the preference to localStorage
    this.saveThemePreference(newDarkModeValue);
  }

  /**
   * Set the theme to a specific mode
   *
   * This method only makes changes if the new value is different from the current value.
   *
   * @param {boolean} isDarkMode Whether to enable dark mode
   */
  public setTheme(isDarkMode: boolean): void {
    // Only make changes if the new value is different from the current value
    if (this.darkModeSubject.value !== isDarkMode) {
      // Update the BehaviorSubject (this will notify all subscribers)
      this.darkModeSubject.next(isDarkMode);

      // Apply the new theme to the DOM
      this.applyTheme(isDarkMode);

      // Save the preference to localStorage
      this.saveThemePreference(isDarkMode);
    }
  }

  /**
   * Apply the theme to the DOM
   *
   * This method adds or removes the 'dark' class from the document element
   * and body based on the isDarkMode parameter.
   *
   * @param {boolean} isDarkMode Whether to apply dark mode
   */
  private applyTheme(isDarkMode: boolean): void {
    // Apply to document.documentElement (used by NavbarComponent and LoginComponent)
    document.documentElement.classList.toggle('dark', isDarkMode);

    // Also apply to document.body for backward compatibility (used by SettingsComponent)
    document.body.classList.toggle('dark', isDarkMode);
  }

  /**
   * Save the theme preference to localStorage
   *
   * This method persists the theme preference so it can be restored
   * when the application is loaded again.
   *
   * @param {boolean} isDarkMode Whether dark mode is enabled
   */
  private saveThemePreference(isDarkMode: boolean): void {
    // Save 'dark' or 'light' to localStorage based on the isDarkMode parameter
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  /**
   * Get the appropriate theme icon based on the current theme
   *
   * This method returns the PrimeNG icon class name based on the current theme:
   * - 'pi pi-sun' for dark mode (to indicate the option to switch to light mode)
   * - 'pi pi-moon' for light mode (to indicate the option to switch to dark mode)
   *
   * @returns {string} The PrimeNG icon class name
   */
  public getThemeIcon(): string {
    // Return the appropriate icon based on the current theme
    return this.darkModeSubject.value ? 'pi pi-sun' : 'pi pi-moon';
  }
}
