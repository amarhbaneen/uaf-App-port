import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ThemeService } from '../../services/theme.service';
import { ThemeAwareBase } from '../../shared/theme-aware.base';

/**
 * Navigation bar component for the application
 *
 * This component provides:
 * - Application navigation
 * - Theme toggle functionality
 * - Logout functionality
 *
 * It extends ThemeAwareBase to inherit theme-related functionality.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    Menubar,
    PrimeTemplate,
    Tooltip,
    Button,
  ],
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent extends ThemeAwareBase {
  /**
   * Constructor
   *
   * @param {Router} router - Angular Router for navigation
   * @param {ThemeService} themeService - Service for theme management
   */
  constructor(
    private router: Router,
    themeService: ThemeService
  ) {
    // Pass the ThemeService to the base class
    super(themeService);
  }

  /**
   * Indicate that this component uses the theme icon
   *
   * @returns {boolean} true to enable theme icon functionality
   */
  protected override usesThemeIcon(): boolean {
    // This component displays a theme toggle icon, so return true
    return true;
  }

  /**
   * Navigate to the settings page
   *
   * This method is called when the user clicks the settings button.
   */
  navigateToSettings() {
    // Use the Angular Router to navigate to the settings page
    this.router.navigate(['/settings']);
  }

  /**
   * Log out the current user
   *
   * This method is called when the user clicks the logout button.
   * Currently, it simply navigates to the login page.
   */
  logout() {
    // Placeholder logout logic - in a real app, this would clear session data
    // and perform other logout-related tasks before navigation
    this.router.navigate(['/login']);
  }
}
