import { Routes } from '@angular/router';
import { LoginComponent } from './compnents/login/login.component';
import { DashboardComponent } from './compnents/dashboard/dashboard.component';
import { SettingsComponent } from './compnents/settings/settings.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
