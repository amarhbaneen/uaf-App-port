import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { InputSwitch } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NavbarComponent,
    Card,
    ButtonDirective,
    InputSwitch,
    FormsModule,
    Divider
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = document.body.classList.contains('dark');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}
