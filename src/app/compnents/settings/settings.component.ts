import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputSwitch } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { ThemeService } from '../../services/theme.service';
import { ThemeAwareBase } from '../../shared/theme-aware.base';

/**
 * Settings component for the application
 *
 * This component provides:
 * - Theme settings (light/dark mode toggle)
 * - Notification settings
 * - Other application settings
 *
 * It extends ThemeAwareBase to inherit theme-related functionality.
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NavbarComponent,
    Card,
    InputSwitch,
    FormsModule,
    Divider,
    Button
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent extends ThemeAwareBase {
  /**
   * Flag to track whether notifications are enabled
   */
  notificationsEnabled = false;

  /**
   * Constructor
   *
   * @param {ThemeService} themeService - Service for theme management
   */
  constructor(themeService: ThemeService) {
    // Pass the ThemeService to the base class
    super(themeService);
  }

  /**
   * Toggle between light and dark mode
   *
   * This method is called when the user clicks the dark mode toggle button.
   * It delegates to the toggleTheme method from the base class.
   */
  toggleDarkMode() {
    // Use the inherited toggleTheme method from ThemeAwareBase
    this.toggleTheme();
  }

  /**
   * Handle dark mode toggle switch changes
   *
   * This method is called when the user toggles the dark mode switch.
   * It directly sets the theme based on the switch value.
   *
   * @param {boolean} value - The new value of the dark mode switch
   */
  onDarkModeChanged(value: boolean) {
    // Set the theme directly based on the switch value
    this.themeService.setTheme(value);
  }
}
