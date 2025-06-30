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
  isDarkMode = false;
  themeIcon = 'pi pi-moon';

  constructor(private router: Router) { }

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';

    // Toggle the class on <body> or use the service if you have one
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';

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
