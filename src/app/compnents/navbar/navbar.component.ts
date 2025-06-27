import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    Menubar,
    PrimeTemplate,
    ButtonDirective,
    Tooltip,
  ],
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isDarkMode = false;
  themeIcon = 'pi pi-moon';

  constructor(private router: Router) { }

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateThemeIcon();

    // Toggle the class on <body> or use the service if you have one
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  private updateThemeIcon() {
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateThemeIcon();

    // Toggle the class on <body> or use the service if you have one
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  logout() {
    // Placeholder logout logic
    this.router.navigate(['/login']);
  }
}
