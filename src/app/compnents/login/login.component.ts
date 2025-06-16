import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Card} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    Card,
    FormsModule,
    ButtonDirective,
    InputText
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
