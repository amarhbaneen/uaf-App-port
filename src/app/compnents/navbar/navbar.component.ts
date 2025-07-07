import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

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

export class NavbarComponent implements OnInit, OnDestroy {
  isDarkMode = true;
  themeIcon = 'pi pi-sun';
  private themeSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    // Initialize from the theme service
    this.isDarkMode = this.themeService.isDarkMode();
    this.themeIcon = this.themeService.getThemeIcon();

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
      this.themeIcon = this.themeService.getThemeIcon();
    });
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
      this.themeSubscription = null;
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    // Placeholder logout logic
    this.router.navigate(['/login']);
  }
}
