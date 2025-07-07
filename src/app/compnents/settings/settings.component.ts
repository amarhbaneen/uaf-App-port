import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { InputSwitch } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

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
export class SettingsComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  notificationsEnabled = false;
  private themeSubscription: Subscription | null = null;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Initialize from the theme service
    this.isDarkMode = this.themeService.isDarkMode();

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
      this.themeSubscription = null;
    }
  }

  toggleDarkMode() {
    this.themeService.toggleTheme();
  }

  onDarkModeChanged(value: boolean) {
    this.themeService.setTheme(value);
  }
}
