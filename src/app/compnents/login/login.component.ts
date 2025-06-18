import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {Card} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    Card,
    FormsModule,
    ButtonDirective,
    InputText,
    Tooltip
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  isDarkMode = false;
  themeIcon = 'pi pi-moon';

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if dark mode is enabled in localStorage
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.updateThemeIcon();

    // Apply the theme based on localStorage
    document.body.classList.toggle('dark', this.isDarkMode);

    // Add a MutationObserver to watch for changes to the body's class list
    this.watchBodyClassChanges();
  }

  // Watch for changes to the body's class list (for when theme is toggled from navbar)
  private watchBodyClassChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const bodyHasDarkClass = document.body.classList.contains('dark');
          if (this.isDarkMode !== bodyHasDarkClass) {
            this.isDarkMode = bodyHasDarkClass;
            this.updateThemeIcon();
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true });
  }

  private updateThemeIcon() {
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.updateThemeIcon();

    // Toggle the class on <body>
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  login() {
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
