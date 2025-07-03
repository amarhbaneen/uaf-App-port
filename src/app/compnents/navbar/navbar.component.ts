import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { PrimeTemplate } from 'primeng/api';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

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

export class NavbarComponent implements OnInit {
  isDarkMode = true;
  themeIcon = 'pi pi-sun';

  constructor(private router: Router) { }

  ngOnInit() {
    // Check if dark mode is enabled in localStorage
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateThemeIcon();

    // Apply the theme based on localStorage
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateThemeIcon();

    // Apply the class or use the service if you have one
    this.applyTheme();

    // Save the choice to localStorage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private updateThemeIcon() {
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';
  }

  private applyTheme() {
    const element = document.documentElement;
    if (element !== null) {
      // Uses the two-argument form of classList.toggle(className, force) -
      //    this.isDarkMode == true ? 'dark' class will be added : will be removed;
      //
      // This ensures the dark class reflects the actual state of isDarkMode.
      element.classList.toggle('dark', this.isDarkMode);
    }
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    // Placeholder logout logic
    this.router.navigate(['/login']);
  }
}
