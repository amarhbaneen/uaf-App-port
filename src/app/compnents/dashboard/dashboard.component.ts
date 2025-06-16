import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {}
