import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Menubar} from 'primeng/menubar';
import {PrimeTemplate} from 'primeng/api';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    Menubar,
    PrimeTemplate,
    ButtonDirective
  ],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDark = false;

  constructor(private router: Router) {}

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
  }

  logout() {
    // Placeholder logout logic
    this.router.navigate(['/login']);
  }
}
