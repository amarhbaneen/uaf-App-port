import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {PrimeTemplate} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';

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
export class NavbarComponent {
  isDarkMode = false;
  themeIcon = 'pi pi-moon';

  constructor(private router: Router) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeIcon = this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon';

    // Toggle the class on <body> or use the service if you have one
    document.body.classList.toggle('dark', this.isDarkMode);
  }

  logout() {
    // Placeholder logout logic
    this.router.navigate(['/login']);
  }
}
