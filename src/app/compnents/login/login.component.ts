import { Component, OnInit } from '@angular/core';
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

  login() {
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
