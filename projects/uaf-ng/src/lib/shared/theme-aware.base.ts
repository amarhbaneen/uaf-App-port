import { OnInit, OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from '../services/theme.service';

/**
 * Base class for components that need theme awareness
 *
 * This abstract class provides a common implementation for theme-related functionality,
 * eliminating code duplication across components. Components that extend this class
 * automatically get:
 *
 * - Theme state tracking (isDarkMode property)
 * - Theme icon management (themeIcon property, if needed)
 * - Automatic theme state updates when the theme changes
 * - Proper cleanup of subscriptions on component destruction
 * - A method to toggle the theme
 *
 * Usage:
 * 1. Extend this class in your component
 * 2. Pass the ThemeService to the super() call in your constructor
 * 3. Override usesThemeIcon() to return true if your component needs the theme icon
 * 4. Use the isDarkMode and themeIcon properties in your component
 * 5. Call toggleTheme() to toggle the theme
 */
@Directive()
export abstract class ThemeAwareBase implements OnInit, OnDestroy {
  /**
   * Indicates whether dark mode is currently active
   * This property is automatically updated when the theme changes
   */
  isDarkMode = false;

  /**
   * The current theme icon (pi pi-sun or pi pi-moon)
   * Only initialized and updated if usesThemeIcon() returns true
   */
  themeIcon?: string;

  /**
   * Subscription to theme changes
   * Automatically cleaned up when the component is destroyed
   */
  protected themeSubscription: Subscription | null = null;

  /**
   * Constructor
   *
   * @param {ThemeService} themeService - The theme service to use
   */
  constructor(protected themeService: ThemeService) {}

  /**
   * Initialize the component
   *
   * This method:
   * 1. Gets the initial theme state from ThemeService
   * 2. Initializes the themeIcon if needed
   * 3. Sets up a subscription to theme changes
   */
  ngOnInit() {
    // Step 1: Initialize the isDarkMode property from the theme service
    this.isDarkMode = this.themeService.isDarkMode();

    // Step 2: Initialize themeIcon if the component uses it
    if (this.usesThemeIcon()) {
      this.themeIcon = this.themeService.getThemeIcon();
    }

    // Step 3: Subscribe to theme changes to keep the component updated
    this.themeSubscription = this.themeService.darkMode$.subscribe(isDark => {
      // Update the isDarkMode property when the theme changes
      this.isDarkMode = isDark;

      // Update themeIcon if the component uses it
      if (this.usesThemeIcon()) {
        this.themeIcon = this.themeService.getThemeIcon();
      }
    });
  }

  /**
   * Clean up resources when the component is destroyed
   *
   * This method unsubscribes from theme changes to prevent memory leaks
   */
  ngOnDestroy() {
    // Clean up the subscription to prevent memory leaks
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
      this.themeSubscription = null;
    }
  }

  /**
   * Toggle between light and dark theme
   *
   * This method delegates to the ThemeService to toggle the theme.
   * The component's properties will be updated automatically via the subscription.
   */
  toggleTheme() {
    // Delegate to the ThemeService
    this.themeService.toggleTheme();
  }

  /**
   * Determine whether the component uses the theme icon
   *
   * Override this method in components that use the themeIcon property.
   *
   * @returns {boolean} true if the component uses themeIcon, false otherwise
   */
  protected usesThemeIcon(): boolean {
    // Default implementation returns false
    // Components that use the theme icon should override this method to return true
    return false;
  }
}
